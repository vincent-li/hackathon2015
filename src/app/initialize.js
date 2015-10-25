;(function($){
    $.getScript = function (url, success, error) {
        var script = document.createElement("script"),
            $script = $(script);
        script.src = url;

        $("head").append(script);
        $script.bind("load", success || function () {});
        $script.bind("error", error || function () {});
    }
    $.loadCSS = function (url){
        var cssLink = document.createElement("link");
        cssLink.rel = "stylesheet";
        cssLink.rev = "stylesheet";
        cssLink.type = "text/css";
        cssLink.media = "screen";
        cssLink.href = url;
        document.getElementsByTagName("head")[0].appendChild(cssLink);
    }
    $.getUuid = function() {
        function s4() {
            return Math.floor((1 + Math.random()) * 0x10000)
                .toString(16)
                .substring(1);
        }

        return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
            s4() + '-' + s4() + s4() + s4();
    }

    function GPS(result){
        var res = result.split(',');
        var point = {
            longitude : res[0],
            latitude : res[1]
        };
        $.ajax({
            url: '/location/upload',
            type: 'POST',
            data: $.param(point),
            success: function(resp) {}
        });
    }

    window.jsBridgeCallBack = function(source, result){
        switch(source){
            case "GPS":
                GPS(result);
                break;
        }
    }

    $.jsBridge = function(method, param){
        if(window.webkit && window.webkit.messageHandlers && window.webkit.messageHandlers.bridge){
            window.webkit.messageHandlers.bridge.postMessage({
                request: method,
                title : param
            });
        }
    }

    window.setInterval(function(){
        $.jsBridge("GPS");
        // var point = {
        //     longitude : 120.010557,
        //     latitude : 30.298561
        // };
        // $.ajax({
        //     url: '/location/upload',
        //     type: 'POST',
        //     data: $.param(point),
        //     success: function(resp) {}
        // });
    }, 5000);

    $(document).ready(function(){
        // 添加全局点击态
        new TapEffect({
            context : 'body',
            selector : '.tTap',
            cls : 'active'
        });

        FastClick.attach(document.body);
        $('#AppContainer').height($(window).height());

        var APP = require('./app');
        React.render(<APP/>, document.getElementById('AppContainer'));
    });
})(Zepto);



