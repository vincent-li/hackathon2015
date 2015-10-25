/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	;(function($){
	    $.getScript = function (url, success, error) {
	        var script = document.createElement("script"),
	            $script = $(script);
	        script.src = url;

	        $("head").append(script);
	        $script.bind("load", success || function () {});
	        $script.bind("error", error || function () {});
	    }
	    $.loadCSS = function (url){
	        var cssLink = document.createElement("link");
	        cssLink.rel = "stylesheet";
	        cssLink.rev = "stylesheet";
	        cssLink.type = "text/css";
	        cssLink.media = "screen";
	        cssLink.href = url;
	        document.getElementsByTagName("head")[0].appendChild(cssLink);
	    }
	    $.getUuid = function() {
	        function s4() {
	            return Math.floor((1 + Math.random()) * 0x10000)
	                .toString(16)
	                .substring(1);
	        }

	        return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
	            s4() + '-' + s4() + s4() + s4();
	    }

	    function GPS(result){
	        var res = result.split(',');
	        var point = {
	            longitude : res[0],
	            latitude : res[1]
	        };
	        $.ajax({
	            url: '/location/upload',
	            type: 'POST',
	            data: $.param(point),
	            success: function(resp) {}
	        });
	    }

	    window.jsBridgeCallBack = function(source, result){
	        switch(source){
	            case "GPS":
	                GPS(result);
	                break;
	        }
	    }

	    $.jsBridge = function(method, param){
	        if(window.webkit && window.webkit.messageHandlers && window.webkit.messageHandlers.bridge){
	            window.webkit.messageHandlers.bridge.postMessage({
	                request: method,
	                title : param
	            });
	        }
	    }

	    window.setInterval(function(){
	        $.jsBridge("GPS");
	        // var point = {
	        //     longitude : 120.010557,
	        //     latitude : 30.298561
	        // };
	        // $.ajax({
	        //     url: '/location/upload',
	        //     type: 'POST',
	        //     data: $.param(point),
	        //     success: function(resp) {}
	        // });
	    }, 5000);

	    $(document).ready(function(){
	        // 添加全局点击态
	        new TapEffect({
	            context : 'body',
	            selector : '.tTap',
	            cls : 'active'
	        });

	        FastClick.attach(document.body);
	        $('#AppContainer').height($(window).height());

	        var APP = __webpack_require__(1);
	        React.render(React.createElement(APP, null), document.getElementById('AppContainer'));
	    });
	})(Zepto);





/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	if(localStorage.getItem("user")){
	    location.href = '#/sys/activities';
	}

	// 应用首页
	// var PageHome           = require('../pages/HomePage');
	// 登录
	var PageLogin          = __webpack_require__(2);
	// 注册
	// var PageRegister       = require('../pages/RegisterPage');
	// 用户页面控制器
	var PageSys            = __webpack_require__(3);
	// 404页面
	var Page404            = __webpack_require__(4);

	var Locations = Router.Locations;
	var Location = Router.Location;
	var NotFound = Router.NotFound;


	var APP = React.createClass({displayName: "APP",
	    render: function() {
	        return (
	            React.createElement(Locations, {hash: true}, 
	                React.createElement(Location, {path: "/", handler: PageLogin}), 
	                React.createElement(Location, {path: "/login", handler: PageLogin}), 
	                React.createElement(Location, {path: "/login/:actId", handler: PageLogin}), 
	                React.createElement(Location, {path: "/sys(/*)", handler: PageSys}), 
	                React.createElement(NotFound, {handler: Page404})
	            )
	        )
	    }
	});

	module.exports = APP;

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(5);

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(6);

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(7);

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	/**************************************************\
	                登录页面
	\**************************************************/
	'use strict';

	var Icon = __webpack_require__(14);
	var DB = __webpack_require__(8);

	var Header = React.createClass({displayName: "Header",

	    mixins: [],

	    getInitialState: function () {
	        return {};
	    },

	    goToBack : function(){
	        var t = this;
	        location.href = '/';
	    },

	    linkTo : function(to){
	        var t = this;
	        if(to){
	            window.location.href = '/#/' + to;
	        }
	    },

	    render: function() {
	        var t = this;
	        return (
	            React.createElement("div", {className: "lflex leyo-header"}, 
	                React.createElement("div", {className: "flex1 tTap header-back", onClick: t.goToBack}, 
	                    React.createElement(Icon, {name: "back"})
	                ), 
	                React.createElement("div", {className: "flex5 header-title"}, 
	                    "登录"
	                ), 
	                React.createElement("div", {className: "flex1 header-link"}
	            
	                )
	            )
	        );
	    }
	});

	var LoginPage = React.createClass({displayName: "LoginPage",

	    mixins: [],

	    getInitialState: function () {
	        return {};
	    },

	    componentDidMount : function(){
	        window.title = '登录';
	        // $.jsBridge('Title', '登录');
	    },

	    onLoginIn: function(){
	        var t = this;
	        var user = {
	            telephone : $("input[name=phone]").val(),
	            name  : $("input[name=name]").val()
	        };
	        if(t.props.actId){
	            user.activity_id = t.props.actId;
	            DB.App.joinIn(user).then(function (data) {
	                window.userData = {userPhone:user.telephone};
	                localStorage.setItem("user",JSON.stringify(userData));
	                location.href = '#/sys/activities/' + t.props.actId;
	            }, function(resp){
	                alert(resp.msg);
	            });
	        }else{
	            DB.App.login(user).then(function (data) {
	                window.userData = {userPhone:user.telephone};
	                localStorage.setItem("user",JSON.stringify(userData));
	                location.href = '#/sys/activities';
	            }, function(resp){
	                alert(resp.msg);
	            });
	        }
	    },
	    
	    render: function () {
	        var t = this;
	        // var ref = 'ScaleModal';//'OutlineModal', 'ScaleModal', 'FadeModal', 'FlyModal', 'DropModal', 'WaveModal'
	        // var Modal = ModalFactory[ref];
	        return (
	            React.createElement("div", null, 
	                React.createElement("div", {className: "lflex lflex-v container-padding marg-20"}, 
	                    React.createElement("div", null, 
	                        React.createElement("div", {className: "lflex lflex-v ai-center"}, 
	                            React.createElement("div", {className: "login-phone"}, 
	                                React.createElement("input", {name: "phone", type: "text", className: "form-control input-noborder", placeholder: "输入手机号"}), 
	                                React.createElement("div", {className: "login-point left"}), 
	                                React.createElement("div", {className: "login-point right"})
	                            ), 
	                            React.createElement("div", {className: "login-password"}, 
	                                React.createElement("input", {name: "name", type: "text", className: "form-control input-noborder", placeholder: "输入昵称"})
	                            )
	                        )
	                    ), 
	                    React.createElement("div", {className: "btn-login"}, 
	                        React.createElement("button", {onClick: t.onLoginIn, className: "btn btn-primary btn-block btn-lg tTap"}, "登录")
	                    ), 
	                    React.createElement("div", {className: "forget-password"}, 
	                        React.createElement("span", {className: "tTap"}, "忘记密码？")
	                    ), 
	                    React.createElement("div", {className: "login-img"}, 
	                        React.createElement(Icon, {name: "address-hz"})
	                    )
	                )
	            )
	        );
	    }
	});

	module.exports = LoginPage;




/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	/**************************************************\
	            系统控制页面
	\**************************************************/
	'use strict';

	var Locations = Router.Locations;
	var Location = Router.Location;
	var NotFound = Router.NotFound;


	var Header     = __webpack_require__(15);
	var SideMenu   = __webpack_require__(16);
	var Page404    = __webpack_require__(4);

	var PageActivities = __webpack_require__(9);
	var PageActivityDtl = __webpack_require__(10);
	var PageUserActivityDtl = __webpack_require__(11);
	var PageQRCode = __webpack_require__(12);
	var PageMap    = __webpack_require__(13);

	var SysControlPage = React.createClass({displayName: "SysControlPage",

	    mixins: [],

	    getInitialState: function () {
	        return {
	            winWidth : $(window).width(),
	            winHeight: $(window).height(),
	            identity : 'user',
	            locationHeight : $(window).height()
	        };
	    },

	    hideSideMenu : function(e){
	        e.stopPropagation();
	        // 'appContent'
	        TweenLite.to("#appContent", 0.3, {
	            x: 0,
	            scale: 1,
	            ease:Power2.easeInOut,
	            onComplete: function(){
	                $('#animateCover').hide();
	            }
	        });
	    },

	    onChangeIdentity : function(iden){
	        this.setState({
	            identity : iden
	        });
	    },

	    // componentDidMount: function() {
	    //     var t = this;
	        
	    // },
	    
	    render: function () {
	        var t = this;
	        var locationHeight = t.state.locationHeight+'px';
	        return (
	            React.createElement(Locations, {id: "sysLocations", contextual: true, hash: true, className: "page-frame", style: {height:locationHeight,minHeight:locationHeight,maxHeight:locationHeight}}, 
	                React.createElement(Location, {path: "/activities", handler: PageActivities}), 
	                React.createElement(Location, {path: "/activities/one", handler: PageActivityDtl}), 
	                React.createElement(Location, {path: "/user/activity", handler: PageUserActivityDtl}), 
	                React.createElement(Location, {path: "/qrcode/:actId", handler: PageQRCode}), 
	                React.createElement(Location, {path: "/map/:actId", handler: PageMap}), 
	                React.createElement(NotFound, {handler: Page404})
	            )
	        );
	    }
	});
	// <div>
	//     <img src="//leyo-hangzhou.oss-cn-hangzhou.aliyuncs.com/leyo/images/appback.png" height={t.state.winHeight} width={t.state.winWidth} className="layer"/>
	//     <SideMenu identity={t.state.identity}></SideMenu>
	//     
	//     <div id="appContent" className="layer page-frame">
	            // <Header onChangeIdentity={t.onChangeIdentity}/>
	//         <div id="animateCover" className="back-cover tTap" onClick={t.hideSideMenu}></div>
	//         <Locations id="sysLocations" contextual hash className="page-frame" style={{height:locationHeight,minHeight:locationHeight,maxHeight:locationHeight}}>
	//             <Location path="/activities"           handler={PageActivities}/>
	//             <Location path="/activities/:actId"    handler={PageActivityDtl}/>
	//             <Location path="/qrcode/:actId"        handler={PageQRCode}/>
	//             <Location path="/map/:actId"                  handler={PageMap}/>
	//             <NotFound handler={Page404}/>
	//         </Locations>
	//     </div>
	// </div>
	module.exports = SysControlPage;

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	/**************************************************\
	                404页面
	\**************************************************/
	'use strict';

	var Page404 = React.createClass({displayName: "Page404",
	    render: function () {
	        var t = this;
	        return (
	            React.createElement("div", {className: ""}, 
	                "404"
	            )
	        );
	    }
	});

	module.exports = Page404;




