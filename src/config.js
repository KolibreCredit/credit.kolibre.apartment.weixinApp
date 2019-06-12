var config = {
    URLS: {
        GETROOMSOURCEFILTERINFO: "https://kc-talos.fengniaowu.com:4431/api/RoomSource/GetRoomSourceFilterInfo?assetTenancyId=",
        GETROOMSOURCEINFOS: "https://kc-talos.fengniaowu.com:4431/api/RoomSource/GetRoomSourceInfos",
        GETROOMSOURCES: "https://kc-talos.fengniaowu.com:4431/api/Room/GetRoomSources",
        GETCURRENTTENANT: "https://kc-talos.fengniaowu.com:4431/api/Tenant/GetCurrentTenant",
        GETTENANTSTATISTICINFO: "https://kc-talos.fengniaowu.com:4431/api/Tenant/GetTenantStatisticInfo",
        SEND: "https://kc-talos.fengniaowu.com:4431/api/ValidateCode/Send",
        VERIFY: "https://kc-talos.fengniaowu.com:4431/api/ValidateCode/Verify",
        QUICKLOGIN: "https://kc-talos.fengniaowu.com:4431/api/ValidateCodeLogin/Tenant/QuickLogin",
        LOGINBYPASSWORD: "https://kc-talos.fengniaowu.com:4431/api/PasswordLogin/Tenant/Login",
        GETCURRENTCONTRACTS: "https://kc-talos.fengniaowu.com:4431/api/Contract/GetCurrentContracts",
        CREATEYUEFUORDERS: "https://kc-talos.fengniaowu.com:4431/api/Order/CreateYueFuOrders",
        CANCELCHECKOUTAPPLY: "https://kc-talos.fengniaowu.com:4431/api/Contract/CancelCheckoutApply",
        QUERYALLORDERS: "https://kc-talos.fengniaowu.com:4431/api/Order/QueryAllOrders?orderState=",
        GETTENANTCLEANINGS: "https://kc-talos.fengniaowu.com:4431/api/DomesticService/GetTenantCleanings",
        GETTENANTREPAIRS: "https://kc-talos.fengniaowu.com:4431/api/DomesticService/GetTenantRepairs",
        GETTENANTCOMPLAINTSUGGESTIONS: "https://kc-talos.fengniaowu.com:4431/api/DomesticService/GetTenantComplaintSuggestions",
        GETTRANSACTION: "https://kc-talos.fengniaowu.com:4431/api/Transaction/GetTransaction?transactionId=",
        GETORDERBYORDERID: "https://kc-talos.fengniaowu.com:4431/api/Order/GetOrderByOrderId?orderId=",
        CREATETRANSACTION: "https://kc-talos.fengniaowu.com:4431/api/Transaction/CreateTransaction",
        GETWECHATOPENID: "https://kc-talos.fengniaowu.com:4431/api/Payment/GetWeChatOpenId",
        ORDERPAYMENT: "https://kc-talos.fengniaowu.com:4431/api/Payment/Applets/OrderPayment",
        WHETHERCONFIRMCONTRACT: "https://kc-talos.fengniaowu.com:4431/api/TenantDevice/WhetherConfirmContract",
        TENANTENERGYMETERRECHAGE: "https://kc-talos.fengniaowu.com:4431/api/TenantDevice/TenantEnergyMeterRechage",
        ENERGYMETERUSAGEPAYMENT: "https://kc-talos.fengniaowu.com:4431/api/TenantDevice/EnergyMeterUsagePayment"
    },
    REGEX: {
        CELLPHONE: /^(13|14|15|16|17|18|19|10)\d{9}$/,
        PASSWORD: /^[a-zA-Z\d~!@#$%^&*_]{6,18}$/,
        PAYMENT_PASSWORD: /^(?![^a-zA-Z~!@#$%^&*_]+$)(?!\D+$).{8,18}$/,
        URL: /^(?:\w+:)?\/\/([^\s\.]+\.\S{2}|localhost[:?\d]*)\S*$/,
        CREDENTIALNO: /^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X|x)$/,
        BANKCARDNO: /^\d{15,19}$/,
        CHECKCODE: /^\d{6}$/,
        FLOOR: /^\d{1,5}$/,
        AMOUNT: /^\d{1,7}(\.\d{1,2})?$/
    },
    msgInfo: {
        postData: "数据正在提交请稍后",
        error: "系统服务繁忙，请稍后",
        error1: "系统服务繁忙，请稍后！",
        phone: '手机号码不能为空',
        phoneerr: '手机号码格式错误',
        send: '发送成功',
        senderr: '发送失败',
        captcha: '验证码不能为空',
        captchaerr: '验证码格式错误',
        ordernoerr: "验证码获取失败",
        password: '密码不能为空',
        passworderr: '密码格式错误',
        passwordsame: '密码不一致,重新输入',
        register: '注册成功',
        registererr: '注册失败',
        agreement1: '请同意蜂鸟屋注册服务协议',
        agreement2: '请同意蜂鸟屋服务协议',
        agreement3: '请同意蜂鸟屋租房分期服务协议',
        loginError: '登录失败',
        loginSuccess: '登录成功',
        loginErr1: '密码错误',
        loginErr2: '用户未设置登录密码',
        loginErr3: '用户被锁定',
        loginErr4: '用户未注册',
        tokenerr: '请点击发送验证码',
        credentialType: "请选择证件类型",
        realName: "姓名不能为空",
        credentialNo: "证件号码不能为空",
        credentialNoerr: "证件号码格式错误",
        img10err: "身份证正面不能为空",
        img20err: "身份证背面不能为空",
        img11err: "护照个人信息页不能为空",
        img21err: "护照签证信息页不能为空",
        img3err: "手持证件不能为空",
        verify: "{0}提交成功",
        verifyerr: "请提交个人身份信息",
        uploaderr: "身份证上传失败",
        resetPassword: "密码重置成功",
        resetPassworderr: "密码重置失败",
        source: "房屋来源不能为空",
        source1: "请选择具体楼号标签",
        source2: "请选择手机号所属",
        roomNumber: "房号不能为空",
        roomNumber2: "请选择房号",
        floor: "楼层不能为空",
        floorerr: "楼层格式错误",
        floor2: "请选择楼层",
        decoration: "朝向不能为空",
        leaseInfo: "租约信息提交成功",
        outerContractNo: "合同编号不能为空",
        outerContractNoerr: "合同编号格式错误",
        monthRentalAmount: "月租金不能为空",
        monthRentalAmounterr: "月租金格式错误",
        leaseTerm: "剩余月数不能为空",
        leaseTermerr: "剩余月数格式错误",
        leaseTermerr2: "剩余月数是1-12的数字",
        leaseOrderDay: "每期付款日不能为空",
        leaseOrderDayerr: "每期付款日格式错误",
        leaseOrderDayRang: "输入1~31的数字",
        leaseExpiryTime: "合同结束日期错误",
        depositAmount: "押金不能为空",
        depositAmounterr: "押金格式错误",
        tenementAmounterr: "物业费格式错误",
        imgContracterr: "租房合同第{0}页不能为空",
        imgContracterr2: "租房合同不能为空",
        imgIDCarderr: "本人手持身份证照片为空",
        imgFaceRecognition: "人脸识别照片为空",
        faceRecognition: "人脸识别成功",
        imgContract: "租房合同上传成功",
        imgIDCard: "身份证自拍照上传成功",
        linkRealName: "联系人姓名为空",
        linkCellphone: "联系人手机号为空",
        linkRelationship: "联系人关系为空",
        contactInfo: "联系人提交成功",
        rentalTypeerr: "付款方式不能为空",
        accountCellphone: "联系人手机号不能为{0}",
        accountName: "联系人不能为{0}",
        changeCellphone: "手机号修改成功",
        changeCellphoneerr: "手机号修改失败",
        repairType: "请选择维修类型",
        tenantName: "联系人姓名不能为空",
        tenantCellphone: "联系人电话不能为空",
        pickerDate: "请选择上门时间",
        description2: "描述不能为空",
        pictureUrls: "请上传图片资料",
        cleaningType: "请选择保洁类型",
        cancelCleaning: "取消成功",
        shortLink: "短链创建成功",
        loginOut: "退出成功",
        transaction: "订单正在支付请稍后"
    }
};
module.exports = config;