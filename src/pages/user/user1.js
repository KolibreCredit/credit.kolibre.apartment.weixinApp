// pages/user/user1.js
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
        hasInfo: false
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
        app.getInvoke(constants.URLS.GETCURRENTTENANT, function (res) {
            if (res.succeeded) {
                that.setData({
                    hasInfo: res.data.hasInfo
                });
            }
        });
    },
    photo: function (e) {
        wx.navigateTo({
            url: '/pages/user/detail?key=photo'
        });
    },
    verify: function (e) {
        wx.navigateTo({
            url: '/pages/user/detail?key=verify'
        });
    },
    resetPassword: function (e) {
        wx.navigateTo({
            url: '/pages/user/detail?key=resetPassword'
        });
    },
    editorMobile: function (e) {
        wx.navigateTo({
            url: '/pages/user/detail?key=editorMobile'
        });
    },
    loginOut: function (e) {
        app.removeStorageSync("X-KC-SID");
        mui.toast(constants.msgInfo.loginOut);
        setTimeout(function () {
            wx.reLaunch({
                url: '/pages/index/index'
            });
        },1000);
    }
})