var AppConfig = require('../../app/store');
var Icon = require('../Icon');
var Image = require('../Image');

var HomeHeader = React.createClass({

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
            backBtn = (<div className="header-back tTap" onClick={t.animateSideMenu}>
                        <Icon name="user" />
                    </div>);
        }else{
            backBtn = (<div className="header-back tTap" onClick={t.goBack}>
                        <Icon name="back" />
                    </div>);
        }
        return (
            <div className="lflex leyo-header border-bottom">
                <div className="flex1 lflex jc-start">
                    {backBtn}
                    <div className="header-change tTap" onClick={t.changeIdentity}>
                        <Icon name="change-identity" />
                    </div>
                </div>
                <div className="flex1 header-title">
                    {cr.title}
                </div>
                <div className="flex1 header-more">
                    <Icon name="more" />
                </div>
            </div>
        );
    }
}); 

module.exports = HomeHeader;