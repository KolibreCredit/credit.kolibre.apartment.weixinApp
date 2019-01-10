//app.js
App({
    baseUrl: "https://h.fengniaowu.com/",
    setStorageSync: function (key, value) {
        wx.setStorageSync(key, value);
    },
    getStorageSync: function (key) {
        return wx.getStorageSync(key);
    },
    removeStorageSync: function (key) {
        wx.removeStorageSync(key);
    },
    postInvoke: function (apiUrl, data, cbSuccess, cbfail) {
        var auth = this.getStorageSync("X-KC-SID");
        wx.request({
            url: apiUrl,
            data: data,
            header: {
                "Content-Type": "application/json;charset=utf-8",
                "X-KC-SID": auth
            },
            method: "POST",
            success: function (wxRes) {
                var res = wxRes.data;
                if (res.succeeded) {
                    typeof cbSuccess == "function" && cbSuccess(res);
                } else {
                    if (res.code == 130078401) {
                        wx.navigateTo({url: '/pages/user/login'});
                    }
                    else {
                        typeof cbfail == "function" && cbfail(res);
                    }
                }
            },
            fail: function () {
                cbfail({succeeded: false, message: "网络链接异常,请稍后"});
            }
        });
    },
    getInvoke: function (apiUrl, cbSuccess, cbfail) {
        var auth = this.getStorageSync("X-KC-SID");
        wx.request({
            url: apiUrl,
            header: {
                "Content-Type": "application/json;charset=utf-8",
                "X-KC-SID": auth
            },
            method: "GET",
            success: function (wxRes) {
                var res = wxRes.data;
                if (res.succeeded) {
                    typeof cbSuccess == "function" && cbSuccess(res);
                } else {
                    if (res.code == 130078401) {
                        wx.navigateTo({url: '/pages/user/login'});
                    }
                    else {
                        typeof cbfail == "function" && cbfail(res);
                    }
                }
            },
            fail: function () {
                cbfail({succeeded: false, message: "网络链接异常,请稍后"});
            }
        });
    },
    getInvoke2: function (apiUrl, cbSuccess) {
        var auth = this.getStorageSync("X-KC-SID");
        wx.request({
            url: apiUrl,
            header: {
                "Content-Type": "application/json;charset=utf-8",
                "X-KC-SID": auth
            },
            method: "GET",
            success: function (wxRes) {
                var res = wxRes.data;
                if (res.succeeded) {
                    typeof cbSuccess == "function" && cbSuccess(res);
                } else {
                    typeof cbSuccess == "function" && cbSuccess(res);
                }
            },
            fail: function () {
                cbSuccess({succeeded: false, message: "网络链接异常,请稍后"});
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
                    cbfail({succeeded: false, message: errInfo.message});
                }
            },
            fail: function (err) {
                cbfail({succeeded: false, message: "网络链接异常,请稍后"});
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