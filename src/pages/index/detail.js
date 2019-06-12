// pages/index/detail.js
const app = getApp();
Page({
    /**
     * 页面的初始数据
     */
    data: {
        detailWebAppUrl: ""
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        wx.showShareMenu({
            withShareTicket: true
        });
        this.setData({
            detailWebAppUrl: app.baseUrl + "detail2.html?roomId=" + options.roomId
        });
    }
})