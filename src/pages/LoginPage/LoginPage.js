/**************************************************\
                登录页面
\**************************************************/
'use strict';

var Icon = require('../../components/Icon');
var DB = require('../../app/db');

var Header = React.createClass({

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
            <div className="lflex leyo-header">
                <div className="flex1 tTap header-back" onClick={t.goToBack}>
                    <Icon name="back" />
                </div>
                <div className="flex5 header-title">
                    登录
                </div>
                <div className="flex1 header-link">
            
                </div>
            </div>
        );
    }
});

var LoginPage = React.createClass({

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
            <div>
                <div className="lflex lflex-v container-padding marg-20">
                    <div>
                        <div className="lflex lflex-v ai-center">
                            <div className="login-phone">
                                <input name="phone" type="text" className="form-control input-noborder" placeholder="输入手机号"/>
                                <div className="login-point left"></div>
                                <div className="login-point right"></div>
                            </div>
                            <div className="login-password">
                                <input name="name" type="text" className="form-control input-noborder" placeholder="输入昵称"/>
                            </div>
                        </div>
                    </div>
                    <div className="btn-login">
                        <button onClick={t.onLoginIn} className="btn btn-primary btn-block btn-lg tTap">登录</button>
                    </div>
                    <div className="forget-password">
                        <span className="tTap">忘记密码？</span>
                    </div>
                    <div className="login-img">
                        <Icon name="address-hz"/>
                    </div>
                </div>
            </div>
        );
    }
});

module.exports = LoginPage;


