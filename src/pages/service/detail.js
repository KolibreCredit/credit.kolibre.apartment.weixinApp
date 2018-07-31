// pages/service/detail.js
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
                detailWebAppUrl: "https://h.fengniaowu.com/list2.html?tabIndex=" + options.tabIndex
            });
        }
        else if (key == "viewbaoji") {
            this.setData({
                detailWebAppUrl: "https://h.fengniaowu.com/viewbaoji.html?cleaningId=" + options.cleaningId
            });
        }
        else if (key == "viewbaoxiu") {
            this.setData({
                detailWebAppUrl: "https://h.fengniaowu.com/viewbaoxiu.html?repairId=" + options.repairId
            });
        }
        else if (key == "viewtousu") {
            this.setData({
                detailWebAppUrl: "https://h.fengniaowu.com/viewtousu.html?complaintSuggestionId=" + options.complaintSuggestionId
            });
        }
    }
})