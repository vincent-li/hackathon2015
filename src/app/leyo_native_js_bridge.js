(function(win){
    'use strict';

    var fundation = ['device.ready', 'device.scanner', 'device.qrcode', 'notification.alert', 'notification.confirm', 'notification.promp']; 
    var userAgent = win.navigator.userAgent;

    win.leBridge = {
        ios: /iPhone|iPad|iPod/i.test(userAgent),
        android: /Android/i.test(userAgent),
        util : {
            send_message : function(){}
        }
    };

    leBridge.util.send_message = function( action, callback, data ) {
        var iframe = document.createElement('iframe');
        var req = encodeURIComponent(action) + "$" + encodeURIComponent(callback) + "$" + encodeURIComponent(data);
        // console.log(req);
        iframe.setAttribute( "src", "js://" + req );
        iframe.style.display = "none";
        document.documentElement.appendChild(iframe);
        iframe.parentNode.removeChild(iframe);
        iframe = null;
    };
    
    
    
    (function() {
        for (var i = fundation.length - 1; i >= 0; i--) {
            var temp = fundation[i].split('.');
            leBridge[temp[0]] = {};
            leBridge[temp[0]][temp[1]] = function(){
                var action = fundation[i];
                var data = arguments[0];
                leBridge[temp[0]][temp[1]+'_callback'] = arguments[1] || function(){};
                if(leBridge.ios){
                    send_message(action, "leBridge."+fundation[i]+"_callback", data);
                } 
            };
        };
    }) ();
    
    win.addEventListener("load", function() {    
        leBridge.device.ready(function(obj){
            alert(obj);
        });
    });

})(window, undefined)