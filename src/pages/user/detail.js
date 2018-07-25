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
                detailWebAppUrl: "http://h.fengniaowu.com/editorMobile2.html"
            });
        } else if (options.key == "list") {
            this.setData({
                detailWebAppUrl: "http://h.fengniaowu.com/list.html"
            });
        }
        else if (options.key == "bill") {
            this.setData({
                detailWebAppUrl: "http://h.fengniaowu.com/bill.html"
            });
        }
        else if (options.key == "credit") {
            this.setData({
                detailWebAppUrl: "http://h.fengniaowu.com/credit.html"
            });
        }
        else if (options.key == "fuwu") {
            this.setData({
                detailWebAppUrl: "http://h.fengniaowu.com/fuwu.html"
            });
        }
        else if (options.key == "user1") {
            this.setData({
                detailWebAppUrl: "http://h.fengniaowu.com/user1.html"
            });
        }
        else if (options.key == "resetPassword") {
            this.setData({
                detailWebAppUrl: "http://h.fengniaowu.com/resetPassword.html"
            });
        }
    }
})