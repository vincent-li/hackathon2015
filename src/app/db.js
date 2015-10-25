var DBF = require('./dbFactory');

// 设置全局的`url`前缀
// 开发环境
if (__LOCAL__) {
    var urlPrefixForMicroFlow = '//localhost:3000/';  
}
// 生产环境
if (__PRO__) {
    var urlPrefixForMicroFlow = "/";
}

DBF.set('urlPrefix', urlPrefixForMicroFlow);

function getUrlParam(key) {
     var search = location.search;
     var arr = !search ? [] : location.search.substr(1).split('&');
     var param = {};
     for (var i=0, l=arr.length; i<l; i++) {
         var kv = arr[i].split('=');
         param[kv[0]] = kv[1];
      }
      return key ? (param[key] || '') : param;
};

var search = getUrlParam();

DBF.create('App', {
    joinIn : {
        mockUrl   : 'activity/join',
        url       : 'activity/join', 
        type      : 'POST',
        parseResp : function (data) {
            return data;
        }
    },
    hasJoin : {
        mockUrl   : 'activity/isjoin',
        url       : 'activity/isjoin', 
        type      : 'GET',
        parseResp : function (data) {
            return data;
        } 
    },
    login : {
        mockUrl   : 'user/login',
        url       : 'user/login', 
        type      : 'POST',
        parseResp : function (data) {
            return data;
        }
    },
    mapPoints : {
        mockUrl   : 'location/list',
        url       : 'location/list', 
        type      : 'GET',
        parseResp : function (data) {
            return data;
        }
    },
    qrcodeurl : {
        mockUrl   : 'common/qrcode',
        url       : 'common/qrcode', 
        type      : 'GET',
        parseResp : function (data) {
            return data;
        }
    }
});

module.exports = DBF.context;