// pages/user/login.js
const constants = require('../../config');
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
        cellphone: ""
    },
    bindKeyInput: function (e) {
        this.setData({
            cellphone: e.detail.value
        });
    },
    loginByCaptcha: function (e) {
        var cellphone = this.data.cellphone;
        if (cellphone == '') {
            mui.toast(constants.msgInfo.phone);
            return false;
        }
        if (!constants.REGEX.CELLPHONE.test(cellphone)) {
            mui.toast(constants.msgInfo.phoneerr);
            return false;
        }
        wx.redirectTo({
            url: '/pages/user/login2?cellphone=' + cellphone
        });
    },
    loginByPassword: function (e) {
        wx.redirectTo({
            url: '/pages/user/login3'
        });
    },
    editorMobile2: function (e) {
        wx.navigateTo({
            url: '/pages/user/detail?key=editorMobile2'
        });
    }
})