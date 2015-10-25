/**************************************************\
                home页面
\**************************************************/
'use strict';
var DB = require('../../app/db');
var QRCodePage = React.createClass({

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
            <div className="lflex lflex-v ai-center jc-center marg-60">
                <img src={t.state.src} width="250" height="250"/>
                <div className="sao-tip">扫码即可签到</div>
            </div>
        );
    }
});

module.exports = QRCodePage;


