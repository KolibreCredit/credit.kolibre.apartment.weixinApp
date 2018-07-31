// pages/user/detail.js
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
        if (options.key == "editorMobile2") {
            this.setData({
                detailWebAppUrl: "https://h.fengniaowu.com/editorMobile2.html"
            });
        }
        else if (options.key == "credit") {
            this.setData({
                detailWebAppUrl: "https://h.fengniaowu.com/credit.html"
            });
        }
        else if (options.key == "photo") {
            this.setData({
                detailWebAppUrl: "https://h.fengniaowu.com/photo.html"
            });
        }
        else if (options.key == "resetPassword") {
            this.setData({
                detailWebAppUrl: "https://h.fengniaowu.com/resetPassword.html"
            });
        }
        else if (options.key == "verify") {
            this.setData({
                detailWebAppUrl: "https://h.fengniaowu.com/verify.html"
            });
        }
        else if (options.key == "editorMobile") {
            this.setData({
                detailWebAppUrl: "https://h.fengniaowu.com/editorMobile.html"
            });
        }
    }
})