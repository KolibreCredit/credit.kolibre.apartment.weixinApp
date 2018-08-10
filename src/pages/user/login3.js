// pages/user/login3.js
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
Page({
    /**
     * 页面的初始数据
     */
    data: {
        cellphone: "",
        password: "",
        isLoading: false
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {

    },
    bindKeyInput: function (e) {
        var key = e.target.dataset.key;
        if (key == "cellphone") {
            this.setData({
                cellphone: e.detail.value
            });
        } else {
            this.setData({
                password: e.detail.value
            });
        }
    },
    editorMobile2: function (e) {
        wx.navigateTo({
            url: '/pages/user/detail?key=editorMobile2'
        });
    },
    resetPassword: function () {
        wx.navigateTo({
            url: '/pages/user/detail?key=resetPassword'
        });
    },
    loginByCaptcha: function (e) {
        wx.redirectTo({
            url: '/pages/user/login'
        });
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
    loginByPassword: function (e) {
        var cellphone = this.data.cellphone;
        if (cellphone == '') {
            mui.toast(constants.msgInfo.phone);
            return false;
        }
        if (!constants.REGEX.CELLPHONE.test(cellphone)) {
            mui.toast(constants.msgInfo.phoneerr);
            return false;
        }
        var password = this.data.password;
        if (password == '') {
            mui.toast(constants.msgInfo.password);
            return false;
        }
        if (!constants.REGEX.PASSWORD.test(password)) {
            mui.toast(constants.msgInfo.passworderr);
            return false;
        }
        this.setData({isLoading: true});
        var data = {
            loginInfoAccount: cellphone,
            password: password
        };
        var that = this;
        app.postInvoke(constants.URLS.LOGINBYPASSWORD, data, function (res) {
            that.setData({isLoading: false});
            if (res.succeeded) {
                if (res.data.loginState == "Succeed") {
                    app.setStorageSync("X-KC-SID", res.headers["x-KC-SID"]);
                    mui.toast(constants.msgInfo.loginSuccess);
                    setTimeout(function () {
                        wx.navigateBack({delta: 1});
                    }, 1000);
                } else {
                    that.enumLoginState(res.data.loginState);
                }
            } else {
                mui.toast(res.message);
            }
        }, function (res) {
            that.setData({isLoading: false});
            mui.toast(res.message);
        });
    }
})