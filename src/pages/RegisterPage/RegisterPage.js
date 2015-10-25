/**************************************************\
                 注册页面
\**************************************************/
'use strict';

var Icon = require('../../components/Icon');
var ModalFactory = Components.Modal;
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
                    注册
                </div>
                <div className="flex1 header-link">
                    <span className="tTap" onClick={t.linkTo.bind(t, 'login')}>登录</span>
                </div>
            </div>
        );
    }
});

var RegisterPage = React.createClass({

    mixins: [],

    getInitialState: function () {
        return {
        };
    },

    onRegister:function(){
        var t = this;
        var userData = {
            phone : $("input[name=phone]").val(),
            psw   : $("input[name=psw]").val()
        }

        DB.App.register(userData).then(function (data) {
            if(data.success){
                localStorage.setItem("user",JSON.stringify({userPhone:data.userPhone}));
                location.href = '#/login';
            }else{
                alert(data.error)
                // t.refs['ScaleModal'].show();
                // setTimeout(function(){
                //     t.refs['ScaleModal'].hide();
                // },3000)
            }
        });
    },
    
    render: function () {
        var t = this;
        var ref = 'ScaleModal';//'OutlineModal', 'ScaleModal', 'FadeModal', 'FlyModal', 'DropModal', 'WaveModal'
        var Modal = ModalFactory[ref];

        return (
            <div>
                <Header/>
                <div className="lflex flex-v container-padding">
                    <div className="input-box">
                        <input name="phone" type="text" className="form-control input-noborder" placeholder="输入手机号"/>
                    </div>
                    <div className="input-box">
                        <input name="psw" type="password" className="form-control input-noborder" placeholder="创建密码"/>
                    </div>
                    <div className="btn-code">
                        <button className="btn btn-default btn-block btn-lg">发送验证码</button>
                    </div>
                    <div className="input-box">
                        <input type="text" className="form-control input-noborder" placeholder="输入验证码"/>
                    </div>
                    <div className="btn-register">
                        <button className="btn btn-primary btn-block btn-lg" onClick={t.onRegister}>注册</button>
                    </div>
                </div>
                <Modal ref={ref}>该手机号已注册</Modal>
            </div>
        );
    }
});

module.exports = RegisterPage;

                    


