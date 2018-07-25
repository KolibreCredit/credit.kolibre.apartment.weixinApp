// pages/bill/detail.js
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
        var key = options.key;
        if (key == "billView") {
            this.setData({
                detailWebAppUrl: "http://h.fengniaowu.com/billView.html?orderId=" + options.orderId
            });
        } else if (key == "recognitionface") {
            this.setData({
                detailWebAppUrl: "http://h.fengniaowu.com/recognitionface.html?orderId=" + options.orderId
            });
        }
        else if (key == "apppay") {
            this.setData({
                detailWebAppUrl: "http://h.fengniaowu.com/apppay.html?orderId=" + options.orderId
            });
        }
    }
})