/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	var DBF = __webpack_require__(17);

	// 设置全局的`url`前缀
	// 开发环境
	if (false) {
	    var urlPrefixForMicroFlow = '//localhost:3000/';  
	}
	// 生产环境
	if (true) {
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

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(19);

/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(18);

/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(20);

/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(21);

/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(22);

/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(23);

/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(24);

/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(25);

/***/ },
/* 17 */
/***/ function(module, exports, __webpack_require__) {

	var ua           = navigator.userAgent;
	var isMobile     = !!ua.match(/mobile/i);

	var DBFactory = {
	    __: {},
	    set: function (key, value) {
	        this.__[key] = value;
	    },
	    get: function (key) {
	        return this.__[key];
	    },
	    create: function (name, methods) {
	        // 禁止创建重名的DB实例
	        if (this.context[name]) {
	            console.warn('DB: "' + name + '" is existed! ');
	            return;
	        }
	        return this.context[name] = new DB(name, methods);
	    },
	    // 存储db实例
	    context: {
	        link: function (data) {
	            DBFactory.context.Data = data;
	        },
	        // 占位 禁止覆盖
	        Data: {}
	    }
	};

	/**
	 * 如果浏览器`url`中包含`m=1`的`search`参数，则强制使用`mockUrl`
	 */
	var isGlobalForceMock =  (false);

	function DB(DBName, methods) {
	    var t = this;
	    t.cache = {};
	    $.each(methods, function (method, config) {

	        if (typeof config === 'function') {
	            t[method] = config;
	            return;
	        }

	        t[method] = function (query) {
	            var cfg = {};

	            cfg.method = method;

	            cfg.DBName = DBName;

	            cfg.mockUrl = config.mockUrl;

	            // 如果设置了`mock`代理
	            if (cfg.mockUrl && typeof DBFactory.__.mockProxy === 'function') {
	                cfg.mockUrl = DBFactory.__.mockProxy(cfg.mockUrl);
	            }

	            cfg.mockForce = typeof config.mockForce === 'boolean' ? config.mockForce : false;

	            cfg.query = $.extend({}, config.query || {}, query || {});
	            
	            cfg.isMock = isGlobalForceMock === false && cfg.mockForce === false && config.url
	                       ? false : true;

	            t.urlPrefix = DBFactory.get('urlPrefix') || '';

	            cfg.url = cfg.isMock ? cfg.mockUrl : (t.getUrl(config.url) || cfg.mockUrl);

	            cfg.parseResp = config.parseResp || function (r) {return r};

	            // 是否是全局只获取一次
	            cfg.once = typeof config.once === 'boolean' ? config.once : false;

	            // 数据缓存，如果`once`设置为true，则在第二次请求的时候直接返回改缓存数据。
	            t.cache[method] = t.cache[method] || null;

	            cfg.jsonp = config.jsonp || false;
	            cfg.type = config.type || 'POST';
	            return request(cfg, t);
	        }

	        if (config.test) {
	            console.log('_____【 '+DBName+'.'+method+'() 】_____');
	            t[method]().then(function (data) {
	                console.log(data);
	            });
	        }

	    })
	}

	$.extend(DB.prototype, {
	    /**
	     * 获取正式接口的完整`url`
	     * 如果通过`DB.set('urlPrefix', 'https://xxx')`设置了全局`url`的前缀，则执行补全
	     */
	    getUrl: function (url) {
	        if (this.urlPrefix) {
	            return this.urlPrefix + url;
	        } else {
	            return url;
	        }
	    }
	});

	function request(cfg, db) {
	    var defer = Q.defer();

	    if (cfg.once && db.cache[cfg.method]) {
	        defer.resolve(db.cache[cfg.method]);
	    } else {
	        var query;

	        var mergeQuery = {};
	        mergeQuery['__' + cfg.DBName + '.' + cfg.method + '()__'] = '';
	        if (cfg.isMock) {
	            mergeQuery.m = 1;
	        }

	        query = $.extend({}, mergeQuery, cfg.query);

	        var ajaxOptions = {
	            url: cfg.url,
	            type:"POST",
	            data: query,
	            success: function(resp) {
	                if (cfg.isMock) {
	                    // 调试使用 在哪个DB上调试
	                    // if (cfg.DBName == 'Phone') {
	                    //     debugger;
	                    // }
	                    // 需要缓存数据的情况
	                    if (resp.code === 0 && resp.msg === 'success') {
	                        var resp = cfg.parseResp(resp.data);
	                        cfg.once && (db.cache[cfg.method] = resp);
	                        defer.resolve(resp);
	                    } else {
	                        defer.reject({
	                            msg: 'DB mock error: ' + cfg.url
	                        });
	                    }
	                } else {
	                    if (resp.code === 0) {
	                        var resp = cfg.parseResp(resp.data);
	                        // 需要缓存数据的情况
	                        cfg.once && (db.cache[cfg.method] = resp);
	                        defer.resolve(resp)
	                    } else {
	                        //errorcode 为666时调整error页面
	                        defer.reject({
	                            msg: resp.msg
	                        });
	                    }
	                }
	            },
	            error: function (resp) {
	            }
	        };

	        if (cfg.jsonp === true) {
	            ajaxOptions.dataType = 'jsonp';
	        } else {
	            ajaxOptions.dataType = 'json';
	            ajaxOptions.type = cfg.type;
	        }

	        $.ajax(ajaxOptions);
	    }

	    return defer.promise;
	}

	module.exports = DBFactory;

/***/ },
/* 18 */
/***/ function(module, exports, __webpack_require__) {

	/**************************************************\
	                详细页面
	\**************************************************/
	'use strict';
	// 系统资源
	var AppStore = __webpack_require__(26);
	var DB = __webpack_require__(8);

	var Icon = __webpack_require__(14);
	var ModalFactory = __webpack_require__(28);
	// router对象

	var ActivityDtlPage = React.createClass({displayName: "ActivityDtlPage",

	    mixins: [],

	    getInitialState: function () {
	        return {
	            name: "黑客马拉松",
	            orgName: "SegmentFault",
	            tags: ["黑客","马拉松","夜"],
	            address: "杭州市余杭区良睦路1399号梦想小镇21幢",
	            startTime: "2015-10-24 09:00 周六",
	            endTime: "2015-10-25 18:00 周日",
	            tip:"",
	            desc:"",
	            memberList:[
	                {
	                    userId:"123",
	                    name:"大娃",
	                    phone:"15415415466",
	                },
	                {
	                    userId:"123",
	                    name:"二娃",
	                    phone:"15415415466"
	                },
	                {
	                    userId:"123",
	                    name:"三娃",
	                    phone:"15415415466"
	                }
	            ],
	            iAmIn : false
	        };
	    },

	    getDefaultProps : function(){
	        return {
	            cdnDomain : AppStore.cdnDomain,
	            width : $(window).width() > 640 ? 640 : $(window).width()
	        };
	    },

	    handleJoin : function(){
	        var t = this;
	        var phone = JSON.parse(localStorage.getItem("user")).userPhone;
	        if(phone){
	            var act = {
	                telephone : phone,
	                activity_id : 1
	            };
	            DB.App.joinIn(act).then(function (data) {
	                t.toggleDialog();
	                location.href = '#/sys/activities';
	            }, function(resp){
	                alert(resp.msg);
	            });
	        }else{
	            location.href = '#/login/1';
	        }
	        
	    },

	    toggleDialog: function(){
	        this.refs['ScaleModal'].toggle();
	    },

	    getAlertContent : function(title, desc){
	        return(
	            React.createElement("div", {className: "lflex lflex-v dialog-content"}, 
	                React.createElement(Icon, {name: "settings"}), 
	                React.createElement("div", {className: "dialog-title"}, title), 
	                React.createElement("div", {className: "dialog-desc"}, desc), 
	                React.createElement("div", {className: "dialog-close"}, 
	                    React.createElement(Icon, {name: "cancel"})
	                )
	            )
	        );
	    },

	    goTo : function(hash){
	        window.location.href = hash;
	    },

	    componentDidMount : function(){
	        window.title = '活动详情';
	        var t = this;
	        var phone = JSON.parse(localStorage.getItem("user")).userPhone;
	        // console.log('phone >>>>' + phone);
	        if(phone){
	            var act = {
	                telephone : phone,
	                activity_id : 1
	            };
	            
	            DB.App.hasJoin(act).then(function (data) {
	                t.setState({iAmIn : data});
	            }, function(resp){
	                alert(resp.msg);
	            });
	        }
	    },
	    
	    render: function () {
	        var t = this;
	        var ref = 'ScaleModal';
	        var Modal = ModalFactory[ref];
	        var btn = React.createElement("div", {className: "flex1 lflex lflex-v jc-center tTap", onClick: t.handleJoin}, 
	                        React.createElement("div", {className: "sigin-in"}, 
	                            React.createElement(Icon, {name: "signin"})
	                        ), 
	                        React.createElement("div", null, "报名")
	                 );
	        if(t.state.iAmIn){
	            btn = React.createElement("div", {className: "flex1 lflex lflex-v jc-center havein"}, 
	                        React.createElement("div", {className: "sigin-in"}, 
	                            React.createElement(Icon, {name: "signin"})
	                        ), 
	                        React.createElement("div", null, "已报名")
	                 );
	        }
	        return (
	            React.createElement("div", {className: "lflex lflex-v"}, 
	                React.createElement("div", {className: "text-ali-c"}, 
	                    React.createElement("img", {src: t.props.cdnDomain + "/imgs/segmentfault-20151024-act.jpeg", width: t.props.width})
	                ), 
	                React.createElement("div", null, 
	                    React.createElement("div", {className: "class-info-left"}, 
	                        React.createElement("div", {className: "class-info-name"}, 
	                            this.state.name
	                        ), 
	                        React.createElement("div", {className: "lflex"}, 
	                            React.createElement("div", null, "主办方："), 
	                            React.createElement("div", null, 
	                                React.createElement("a", {href: "http://segmentfault.com/", target: "_blank"}, 
	                                    this.state.orgName
	                                )
	                            )
	                        ), 
	                        React.createElement("div", {className: "lflex"}, 
	                            React.createElement("div", null, "开始时间："), 
	                            React.createElement("div", null, t.state.startTime)
	                        ), 
	                        React.createElement("div", {className: "lflex"}, 
	                            React.createElement("div", null, "结束时间："), 
	                            React.createElement("div", null, t.state.endTime)
	                        ), 
	                        React.createElement("div", {className: "lflex"}, 
	                            React.createElement("div", null, "举办地点："), 
	                            React.createElement("div", null, 
	                                React.createElement("a", {target: "_blank", href: "http://api.map.baidu.com/geocoder?output=html&address=杭州市余杭区良睦路1399号梦想小镇21幢"}, 
	                                    t.state.address
	                                )
	                            )
	                        ), 
	                        React.createElement("div", {className: "lflex"}, 
	                            React.createElement("div", null, "已报名："), 
	                            React.createElement("div", null, 
	                                t.state.memberList.length, "人"
	                            )
	                        )
	                        
	                    )
	                ), 
	                React.createElement("div", {className: "class-detail-info"}, 
	                    React.createElement("div", {className: "class-reservation lflex"}, 
	                        React.createElement("div", {className: "flex1 lflex lflex-v jc-center"}, 
	                            React.createElement("div", {className: "sigin-in tTap", onClick: t.goTo.bind(t, '#/sys/qrcode/1')}, 
	                                React.createElement(Icon, {name: "jijie"})
	                            ), 
	                            React.createElement("div", null, "集结")
	                        ), 
	                        React.createElement("div", {className: "flex1 lflex lflex-v jc-center"}, 
	                            React.createElement("div", {className: "sigin-in tTap", onClick: t.goTo.bind(t, '#/sys/qrcode/1')}, 
	                                React.createElement(Icon, {name: "barcode"})
	                            ), 
	                            React.createElement("div", null, "签到二维码")
	                        ), 
	                        React.createElement("div", {className: "flex1 lflex lflex-v jc-center"}, 
	                            React.createElement("div", {className: "sigin-in tTap", onClick: t.goTo.bind(t, '#/sys/map/1')}, 
	                                React.createElement(Icon, {name: "map"})
	                            ), 
	                            React.createElement("div", null, "位置")
	                        ), 
	                        React.createElement(Modal, {ref: ref}, t.getAlertContent('系统提示', 'nihao'))
	                    ), 
	                    React.createElement("div", {className: "class-reservation lflex"}, 
	                        React.createElement("div", {className: "flex1 lflex lflex-v jc-center"}, 
	                            React.createElement("div", {className: "sigin-in tTap", onClick: t.goTo.bind(t, '#/sys/qrcode/1')}, 
	                                React.createElement(Icon, {name: "weixin"})
	                            ), 
	                            React.createElement("div", null, "群聊")
	                        ), 
	                        React.createElement("div", {className: "flex1 lflex lflex-v jc-center"}, 
	                            React.createElement("div", {className: "sigin-in tTap", onClick: t.goTo.bind(t, '#/sys/map/1')}, 
	                                React.createElement(Icon, {name: "choujiang"})
	                            ), 
	                            React.createElement("div", null, "抽奖")
	                        ), 
	                        React.createElement("div", {className: "flex1"})
	                    ), 
	                    React.createElement("div", {className: "class-info-item"}, 
	                        React.createElement("div", {className: "class-info-title"}, 
	                            React.createElement("div", {className: "class-info-mark"}), 
	                            React.createElement("div", null, "活动及主题简介")
	                        ), 
	                        React.createElement("div", {className: "class-info-detail"}, 
	                            "黑客马拉松（Hackathon）编程大赛自最初由 SegmentFault 引进国内，引起开发者的狂热响应，科技企业更是陆续主动参与其中，国内编程运动的热潮由此引发。"
	                        ), 
	                        React.createElement("div", {className: "class-info-detail"}, 
	                            "今年 SegmentFault 黑客马拉松编程大赛将于 10 月 24 - 25 日在北京、杭州、深圳、济南、武汉多城同时举办，采用全新的命题式赛制，以专业的开发者社区为平台，与众位开发者们来一场程序员节的技术狂欢。"
	                        ), 
	                        React.createElement("div", {className: "class-info-detail"}, 
	                            "本次黑客马拉松面向全国范围报名，开发者以个人身份报名并组队参赛，每个队伍提交一件或多件产品参赛。"
	                        ), 
	                        React.createElement("div", {className: "class-info-detail"}, 
	                            "比赛设置奖项，优秀产品将直接受到国内领先科技媒体的曝光，开放平台和投资机构将投以热切关注。"
	                        )
	                    ), 
	                    React.createElement("div", {className: "class-info-item"}, 
	                        React.createElement("div", {className: "class-info-title"}, 
	                            React.createElement("div", {className: "class-info-mark"}), 
	                            React.createElement("div", null, "参赛规则")
	                        ), 
	                        React.createElement("div", {className: "class-info-detail"}, 
	                            "本次黑客马拉松采用命题制，比赛开始后在现场公布命题，命题有多个，范围较广，将鼓励开发者从多角度去发挥，实现自己的创意。"
	                        ), 
	                        React.createElement("div", {className: "class-info-detail"}, 
	                            React.createElement("ul", null, 
	                                React.createElement("li", null, "参赛报名：开发者以个人身份报名，团队参赛每个成员都要单独报名。报名后我们会对参赛人员进行筛选，通过者将于在10月15 - 22日之间收到邀请邮件，比赛届时凭借参赛邀请签到，领取身份卡（不同参赛角色身份卡会有区别）"), 
	                                React.createElement("li", null, "团队规模：每个团队 2-5 人，团队最高人限 5 人、1 人最多参与 1 个团队。可提前组队，也可到现场自由组队（提前组队，每个成员都要报名哦）"), 
	                                React.createElement("li", null, "现场组队：现场会设有白板，准备现场组队的开发者可以用便利贴上写明自己是谁，能做什么，想做什么，在找怎样的人等等，不同的身份卡用于区分开发者角色，帮助更快组队"), 
	                                React.createElement("li", null, "备注：现场提供 Wi-Fi，参赛者需自带具备上网功能的笔记本电脑，特殊电源插头请自备转接口。")
	                            )
	                        )
	                    ), 
	                    React.createElement("div", {className: "class-info-item"}, 
	                        React.createElement("div", {className: "class-info-title"}, 
	                            React.createElement("div", {className: "class-info-mark"}), 
	                            React.createElement("div", null, "奖项设置")
	                        ), 
	                        React.createElement("div", {className: "class-info-detail"}, 
	                            React.createElement("ul", null, 
	                                React.createElement("li", null, "一等奖：Macbook Air 11'' + 1024*5 RMB"), 
	                                React.createElement("li", null, "二等奖：HHKB Pro 2 + 1024*3 RMB"), 
	                                React.createElement("li", null, "三等奖：Kindle Paperwhite 3 + 1024 RMB")
	                            )
	                        )
	                    )
	                )
	            )
	        );
	    }
	});

	module.exports = ActivityDtlPage;

/***/ },
/* 19 */
/***/ function(module, exports, __webpack_require__) {

	/**************************************************\
	                活动列表页面
	\**************************************************/
	'use strict';
	var AppStore = __webpack_require__(26);
	var Matrix = __webpack_require__(27);
	var Icon = __webpack_require__(14);
	var List = Matrix.List;
	var ListItem = Matrix.ListItem;
	var ListScrollView = Matrix.ListScrollView;

	var ActivitiesPage = React.createClass({displayName: "ActivitiesPage",

	    mixins: [],

	    getInitialState: function () {
	        return {
	            classList : [{
	                actId : 'f1c1e994-181a-b76f-3253-8421da0676ed',
	                title : '黑客马拉松',
	                time : '2015.10.24--2015.10.25'
	            },{
	                actId : '23d1aa86-f36e-dc2d-2c4e-9a178c124620',
	                title : '奔跑吧黑黑',
	                time : '2025.10.24--2025.10.25'
	            },{
	                actId : '084998a9-d0e5-8a65-4ede-bd7708d4f738',
	                title : '黑客的蛋蛋也忧桑',
	                time : '2035.10.24--2035.10.25'
	            }]
	        };
	    },

	    componentDidMount : function(){
	        window.title = '活动列表';
	    },

	    getDefaultProps : function(){
	        return {
	            cdnDomain : AppStore.cdnDomain,
	            width : 100
	        };
	    },

	    goTo : function(hash){
	        window.location.href = hash;
	    },
	    
	    render: function () {
	        var t = this;
	        var listItems = [];
	        var pageWidth = $(window).width() - 35;
	        var clas = t.state.classList[0];
	        listItems.push(
	            React.createElement(ListItem, {id: "class_item_id_0", key: "class-item-0"}, 
	                React.createElement("div", {className: "lflex ai-center list-content"}, 
	                    React.createElement("div", {className: "padding-16 tTap", onClick: t.goTo.bind(t, '#/sys/activities/one')}, 
	                        React.createElement("img", {src: t.props.cdnDomain + "/imgs/segmentfault-20151024-act.jpeg", width: t.props.width})
	                    ), 
	                    React.createElement("div", null, 
	                        React.createElement("div", {className: "lflex lflex-v bg-white"}, 
	                            React.createElement("div", {className: "class-title"}, clas.title), 
	                            React.createElement("div", {className: "class-msg"}, 
	                                clas.time
	                            )
	                        )
	                    )
	                )
	            )
	        );
	        var clas1 = t.state.classList[1];
	        listItems.push(
	            React.createElement(ListItem, {id: "class_item_id_1", key: "class-item-1"}, 
	                React.createElement("div", {className: "lflex ai-center list-content tTap", onClick: t.goTo.bind(t, '#/sys/user/activity')}, 
	                    React.createElement("div", {className: "padding-16"}, 
	                        React.createElement("img", {src: t.props.cdnDomain + "/imgs/segmentfault-20151024-act.jpeg", width: t.props.width})
	                    ), 
	                    React.createElement("div", null, 
	                        React.createElement("div", {className: "lflex lflex-v bg-white"}, 
	                            React.createElement("div", {className: "class-title"}, clas.title), 
	                            React.createElement("div", {className: "class-msg"}, 
	                                clas.time
	                            )
	                        )
	                    )
	                )
	            )
	        );
	        var now = moment(new Date());
	        var map = {
	            0 : '日',
	            1 : '一',
	            2 : '二',
	            3 : '三',
	            4 : '四',
	            5 : '五',
	            6 : '六'
	        };
	        return (
	            React.createElement("div", {className: "container"}, 
	                React.createElement(List, null, 
	                    React.createElement(ListItem, null, 
	                        React.createElement("div", {className: "lflex ai-center now-date"}, 
	                            React.createElement("div", {className: "class-weekday"}, 
	                                "周", map[now.day()]
	                            ), 
	                            React.createElement("div", {className: "class-date"}, 
	                                now.format('YYYY.MM.DD')
	                            )
	                        )
	                    ), 
	                    listItems
	                )
	            )
	        );
	    }
	});

	module.exports = ActivitiesPage;

/***/ },
/* 20 */
/***/ function(module, exports, __webpack_require__) {

	/**************************************************\
	                详细页面
	\**************************************************/
	'use strict';
	// 系统资源
	var AppStore = __webpack_require__(26);
	var DB = __webpack_require__(8);

	var Icon = __webpack_require__(14);
	var ModalFactory = __webpack_require__(28);
	// router对象

	var ActivityDtlPage = React.createClass({displayName: "ActivityDtlPage",

	    mixins: [],

	    getInitialState: function () {
	        return {
	            name: "黑客马拉松",
	            orgName: "SegmentFault",
	            tags: ["黑客","马拉松","夜"],
	            address: "杭州市余杭区良睦路1399号梦想小镇21幢",
	            startTime: "2015-10-24 09:00 周六",
	            endTime: "2015-10-25 18:00 周日",
	            tip:"",
	            desc:"",
	            memberList:[
	                {
	                    userId:"123",
	                    name:"大娃",
	                    phone:"15415415466",
	                },
	                {
	                    userId:"123",
	                    name:"二娃",
	                    phone:"15415415466"
	                },
	                {
	                    userId:"123",
	                    name:"三娃",
	                    phone:"15415415466"
	                }
	            ],
	            iAmIn : false
	        };
	    },

	    getDefaultProps : function(){
	        return {
	            cdnDomain : AppStore.cdnDomain,
	            width : $(window).width() > 640 ? 640 : $(window).width()
	        };
	    },

	    handleJoin : function(){
	        var t = this;
	        var phone = JSON.parse(localStorage.getItem("user")).userPhone;
	        if(phone){
	            var act = {
	                telephone : phone,
	                activity_id : 1
	            };
	            DB.App.joinIn(act).then(function (data) {
	                t.toggleDialog();
	                location.href = '#/sys/activities';
	            }, function(resp){
	                alert(resp.msg);
	            });
	        }else{
	            location.href = '#/login/1';
	        }
	        
	    },

	    toggleDialog: function(){
	        this.refs['ScaleModal'].toggle();
	    },

	    getAlertContent : function(title, desc){
	        return(
	            React.createElement("div", {className: "lflex lflex-v dialog-content"}, 
	                React.createElement(Icon, {name: "settings"}), 
	                React.createElement("div", {className: "dialog-title"}, title), 
	                React.createElement("div", {className: "dialog-desc"}, desc), 
	                React.createElement("div", {className: "dialog-close"}, 
	                    React.createElement(Icon, {name: "cancel"})
	                )
	            )
	        );
	    },

	    goTo : function(hash){
	        window.location.href = hash;
	    },

	    openScanner : function(){
	        $.jsBridge('QRScanner');
	    },

	    componentDidMount : function(){
	        window.title = '活动详情';
	        var t = this;
	        var phone = JSON.parse(localStorage.getItem("user")).userPhone;
	        // console.log('phone >>>>' + phone);
	        if(phone){
	            var act = {
	                telephone : phone,
	                activity_id : 1
	            };
	            
	            DB.App.hasJoin(act).then(function (data) {
	                t.setState({iAmIn : data});
	            }, function(resp){
	                alert(resp.msg);
	            });
	        }
	    },
	    
	    render: function () {
	        var t = this;
	        var ref = 'ScaleModal';
	        var Modal = ModalFactory[ref];
	        var btn = React.createElement("div", {className: "flex1 lflex lflex-v jc-center tTap", onClick: t.handleJoin}, 
	                        React.createElement("div", {className: "sigin-in"}, 
	                            React.createElement(Icon, {name: "signin"})
	                        ), 
	                        React.createElement("div", null, "报名")
	                 );
	        if(t.state.iAmIn){
	            btn = React.createElement("div", {className: "flex1 lflex lflex-v jc-center havein"}, 
	                        React.createElement("div", {className: "sigin-in"}, 
	                            React.createElement(Icon, {name: "signin"})
	                        ), 
	                        React.createElement("div", null, "已报名")
	                 );
	        }
	        return (
	            React.createElement("div", {className: "lflex lflex-v"}, 
	                React.createElement("div", {className: "text-ali-c"}, 
	                    React.createElement("img", {src: t.props.cdnDomain + "/imgs/segmentfault-20151024-act.jpeg", width: t.props.width})
	                ), 
	                React.createElement("div", null, 
	                    React.createElement("div", {className: "class-info-left"}, 
	                        React.createElement("div", {className: "class-info-name"}, 
	                            this.state.name
	                        ), 
	                        React.createElement("div", {className: "lflex"}, 
	                            React.createElement("div", null, "主办方："), 
	                            React.createElement("div", null, 
	                                React.createElement("a", {href: "http://segmentfault.com/", target: "_blank"}, 
	                                    this.state.orgName
	                                )
	                            )
	                        ), 
	                        React.createElement("div", {className: "lflex"}, 
	                            React.createElement("div", null, "开始时间："), 
	                            React.createElement("div", null, t.state.startTime)
	                        ), 
	                        React.createElement("div", {className: "lflex"}, 
	                            React.createElement("div", null, "结束时间："), 
	                            React.createElement("div", null, t.state.endTime)
	                        ), 
	                        React.createElement("div", {className: "lflex"}, 
	                            React.createElement("div", null, "举办地点："), 
	                            React.createElement("div", null, 
	                                React.createElement("a", {target: "_blank", href: "http://api.map.baidu.com/geocoder?output=html&address=杭州市余杭区良睦路1399号梦想小镇21幢"}, 
	                                    t.state.address
	                                )
	                            )
	                        ), 
	                        React.createElement("div", {className: "lflex"}, 
	                            React.createElement("div", null, "已报名："), 
	                            React.createElement("div", null, 
	                                t.state.memberList.length, "人"
	                            )
	                        )
	                        
	                    )
	                ), 
	                React.createElement("div", {className: "class-detail-info"}, 
	                    React.createElement("div", {className: "class-reservation lflex"}, 
	                        btn, 
	                        React.createElement("div", {className: "flex1 lflex lflex-v jc-center"}, 
	                            React.createElement("div", {className: "sigin-in tTap", onClick: t.openScanner}, 
	                                React.createElement(Icon, {name: "barcode"})
	                            ), 
	                            React.createElement("div", null, "签到")
	                        ), 
	                        React.createElement("div", {className: "flex1 lflex lflex-v jc-center"}, 
	                            React.createElement("div", {className: "sigin-in tTap", onClick: t.goTo.bind(t, '#/sys/map/'+t.props.actId)}, 
	                                React.createElement(Icon, {name: "map"})
	                            ), 
	                            React.createElement("div", null, "位置")
	                        ), 
	                        React.createElement(Modal, {ref: ref}, t.getAlertContent('系统提示', 'nihao'))
	                    ), 
	                    React.createElement("div", {className: "class-reservation lflex"}, 
	                        React.createElement("div", {className: "flex1 lflex lflex-v jc-center"}, 
	                            React.createElement("div", {className: "sigin-in tTap", onClick: t.goTo.bind(t, '#/sys/qrcode/'+t.props.actId)}, 
	                                React.createElement(Icon, {name: "weixin"})
	                            ), 
	                            React.createElement("div", null, "群聊")
	                        ), 
	                        React.createElement("div", {className: "flex1 lflex lflex-v jc-center"}, 
	                            React.createElement("div", {className: "sigin-in tTap", onClick: t.goTo.bind(t, '#/sys/map/'+t.props.actId)}, 
	                                React.createElement(Icon, {name: "choujiang"})
	                            ), 
	                            React.createElement("div", null, "抽奖")
	                        ), 
	                        React.createElement("div", {className: "flex1"})
	                    ), 
	                    React.createElement("div", {className: "class-info-item"}, 
	                        React.createElement("div", {className: "class-info-title"}, 
	                            React.createElement("div", {className: "class-info-mark"}), 
	                            React.createElement("div", null, "活动及主题简介")
	                        ), 
	                        React.createElement("div", {className: "class-info-detail"}, 
	                            "黑客马拉松（Hackathon）编程大赛自最初由 SegmentFault 引进国内，引起开发者的狂热响应，科技企业更是陆续主动参与其中，国内编程运动的热潮由此引发。"
	                        ), 
	                        React.createElement("div", {className: "class-info-detail"}, 
	                            "今年 SegmentFault 黑客马拉松编程大赛将于 10 月 24 - 25 日在北京、杭州、深圳、济南、武汉多城同时举办，采用全新的命题式赛制，以专业的开发者社区为平台，与众位开发者们来一场程序员节的技术狂欢。"
	                        ), 
	                        React.createElement("div", {className: "class-info-detail"}, 
	                            "本次黑客马拉松面向全国范围报名，开发者以个人身份报名并组队参赛，每个队伍提交一件或多件产品参赛。"
	                        ), 
	                        React.createElement("div", {className: "class-info-detail"}, 
	                            "比赛设置奖项，优秀产品将直接受到国内领先科技媒体的曝光，开放平台和投资机构将投以热切关注。"
	                        )
	                    ), 
	                    React.createElement("div", {className: "class-info-item"}, 
	                        React.createElement("div", {className: "class-info-title"}, 
	                            React.createElement("div", {className: "class-info-mark"}), 
	                            React.createElement("div", null, "参赛规则")
	                        ), 
	                        React.createElement("div", {className: "class-info-detail"}, 
	                            "本次黑客马拉松采用命题制，比赛开始后在现场公布命题，命题有多个，范围较广，将鼓励开发者从多角度去发挥，实现自己的创意。"
	                        ), 
	                        React.createElement("div", {className: "class-info-detail"}, 
	                            React.createElement("ul", null, 
	                                React.createElement("li", null, "参赛报名：开发者以个人身份报名，团队参赛每个成员都要单独报名。报名后我们会对参赛人员进行筛选，通过者将于在10月15 - 22日之间收到邀请邮件，比赛届时凭借参赛邀请签到，领取身份卡（不同参赛角色身份卡会有区别）"), 
	                                React.createElement("li", null, "团队规模：每个团队 2-5 人，团队最高人限 5 人、1 人最多参与 1 个团队。可提前组队，也可到现场自由组队（提前组队，每个成员都要报名哦）"), 
	                                React.createElement("li", null, "现场组队：现场会设有白板，准备现场组队的开发者可以用便利贴上写明自己是谁，能做什么，想做什么，在找怎样的人等等，不同的身份卡用于区分开发者角色，帮助更快组队"), 
	                                React.createElement("li", null, "备注：现场提供 Wi-Fi，参赛者需自带具备上网功能的笔记本电脑，特殊电源插头请自备转接口。")
	                            )
	                        )
	                    ), 
	                    React.createElement("div", {className: "class-info-item"}, 
	                        React.createElement("div", {className: "class-info-title"}, 
	                            React.createElement("div", {className: "class-info-mark"}), 
	                            React.createElement("div", null, "奖项设置")
	                        ), 
	                        React.createElement("div", {className: "class-info-detail"}, 
	                            React.createElement("ul", null, 
	                                React.createElement("li", null, "一等奖：Macbook Air 11'' + 1024*5 RMB"), 
	                                React.createElement("li", null, "二等奖：HHKB Pro 2 + 1024*3 RMB"), 
	                                React.createElement("li", null, "三等奖：Kindle Paperwhite 3 + 1024 RMB")
	                            )
	                        )
	                    )
	                )
	            )
	        );
	    }
	});

	module.exports = ActivityDtlPage;

/***/ },
/* 21 */
/***/ function(module, exports, __webpack_require__) {

	/**************************************************\
	                home页面
	\**************************************************/
	'use strict';
	var DB = __webpack_require__(8);
	var QRCodePage = React.createClass({displayName: "QRCodePage",

	    mixins: [],

	    getInitialState: function () {
	        return {
	            src : ''
	        };
	    },

	    componentDidMount : function(){
	        window.title = '签到';
	        var t = this;
	        DB.App.qrcodeurl().then(function (data) {
	            t.setState({src : data});
	        }, function(resp){
	            alert(resp.msg);
	        });
	    },
	    
	    render: function () {
	        var t = this;
	        return (
	            React.createElement("div", {className: "lflex lflex-v ai-center jc-center marg-60"}, 
	                React.createElement("img", {src: t.state.src, width: "250", height: "250"}), 
	                React.createElement("div", {className: "sao-tip"}, "扫码即可签到")
	            )
	        );
	    }
	});

	module.exports = QRCodePage;




/***/ },
/* 22 */
/***/ function(module, exports, __webpack_require__) {

	var Icon = __webpack_require__(14);
	var DB = __webpack_require__(8);

	var Map = React.createClass({displayName: "Map",

	    mixins: [],

	    getInitialState: function() {
	        return {
	            
	        };
	    },

	    linkTo : function(){
	        var t = this;
	        var hash = window.location.hash;
	        
	    },

	    componentDidMount: function() {
	        var t = this;
	        window.title = '地图';
	        //百度地图API功能
	        var map = new BMap.Map("BaiduMapPlace");            // 创建Map实例
	        
	        var point = new BMap.Point(120.010557,30.298561); // 创建点坐标
	        map.centerAndZoom(point,20);                 
	        map.enableScrollWheelZoom(true);

	        var mk = new BMap.Marker(point);
	        map.addOverlay(mk);
	        map.panTo(point);

	        // function myFun(result){
	        //     var cityName = result.name;
	        //     map.setCenter(cityName);
	        // }

	        // var myCity = new BMap.LocalCity();
	        // myCity.get(myFun); 

	        // map.addEventListener("click",function(e){
	        //     console.log(e.point.lng + "," + e.point.lat);
	        // }); 

	        // var geolocation = new BMap.Geolocation();
	        // geolocation.getCurrentPosition(function(r){
	        //     if(this.getStatus() == BMAP_STATUS_SUCCESS){
	        //         var mk = new BMap.Marker(r.point);
	        //         map.addOverlay(mk);
	        //         map.panTo(r.point);
	        //         alert('您的位置：'+r.point.lng+','+r.point.lat);
	        //     }
	        //     else {
	        //         alert('failed'+this.getStatus());
	        //     }        
	        // },{enableHighAccuracy: true});
	        var param = {
	            activity_id : 1
	        };
	        DB.App.mapPoints(param).then(function(data){
	            data.map(function(d){  
	                map.addOverlay(new BMap.Marker(new BMap.Point(d.longitude,d.latitude)));
	            });
	        });
	    },

	    render: function() {
	        var t = this;
	        var wid = $(window).width();
	        var hig = $(window).height() - 45;
	        return (
	            React.createElement("div", {id: "BaiduMapPlace", style: {'width':wid+'px','height':hig+'px'}})
	            
	        );
	    }
	});

	module.exports = Map;

/***/ },
/* 23 */
/***/ function(module, exports, __webpack_require__) {

	var Icon = React.createClass({displayName: "Icon",
	    getInitialState: function() {
	        return {};
	    },
	    render: function() {
	        var c = "iconfont leyo-app-icon-" + this.props.name;
	        return (
	            React.createElement("i", {className: c})
	        );
	    }
	});

	module.exports = Icon;

/***/ },
/* 24 */
/***/ function(module, exports, __webpack_require__) {

	var AppConfig = __webpack_require__(26);
	var Icon = __webpack_require__(14);
	var Image = __webpack_require__(29);

	var HomeHeader = React.createClass({displayName: "HomeHeader",

	    getInitialState: function() {
	        return {
	            hash : window.location.hash,
	            status: '',
	            routers : [{
	                hash : '#/sys/map/xxx',
	                title : '圈住小伙伴'
	            },{
	                hash : '#/sys/qrcode/xxx',
	                title : '签到二维码'
	            },{
	                hash : '#/sys/activities',
	                title : '活动'
	            },{
	                hash : '#/sys/activities/xxx',
	                title : '活动详情'
	            }]
	        };
	    },

	    getCurrentRouter : function(){
	        var hash = window.location.hash;
	        var routs = this.state.routers;
	        var cr = '';
	        routs.map(function(r){
	            if(r.hash === hash){
	                cr = r;
	                return;
	            }
	            if(r.hash.indexOf('/xxx') > -1){
	                var _ha = r.hash.replace('/xxx', '');
	                if(hash.indexOf(_ha) > -1){
	                    cr = r;
	                    return;
	                }
	            }
	        });
	        return cr;
	    },

	    animateSideMenu : function(){
	        // 'appContent'
	        $('#animateCover').show();
	        TweenLite.to("#appContent", 0.3, {
	            x: $('.side-menu').width(),
	            scale: 0.9,
	            ease:Power2.easeInOut
	        });
	    },

	    changeIdentity : function(){
	        var t = this;
	        var map = {
	            'user' : 'org',
	            'org' : 'user'
	        };
	        AppConfig.identity = map[AppConfig.identity];
	        if(t.props.onChangeIdentity){
	            t.props.onChangeIdentity(AppConfig.identity);
	        }
	        t.animateSideMenu();
	    },

	    goBack : function(){
	        window.history.back();
	    },

	    componentDidMount : function(){
	        var t = this;
	        // $(window).on('hashchange', function(){
	        //     t.setState({
	        //         hash : window.location.hash
	        //     });
	        // });
	    },

	    render: function() {
	        var t  = this;
	        var backBtn;
	        var cr = t.getCurrentRouter();
	        if(t.state.hash === '#/sys/org'){
	            backBtn = (React.createElement("div", {className: "header-back tTap", onClick: t.animateSideMenu}, 
	                        React.createElement(Icon, {name: "user"})
	                    ));
	        }else{
	            backBtn = (React.createElement("div", {className: "header-back tTap", onClick: t.goBack}, 
	                        React.createElement(Icon, {name: "back"})
	                    ));
	        }
	        return (
	            React.createElement("div", {className: "lflex leyo-header border-bottom"}, 
	                React.createElement("div", {className: "flex1 lflex jc-start"}, 
	                    backBtn, 
	                    React.createElement("div", {className: "header-change tTap", onClick: t.changeIdentity}, 
	                        React.createElement(Icon, {name: "change-identity"})
	                    )
	                ), 
	                React.createElement("div", {className: "flex1 header-title"}, 
	                    cr.title
	                ), 
	                React.createElement("div", {className: "flex1 header-more"}, 
	                    React.createElement(Icon, {name: "more"})
	                )
	            )
	        );
	    }
	}); 

	module.exports = HomeHeader;

/***/ },
/* 25 */
/***/ function(module, exports, __webpack_require__) {

	var AppConfig = __webpack_require__(26);

	var Icon = __webpack_require__(14);
	var Image = __webpack_require__(29);

	var SideMenu = React.createClass({displayName: "SideMenu",

	    getInitialState: function() {
	        return {
	        };
	    },

	    render: function() {
	        var t = this;
	        var iden = AppConfig.identity;
	        var sideObj = AppConfig[iden];
	        var menu = [];
	        sideObj.sideMenu.map(function(m, i){
	            menu.push(
	                React.createElement("div", {className: "side-menu-item", key: iden+'-smenu-'+i}, 
	                    React.createElement("div", {className: "lflex"}, 
	                        React.createElement("div", {className: "flex1"}, React.createElement(Icon, {name: m.icon})), 
	                        React.createElement("div", {className: "flex6"}, React.createElement("span", {className: "menu-item-title"}, m.menu)), 
	                        React.createElement("div", {className: "flex1"}, React.createElement(Icon, {name: "arrow-right"}))
	                    )
	                )
	            );
	        });
	        return (
	            React.createElement("div", {className: "lflex lflex-v layer side-menu"}, 
	                React.createElement("div", {className: "lflex ai-center menu-header"}, 
	                    React.createElement("div", {className: "flex5", style: {textAlign:'center'}}, 
	                        React.createElement("div", {className: "side-menu-avatar"}, 
	                            React.createElement(Icon, {name: "face-askance"})
	                        )
	                    ), 
	                    React.createElement("div", {className: "flex4"}, 
	                        React.createElement("div", {className: "lflex lflex-v"}, 
	                            React.createElement("div", {className: "nick-name"}, sideObj.name), 
	                            React.createElement("div", {className: "user-phone"}, sideObj.phone)
	                        )
	                    )
	                ), 
	                menu
	            )
	        );
	    }
	}); 

	module.exports = SideMenu;

/***/ },
/* 26 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = {
	    cdnDomain : 'http://liwenqiang.oss-cn-hangzhou.aliyuncs.com',
	    identity : 'user',
	    user:{
	        name : '姓名',
	        phone : '188 9818 7798',
	        avatar: '',
	        sideMenu : [{
	            menu : '个人信息',
	            icon : 'user-msg',
	            router : ''
	        },{
	            menu : '活动记录',
	            icon : 'activities',
	            router : ''
	        },{
	            menu : '成长日记',
	            icon : 'diary',
	            router : ''
	        }]
	    },
	    org:{
	        name : '名称',
	        phone : '188 8888 8888',
	        avatar: '',
	        sideMenu : [{
	            menu : '活动列表',
	            icon : 'activities',
	            router : ''
	        },{
	            menu : '设置',
	            icon : 'settings',
	            router : ''
	        }]
	    }
	};

/***/ },
/* 27 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(30);

/***/ },
/* 28 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(31);

/***/ },
/* 29 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(32);

/***/ },
/* 30 */
/***/ function(module, exports, __webpack_require__) {

	var ListScrollView = React.createClass({displayName: "ListScrollView",
	    componentDidMount : function(){
	        var t = this;
	        var tarId = "#"+t.props.id;
	        $(tarId).width($(window).width());
	        //滚动窗口的高度，计算所得
	        var scrollViewHeight = $(window).height() - $(tarId).offset().top;
	        $(tarId).height(scrollViewHeight);
	        $(tarId).css({
	            maxHeight : scrollViewHeight+'px',
	            overflowY : 'auto'
	        });
	        if(t.props.isAnimateShow){
	            $(tarId).height(0);
	        }
	    },

	    render: function() {
	        return (
	            React.createElement("div", React.__spread({},  this.props, {className: "list-scroll"}), 
	                this.props.children
	            )
	        );
	    }
	});

	var ListAnimateScroll = React.createClass({displayName: "ListAnimateScroll",

	    getInitialState: function() {
	        return {};
	    },

	    componentDidMount : function(){
	        var t = this;
	        var tarId = "#"+t.props.id;
	        $(tarId).width($(window).width());
	        //滚动窗口的高度，计算所得
	        var scrollViewHeight = $(window).height() - $(tarId).offset().top;
	        $(tarId).height(scrollViewHeight);
	        // 滚动背景
	        var scrollBack = $(tarId).find('.list-scroll-back').eq(0);
	        scrollBack.width($(window).width());
	        scrollBack.height(scrollViewHeight);
	        // 实际内页的高度
	        var pageLength = $('.list-drag-trigger').find('.list-item').length;
	        // 可视窗口的条数。
	        var viewSize = 6;
	        if(pageLength <= viewSize){
	            return;
	        }
	        // 一页总条数
	        var pageSize = 8;
	        var page = 1;
	        // 页内元素的高度
	        var pageItemHeight = $('.list-drag-trigger').find('.list-item').eq(0).height();
	        if(t.props.scrollAnimate){
	            Draggable.create('.list-drag-trigger', {
	                type:"y", 
	                throwProps:true, 
	                lockAxis:true,
	                bounds : tarId,
	                edgeResistance:0.5,
	                snap : {
	                    y : function(y){
	                        if(y > 0){
	                            return 0;
	                        }
	                        var scrollLimit = $('.list-drag-trigger').height() - scrollViewHeight;
	                        if(Math.abs(y) > scrollLimit){
	                            // this.props.onScrollOverTop();
	                            // this.props.onScrollOverBottom();
	                            return scrollLimit + scrollViewHeight;
	                        }
	                        return y;
	                    }
	                }
	            });
	        }
	    },

	    render: function() {
	        return (
	            React.createElement("div", React.__spread({},  this.props, {className: "list-scroll"}), 
	                React.createElement("div", {className: "list-scroll-back leyo-flex flex-v ai-stretch"}, 
	                    React.createElement("div", {className: "scroll-back-loading", style: {marginTop:'10px'}}, 
	                        React.createElement("div", {className: "scroll-back-img"}, React.createElement("img", {src: "//leyo-hangzhou.oss-cn-hangzhou.aliyuncs.com/leyo/images/page-loading.gif", width: "32", height: "32"})), 
	                        React.createElement("div", null, "即将刷新")
	                    ), 
	                    React.createElement("div", {className: "scroll-back-loading", style: {marginBottom:'10px'}}, 
	                        React.createElement("div", {className: "scroll-back-img"}, React.createElement("img", {src: "//leyo-hangzhou.oss-cn-hangzhou.aliyuncs.com/leyo/images/page-loading.gif", width: "32", height: "32"})), 
	                        React.createElement("div", null, "正在努力加载")
	                    )
	                ), 
	                React.createElement("div", {className: "list-drag-trigger"}, 
	                    this.props.children
	                )
	            )
	        );
	    }
	}); 
	var ListItem = React.createClass({displayName: "ListItem",

	    getInitialState: function() {
	        return {};
	    },

	    // componentDidMount : function(){
	    //     var t = this;
	    //     var dragTrigger = $('#'+t.props.id).find('.list-content');
	    //     var hideDom = dragTrigger.children().eq(1).children().eq(0);
	    //     // if(dragTrigger.length){
	    //     //     Draggable.create(dragTrigger.eq(0), {
	    //     //         type:"x", 
	    //     //         throwProps:true, 
	    //     //         lockAxis:true,
	    //     //         edgeResistance:0.65,
	    //     //         snap : {
	    //     //             x : function(x){
	    //     //                 if(x < 0){
	    //     //                     hideDom.hide();
	    //     //                     dragTrigger.css({zIndex : 97});
	    //     //                 }
	    //     //                 if(x > 0){
	    //     //                     hideDom.show();
	    //     //                     dragTrigger.css({zIndex : 99});
	    //     //                 }
	    //     //                 return 0;
	    //     //             }
	    //     //         }
	    //     //     });
	    //     // }
	    // },

	    render: function() {
	        var clas = this.props.className ? this.props.className : '';
	        return (
	            React.createElement("div", React.__spread({},  this.props, {className: "list-item border-bottom " + clas}), 
	                this.props.children
	            )
	        );
	    }
	}); 
	var List = React.createClass({displayName: "List",

	    getInitialState: function() {
	        return {};
	    },

	    componentDidMount : function(){
	        
	    },

	    render: function() {
	        return (
	            React.createElement("div", {className: "leyo-flex flex-v list"}, 
	                this.props.children
	            )
	        );
	    }
	}); 

	var Matrix = {
	    List : List,
	    ListItem : ListItem,
	    ListScrollView : ListScrollView
	};

	module.exports = Matrix;

/***/ },
/* 31 */
/***/ function(module, exports, __webpack_require__) {

	var require;var require;!function(e){if(true)module.exports=e();else if("function"==typeof define&&define.amd)define([],e);else{var f;"undefined"!=typeof window?f=window:"undefined"!=typeof global?f=global:"undefined"!=typeof self&&(f=self),f.Modal=e()}}(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return require(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
	module.exports = {
	    DropModal: require('./DropModal'),
	    WaveModal: require('./WaveModal'),
	    FlyModal: require('./FlyModal'),
	    FadeModal: require('./FadeModal'),
	    ScaleModal: require('./ScaleModal'),
	    OutlineModal: require('./OutlineModal')
	}

	},{"./DropModal":8,"./FadeModal":9,"./FlyModal":10,"./OutlineModal":11,"./ScaleModal":12,"./WaveModal":13}],2:[function(require,module,exports){
	'use strict';

	var getVendorPropertyName = require('./getVendorPropertyName');

	module.exports = function (target, sources){
	    var to = Object(target);
	    var hasOwnProperty = Object.prototype.hasOwnProperty;

	    for (var nextIndex = 1; nextIndex < arguments.length; nextIndex++) {
	        var nextSource = arguments[nextIndex];
	        if (nextSource == null) {
	            continue;
	        }

	        var from = Object(nextSource);

	        for (var key in from) {
	            if (hasOwnProperty.call(from, key)) {
	                to[key] = from[key];
	            }
	        }
	    }

	    var prefixed = {};
	    for (var key in to) {
	        prefixed[getVendorPropertyName(key)] = to[key]
	    }

	    return prefixed
	}

	},{"./getVendorPropertyName":4}],3:[function(require,module,exports){
	'use strict';

	var cssVendorPrefix;

	module.exports = function (){

	    if(cssVendorPrefix) return cssVendorPrefix;

	    var styles = window.getComputedStyle(document.documentElement, '');
	    var pre = (Array.prototype.slice.call(styles).join('').match(/-(moz|webkit|ms)-/) || (styles.OLink === '' && ['', 'o'])
	    )[1];

	    return cssVendorPrefix = '-' + pre + '-';
	}

	},{}],4:[function(require,module,exports){
	'use strict';

	var div = document.createElement('div');
	var prefixes = ['Moz', 'Webkit', 'O', 'ms'];
	var domVendorPrefix;

	// Helper function to get the proper vendor property name. (transition => WebkitTransition)
	module.exports = function (prop) {

	    if (prop in div.style) return prop;

	    var prop = prop.charAt(0).toUpperCase() + prop.substr(1);
	    if(domVendorPrefix){
	        return domVendorPrefix + prop;
	    }else{
	        for (var i=0; i<prefixes.length; ++i) {
	            var vendorProp = prefixes[i] + prop;
	            if (vendorProp in div.style) {
	                domVendorPrefix = prefixes[i];
	                return vendorProp;
	            }
	        }
	    }
	}

	},{}],5:[function(require,module,exports){
	'use strict';

	var insertRule = require('./insertRule');
	var vendorPrefix = require('./getVendorPrefix')();
	var index = 0;

	module.exports = function (keyframes) {
	    // random name
	    var name = 'anim_'+ (++index) + (+new Date);
	    var css = "@" + vendorPrefix + "keyframes " + name + " {";

	    for (var key in keyframes) {
	        css += key + " {";

	        for (var property in keyframes[key]) {
	            var part = ":" + keyframes[key][property] + ";";
	            // We do vendor prefix for every property
	            css += vendorPrefix + property + part;
	            css += property + part;
	        }

	        css += "}";
	    }

	    css += "}";

	    insertRule(css);

	    return name
	}

	},{"./getVendorPrefix":3,"./insertRule":6}],6:[function(require,module,exports){
	'use strict';

	var extraSheet;

	module.exports = function (css) {

	    if (!extraSheet) {
	        // First time, create an extra stylesheet for adding rules
	        extraSheet = document.createElement('style');
	        document.getElementsByTagName('head')[0].appendChild(extraSheet);
	        // Keep reference to actual StyleSheet object (`styleSheet` for IE < 9)
	        extraSheet = extraSheet.sheet || extraSheet.styleSheet;
	    }

	    var index = (extraSheet.cssRules || extraSheet.rules).length;
	    extraSheet.insertRule(css, index);

	    return extraSheet;
	}

	},{}],7:[function(require,module,exports){
	'use strict';

	/**
	 * EVENT_NAME_MAP is used to determine which event fired when a
	 * transition/animation ends, based on the style property used to
	 * define that event.
	 */
	var EVENT_NAME_MAP = {
	  transitionend: {
	    'transition': 'transitionend',
	    'WebkitTransition': 'webkitTransitionEnd',
	    'MozTransition': 'mozTransitionEnd',
	    'OTransition': 'oTransitionEnd',
	    'msTransition': 'MSTransitionEnd'
	  },

	  animationend: {
	    'animation': 'animationend',
	    'WebkitAnimation': 'webkitAnimationEnd',
	    'MozAnimation': 'mozAnimationEnd',
	    'OAnimation': 'oAnimationEnd',
	    'msAnimation': 'MSAnimationEnd'
	  }
	};

	var endEvents = [];

	function detectEvents() {
	  var testEl = document.createElement('div');
	  var style = testEl.style;

	  // On some platforms, in particular some releases of Android 4.x,
	  // the un-prefixed "animation" and "transition" properties are defined on the
	  // style object but the events that fire will still be prefixed, so we need
	  // to check if the un-prefixed events are useable, and if not remove them
	  // from the map
	  if (!('AnimationEvent' in window)) {
	    delete EVENT_NAME_MAP.animationend.animation;
	  }

	  if (!('TransitionEvent' in window)) {
	    delete EVENT_NAME_MAP.transitionend.transition;
	  }

	  for (var baseEventName in EVENT_NAME_MAP) {
	    var baseEvents = EVENT_NAME_MAP[baseEventName];
	    for (var styleName in baseEvents) {
	      if (styleName in style) {
	        endEvents.push(baseEvents[styleName]);
	        break;
	      }
	    }
	  }
	}

	if(typeof window !== 'undefined'){
	  detectEvents();
	}


	// We use the raw {add|remove}EventListener() call because EventListener
	// does not know how to remove event listeners and we really should
	// clean up. Also, these events are not triggered in older browsers
	// so we should be A-OK here.

	function addEventListener(node, eventName, eventListener) {
	  node.addEventListener(eventName, eventListener, false);
	}

	function removeEventListener(node, eventName, eventListener) {
	  node.removeEventListener(eventName, eventListener, false);
	}

	module.exports = {
	  addEndEventListener: function(node, eventListener) {
	    if (endEvents.length === 0) {
	      // If CSS transitions are not supported, trigger an "end animation"
	      // event immediately.
	      window.setTimeout(eventListener, 0);
	      return;
	    }
	    endEvents.forEach(function(endEvent) {
	      addEventListener(node, endEvent, eventListener);
	    });
	  },

	  removeEndEventListener: function(node, eventListener) {
	    if (endEvents.length === 0) {
	      return;
	    }
	    endEvents.forEach(function(endEvent) {
	      removeEventListener(node, endEvent, eventListener);
	    });
	  }
	};

	},{}],8:[function(require,module,exports){
	var modalFactory = require('./modalFactory');
	var insertKeyframesRule = require('react-kit/insertKeyframesRule');
	var appendVendorPrefix = require('react-kit/appendVendorPrefix');

	var animation = {
	    show: {
	        animationDuration: '0.4s',
	        animationTimingFunction: 'cubic-bezier(0.7,0,0.3,1)'
	    },

	    hide: {
	        animationDuration: '0.4s',
	        animationTimingFunction: 'cubic-bezier(0.7,0,0.3,1)'
	    },

	    showModalAnimation: insertKeyframesRule({
	        '0%': {
	            opacity: 0,
	            transform: 'translate3d(-50%, -300px, 0)'
	        },
	        '100%': {
	            opacity: 1,
	            transform: 'translate3d(-50%, -50%, 0)'
	        }
	    }),

	    hideModalAnimation: insertKeyframesRule({
	        '0%': {
	            opacity: 1,
	            transform: 'translate3d(-50%, -50%, 0)'
	        },
	        '100%': {
	            opacity: 0,
	            transform: 'translate3d(-50%, 100px, 0)'
	        }
	    }),

	    showBackdropAnimation: insertKeyframesRule({
	        '0%': {
	            opacity: 0
	        },
	        '100%': {
	            opacity: 0.85
	        }
	    }),

	    hideBackdropAnimation: insertKeyframesRule({
	        '0%': {
	            opacity: 0.85
	        },
	        '100%': {
	            opacity: 0
	        }
	    }),

	    showContentAnimation: insertKeyframesRule({
	        '0%': {
	            opacity: 0,
	            transform: 'translate3d(0, -20px, 0)'
	        },
	        '100%': {
	            opacity: 1,
	            transform: 'translate3d(0, 0, 0)'
	        }
	    }),

	    hideContentAnimation: insertKeyframesRule({
	        '0%': {
	            opacity: 1,
	            transform: 'translate3d(0, 0, 0)'
	        },
	        '100%': {
	            opacity: 0,
	            transform: 'translate3d(0, 50px, 0)'
	        }
	    })
	};

	var showAnimation = animation.show;
	var hideAnimation = animation.hide;
	var showModalAnimation = animation.showModalAnimation;
	var hideModalAnimation = animation.hideModalAnimation;
	var showBackdropAnimation = animation.showBackdropAnimation;
	var hideBackdropAnimation = animation.hideBackdropAnimation;
	var showContentAnimation = animation.showContentAnimation;
	var hideContentAnimation = animation.hideContentAnimation;

	module.exports = modalFactory({
	    getRef: function(willHidden) {
	        return 'modal';
	    },
	    getModalStyle: function(willHidden) {
	        return appendVendorPrefix({
	            position: "fixed",
	            transform: "translate3d(-50%, -50%, 0)",
	            top: "50%",
	            left: "50%",
	            backgroundColor: "white",
	            zIndex: 1050,
	            animationDuration: (willHidden ? hideAnimation : showAnimation).animationDuration,
	            animationFillMode: 'forwards',
	            animationName: willHidden ? hideModalAnimation : showModalAnimation,
	            animationTimingFunction: (willHidden ? hideAnimation : showAnimation).animationTimingFunction
	        })
	    },
	    getBackdropStyle: function(willHidden) {
	        return appendVendorPrefix({
	            position: "fixed",
	            top: 0,
	            right: 0,
	            bottom: 0,
	            left: 0,
	            zIndex: 1040,
	            backgroundColor: "#262626",
	            animationDuration: (willHidden ? hideAnimation : showAnimation).animationDuration,
	            animationFillMode: 'forwards',
	            animationName: willHidden ? hideBackdropAnimation : showBackdropAnimation,
	            animationTimingFunction: (willHidden ? hideAnimation : showAnimation).animationTimingFunction
	        });
	    },
	    getContentStyle: function(willHidden) {
	        return appendVendorPrefix({
	            margin: 0,
	            animationDuration: (willHidden ? hideAnimation : showAnimation).animationDuration,
	            animationFillMode: 'forwards',
	            animationDelay: '0.25s',
	            animationName: showContentAnimation,
	            animationTimingFunction: (willHidden ? hideAnimation : showAnimation).animationTimingFunction
	        })
	    }
	});

	},{"./modalFactory":14,"react-kit/appendVendorPrefix":2,"react-kit/insertKeyframesRule":5}],9:[function(require,module,exports){
	var modalFactory = require('./modalFactory');
	var insertKeyframesRule = require('react-kit/insertKeyframesRule');
	var appendVendorPrefix = require('react-kit/appendVendorPrefix');

	var animation = {
	    show: {
	        animationDuration: '0.3s',
	        animationTimingFunction: 'ease-out'
	    },
	    hide: {
	        animationDuration: '0.3s',
	        animationTimingFunction: 'ease-out'
	    },
	    showContentAnimation: insertKeyframesRule({

	        '0%': {
	            opacity: 0
	        },
	        '100%': {
	            opacity: 1
	        }
	    }),

	    hideContentAnimation: insertKeyframesRule({
	        '0%': {
	            opacity: 1
	        },
	        '100%': {
	            opacity: 0
	        }
	    }),

	    showBackdropAnimation: insertKeyframesRule({
	        '0%': {
	            opacity: 0
	        },
	        '100%': {
	            opacity: 0.85
	        },
	    }),

	    hideBackdropAnimation: insertKeyframesRule({
	        '0%': {
	            opacity: 0.85
	        },
	        '100%': {
	            opacity: 0
	        }
	    })
	};

	var showAnimation = animation.show;
	var hideAnimation = animation.hide;
	var showContentAnimation = animation.showContentAnimation;
	var hideContentAnimation = animation.hideContentAnimation;
	var showBackdropAnimation = animation.showBackdropAnimation;
	var hideBackdropAnimation = animation.hideBackdropAnimation;

	module.exports = modalFactory({
	    getRef: function(willHidden) {
	        return 'content';
	    },
	    getModalStyle: function(willHidden) {
	        return appendVendorPrefix({
	            zIndex: 1050,
	            position: "fixed",
	            transform: "translate3d(-50%, -50%, 0)",
	            top: "50%",
	            left: "50%"
	        })
	    },
	    getBackdropStyle: function(willHidden) {
	        return appendVendorPrefix({
	            position: "fixed",
	            top: 0,
	            right: 0,
	            bottom: 0,
	            left: 0,
	            zIndex: 1040,
	            backgroundColor: "#262626",
	            animationFillMode: 'forwards',
	            animationDuration: '0.3s',
	            animationName: willHidden ? hideBackdropAnimation : showBackdropAnimation,
	            animationTimingFunction: (willHidden ? hideAnimation : showAnimation).animationTimingFunction
	        });
	    },
	    getContentStyle: function(willHidden) {
	        return appendVendorPrefix({
	            margin: 0,
	            animationDuration: (willHidden ? hideAnimation : showAnimation).animationDuration,
	            animationFillMode: 'forwards',
	            animationName: willHidden ? hideContentAnimation : showContentAnimation,
	            animationTimingFunction: (willHidden ? hideAnimation : showAnimation).animationTimingFunction
	        })
	    }
	});

	},{"./modalFactory":14,"react-kit/appendVendorPrefix":2,"react-kit/insertKeyframesRule":5}],10:[function(require,module,exports){
	var modalFactory = require('./modalFactory');
	var insertKeyframesRule = require('react-kit/insertKeyframesRule');
	var appendVendorPrefix = require('react-kit/appendVendorPrefix');

	var animation = {
	    show: {
	        animationDuration: '0.5s',
	        animationTimingFunction: 'ease-out'
	    },
	    hide: {
	        animationDuration: '0.5s',
	        animationTimingFunction: 'ease-out'
	    },
	    showContentAnimation: insertKeyframesRule({

	        '0%': {
	            opacity: 0,
	            transform: 'translate3d(calc(-100vw - 50%), 0, 0)'
	        },
	        '50%': {
	            opacity: 1,
	            transform: 'translate3d(100px, 0, 0)'
	        },
	        '100%': {
	            opacity: 1,
	            transform: 'translate3d(0, 0, 0)'
	        }
	    }),

	    hideContentAnimation: insertKeyframesRule({

	        '0%': {
	            opacity: 1,
	            transform: 'translate3d(0, 0, 0)'
	        },
	        '50%': {
	            opacity: 1,
	            transform: 'translate3d(-100px, 0, 0) scale3d(1.1, 1.1, 1)'
	        },
	        '100%': {
	            opacity: 0,
	            transform: 'translate3d(calc(100vw + 50%), 0, 0)'
	        },
	    }),

	    showBackdropAnimation: insertKeyframesRule({
	        '0%': {
	            opacity: 0
	        },
	        '100%': {
	            opacity: 0.85
	        },
	    }),

	    hideBackdropAnimation: insertKeyframesRule({
	        '0%': {
	            opacity: 0.85
	        },
	        '90%': {
	            opactiy: 0.85
	        },
	        '100%': {
	            opacity: 0
	        }
	    })
	};

	var showAnimation = animation.show;
	var hideAnimation = animation.hide;
	var showContentAnimation = animation.showContentAnimation;
	var hideContentAnimation = animation.hideContentAnimation;
	var showBackdropAnimation = animation.showBackdropAnimation;
	var hideBackdropAnimation = animation.hideBackdropAnimation;

	module.exports = modalFactory({
	    getRef: function(willHidden) {
	        return 'content';
	    },
	    getModalStyle: function(willHidden) {
	        return appendVendorPrefix({
	            zIndex: 1050,
	            position: "fixed",
	            transform: "translate3d(-50%, -50%, 0)",
	            top: "30%",
	            left: "50%"
	        })
	    },
	    getBackdropStyle: function(willHidden) {
	        return appendVendorPrefix({
	            position: "fixed",
	            top: 0,
	            right: 0,
	            bottom: 0,
	            left: 0,
	            zIndex: 1040,
	            backgroundColor: "#262626",
	            animationFillMode: 'forwards',
	            animationDuration: '0.3s',
	            animationName: willHidden ? hideBackdropAnimation : showBackdropAnimation,
	            animationTimingFunction: (willHidden ? hideAnimation : showAnimation).animationTimingFunction
	        });
	    },
	    getContentStyle: function(willHidden) {
	        return appendVendorPrefix({
	            margin: 0,
	            animationDuration: (willHidden ? hideAnimation : showAnimation).animationDuration,
	            animationFillMode: 'forwards',
	            animationName: willHidden ? hideContentAnimation : showContentAnimation,
	            animationTimingFunction: (willHidden ? hideAnimation : showAnimation).animationTimingFunction
	        });
	    }
	});

	},{"./modalFactory":14,"react-kit/appendVendorPrefix":2,"react-kit/insertKeyframesRule":5}],11:[function(require,module,exports){
	var modalFactory = require('./modalFactory');

	var React = (window.React);
	var insertKeyframesRule = require('react-kit/insertKeyframesRule');
	var appendVendorPrefix = require('react-kit/appendVendorPrefix');

	var animation = {
	    show: {
	        animationDuration: '0.8s',
	        animationTimingFunction: 'cubic-bezier(0.6,0,0.4,1)'
	    },
	    hide: {
	        animationDuration: '0.4s',
	        animationTimingFunction: 'ease-out'
	    },
	    showContentAnimation: insertKeyframesRule({
	        '0%': {
	            opacity: 0,
	        },
	        '40%':{
	            opacity: 0
	        },
	        '100%': {
	            opacity: 1,
	        }
	    }),

	    hideContentAnimation: insertKeyframesRule({
	        '0%': {
	            opacity: 1
	        },
	        '100%': {
	            opacity: 0,
	        }
	    }),

	    showBackdropAnimation: insertKeyframesRule({
	        '0%': {
	            opacity: 0
	        },
	        '100%': {
	            opacity: 0.85
	        },
	    }),

	    hideBackdropAnimation: insertKeyframesRule({
	        '0%': {
	            opacity: 0.85
	        },
	        '100%': {
	            opacity: 0
	        }
	    })
	};

	var showAnimation = animation.show;
	var hideAnimation = animation.hide;
	var showContentAnimation = animation.showContentAnimation;
	var hideContentAnimation = animation.hideContentAnimation;
	var showBackdropAnimation = animation.showBackdropAnimation;
	var hideBackdropAnimation = animation.hideBackdropAnimation;

	module.exports = modalFactory({
	    getRef: function(willHidden) {
	        return 'content';
	    },
	    getSharp: function(willHidden) {
	        var strokeDashLength = 1680;

	        var showSharpAnimation = insertKeyframesRule({
	            '0%': {
	                'stroke-dashoffset': strokeDashLength
	            },
	            '100%': {
	                'stroke-dashoffset': 0
	            },
	        });


	        var sharpStyle = {
	            position: 'absolute',
	            width: 'calc(100%)',
	            height: 'calc(100%)',
	            zIndex: '-1'
	        };

	        var rectStyle = appendVendorPrefix({
	            animationDuration: willHidden? '0.4s' :'0.8s',
	            animationFillMode: 'forwards',
	            animationName: willHidden? hideContentAnimation: showSharpAnimation,
	            stroke: '#ffffff',
	            strokeWidth: '2px',
	            strokeDasharray: strokeDashLength
	        });

	        return React.createElement("div", {style: sharpStyle}, 
	            React.createElement("svg", {
	                xmlns: "http://www.w3.org/2000/svg", 
	                width: "100%", 
	                height: "100%", 
	                viewBox: "0 0 496 136", 
	                preserveAspectRatio: "none"}, 
	                React.createElement("rect", {style: rectStyle, 
	                    x: "2", 
	                    y: "2", 
	                    fill: "none", 
	                    width: "492", 
	                    height: "132"})
	            )
	        )
	    },
	    getModalStyle: function(willHidden) {
	        return appendVendorPrefix({
	            zIndex: 1050,
	            position: "fixed",
	            transform: "translate3d(-50%, -50%, 0)",
	            top: "50%",
	            left: "50%"
	        })
	    },
	    getBackdropStyle: function(willHidden) {
	        return appendVendorPrefix({
	            position: "fixed",
	            top: 0,
	            right: 0,
	            bottom: 0,
	            left: 0,
	            zIndex: 1040,
	            backgroundColor: "#262626",
	            animationFillMode: 'forwards',
	            animationDuration: '0.4s',
	            animationName: willHidden ? hideBackdropAnimation : showBackdropAnimation,
	            animationTimingFunction: (willHidden ? hideAnimation : showAnimation).animationTimingFunction
	        });
	    },
	    getContentStyle: function(willHidden) {
	        return appendVendorPrefix({
	            margin: 0,
	            animationDuration: (willHidden ? hideAnimation : showAnimation).animationDuration,
	            animationFillMode: 'forwards',
	            animationName: willHidden ? hideContentAnimation : showContentAnimation,
	            animationTimingFunction: (willHidden ? hideAnimation : showAnimation).animationTimingFunction
	        })
	    }
	});

	},{"./modalFactory":14,"react-kit/appendVendorPrefix":2,"react-kit/insertKeyframesRule":5}],12:[function(require,module,exports){
	var modalFactory = require('./modalFactory');
	var insertKeyframesRule = require('react-kit/insertKeyframesRule');
	var appendVendorPrefix = require('react-kit/appendVendorPrefix');

	var animation = {
	    show: {
	        animationDuration: '0.4s',
	        animationTimingFunction: 'cubic-bezier(0.6,0,0.4,1)'
	    },
	    hide: {
	        animationDuration: '0.4s',
	        animationTimingFunction: 'ease-out'
	    },
	    showContentAnimation: insertKeyframesRule({
	        '0%': {
	            opacity: 0,
	            transform: 'scale3d(0, 0, 1)'
	        },
	        '100%': {
	            opacity: 1,
	            transform: 'scale3d(1, 1, 1)'
	        }
	    }),

	    hideContentAnimation: insertKeyframesRule({
	        '0%': {
	            opacity: 1
	        },
	        '100%': {
	            opacity: 0,
	            transform: 'scale3d(0.5, 0.5, 1)'
	        }
	    }),

	    showBackdropAnimation: insertKeyframesRule({
	        '0%': {
	            opacity: 0
	        },
	        '100%': {
	            opacity: 0.8
	        },
	    }),

	    hideBackdropAnimation: insertKeyframesRule({
	        '0%': {
	            opacity: 0.8
	        },
	        '100%': {
	            opacity: 0
	        }
	    })
	};

	var showAnimation = animation.show;
	var hideAnimation = animation.hide;
	var showContentAnimation = animation.showContentAnimation;
	var hideContentAnimation = animation.hideContentAnimation;
	var showBackdropAnimation = animation.showBackdropAnimation;
	var hideBackdropAnimation = animation.hideBackdropAnimation;

	module.exports = modalFactory({
	    getRef: function(willHidden) {
	        return 'content';
	    },
	    getModalStyle: function(willHidden) {
	        return appendVendorPrefix({
	            zIndex: 1050,
	            position: "fixed",
	            transform: "translate3d(-50%, -50%, 0)",
	            top: "50%",
	            left: "50%"
	        })
	    },
	    getBackdropStyle: function(willHidden) {
	        return appendVendorPrefix({
	            position: "fixed",
	            top: 0,
	            right: 0,
	            bottom: 0,
	            left: 0,
	            zIndex: 1040,
	            backgroundColor: "#262626",
	            animationFillMode: 'forwards',
	            animationDuration: '0.4s',
	            animationName: willHidden ? hideBackdropAnimation : showBackdropAnimation,
	            animationTimingFunction: (willHidden ? hideAnimation : showAnimation).animationTimingFunction
	        });
	    },
	    getContentStyle: function(willHidden) {
	        return appendVendorPrefix({
	            margin: 0,
	            animationDuration: (willHidden ? hideAnimation : showAnimation).animationDuration,
	            animationFillMode: 'forwards',
	            animationName: willHidden ? hideContentAnimation : showContentAnimation,
	            animationTimingFunction: (willHidden ? hideAnimation : showAnimation).animationTimingFunction
	        })
	    }
	});

	},{"./modalFactory":14,"react-kit/appendVendorPrefix":2,"react-kit/insertKeyframesRule":5}],13:[function(require,module,exports){
	var modalFactory = require('./modalFactory');
	var insertKeyframesRule = require('react-kit/insertKeyframesRule');
	var appendVendorPrefix = require('react-kit/appendVendorPrefix');

	var animation = {
	    show: {
	        animationDuration: '1s',
	        animationTimingFunction: 'linear'
	    },
	    hide: {
	        animationDuration: '0.3s',
	        animationTimingFunction: 'ease-out'
	    },
	    showContentAnimation: insertKeyframesRule({
	        '0%': {
	            opacity: 0,
	            transform: 'matrix3d(0.7, 0, 0, 0, 0, 0.7, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1)'
	        },
	        '2.083333%': {
	            transform: 'matrix3d(0.75266, 0, 0, 0, 0, 0.76342, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1)'
	        },
	        '4.166667%': {
	            transform: 'matrix3d(0.81071, 0, 0, 0, 0, 0.84545, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1)'
	        },
	        '6.25%': {
	            transform: 'matrix3d(0.86808, 0, 0, 0, 0, 0.9286, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1)'
	        },
	        '8.333333%': {
	            transform: 'matrix3d(0.92038, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1)'
	        },
	        '10.416667%': {
	            transform: 'matrix3d(0.96482, 0, 0, 0, 0, 1.05202, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1)'
	        },
	        '12.5%': {
	            transform: 'matrix3d(1, 0, 0, 0, 0, 1.08204, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1)'
	        },
	        '14.583333%': {
	            transform: 'matrix3d(1.02563, 0, 0, 0, 0, 1.09149, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1)'
	        },
	        '16.666667%': {
	            transform: 'matrix3d(1.04227, 0, 0, 0, 0, 1.08453, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1)'
	        },
	        '18.75%': {
	            transform: 'matrix3d(1.05102, 0, 0, 0, 0, 1.06666, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1)'
	        },
	        '20.833333%': {
	            transform: 'matrix3d(1.05334, 0, 0, 0, 0, 1.04355, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1)'
	        },
	        '22.916667%': {
	            transform: 'matrix3d(1.05078, 0, 0, 0, 0, 1.02012, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1)'
	        },
	        '25%': {
	            transform: 'matrix3d(1.04487, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1)'
	        },
	        '27.083333%': {
	            transform: 'matrix3d(1.03699, 0, 0, 0, 0, 0.98534, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1)'
	        },
	        '29.166667%': {
	            transform: 'matrix3d(1.02831, 0, 0, 0, 0, 0.97688, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1)'
	        },
	        '31.25%': {
	            transform: 'matrix3d(1.01973, 0, 0, 0, 0, 0.97422, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1)'
	        },
	        '33.333333%': {
	            transform: 'matrix3d(1.01191, 0, 0, 0, 0, 0.97618, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1)'
	        },
	        '35.416667%': {
	            transform: 'matrix3d(1.00526, 0, 0, 0, 0, 0.98122, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1)'
	        },
	        '37.5%': {
	            transform: 'matrix3d(1, 0, 0, 0, 0, 0.98773, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1)'
	        },
	        '39.583333%': {
	            transform: 'matrix3d(0.99617, 0, 0, 0, 0, 0.99433, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1)'
	        },
	        '41.666667%': {
	            transform: 'matrix3d(0.99368, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1)'
	        },
	        '43.75%': {
	            transform: 'matrix3d(0.99237, 0, 0, 0, 0, 1.00413, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1)'
	        },
	        '45.833333%': {
	            transform: 'matrix3d(0.99202, 0, 0, 0, 0, 1.00651, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1)'
	        },
	        '47.916667%': {
	            transform: 'matrix3d(0.99241, 0, 0, 0, 0, 1.00726, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1)'
	        },
	        '50%': {
	            opacity: 1,
	            transform: 'matrix3d(0.99329, 0, 0, 0, 0, 1.00671, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1)'
	        },
	        '52.083333%': {
	            transform: 'matrix3d(0.99447, 0, 0, 0, 0, 1.00529, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1)'
	        },
	        '54.166667%': {
	            transform: 'matrix3d(0.99577, 0, 0, 0, 0, 1.00346, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1)'
	        },
	        '56.25%': {
	            transform: 'matrix3d(0.99705, 0, 0, 0, 0, 1.0016, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1)'
	        },
	        '58.333333%': {
	            transform: 'matrix3d(0.99822, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1)'
	        },
	        '60.416667%': {
	            transform: 'matrix3d(0.99921, 0, 0, 0, 0, 0.99884, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1)'
	        },
	        '62.5%': {
	            transform: 'matrix3d(1, 0, 0, 0, 0, 0.99816, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1)'
	        },
	        '64.583333%': {
	            transform: 'matrix3d(1.00057, 0, 0, 0, 0, 0.99795, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1)'
	        },
	        '66.666667%': {
	            transform: 'matrix3d(1.00095, 0, 0, 0, 0, 0.99811, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1)'
	        },
	        '68.75%': {
	            transform: 'matrix3d(1.00114, 0, 0, 0, 0, 0.99851, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1)'
	        },
	        '70.833333%': {
	            transform: 'matrix3d(1.00119, 0, 0, 0, 0, 0.99903, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1)'
	        },
	        '72.916667%': {
	            transform: 'matrix3d(1.00114, 0, 0, 0, 0, 0.99955, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1)'
	        },
	        '75%': {
	            transform: 'matrix3d(1.001, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1)'
	        },
	        '77.083333%': {
	            transform: 'matrix3d(1.00083, 0, 0, 0, 0, 1.00033, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1)'
	        },
	        '79.166667%': {
	            transform: 'matrix3d(1.00063, 0, 0, 0, 0, 1.00052, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1)'
	        },
	        '81.25%': {
	            transform: 'matrix3d(1.00044, 0, 0, 0, 0, 1.00058, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1)'
	        },
	        '83.333333%': {
	            transform: 'matrix3d(1.00027, 0, 0, 0, 0, 1.00053, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1)'
	        },
	        '85.416667%': {
	            transform: 'matrix3d(1.00012, 0, 0, 0, 0, 1.00042, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1)'
	        },
	        '87.5%': {
	            transform: 'matrix3d(1, 0, 0, 0, 0, 1.00027, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1)'
	        },
	        '89.583333%': {
	            transform: 'matrix3d(0.99991, 0, 0, 0, 0, 1.00013, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1)'
	        },
	        '91.666667%': {
	            transform: 'matrix3d(0.99986, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1)'
	        },
	        '93.75%': {
	            transform: 'matrix3d(0.99983, 0, 0, 0, 0, 0.99991, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1)'
	        },
	        '95.833333%': {
	            transform: 'matrix3d(0.99982, 0, 0, 0, 0, 0.99985, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1)'
	        },
	        '97.916667%': {
	            transform: 'matrix3d(0.99983, 0, 0, 0, 0, 0.99984, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1)'
	        },
	        '100%': {
	            opacity: 1,
	            transform: 'matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1)'
	        }
	    }),

	    hideContentAnimation: insertKeyframesRule({
	        '0%': {
	            opacity: 1
	        },
	        '100%': {
	            opacity: 0,
	            transform: 'scale3d(0.8, 0.8, 1)'
	        },
	    }),

	    showBackdropAnimation: insertKeyframesRule({
	        '0%': {
	            opacity: 0
	        },
	        '100%': {
	            opacity: 0.85
	        },
	    }),

	    hideBackdropAnimation: insertKeyframesRule({
	        '0%': {
	            opacity: 0.85
	        },
	        '100%': {
	            opacity: 0
	        }
	    })
	};

	var showAnimation = animation.show;
	var hideAnimation = animation.hide;
	var showContentAnimation = animation.showContentAnimation;
	var hideContentAnimation = animation.hideContentAnimation;
	var showBackdropAnimation = animation.showBackdropAnimation;
	var hideBackdropAnimation = animation.hideBackdropAnimation;

	module.exports = modalFactory({
	    getRef: function(willHidden) {
	        return 'content';
	    },
	    getModalStyle: function(willHidden) {
	        return appendVendorPrefix({
	            zIndex: 1050,
	            position: "fixed",
	            transform: "translate3d(-50%, -50%, 0)",
	            top: "50%",
	            left: "50%"
	        })
	    },
	    getBackdropStyle: function(willHidden) {
	        return appendVendorPrefix({
	            position: "fixed",
	            top: 0,
	            right: 0,
	            bottom: 0,
	            left: 0,
	            zIndex: 1040,
	            backgroundColor: "#262626",
	            animationFillMode: 'forwards',
	            animationDuration: '0.3s',
	            animationName: willHidden ? hideBackdropAnimation : showBackdropAnimation,
	            animationTimingFunction: (willHidden ? hideAnimation : showAnimation).animationTimingFunction
	        });
	    },
	    getContentStyle: function(willHidden) {
	        return appendVendorPrefix({
	            margin: 0,
	            animationDuration: (willHidden ? hideAnimation : showAnimation).animationDuration,
	            animationFillMode: 'forwards',
	            animationName: willHidden ? hideContentAnimation : showContentAnimation,
	            animationTimingFunction: (willHidden ? hideAnimation : showAnimation).animationTimingFunction
	        })
	    }
	});

	},{"./modalFactory":14,"react-kit/appendVendorPrefix":2,"react-kit/insertKeyframesRule":5}],14:[function(require,module,exports){
	var React = (window.React);
	var transitionEvents = require('react-kit/transitionEvents');

	module.exports = function(animation){

	    return React.createClass({
	        propTypes: {
	            className: React.PropTypes.string,
	            // Close the modal when esc is pressed? Defaults to true.
	            keyboard: React.PropTypes.bool,
	            onShow: React.PropTypes.func,
	            onHide: React.PropTypes.func,
	            animation: React.PropTypes.object,
	            backdrop: React.PropTypes.oneOfType([
	                React.PropTypes.bool,
	                React.PropTypes.string
	            ])
	        },

	        getDefaultProps: function() {
	            return {
	                className: "",
	                onShow: function(){},
	                onHide: function(){},
	                animation: animation,
	                keyboard: true,
	                backdrop: true
	            };
	        },

	        getInitialState: function(){
	            return {
	                willHidden: false,
	                hidden: true
	            }
	        },

	        hasHidden: function(){
	            return this.state.hidden;
	        },

	        componentDidMount: function(){
	            var ref = this.props.animation.getRef();
	            var node = this.refs[ref];
	            var endListener = function(e) {
	                if (e && e.target !== node) {
	                    return;
	                }
	                transitionEvents.removeEndEventListener(node, endListener);
	                this.enter();

	            }.bind(this);
	            transitionEvents.addEndEventListener(node, endListener);
	        },

	        render: function() {

	            var hidden = this.hasHidden();
	            if(hidden) return null;

	            var willHidden = this.state.willHidden;
	            var animation = this.props.animation;
	            var modalStyle = animation.getModalStyle(willHidden);
	            var backdropStyle = animation.getBackdropStyle(willHidden);
	            var contentStyle = animation.getContentStyle(willHidden);
	            var ref = animation.getRef(willHidden);
	            var sharp = animation.getSharp && animation.getSharp(willHidden);
	            var backdrop = this.props.backdrop? React.createElement("div", {onClick: this.hide, style: backdropStyle}): undefined;

	            if(willHidden) {
	                var node = this.refs[ref];
	                var endListener = function(e) {
	                    if (e && e.target !== node) {
	                        return;
	                    }

	                    transitionEvents.removeEndEventListener(node, endListener);
	                    this.leave();

	                }.bind(this);
	                transitionEvents.addEndEventListener(node, endListener);
	            }

	            return (React.createElement("span", null, 
	                React.createElement("div", {ref: "modal", style: modalStyle, className: this.props.className}, 
	                    sharp, 
	                    React.createElement("div", {ref: "content", tabIndex: "-1", style: contentStyle}, 
	                        this.props.children
	                    )
	                ), 
	                backdrop
	             ))
	            ;
	        },

	        leave: function(){
	            this.setState({
	                hidden: true
	            });
	            this.props.onHide();
	        },

	        enter: function(){
	            this.props.onShow();
	        },

	        show: function(){
	            if(!this.hasHidden()) return;

	            this.setState({
	                willHidden: false,
	                hidden: false
	            });
	        },

	        hide: function(){
	            if(this.hasHidden()) return;

	            this.setState({
	                willHidden: true
	            });
	        },

	        toggle: function(){
	            if(this.hasHidden())
	                this.show();
	            else
	                this.hide();
	        },

	        listenKeyboard: function(event) {
	            if (this.props.keyboard &&
	                    (event.key === "Escape" ||
	                     event.keyCode === 27)) {
	                this.hide();
	            }
	        },

	        componentDidMount: function() {
	            window.addEventListener("keydown", this.listenKeyboard, true);
	        },

	        componentWillUnmount: function() {
	            window.removeEventListener("keydown", this.listenKeyboard, true);
	        },

	    });

	}

	},{"react-kit/transitionEvents":7}]},{},[1])(1)
	});

