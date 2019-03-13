// pages/list/list.js
const tabbar = require('../tabbar');
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
Page({
    /**
     * 页面的初始数据
     */
    data: {
        tabbar: null,
        contracts: null,
        confirmCount: 0,
        isNoData: false,
        contractId: "",
        isApply: false,
        isQuash: false,
        tabIndex: 0
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        var that = this;
        tabbar.index = 1;
        app.getInvoke2(constants.URLS.GETUNCONFIRMEDCONTRACTCOUNT, function (res) {
            if (res.succeeded) {
                if (res.data > 0) {
                    tabbar.list[1].iconPath = "/images/tabBar/zuyus.png";
                    tabbar.list[1].selectedIconPath = "/images/tabBar/zuyus_active.png";
                }
            }
            that.setData({
                tabbar: tabbar
            });
        });
    },
    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {
        this.getCurrentcontracts();
    },
    getCurrentcontracts: function () {
        var that = this;
        app.getInvoke(constants.URLS.GETCURRENTCONTRACTS, function (res) {
            var jsonData = [];
            if (res.succeeded && res.data.length > 0) {
                if (that.data.tabIndex == 0) {
                    for (var i = 0; i < res.data.length; i++) {
                        if (res.data[i].rentalMode == "MonthlyRent") {
                            jsonData.push(res.data[i]);
                        }
                    }
                } else {
                    for (var i = 0; i < res.data.length; i++) {
                        if (res.data[i].rentalMode == "DailyRent") {
                            jsonData.push(res.data[i]);
                        }
                    }
                }
            }
            if (jsonData.length > 0) {
                var confirmCount = 0;
                for (var i = 0; i < jsonData.length; i++) {
                    if (!jsonData[i].confirmed) {
                        confirmCount = confirmCount + 1;
                    }
                }
                that.setData({
                    confirmCount: confirmCount,
                    contracts: jsonData,
                    isNoData: false
                });
            } else {
                that.setData({
                    confirmCount: 0,
                    isNoData: true
                });
            }
        }, function (err) {
            that.setData({
                confirmCount: 0,
                isNoData: true
            });
            mui.toast(err.message);
        });
    },
    selectTab: function (e) {
        var index = e.currentTarget.dataset.index * 1;
        if (this.data.tabIndex != index) {
            this.setData({
                tabIndex: index
            });
            this.getCurrentcontracts();
        }
    },
    view: function (e) {
        var contractId = e.currentTarget.dataset.contractid;
        wx.navigateTo({
            url: '/pages/list/detail?key=view&contractId=' + contractId
        });
    },
    contractConfirm: function (e) {
        var contractId = e.currentTarget.dataset.contractid;
        wx.navigateTo({
            url: '/pages/list/detail?key=confirmed&contractId=' + contractId
        });
    },
    showApply: function (e) {
        var contractId = e.currentTarget.dataset.contractid;
        this.setData({
            contractId: contractId,
            isApply: true
        });
    },
    hideApply: function (e) {
        this.setData({
            contractId: "",
            isApply: false
        });
    },
    createYueFuOrders: function (e) {
        var that = this;
        var data = {contractId: this.data.contractId};
        app.postInvoke(constants.URLS.CREATEYUEFUORDERS, data, function (res) {
            if (res.succeeded) {
                setTimeout(function () {
                    wx.reLaunch({url: '/pages/bill/bill'});
                }, 1000);
            } else {
                that.hideApply();
                mui.toast(res.message);
            }
        }, function (err) {
            that.hideApply();
            mui.toast(err.message);
        });
    },
    staged: function (e) {
        var contractId = e.currentTarget.dataset.contractid;
        wx.navigateTo({
            url: '/pages/list/detail?key=recognitionface&contractId=' + contractId
        });
    },
    eviction: function (e) {
        var contractId = e.currentTarget.dataset.contractid;
        wx.navigateTo({
            url: '/pages/list/detail?key=lease&contractId=' + contractId
        });
    },
    showQuash: function (e) {
        var contractId = e.currentTarget.dataset.contractid;
        this.setData({
            contractId: contractId,
            isQuash: true
        });
    },
    hideQuash: function (e) {
        this.setData({
            contractId: "",
            isQuash: false
        });
    },
    cancelCheckoutApply: function (e) {
        var data = {
            contractId: this.data.contractId
        };
        var that = this;
        app.postInvoke(constants.URLS.CANCELCHECKOUTAPPLY, data, function (res) {
            that.hideQuash();
            if (res.succeeded) {
                that.getCurrentcontracts();
            } else {
                mui.toast(res.message);
            }
        }, function (err) {
            that.hideQuash();
            mui.toast(err.message);
        });
    }
})