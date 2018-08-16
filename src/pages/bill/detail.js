// pages/bill/detail.js
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
        var key = options.key;
        if (key == "billView") {
            this.setData({
                detailWebAppUrl: app.baseUrl + "billView.html?orderId=" + options.orderId
            });
        } else if (key == "recognitionface") {
            this.setData({
                detailWebAppUrl: app.baseUrl + "recognitionface.html?orderId=" + options.orderId
            });
        }
        else if (key == "precreate") {
            var transactionId = options.transactionId;
            var amount = options.amount;
            var paymentTime = options.paymentTime;
            this.setData({
                detailWebAppUrl: app.baseUrl + "precreate.html?transactionId=" + transactionId + "&amount=" + amount + "&paymentTime=" + paymentTime
            });
        }
    }
})