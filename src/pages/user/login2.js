// pages/user/login2.js
const constants = require('../../config');
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
var isSendCaptcha = true;
var isSendCaptcha2 = true;
var waitTimer = null;
var waitTimer2 = null;
var waitCount2 = 60;

Page({
    /**
     * 页面的初始数据
     */
    data: {
        cellphone: "",
        captcha: "",
        waitCount: 60,
        isVoiceCall: false,
        isLoading: false
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        this.setData({
            cellphone: options.cellphone
        });
        this.sendCaptcha();
    },
    bindKeyInput: function (e) {
        this.setData({
            captcha: e.detail.value
        });
    },
    sendWaitTimer: function (e) {
        var waitCount = this.data.waitCount;
        if (waitCount > 0) {
            waitCount = waitCount - 1;
        } else {
            clearInterval(waitTimer);
            waitCount = 60;
            isSendCaptcha = true;
        }
        if (waitCount == 40) {
            this.setData({
                isVoiceCall: true
            });
        }
        this.setData({waitCount: waitCount});
    },
    sendCaptcha: function (e) {
        if (isSendCaptcha) {
            var businessType = "TenantRegisterOrLogin";
            var data = {
                cellphone: this.data.cellphone,
                businessType: businessType
            };
            isSendCaptcha = false;
            var that = this;
            that.setData({
                waitCount: 60
            });
            waitTimer = setInterval(function () {
                that.sendWaitTimer();
            }, 1000);
            app.postInvoke(constants.URLS.SEND, data, function (res) {
                if (!res.succeeded) {
                    that.setData({waitCount: 0});
                    mui.toast(res.message);
                }
            }, function (res) {
                that.setData({waitCount: 0});
                mui.toast(res.message);
            });
        }
    },
    sendWaitTimer2: function () {
        if (waitCount2 > 0) {
            waitCount2 = waitCount2 - 1;
        } else {
            clearInterval(waitTimer2);
            waitCount2 = 60;
            isSendCaptcha2 = true;
        }
    },
    voiceCallCaptcha: function (e) {
        if (isSendCaptcha2) {
            var businessType = "TenantRegisterOrLogin";
            var data = {
                cellphone: this.data.cellphone,
                businessType: businessType,
                byVoiceCall: true
            };
            var that = this;
            waitTimer2 = setInterval(function () {
                that.sendWaitTimer2();
            }, 1000);
            isSendCaptcha2 = false;
            app.postInvoke(constants.URLS.SEND, data, function (res) {
                console.log(res);
            }, function (err) {
                isSendCaptcha2 = true;
                console.log(err);
            });
        }
    },
    enumLoginState: function (loginState) {
        if (loginState == "PasswordError") {
            mui.toast(constants.msgInfo.loginErr1);
        }
        else if (loginState == "PasswordNotExist") {
            mui.toast(constants.msgInfo.loginErr2);
        }
        else if (loginState == "Locked") {
            mui.toast(constants.msgInfo.loginErr3);
        }
        else {
            mui.toast(constants.msgInfo.loginErr4);
        }
    },
    loginByCaptcha: function (e) {
        var captcha = this.data.captcha;
        if (captcha == '') {
            mui.toast(constants.msgInfo.captcha);
            return false;
        }
        if (!constants.REGEX.CHECKCODE.test(captcha)) {
            mui.toast(constants.msgInfo.captchaerr);
            return false;
        }
        this.setData({isLoading: true});
        var verify = {
            cellphone: this.data.cellphone,
            businessType: "TenantRegisterOrLogin",
            validateCode: captcha
        };
        var that = this;
        app.postInvoke(constants.URLS.VERIFY, verify, function (res) {
            if (res.succeeded) {
                app.postInvoke(constants.URLS.QUICKLOGIN, {authCode: res.data.authCode}, function (res1) {
                    if (res1.succeeded) {
                        that.setData({isLoading: false});
                        if (res1.data.loginState == "Succeed") {
                            app.setStorageSync("X-KC-SID", res1.headers["x-KC-SID"]);
                            mui.toast(constants.msgInfo.loginSuccess);
                            setTimeout(function () {
                                //wx.navigateBack({delta: 1});
                                wx.redirectTo({
                                    url: '/pages/user/detail?key=login'
                                });
                            }, 1000);
                        }
                        else {
                            that.enumLoginState(res1.data.loginState);
                        }
                    } else {
                        that.setData({isLoading: false});
                        mui.toast(res1.message);
                    }
                }, function (err) {
                    that.setData({isLoading: false});
                    mui.toast(err.message);
                });
            } else {
                that.setData({isLoading: false});
                mui.toast(res.message);
            }
        }, function (err) {
            that.setData({isLoading: false});
            mui.toast(err.message);
        });
    }
})