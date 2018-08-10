const constants = require('../../config');
const app = getApp();
const $toast = require('../../utils/showToast');
const mui = {
    toast: function (title) {
        $toast.showToast({
            title: title,
            mask: false
        });
    }
};
// pages/bill/wxpay.js
var waitTimer = null;
var transactionId = "";
var isTransaction = true;
Page({
    /**
     * 页面的初始数据
     */
    data: {
        order: null,
        focus: true,
        repayAmount: 0
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        var that = this;
        var orderId = options.orderId || "13380759188842E182E70161309E12FD";
        app.getInvoke(constants.URLS.GETORDERBYORDERID + orderId, function (res) {
            if (res.succeeded) {
                that.setData({
                    order: res.data,
                    repayAmount: (res.data.repayAmount * 0.01).toFixed(2)
                });
            }
        });
    },
    bindRepayAmount: function () {
        this.setData({
            focus: true
        });
    },
    bindKeyInput: function (e) {
        this.setData({
            repayAmount: e.detail.value
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
        amount = parseInt((parseFloat(amount) * 100).toFixed());
        if (amount > this.data.order.totalAmount) {
            mui.toast("支付金额输入错误!");
            return false;
        }
        return true;
    },
    createTransaction: function (transactionMethod, callSuccess) {
        var data = {
            orderId: this.data.order.orderId,
            orderModel: this.data.order.orderModel,
            amount: parseInt((parseFloat(this.data.repayAmount) * 100).toFixed()),
            transactionCategory: "In",
            transactionMethod: transactionMethod,
            paymentSource: "Fengniaowu"
        };
        app.postInvoke(constants.URLS.CREATETRANSACTION, data, function (res) {
            if (res.succeeded) {
                callSuccess(res);
            } else {
                mui.toast(res.message);
            }
        },function (err) {
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
        if (this.validateAmount()) {
            this.createTransaction("WeiXin", function (res) {
                transactionId = res.data.transactionId;
                that.weixinLogin(function (res1) {
                    var wxpay = {
                        openId: res1.data,
                        transactionId: transactionId
                    };
                    app.postInvoke(constants.URLS.ORDERPAYMENT, wxpay, function (res2) {
                        if (res2.succeeded) {
                            waitTimer = setInterval(function () {
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
                                    clearInterval(waitTimer);
                                    mui.toast("支付失败");
                                }
                            });
                        } else {
                            mui.toast(res2.message);
                        }
                    },function (err) {
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
                    url: '/pages/bill/detail?key=precreate&transactionId=' + transactionId + '&amount=' + amount + '&paymentTime=' + paymentTime
                });
            });
        }
    },
    queryTransaction: function () {
        if (transactionId != "" && isTransaction) {
            isTransaction = false;
            app.getInvoke(constants.URLS.GETTRANSACTION + transactionId, function (res) {
                isTransaction = true;
                if (res.succeeded) {
                    if (res.data.transactionState == "Succeed") {
                        clearInterval(waitTimer);
                        wx.reLaunch({url: '/pages/bill/bill'});
                    }
                }
            });
        }
    }
})