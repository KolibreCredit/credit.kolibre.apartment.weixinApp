// pages/bill/bill.js
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
        tabIndex: 0,
        isNoData: false,
        recentDays: 15,
        recentOrderAmount: 0,
        orders: null
    },
    bill: function (e) {
        wx.navigateTo({
            url: '/pages/user/detail?key=bill'
        });
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        tabbar.index = 2;
        this.setData({
            tabbar: tabbar
        });
    },
    onShow: function () {
        this.findAllLeaseOrder(this.data.tabIndex);
    },
    findAllLeaseOrder: function (index) {
        var that = this;
        var orderState = (index == 0 ? "NotPaid" : "Paid");
        app.getInvoke((constants.URLS.QUERYALLORDERS + orderState), function (res) {
            if (res.succeeded) {
                if (res.data.orderResponse.length > 0) {
                    that.setData({
                        recentDays: res.data.recentDays,
                        recentOrderAmount: res.data.recentOrderAmount,
                        orders: res.data.orderResponse
                    });
                }
                else {
                    that.setData({
                        isNoData: true,
                        orders: null,
                        recentOrderAmount: 0
                    });
                }
            }
        }, function (err) {
            that.setData({
                isNoData: true,
                orders: null,
                recentOrderAmount: 0
            });
        });
    },
    selectTab: function (e) {
        var index = e.currentTarget.dataset.index * 1;
        if (this.data.tabIndex != index) {
            this.setData({tabIndex: index});
            this.findAllLeaseOrder(index);
        }
    },
    view: function (e) {
        var orderId = e.currentTarget.dataset.orderid;
        wx.navigateTo({
            url: '/pages/bill/detail?key=billView&orderId=' + orderId
        });
    },
    createStage: function (e) {
        var orderId = e.currentTarget.dataset.orderid;
        wx.navigateTo({
            url: '/pages/bill/detail?key=recognitionface&orderId=' + orderId
        });
    },
    createTransaction: function (e) {
        var orderId = e.currentTarget.dataset.orderid;
        wx.navigateTo({
            url: '/pages/bill/wxpay?orderId=' + orderId
        });
    }
})