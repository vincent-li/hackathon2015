var AppConfig = require('../../app/store');
var Image = React.createClass({
    getInitialState: function() {
        return {
            src: this.props.name,
            path : AppConfig.cdnDomain + AppConfig.cdnPrefix + '/images/'
        };
    },
    render: function() {
        var t = this;
        var dpr = window.devicePixelRatio;
        var src = this.state.src;
        var srcs = src.split('.');
        // 如果是gif直接返回无须处理
        if(srcs[srcs.length-1] === 'gif'){
            return (
                <img className={imgClass} src={this.state.path + src} />
            );
        }

        var widInd = 0;
        if(dpr >= 3){
            src = srcs[0] + '-3.' + srcs[1];
            widInd = 1;
        }else{
            src = srcs[0] + '-2.' + srcs[1];
        }

        var wid = $(window).width();
        var isFull = this.props.isFull;
        
        if(!isFull){
            if(this.props.width.length){
                wid = this.props.width[widInd];
            }else{
                wid = this.props.width;
            }
        }

        if(this.props.padding){
            wid -= this.props.padding;
        }

        var isCircle = this.props.isCircle;
        var imgClass = 'image-setting';
        if(isCircle){
            imgClass += ' img-circle';
        }
        return (
            <img className={imgClass} src={this.state.path + src} style={{width:wid+'px'}}/>
        );
    }
});

module.exports = Image;