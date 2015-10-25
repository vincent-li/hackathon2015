/**************************************************\
                详细页面
\**************************************************/
'use strict';
// 系统资源
var AppStore = require('../../app/store');
var DB = require('../../app/db');

var Icon = require('../../components/Icon');
var ModalFactory = require('../../components/Modal');
// router对象

var ActivityDtlPage = React.createClass({

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
            <div className="lflex lflex-v dialog-content">
                <Icon name="settings" />
                <div className="dialog-title">{title}</div>
                <div className="dialog-desc">{desc}</div>
                <div className="dialog-close">
                    <Icon name="cancel" />
                </div>
            </div>
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
        var btn = <div className="flex1 lflex lflex-v jc-center tTap" onClick={t.handleJoin}>
                        <div className="sigin-in" >
                            <Icon name="signin"/>
                        </div>
                        <div>报名</div>
                 </div>;
        if(t.state.iAmIn){
            btn = <div className="flex1 lflex lflex-v jc-center havein" >
                        <div className="sigin-in">
                            <Icon name="signin"/>
                        </div>
                        <div>已报名</div>
                 </div>;
        }
        return (
            <div className="lflex lflex-v">
                <div className="text-ali-c">
                    <img src={t.props.cdnDomain + "/imgs/segmentfault-20151024-act.jpeg"} width={t.props.width}/>
                </div>
                <div>
                    <div className="class-info-left">
                        <div className="class-info-name">
                            {this.state.name}
                        </div>
                        <div className="lflex">
                            <div>主办方：</div>
                            <div>
                                <a href="http://segmentfault.com/" target="_blank">
                                    {this.state.orgName}
                                </a>
                            </div>
                        </div>
                        <div className="lflex">
                            <div>开始时间：</div>
                            <div>{t.state.startTime}</div>
                        </div>
                        <div className="lflex">
                            <div>结束时间：</div>
                            <div>{t.state.endTime}</div>
                        </div>
                        <div className="lflex">
                            <div>举办地点：</div>
                            <div>
                                <a target="_blank" href="http://api.map.baidu.com/geocoder?output=html&amp;address=杭州市余杭区良睦路1399号梦想小镇21幢">
                                    {t.state.address}
                                </a>
                            </div>
                        </div>
                        <div className="lflex">
                            <div>已报名：</div>
                            <div>
                                {t.state.memberList.length}人
                            </div>
                        </div>
                        
                    </div>
                </div>
                <div className="class-detail-info">
                    <div className="class-reservation lflex">
                        <div className="flex1 lflex lflex-v jc-center">
                            <div className="sigin-in tTap" onClick={t.goTo.bind(t, '#/sys/qrcode/1')}>
                                <Icon name="jijie"/>
                            </div>
                            <div>集结</div>
                        </div>
                        <div className="flex1 lflex lflex-v jc-center">
                            <div className="sigin-in tTap" onClick={t.goTo.bind(t, '#/sys/qrcode/1')}>
                                <Icon name="barcode"/>
                            </div>
                            <div>签到二维码</div>
                        </div>
                        <div className="flex1 lflex lflex-v jc-center">
                            <div className="sigin-in tTap" onClick={t.goTo.bind(t, '#/sys/map/1')}>
                                <Icon name="map"/>
                            </div>
                            <div>位置</div>
                        </div>
                        <Modal ref={ref}>{t.getAlertContent('系统提示', 'nihao')}</Modal>
                    </div>
                    <div className="class-reservation lflex">
                        <div className="flex1 lflex lflex-v jc-center">
                            <div className="sigin-in tTap" onClick={t.goTo.bind(t, '#/sys/qrcode/1')}>
                                <Icon name="weixin"/>
                            </div>
                            <div>群聊</div>
                        </div>
                        <div className="flex1 lflex lflex-v jc-center">
                            <div className="sigin-in tTap" onClick={t.goTo.bind(t, '#/sys/map/1')}>
                                <Icon name="choujiang"/>
                            </div>
                            <div>抽奖</div>
                        </div>
                        <div className="flex1"></div>
                    </div>
                    <div className="class-info-item">
                        <div className="class-info-title">
                            <div className="class-info-mark"></div>
                            <div>活动及主题简介</div>
                        </div>
                        <div className="class-info-detail">
                            黑客马拉松（Hackathon）编程大赛自最初由 SegmentFault 引进国内，引起开发者的狂热响应，科技企业更是陆续主动参与其中，国内编程运动的热潮由此引发。
                        </div>
                        <div className="class-info-detail">
                            今年 SegmentFault 黑客马拉松编程大赛将于 10 月 24 - 25 日在北京、杭州、深圳、济南、武汉多城同时举办，采用全新的命题式赛制，以专业的开发者社区为平台，与众位开发者们来一场程序员节的技术狂欢。
                        </div>
                        <div className="class-info-detail">
                            本次黑客马拉松面向全国范围报名，开发者以个人身份报名并组队参赛，每个队伍提交一件或多件产品参赛。
                        </div>
                        <div className="class-info-detail">
                            比赛设置奖项，优秀产品将直接受到国内领先科技媒体的曝光，开放平台和投资机构将投以热切关注。
                        </div>
                    </div>
                    <div className="class-info-item">
                        <div className="class-info-title">
                            <div className="class-info-mark"></div>
                            <div>参赛规则</div>
                        </div>
                        <div className="class-info-detail">
                            本次黑客马拉松采用命题制，比赛开始后在现场公布命题，命题有多个，范围较广，将鼓励开发者从多角度去发挥，实现自己的创意。
                        </div>
                        <div className="class-info-detail">
                            <ul>
                                <li>参赛报名：开发者以个人身份报名，团队参赛每个成员都要单独报名。报名后我们会对参赛人员进行筛选，通过者将于在10月15 - 22日之间收到邀请邮件，比赛届时凭借参赛邀请签到，领取身份卡（不同参赛角色身份卡会有区别）</li>
                                <li>团队规模：每个团队 2-5 人，团队最高人限 5 人、1 人最多参与 1 个团队。可提前组队，也可到现场自由组队（提前组队，每个成员都要报名哦）</li>
                                <li>现场组队：现场会设有白板，准备现场组队的开发者可以用便利贴上写明自己是谁，能做什么，想做什么，在找怎样的人等等，不同的身份卡用于区分开发者角色，帮助更快组队</li>
                                <li>备注：现场提供 Wi-Fi，参赛者需自带具备上网功能的笔记本电脑，特殊电源插头请自备转接口。</li>
                            </ul>
                        </div>
                    </div>
                    <div className="class-info-item">
                        <div className="class-info-title">
                            <div className="class-info-mark"></div>
                            <div>奖项设置</div>
                        </div>
                        <div className="class-info-detail">
                            <ul>
                                <li>一等奖：Macbook Air 11'' + 1024*5 RMB</li>
                                <li>二等奖：HHKB Pro 2 + 1024*3 RMB</li>
                                <li>三等奖：Kindle Paperwhite 3 + 1024 RMB</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
});

module.exports = ActivityDtlPage;