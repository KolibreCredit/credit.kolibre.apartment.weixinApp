// pages/user/user.js
const tabbar = require('../tabbar');
const constants = require('../../config');
const app = getApp();
var wxStar = require('../../utils/wxStar');
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
        tenant: null,
        contractCount: 0,
        invoiceCount: 0,
        isAlert: false,
        msgAlert: ""
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {

    },
    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {
        var that = this;
        var contractCount = 0;
        var invoiceCount = 0;
        tabbar.index = 4;
        app.getInvoke2(constants.URLS.GETTENANTSTATISTICINFO, function (res) {
            if (res.succeeded) {
                if (res.data.contractCount > 0) {
                    tabbar.list[1].iconPath = "/images/tabBar/zuyus.png";
                    tabbar.list[1].selectedIconPath = "/images/tabBar/zuyus_active.png";
                    contractCount = res.data.contractCount;
                }
                if (res.data.invoiceCount > 0) {
                    tabbar.list[4].iconPath = "/images/tabBar/zhanghus.png";
                    tabbar.list[4].selectedIconPath = "/images/tabBar/zhanghus_active.png";
                    invoiceCount = res.data.invoiceCount
                }
            }
            that.setData({
                tabbar: tabbar,
                contractCount: contractCount,
                invoiceCount: invoiceCount
            });
        });
        //
        app.getInvoke(constants.URLS.GETCURRENTTENANT, function (res) {
            if (res.succeeded) {
                wxStar.wxStar(that, res.data.creditRating, false);
                that.setData({tenant: res.data});
            }
        });
    },
    list: function (e) {
        this.setData({
            isAlert: false,
            msgAlert: ""
        });
        wx.reLaunch({
            url: '/pages/list/list'
        });
    },
    bill: function (e) {
        wx.reLaunch({
            url: '/pages/bill/bill'
        });
    },
    credit: function (e) {
        wx.navigateTo({
            url: '/pages/user/detail?key=credit'
        });
    },
    fuwu: function (e) {
        wx.reLaunch({
            url: '/pages/service/service'
        });
    },
    shezhi: function (e) {
        wx.navigateTo({
            url: '/pages/user/user1'
        });
    },
    reserve: function (e) {
        wx.navigateTo({
            url: '/pages/user/detail?key=reserve'
        });
    },
    tuikuan: function (e) {
        wx.navigateTo({
            url: '/pages/user/detail?key=tuikuan'
        });
    },
    invoice: function (e) {
        wx.navigateTo({
            url: '/pages/user/detail?key=invoice'
        });
    },
    favor: function (e) {
        wx.navigateTo({
            url: '/pages/user/detail?key=favor'
        });
    },
    waterElectricity: function (e) {
        var that = this;
        app.getInvoke(constants.URLS.WHETHERCONFIRMCONTRACT, function (res) {
            if (res.succeeded) {
                if (res.data.needConfirm) {
                    that.setData({
                        msgAlert: "您的租约处于待确认状态，不能查看智能水电表，请先确认租约。",
                        isAlert: true
                    });
                } else {
                    wx.navigateTo({
                        url: '/pages/user/detail?key=waterElectricity'
                    });
                }
            } else {
                mui.toast(res.message);
            }
        }, function (err) {
            mui.toast(err.message);
        });
    },
    gateLock: function (e) {
        var that = this;
        app.getInvoke(constants.URLS.WHETHERCONFIRMCONTRACT, function (res) {
            if (res.succeeded) {
                if (res.data.needConfirm) {
                    that.setData({
                        msgAlert: "您的租约处于待确认状态，不能查看智能门锁，请先确认租约。",
                        isAlert: true
                    });
                } else {
                    wx.navigateTo({
                        url: '/pages/user/detail?key=gateLock'
                    });
                }
            } else {
                mui.toast(res.message);
            }
        }, function (err) {
            mui.toast(err.message);
        });
    },
    closeAlert: function (e) {
        this.setData({
            msgAlert: "",
            isAlert: false
        });
    }
})