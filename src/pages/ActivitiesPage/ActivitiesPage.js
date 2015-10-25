/**************************************************\
                活动列表页面
\**************************************************/
'use strict';
var AppStore = require('../../app/store');
var Matrix = require('../../components/Matrix');
var Icon = require('../../components/Icon');
var List = Matrix.List;
var ListItem = Matrix.ListItem;
var ListScrollView = Matrix.ListScrollView;

var ActivitiesPage = React.createClass({

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
            <ListItem id="class_item_id_0" key="class-item-0">
                <div className="lflex ai-center list-content">
                    <div className="padding-16 tTap" onClick={t.goTo.bind(t, '#/sys/activities/one')}>
                        <img src={t.props.cdnDomain + "/imgs/segmentfault-20151024-act.jpeg"} width={t.props.width}/>
                    </div>
                    <div>
                        <div className="lflex lflex-v bg-white">
                            <div className="class-title">{clas.title}</div>
                            <div className="class-msg">
                                {clas.time}
                            </div>
                        </div>
                    </div>
                </div>
            </ListItem>
        );
        var clas1 = t.state.classList[1];
        listItems.push(
            <ListItem id="class_item_id_1" key="class-item-1">
                <div className="lflex ai-center list-content tTap" onClick={t.goTo.bind(t, '#/sys/user/activity')}>
                    <div className="padding-16">
                        <img src={t.props.cdnDomain + "/imgs/segmentfault-20151024-act.jpeg"} width={t.props.width}/>
                    </div>
                    <div>
                        <div className="lflex lflex-v bg-white">
                            <div className="class-title">{clas.title}</div>
                            <div className="class-msg">
                                {clas.time}
                            </div>
                        </div>
                    </div>
                </div>
            </ListItem>
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
            <div className="container">
                <List>
                    <ListItem>
                        <div className="lflex ai-center now-date">
                            <div className="class-weekday">
                                周{map[now.day()]}
                            </div>
                            <div className="class-date">
                                {now.format('YYYY.MM.DD')}
                            </div>
                        </div>
                    </ListItem>
                    {listItems}
                </List>
            </div>
        );
    }
});

module.exports = ActivitiesPage;