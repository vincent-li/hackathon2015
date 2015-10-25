var Icon = require('../../components/Icon');
var DB = require('../../app/db');

var Map = React.createClass({

    mixins: [],

    getInitialState: function() {
        return {
            
        };
    },

    linkTo : function(){
        var t = this;
        var hash = window.location.hash;
        
    },

    componentDidMount: function() {
        var t = this;
        window.title = '地图';
        //百度地图API功能
        var map = new BMap.Map("BaiduMapPlace");            // 创建Map实例
        
        var point = new BMap.Point(120.010557,30.298561); // 创建点坐标
        map.centerAndZoom(point,20);                 
        map.enableScrollWheelZoom(true);

        var mk = new BMap.Marker(point);
        map.addOverlay(mk);
        map.panTo(point);

        // function myFun(result){
        //     var cityName = result.name;
        //     map.setCenter(cityName);
        // }

        // var myCity = new BMap.LocalCity();
        // myCity.get(myFun); 

        // map.addEventListener("click",function(e){
        //     console.log(e.point.lng + "," + e.point.lat);
        // }); 

        // var geolocation = new BMap.Geolocation();
        // geolocation.getCurrentPosition(function(r){
        //     if(this.getStatus() == BMAP_STATUS_SUCCESS){
        //         var mk = new BMap.Marker(r.point);
        //         map.addOverlay(mk);
        //         map.panTo(r.point);
        //         alert('您的位置：'+r.point.lng+','+r.point.lat);
        //     }
        //     else {
        //         alert('failed'+this.getStatus());
        //     }        
        // },{enableHighAccuracy: true});
        var param = {
            activity_id : 1
        };
        DB.App.mapPoints(param).then(function(data){
            data.map(function(d){  
                map.addOverlay(new BMap.Marker(new BMap.Point(d.longitude,d.latitude)));
            });
        });
    },

    render: function() {
        var t = this;
        var wid = $(window).width();
        var hig = $(window).height() - 45;
        return (
            <div id="BaiduMapPlace" style={{'width':wid+'px','height':hig+'px'}}></div>
            
        );
    }
});

module.exports = Map;