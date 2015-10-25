var ListScrollView = React.createClass({
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
            <div {...this.props} className="list-scroll">
                {this.props.children}
            </div>
        );
    }
});

var ListAnimateScroll = React.createClass({

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
            <div {...this.props} className="list-scroll">
                <div className="list-scroll-back leyo-flex flex-v ai-stretch">
                    <div className="scroll-back-loading" style={{marginTop:'10px'}}>
                        <div className="scroll-back-img"><img src="//leyo-hangzhou.oss-cn-hangzhou.aliyuncs.com/leyo/images/page-loading.gif" width="32" height="32"/></div>
                        <div>即将刷新</div>
                    </div>
                    <div className="scroll-back-loading" style={{marginBottom:'10px'}}>
                        <div className="scroll-back-img"><img src="//leyo-hangzhou.oss-cn-hangzhou.aliyuncs.com/leyo/images/page-loading.gif" width="32" height="32"/></div>
                        <div>正在努力加载</div>
                    </div>
                </div>
                <div className="list-drag-trigger">
                    {this.props.children}
                </div>
            </div>
        );
    }
}); 
var ListItem = React.createClass({

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
            <div {...this.props} className={"list-item border-bottom " + clas}>
                {this.props.children}
            </div>
        );
    }
}); 
var List = React.createClass({

    getInitialState: function() {
        return {};
    },

    componentDidMount : function(){
        
    },

    render: function() {
        return (
            <div className="leyo-flex flex-v list">
                {this.props.children}
            </div>
        );
    }
}); 

var Matrix = {
    List : List,
    ListItem : ListItem,
    ListScrollView : ListScrollView
};

module.exports = Matrix;