/***/ },
/* 32 */
/***/ function(module, exports, __webpack_require__) {

	var AppConfig = __webpack_require__(26);
	var Image = React.createClass({displayName: "Image",
	    getInitialState: function() {
	        return {
	            src: this.props.name,
	            path : AppConfig.cdnDomain + AppConfig.cdnPrefix + '/images/'
	        };
	    },
	    render: function() {
	        var t = this;
	        var dpr = window.devicePixelRatio;
	        var src = this.state.src;
	        var srcs = src.split('.');
	        // 如果是gif直接返回无须处理
	        if(srcs[srcs.length-1] === 'gif'){
	            return (
	                React.createElement("img", {className: imgClass, src: this.state.path + src})
	            );
	        }

	        var widInd = 0;
	        if(dpr >= 3){
	            src = srcs[0] + '-3.' + srcs[1];
	            widInd = 1;
	        }else{
	            src = srcs[0] + '-2.' + srcs[1];
	        }

	        var wid = $(window).width();
	        var isFull = this.props.isFull;
	        
	        if(!isFull){
	            if(this.props.width.length){
	                wid = this.props.width[widInd];
	            }else{
	                wid = this.props.width;
	            }
	        }

	        if(this.props.padding){
	            wid -= this.props.padding;
	        }

	        var isCircle = this.props.isCircle;
	        var imgClass = 'image-setting';
	        if(isCircle){
	            imgClass += ' img-circle';
	        }
	        return (
	            React.createElement("img", {className: imgClass, src: this.state.path + src, style: {width:wid+'px'}})
	        );
	    }
	});

	module.exports = Image;

/***/ }
/******/ ])