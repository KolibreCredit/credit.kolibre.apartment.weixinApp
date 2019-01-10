// pages/service/service.js
const tabbar = require('../tabbar');
const constants = require('../../config');
const app = getApp();
Page({
    /**
     * 页面的初始数据
     */
    data: {
        tabbar: null,
        isNoData: false,
        tabIndex: 0,
        cleanings: null,
        repairs: null,
        complaintSuggestions: null
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        var that = this;
        tabbar.index = 3;
        app.getInvoke2(constants.URLS.GETUNCONFIRMEDCONTRACTCOUNT, function (res) {
            if (res.succeeded) {
                if (res.data > 0) {
                    tabbar.list[1].iconPath = "/images/tabBar/zuyus.png";
                    tabbar.list[1].selectedIconPath = "/images/tabBar/zuyus_active.png";
                }
            }
            that.setData({
                tabbar: tabbar
            });
        });
    },
    onShow: function () {
        this.getTenantCleanings();
    },
    selectTab: function (e) {
        var index = e.currentTarget.dataset.index * 1;
        if (this.data.tabIndex != index) {
            this.setData({tabIndex: index});
            if (index == 0) {
                this.getTenantCleanings();
            }
            else if (index == 1) {
                this.getTenantRepairs();
            }
            else {
                this.getTenantComplaintSuggestions();
            }
        }
    },
    list2: function (e) {
        var index = e.currentTarget.dataset.index;
        wx.navigateTo({
            url: '/pages/service/detail?key=list2&tabIndex=' + index
        });
    },
    getTenantCleanings: function () {
        var that = this;
        app.getInvoke(constants.URLS.GETTENANTCLEANINGS, function (res) {
            if (res.succeeded) {
                if (res.data.length == 0) {
                    that.setData({
                        isNoData: true,
                        cleanings: null
                    });
                } else {
                    that.setData({
                        isNoData: false,
                        cleanings: res.data
                    });
                }
            }
        }, function (err) {
            that.setData({
                isNoData: true,
                cleanings: null
            });
            console.log(err.message);
        });
    },
    viewCleanings: function (e) {
        var cleaningid = e.currentTarget.dataset.cleaningid;
        wx.navigateTo({
            url: '/pages/service/detail?key=viewbaoji&cleaningId=' + cleaningid
        });
    },
    getTenantRepairs: function () {
        var that = this;
        app.getInvoke(constants.URLS.GETTENANTREPAIRS, function (res) {
            if (res.succeeded) {
                if (res.data.length == 0) {
                    that.setData({
                        isNoData: true,
                        repairs: null
                    });
                } else {
                    that.setData({
                        isNoData: false,
                        repairs: res.data
                    });
                }
            }
        }, function (err) {
            that.setData({
                isNoData: true,
                repairs: null
            });
            console.log(err.message);
        });
    },
    viewRepair: function (e) {
        var repairId = e.currentTarget.dataset.repairid;
        wx.navigateTo({
            url: '/pages/service/detail?key=viewbaoxiu&repairId=' + repairId
        });
    },
    getTenantComplaintSuggestions: function () {
        var that = this;
        app.getInvoke(constants.URLS.GETTENANTCOMPLAINTSUGGESTIONS, function (res) {
            if (res.succeeded) {
                if (res.data.length == 0) {
                    that.setData({
                        isNoData: true,
                        complaintSuggestions: null
                    });
                } else {
                    that.setData({
                        isNoData: false,
                        complaintSuggestions: res.data
                    });
                }
            }
        }, function (err) {
            that.setData({
                isNoData: true,
                complaintSuggestions: null
            });
            console.log(err.message);
        });
    },
    viewTousu: function (e) {
        var complaintSuggestionId = e.currentTarget.dataset.complaintsuggestionid;
        wx.navigateTo({
            url: '/pages/service/detail?key=viewtousu&complaintSuggestionId=' + complaintSuggestionId
        });
    }
})