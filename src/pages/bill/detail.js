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
                detailWebAppUrl: "https://h.fengniaowu.com/billView.html?orderId=" + options.orderId
            });
        } else if (key == "recognitionface") {
            this.setData({
                detailWebAppUrl: "https://h.fengniaowu.com/recognitionface.html?orderId=" + options.orderId
            });
        }
        else if (key == "precreate") {
            var transactionId = options.transactionId;
            var amount = options.amount;
            var paymentTime = options.paymentTime;
            this.setData({
                detailWebAppUrl: "https://h.fengniaowu.com/precreate.html?transactionId=" + transactionId + "&amount=" + amount + "&paymentTime=" + paymentTime
            });
        }
    }
})