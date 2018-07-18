// pages/index/index.js
let tabbar = require('../tabbar');
Page({
    /**
     * 页面的初始数据
     */
    data: {
        tabbar: null,
        isbg: true,
        tabIndex: -1,
        modelIndex: 0
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        tabbar.index = 0;
        this.setData({
            tabbar: tabbar
        });
    },
    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {

    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function () {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function () {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function () {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    },
    upper: function (e) {
         /*  this.setData({
            isbg: true
        });*/
    },
    scroll: function (e) {
     /*   if (this.data.isbg && e.detail.scrollTop > 180) {
            this.setData({
                isbg: false
            });
        }*/
    },
    tabItem: function (e) {
        this.setData({
            tabIndex: e.currentTarget.dataset.index * 1
        });
    },
    tabModel: function (e) {
        this.setData({
            modelIndex: e.currentTarget.dataset.index * 1
        });
    }
})