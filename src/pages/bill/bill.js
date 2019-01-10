// pages/bill/bill.js
const tabbar = require('../tabbar');
const constants = require('../../config');
const app = getApp();
Page({
    /**
     * 页面的初始数据
     */
    data: {
        tabbar: null,
        tabIndex: 0,
        isNoData: false,
        recentDays: 15,
        recentOrderAmount: -1,
        orders: null,
        isMsgAlert: false
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

    },
    onShow: function () {
        this.findAllLeaseOrder();
        var that = this;
        tabbar.index = 2;
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
    findAllLeaseOrder: function () {
        var that = this;
        var orderState = (this.data.tabIndex == 0 ? "NotPaid" : "Paid");
        app.getInvoke((constants.URLS.QUERYALLORDERS + orderState), function (res) {
            if (res.succeeded) {
                if (res.data.orderResponse.length > 0) {
                    that.setData({
                        recentDays: res.data.recentDays,
                        recentOrderAmount: (orderState == "Paid" ? -1 : res.data.recentOrderAmount),
                        orders: res.data.orderResponse,
                        isNoData: false
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
            this.setData({
                tabIndex: index
            });
            this.findAllLeaseOrder();
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
        var billLists = this.data.orders;
        var filterCanPay = function (orderId) {
            var canPay = false;
            for (var i = 0; i < billLists.length; i++) {
                if (billLists[i].orderId == orderId) {
                    canPay = billLists[i].canPay;
                    break;
                }
            }
            return canPay;
        }
        if (filterCanPay(orderId)) {
            wx.navigateTo({
                url: '/pages/bill/wxpay?goto=minibill&orderId=' + orderId
            });
        } else {
            this.setData({
                isMsgAlert: true
            });
        }
    },
    closeApply: function (e) {
        this.setData({
            isMsgAlert: false
        });
    },
    confirmList: function (e) {
        this.setData({
            isMsgAlert: false
        });
        setTimeout(function () {
            wx.reLaunch({
                url: '/pages/list/list'
            });
        }, 100);
    }
})