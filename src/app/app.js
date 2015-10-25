if(localStorage.getItem("user")){
    location.href = '#/sys/activities';
}

// 应用首页
// var PageHome           = require('../pages/HomePage');
// 登录
var PageLogin          = require('../pages/LoginPage');
// 注册
// var PageRegister       = require('../pages/RegisterPage');
// 用户页面控制器
var PageSys            = require('../pages/SysControlPage');
// 404页面
var Page404            = require('../pages/404Page');

var Locations = Router.Locations;
var Location = Router.Location;
var NotFound = Router.NotFound;


var APP = React.createClass({
    render: function() {
        return (
            <Locations hash>
                <Location path="/"                 handler={PageLogin}/>
                <Location path="/login"            handler={PageLogin}/>
                <Location path="/login/:actId"     handler={PageLogin}/>
                <Location path="/sys(/*)"          handler={PageSys}/>
                <NotFound handler={Page404}/>
            </Locations>
        )
    }
});

module.exports = APP;