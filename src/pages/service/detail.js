// pages/service/detail.js
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
        if (key == "list2") {
            this.setData({
                detailWebAppUrl: app.baseUrl + "list2.html?tabIndex=" + options.tabIndex
            });
        }
        else if (key == "viewbaoji") {
            this.setData({
                detailWebAppUrl: app.baseUrl + "viewbaoji.html?cleaningId=" + options.cleaningId
            });
        }
        else if (key == "viewbaoxiu") {
            this.setData({
                detailWebAppUrl: app.baseUrl + "viewbaoxiu.html?repairId=" + options.repairId
            });
        }
        else if (key == "viewtousu") {
            this.setData({
                detailWebAppUrl: app.baseUrl + "viewtousu.html?complaintSuggestionId=" + options.complaintSuggestionId
            });
        }
    }
})