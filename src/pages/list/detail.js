// pages/list/detail.js
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
        if (options.key == "confirmed") {
            this.setData({
                detailWebAppUrl: "http://h.fengniaowu.com/view.html?confirmed=0&contractId=" + options.contractId
            });
        } else if (options.key == "view") {
            this.setData({
                detailWebAppUrl: "http://h.fengniaowu.com/view.html?contractId=" + options.contractId
            });
        }
        else if (options.key == "recognitionface") {
            this.setData({
                detailWebAppUrl: "http://h.fengniaowu.com/recognitionface.html?contractId=" + options.contractId
            });
        }
        else if (options.key == "lease") {
            this.setData({
                detailWebAppUrl: "http://h.fengniaowu.com/lease.html?contractId=" + options.contractId
            });
        }
    }
})