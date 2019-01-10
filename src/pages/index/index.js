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

Page({
    /**
     * 页面的初始数据
     */
    data: {
        tabbar: null,
        assetTenancyId: "",
        isbg: true,
        tabIndex: -1,
        isFilter: false,
        modelIndex: 0,
        isSources: true,
        isError: false,
        districts: null,
        areas: null,
        apartments: null,
        filterApartments: null,
        filterRooms: null,
        prices: ["不限", "2000元以下", " 2000-3000元", " 3000-4000元", "4000-5000元", "  5000-6000元", "6000元以上"],
        sorts: ["推荐", "最新发布", "价格升序", "价格降序", "面积升序", "面积降序"],
        searchIndex0: -1,
        cityName: "",
        searchIndex1: -1,
        districtName: "",
        searchIndex2: -1,
        searchIndex3: -1,
        searchIndex4: -1,
        searchIndex5: -1,
        query: null,
        hasNextPage: false
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        var assetTenancyId = options.assetTenancyId || "";
        if (assetTenancyId != "") {
            app.setStorageSync("assetTenancyId", assetTenancyId);
        } else {
            assetTenancyId = app.getStorageSync("assetTenancyId") || "";
        }
        //
        this.setData({assetTenancyId: assetTenancyId});
        var that = this;
        app.getInvoke(config.URLS.GETROOMSOURCEFILTERINFO + assetTenancyId, function (res) {
            if (res.succeeded) {
                that.setData({
                    districts: [{city: "不限", areas: []}].concat(res.data.districts),
                    apartments: res.data.apartments,
                    filterApartments: res.data.apartments
                });
            }
        }, function (err) {
            mui.toast(err.message);
        });
        this.filterRoomSource();
    },
    onShow: function () {
        var that = this;
        tabbar.index = 0;
        app.getInvoke2(config.URLS.GETUNCONFIRMEDCONTRACTCOUNT, function (res) {
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
    upper: function (e) {
        this.setData({
            isbg: true
        });
    },
    lower: function (e) {
        if (this.data.hasNextPage) {
            var query = this.data.query;
            query.pageIndex = this.data.pageIndex + 1;
            var that = this;
            app.postInvoke(config.URLS.GETROOMSOURCEINFOS, query, function (res) {
                that.setData({
                    filterRooms: that.data.filterRooms.concat(res.data.data),
                    hasNextPage: res.data.hasNextPage,
                    pageIndex: res.data.pageIndex
                });
            });
        }
    },
    scroll: function (e) {
        if (this.data.isbg && e.detail.scrollTop >= 180) {
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
    filterRoomSource: function () {
        var minRetail = 0;
        var maxRetail = 9999999;
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
        var sortKey = (this.data.searchIndex3 == -1 ? "" : this.data.sorts[this.data.searchIndex3]);
        var orderByString = "";
        if (sortKey == "价格升序") {
            orderByString = "RetailPrice";
        }
        else if (sortKey == "价格降序") {
            orderByString = "RetailPrice DESC";
        }
        else if (sortKey == "面积升序") {
            orderByString = "RoomTypeSize";
        }
        else if (sortKey == "面积降序") {
            orderByString = "RoomTypeSize DESC";
        }
        var apartmentName = "";
        if (this.data.searchIndex4 != -1) {
            apartmentName = this.data.filterApartments[this.data.searchIndex4].apartmentName;
        }
        if (this.data.searchIndex5 != -1) {
            apartmentName = this.data.filterApartments[this.data.searchIndex5].apartmentName;
        }
        var query = {
            pageIndex: 0,
            pageSize: 10,
            assetTenancyId: this.data.assetTenancyId,
            cityName: this.data.cityName,
            districtName: this.data.districtName,
            apartmentName: apartmentName,
            retailPriceMin: minRetail * 100,
            retailPriceMax: maxRetail * 100,
            orderByString: orderByString
        };
        var that = this;
        app.postInvoke(config.URLS.GETROOMSOURCEINFOS, query, function (res) {
            if (res.succeeded && res.data.data.length > 0) {
                that.setData({
                    filterRooms: res.data.data,
                    hasNextPage: res.data.hasNextPage,
                    pageIndex: res.data.pageIndex,
                    query: query,
                    isSources: true,
                    isError: false
                });
            } else {
                that.setData({
                    isSources: false,
                    isError: true
                });
            }
        }, function (err) {
            that.setData({
                isSources: false,
                isError: true
            });
            mui.toast(err.message);
        });
    },
    searchFilter0: function (e) {
        var index = e.currentTarget.dataset.index * 1;
        this.setData({
            searchIndex0: index,
            isFilter: (index == 0 ? false : true),
            areas: (index == 0 ? null : [{areaName: "不限"}].concat(this.data.districts[index].areas)),
            cityName: (index == 0 ? "" : this.data.districts[index].city),
            searchIndex1: -1,
            districtName: "",
            tabIndex: (index == 0 ? -1 : this.data.tabIndex)
        });
        if (index == 0) {
            this.setData({
                filterApartments: this.data.apartments,
                searchIndex4: -1,
                searchIndex5: -1,
            });
            this.filterRoomSource();
        }
    },
    searchFilter1: function (e) {
        var index = e.currentTarget.dataset.index * 1;
        var districtName = (index == 0 ? "" : this.data.areas[index].areaName);
        this.setData({
            searchIndex1: index,
            districtName: districtName,
            isFilter: false,
            tabIndex: -1
        });
        var arrApartments = [];
        var apartment = null;
        for (var i = 0; i < this.data.apartments.length; i++) {
            apartment = this.data.apartments[i];
            if (index == 0) {
                if (apartment.cityName == this.data.cityName) {
                    arrApartments.push(apartment);
                }
            } else {
                if (apartment.cityName == this.data.cityName && apartment.districtName == districtName) {
                    arrApartments.push(apartment);
                }
            }
        }
        this.setData({
            filterApartments: arrApartments,
            searchIndex4: -1,
            searchIndex5: -1
        });
        this.filterRoomSource();
    },
    searchFilter2: function (e) {
        var index = e.currentTarget.dataset.index * 1;
        index = (index == 0 ? -1 : index);
        this.setData({
            searchIndex2: index,
            isFilter: false,
            tabIndex: -1
        });
        this.filterRoomSource();
    },
    searchFilter3: function (e) {
        var index = e.currentTarget.dataset.index * 1;
        index = (index == 0 ? -1 : index);
        this.setData({
            searchIndex3: index,
            isFilter: false,
            tabIndex: -1
        });
        this.filterRoomSource();
    },
    searchFilter4: function (e) {
        var index = e.currentTarget.dataset.index * 1;
        this.setData({
            searchIndex4: (this.data.searchIndex4 == index ? -1 : index),
            searchIndex5: -1
        });
        this.filterRoomSource();
    },
    searchFilter5: function (e) {
        var index = e.currentTarget.dataset.index * 1;
        this.setData({
            searchIndex4: -1,
            searchIndex5: (this.data.searchIndex5 == index ? -1 : index),
            isFilter: false
        });
        this.filterRoomSource();
    },
    hideFilter: function (e) {
        this.setData({
            isFilter: false,
            tabIndex: -1
        });
    },
    detail2: function (e) {
        var roomId = e.currentTarget.dataset.roomid;
        wx.navigateTo({
            url: '/pages/index/detail?roomId=' + roomId
        });
    }
})