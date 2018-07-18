Component({
    /**
     * 组件的属性列表
     */
    properties: {
        data: {
            type: Object,
            value: {}
        }
    },
    /**
     * 组件的方法列表
     */
    methods: {
        change: function (e) {
            var index = e.currentTarget.dataset.index * 1;
            if (index == 0) {
                wx.navigateTo({
                    url: '/pages/index/index'
                });
            }
            else if (index == 1) {
                wx.navigateTo({
                    url: '/pages/lease/lease'
                });
            }
            else if (index == 2) {
                wx.navigateTo({
                    url: '/pages/bill/bill'
                });
            }
            else if (index == 3) {
                wx.navigateTo({
                    url: '/pages/service/service'
                });
            }
            else {
                wx.navigateTo({
                    url: '/pages/user/user'
                });
            }
        }
    }
})