// pages/user/user.js
const tabbar = require('../tabbar');
const constants = require('../../config');
const app = getApp();
var wxStar = require('../../utils/wxStar');
Page({
    /**
     * 页面的初始数据
     */
    data: {
        tabbar: null,
        tenant: null,
        unConfirmedContractCount: 0
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        tabbar.index = 4;
        this.setData({
            tabbar: tabbar
        });
    },
    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {
        var that = this;
        app.getInvoke(constants.URLS.GETCURRENTTENANT, function (res) {
            if (res.succeeded) {
                wxStar.wxStar(that, res.data.creditRating, true);
                that.setData({tenant: res.data});
            }
        });
        app.getInvoke(constants.URLS.GETUNCONFIRMEDCONTRACTCOUNT, function (res) {
            if (res.succeeded) {
                if (res.data > 0) {
                    that.setData({unConfirmedContractCount: res.data});
                }
            }
        });
    },
    list: function (e) {
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
    }
})