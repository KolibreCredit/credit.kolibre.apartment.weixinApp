// pages/list/detail.js
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
        if (options.key == "confirmed") {
            this.setData({
                detailWebAppUrl: app.baseUrl + "view.html?confirmed=0&contractId=" + options.contractId
            });
        } else if (options.key == "view") {
            this.setData({
                detailWebAppUrl: app.baseUrl + "view.html?contractId=" + options.contractId
            });
        }
        else if (options.key == "recognitionface") {
            this.setData({
                detailWebAppUrl: app.baseUrl + "recognitionface.html?contractId=" + options.contractId
            });
        }
        else if (options.key == "lease") {
            this.setData({
                detailWebAppUrl: app.baseUrl + "lease.html?contractId=" + options.contractId
            });
        }
    }
})