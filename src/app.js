//app.js
App({
    setStorageSync: function (key, value) {
        wx.setStorageSync(key, value);
    },
    getStorageSync: function (key) {
        return wx.getStorageSync(key);
    },
    removeStorageSync: function (key) {
        wx.removeStorageSync(key);
    },
    postRequest: function (apiUrl, data, cbSuccess, cbfail) {
        var auth = this.getStorageSync("X-KC-SID");
        wx.request({
            url: apiUrl,
            data: data,
            header: {
                "Content-Type": "application/json;charset=utf-8",
                "X-KC-SID": auth
            },
            method: "POST",
            success: function (res) {
                if (res.statusCode == 200) {
                    typeof cbSuccess == "function" && cbSuccess(res.data);
                }
                else {
                    if (res.statusCode == 401) {
                        wx.navigateTo({url: 'login'});
                    } else if (res.statusCode == 400) {
                        wx.showToast({
                            title: res.data.message,
                            image: "/images/err.png",
                            duration: 2000
                        });
                    }
                    else if (res.statusCode == 403) {
                        wx.showToast({
                            title: "无操作权限,请联系客服",
                            image: "/images/err.png",
                            duration: 2000
                        });
                    }
                    else {
                        wx.showToast({
                            title: "服务正在维护,请稍后",
                            image: "/images/err.png",
                            duration: 2000
                        });
                    }
                    typeof cbfail == "function" && cbfail(res);
                }
            },
            fail: function () {
                wx.showToast({
                    title: "网络链接异常,请稍后",
                    image: "/images/err.png",
                    duration: 2000
                });
            }
        });
    },

    getRequest: function (apiUrl, cbSuccess, cbfail) {
        var auth = this.getStorageSync("X-KC-SID");
        wx.request({
            url: apiUrl,
            header: {
                "Content-Type": "application/json;charset=utf-8",
                "X-KC-SID": auth
            },
            method: "GET",
            success: function (res) {
                if (res.statusCode == 200) {
                    typeof cbSuccess == "function" && cbSuccess(res.data);
                }
                else {
                    if (res.statusCode == 401) {
                        wx.navigateTo({url: 'login'});
                    } else if (res.statusCode == 400) {
                        wx.showToast({
                            title: res.data.message,
                            image: "/images/err.png",
                            duration: 2000
                        });
                    }
                    else if (res.statusCode == 403) {
                        wx.showToast({
                            title: "无操作权限,请联系客服",
                            image: "/images/err.png",
                            duration: 2000
                        });
                    }
                    else {
                        wx.showToast({
                            title: "服务正在维护,请稍后",
                            image: "/images/err.png",
                            duration: 2000
                        });
                    }
                    typeof cbfail == "function" && cbfail(res);
                }
            },
            fail: function () {
                wx.showToast({
                    title: "网络链接异常,请稍后",
                    image: "/images/err.png",
                    duration: 2000
                });
            }
        });
    },

    postUploadFile: function (apiUrl, filePath, cbSuccess) {
        wx.uploadFile({
            url: apiUrl,
            filePath: filePath,
            name: 'file',
            success: function (res) {
                if (res.statusCode === 200) {
                    typeof cbSuccess == "function" && cbSuccess(JSON.parse(res.data)[0]);
                }
                else {
                    var errInfo = JSON.parse(res.data);
                    wx.showToast({
                        title: errInfo.message,
                        image: "/images/err.png",
                        duration: 2000
                    });
                }
            },
            fail: function (err) {
                wx.showToast({
                    title: err.errMsg,
                    image: "/images/err.png",
                    duration: 2000
                });
            }
        });
    },

    stringFormat: function () {
        if (arguments.length == 0)
            return null;
        var str = arguments[0];
        for (var i = 1; i < arguments.length; i++) {
            var re = new RegExp('\\{' + (i - 1) + '\\}', 'gm');
            str = str.replace(re, arguments[i]);
        }
        return str;
    }
});