// pages/index/index.js
const tabbar = require('../tabbar');
const config = require('../../config');
const app = getApp();
const $toast = require('../../utils/showToast');
const mui = {
    toast: function (title) {
        $toast.showToast({
            title: title,
            mask: false
        });
    }
};

const compare = function (property, rule) {
    return function (item1, item2) {
        if (property == "publishTime") {
            var value1 = new Date(item1[property]);
            var value2 = new Date(item2[property]);
            return rule == "asc" ? (value1 - value2) : (value2 - value1);
        } else {
            var value1 = item1[property];
            var value2 = item2[property];
            return rule == "asc" ? (value1 - value2) : (value2 - value1);
        }
    }
};
Page({
    /**
     * 页面的初始数据
     */
    data: {
        tabbar: null,
        isbg: true,
        tabIndex: -1,
        isFilter: false,
        modelIndex: 0,
        roomSources: null,
        prices: ["不限", "2000元以下", " 2000-3000元", " 3000-4000元", "4000-5000元", "  5000-6000元", "6000元以上"],
        sorts: ["推荐", "最新发布", "价格升序", "价格降序", "面积升序", "面积降序"],
        searchIndex0: -1,
        searchIndex1: -1,
        searchIndex2: -1,
        searchIndex3: -1,
        searchIndex4: -1
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        tabbar.index = 0;
        this.setData({
            tabbar: tabbar
        });
        var tenancyId = "13EABF152B724338A3DE9A6C598EC95A";
        var forceRefresh = true;
        var data = {
            tenancyId: tenancyId,
            forceRefresh: forceRefresh
        };
        var that = this;
        app.postRequest(config.URLS.GETROOMSOURCES, data, function (res) {
            if (res.succeeded) {
                var resRoomSources = res.data;
                resRoomSources.cities = ["不限"].concat(resRoomSources.cities);
                resRoomSources.districts = ["不限"].concat(resRoomSources.districts);
                that.setData({roomSources: resRoomSources});
            }
        }, function (err) {
            mui.toast(err.message);
        });
    },
    upper: function (e) {
         this.setData({
           isbg: true
       });
    },
    scroll: function (e) {
           if (this.data.isbg && e.detail.scrollTop > 180) {
               this.setData({
                   isbg: false
               });
           }
    },
    tabItem: function (e) {
        this.setData({
            tabIndex: e.currentTarget.dataset.index * 1,
            isFilter: true
        });
    },
    tabModel: function (e) {
        this.setData({
            tabIndex: -1,
            modelIndex: e.currentTarget.dataset.index * 1
        });
    },
    searchFilter0: function (e) {
        var index = e.currentTarget.dataset.index * 1;
        index = (index == 0 ? -1 : index);
        this.setData({
            searchIndex0: index,
            isFilter: false
        });
    },
    searchFilter1: function (e) {
        var index = e.currentTarget.dataset.index * 1;
        index = (index == 0 ? -1 : index);
        this.setData({
            searchIndex1: index,
            isFilter: false
        });
    },
    searchFilter2: function (e) {
        var index = e.currentTarget.dataset.index * 1;
        index = (index == 0 ? -1 : index);
        this.setData({
            searchIndex2: index,
            isFilter: false
        });
    },
    searchFilter3: function (e) {
        var index = e.currentTarget.dataset.index * 1;
        index = (index == 0 ? -1 : index);
        this.setData({
            searchIndex3: index,
            isFilter: false
        });
    },
    searchFilter4: function (e) {
        var index = e.currentTarget.dataset.index * 1;
        this.setData({
            searchIndex4: index
        });
    }
})