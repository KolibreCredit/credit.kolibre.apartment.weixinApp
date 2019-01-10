const app = getApp();
const constants = require('../../config');
const $toast = require('../../utils/showToast');
const mui = {
    toast: function (title) {
        $toast.showToast({
            title: title,
            mask: false
        });
    }
};
// pages/bill/wxpay2.js
var transactionId = "";
var isTransaction = true;
Page({
    /**
     * 页面的初始数据
     */
    data: {
        focus: true,
        tabIndex: -1,
        repayAmount: "",
        waitTimer: null,
        apartmentName: "",
        roomNumber: "",
        deviceType: "",
        deviceId: ""
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        var apartmentName = decodeURI(options.apartmentName);
        var roomNumber = decodeURI(options.roomNumber);
        var deviceType = decodeURI(options.deviceType);
        var deviceId = decodeURI(options.deviceId);
        this.setData({
            apartmentName: apartmentName,
            roomNumber: roomNumber,
            deviceType: deviceType,
            deviceId: deviceId
        });
    },
    bindKeyInput: function (e) {
        this.setData({
            repayAmount: e.detail.value
        });
    },
    itemSelect: function (e) {
        var itemAmounts = [30, 50, 100, 200, 500, 1000];
        var tabIndex = parseInt(e.currentTarget.dataset.index);
        this.setData({
            tabIndex: tabIndex,
            repayAmount: itemAmounts[tabIndex]
        });
    },
    validateAmount: function () {
        var amount = this.data.repayAmount;
        if (amount == "") {
            mui.toast("支付金额不能为空!");
            return false;
        }
        if (amount == "0" || amount == "0.0" || amount == "0.00") {
            mui.toast("支付金额不能为零!");
            return false;
        }
        return true;
    },
    createTransaction: function (transactionMethod, callSuccess) {
        var data = {
            deviceId: this.data.deviceId,
            amount: parseInt((parseFloat(this.data.repayAmount) * 100).toFixed()),
            transactionMethod: transactionMethod
        };
        app.postInvoke(constants.URLS.CREATETRANSACTION, data, function (res) {
            if (res.succeeded) {
                callSuccess(res);
            } else {
                mui.toast(res.message);
            }
        }, function (err) {
            mui.toast(err.message);
        });
    },
    weixinLogin: function (callSuccess) {
        wx.login({
            success: function (wxRes) {
                var user = {
                    appId: "wxa3dca93609e3009f",
                    code: wxRes.code
                };
                app.postInvoke(constants.URLS.GETWECHATOPENID, user, function (res) {
                    if (res.succeeded) {
                        callSuccess(res);
                    } else {
                        mui.toast(res.message);
                    }
                }, function (err) {
                    mui.toast(err.message);
                });
            }
        });
    },

    weixinPayment: function (e) {
        var that = this;
        if (isTransaction && this.validateAmount()) {
            this.createTransaction("WeiXin", function (res) {
                isTransaction = false;
                transactionId = res.data.transactionId;
                that.weixinLogin(function (res1) {
                    var wxpay = {
                        openId: res1.data,
                        transactionId: transactionId
                    };
                    app.postInvoke(constants.URLS.ORDERPAYMENT, wxpay, function (res2) {
                        if (res2.succeeded) {
                            that.data.waitTimer = setInterval(function () {
                                that.queryTransaction();
                            }, 2000);
                            wx.requestPayment({
                                timeStamp: res2.data.timeStamp,
                                nonceStr: res2.data.nonceStr,
                                package: res2.data.package,
                                signType: res2.data.signType,
                                paySign: res2.data.paySign,
                                success: function (wxres) {
                                    console.log(wxres);
                                    mui.toast("支付成功");
                                },
                                fail: function (err) {
                                    console.log(err);
                                    mui.toast("支付失败");
                                    isTransaction = true;
                                    clearInterval(that.data.waitTimer);
                                    setTimeout(function () {
                                        wx.navigateTo({
                                            url: '/pages/user/detail?key=waterElectricity'
                                        });
                                    }, 1000);
                                }
                            });
                        } else {
                            mui.toast(res2.message);
                        }
                    }, function (err) {
                        mui.toast(err.message);
                    });
                });
            });
        }
    },

    zhifubaoPayment: function (e) {
        var that = this;
        if (this.validateAmount()) {
            this.createTransaction("AliPay", function (res) {
                transactionId = res.data.transactionId;
                var amount = parseInt((parseFloat(that.data.repayAmount) * 100).toFixed());
                var paymentTime = that.data.order.paymentTime.substring(0, 10);
                wx.navigateTo({
                    url: '/pages/bill/detail?key=precreate&goto=waterElectricity&transactionId=' + transactionId + '&amount=' + amount + '&paymentTime=' + paymentTime
                });
            });
        }
    },

    queryTransaction: function () {
        if (transactionId != "") {
            var that = this;
            app.getInvoke(constants.URLS.GETTRANSACTION + transactionId, function (res) {
                if (res.succeeded) {
                    if (res.data.transactionState == "Succeed") {
                        isTransaction = true;
                        clearInterval(that.data.waitTimer);
                        setTimeout(function () {
                            wx.navigateTo({
                                url: '/pages/user/detail?key=waterElectricity'
                            });
                        }, 1000);
                    }
                }
            });
        }
    }
})