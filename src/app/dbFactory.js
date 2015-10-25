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
var isGlobalForceMock =  __LOCAL__;

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