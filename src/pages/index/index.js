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
        isSources: false,
        cities: null,
        districts: null,
        apartments: null,
        rooms: null,
        filterRooms: null,
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
                that.setData({
                    cities: ["不限"].concat(res.data.cities),
                    districts: ["不限"].concat(res.data.districts),
                    apartments: res.data.apartments,
                    rooms: res.data.rooms,
                    filterRooms: res.data.rooms,
                    isSources: true
                });
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
    filterRoomsData: function () {
        var cityKey = (this.data.searchIndex0 == -1 ? "" : this.data.cities[this.data.searchIndex0]);
        var districtKey = (this.data.searchIndex1 == -1 ? "" : this.data.districts[this.data.searchIndex1]);
        var minRetail = 0;
        var maxRetail = 0;
        var retailKey = (this.data.searchIndex2 == -1 ? "" : this.data.prices[this.data.searchIndex2]);
        if (retailKey != "") {
            if (retailKey.indexOf("以下") != -1) {
                minRetail = 0;
                maxRetail = parseInt(retailKey.replace("元以下", "").trim());
            }
            else if (retailKey.indexOf("以上") != -1) {
                minRetail = parseInt(retailKey.replace("元以上", "").trim());
                maxRetail = 10000000;
            } else {
                minRetail = parseInt(retailKey.split("-")[0]);
                maxRetail = parseInt(retailKey.split("-")[1].replace("元", "").trim())
            }
        }
        var apartmentName = (this.data.searchIndex4 == -1 ? "" : this.data.apartments[this.data.searchIndex4]);
        var rooms = this.data.rooms;
        var arrayItems = [];
        for (var i = 0; i < rooms.length; i++) {
            if (cityKey != "" && rooms[i].cityName != cityKey) {
                continue;
            }
            if (districtKey != "" && rooms[i].districtName != districtKey) {
                continue;
            }
            if (apartmentName != "" && rooms[i].apartmentName != apartmentName) {
                continue;
            }
            if (retailKey != "") {
                if ((rooms[i].retailPrice * 0.01) >= minRetail && (rooms[i].retailPrice * 0.01) <= maxRetail) {
                    arrayItems.push(rooms[i]);
                }
            } else {
                arrayItems.push(rooms[i]);
            }
        }
        var sortKey = (this.data.searchIndex3 == -1 ? "" : this.data.sorts[this.data.searchIndex3]);
        if (sortKey == "最新发布") {
            arrayItems.sort(compare("publishTime", "desc"));
        }
        else if (sortKey == "价格升序") {
            arrayItems.sort(compare("retailPrice", "asc"));
        }
        else if (sortKey == "价格降序") {
            arrayItems.sort(compare("retailPrice", "desc"));
        }
        else if (sortKey == "面积升序") {
            arrayItems.sort(compare("roomTypeSize", "asc"));
        }
        if (sortKey == "面积降序") {
            arrayItems.sort(compare("roomTypeSize", "desc"));
        }
        this.setData({filterRooms: arrayItems});
    },
    searchFilter0: function (e) {
        var index = e.currentTarget.dataset.index * 1;
        index = (index == 0 ? -1 : index);
        this.setData({
            searchIndex0: index,
            isFilter: false
        });
        this.filterRoomsData();
    },
    searchFilter1: function (e) {
        var index = e.currentTarget.dataset.index * 1;
        index = (index == 0 ? -1 : index);
        this.setData({
            searchIndex1: index,
            isFilter: false
        });
        this.filterRoomsData();
    },
    searchFilter2: function (e) {
        var index = e.currentTarget.dataset.index * 1;
        index = (index == 0 ? -1 : index);
        this.setData({
            searchIndex2: index,
            isFilter: false
        });
        this.filterRoomsData();
    },
    searchFilter3: function (e) {
        var index = e.currentTarget.dataset.index * 1;
        index = (index == 0 ? -1 : index);
        this.setData({
            searchIndex3: index,
            isFilter: false
        });
        this.filterRoomsData();
    },
    searchFilter4: function (e) {
        var index = e.currentTarget.dataset.index * 1;
        this.setData({
            searchIndex4: (this.data.searchIndex4 == index ? -1 : index)
        });
        this.filterRoomsData();
    },
    detail2: function (e) {
        var roomId = e.currentTarget.dataset.roomid;
        wx.navigateTo({
            url: '/pages/index/detail?roomId=' + roomId
        });
    }
})