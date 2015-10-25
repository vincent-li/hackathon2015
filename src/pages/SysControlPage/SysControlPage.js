/**************************************************\
            系统控制页面
\**************************************************/
'use strict';

var Locations = Router.Locations;
var Location = Router.Location;
var NotFound = Router.NotFound;


var Header     = require('../../components/Header');
var SideMenu   = require('../../components/SideMenu');
var Page404    = require('../404Page');

var PageActivities = require('../ActivitiesPage');
var PageActivityDtl = require('../ActivityDtlPage');
var PageUserActivityDtl = require('../JoinActivityPage');
var PageQRCode = require('../QRCodePage');
var PageMap    = require('../BaiduMapPage');

var SysControlPage = React.createClass({

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
            <Locations id="sysLocations" contextual hash className="page-frame" style={{height:locationHeight,minHeight:locationHeight,maxHeight:locationHeight}}>
                <Location path="/activities"           handler={PageActivities}/>
                <Location path="/activities/one"    handler={PageActivityDtl}/>
                <Location path="/user/activity"        handler={PageUserActivityDtl}/>
                <Location path="/qrcode/:actId"        handler={PageQRCode}/>
                <Location path="/map/:actId"                  handler={PageMap}/>
                <NotFound handler={Page404}/>
            </Locations>
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