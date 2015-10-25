var AppConfig = require('../../app/store');

var Icon = require('../Icon');
var Image = require('../Image');

var SideMenu = React.createClass({

    getInitialState: function() {
        return {
        };
    },

    render: function() {
        var t = this;
        var iden = AppConfig.identity;
        var sideObj = AppConfig[iden];
        var menu = [];
        sideObj.sideMenu.map(function(m, i){
            menu.push(
                <div className="side-menu-item" key={iden+'-smenu-'+i}>
                    <div className="lflex">
                        <div className="flex1"><Icon name={m.icon}></Icon></div>
                        <div className="flex6"><span className="menu-item-title">{m.menu}</span></div>
                        <div className="flex1"><Icon name="arrow-right"></Icon></div>
                    </div>
                </div>
            );
        });
        return (
            <div className="lflex lflex-v layer side-menu">
                <div className="lflex ai-center menu-header">
                    <div className="flex5" style={{textAlign:'center'}}>
                        <div className="side-menu-avatar">
                            <Icon name="face-askance"></Icon>
                        </div>
                    </div>
                    <div className="flex4">
                        <div className="lflex lflex-v">
                            <div className="nick-name">{sideObj.name}</div>
                            <div className="user-phone">{sideObj.phone}</div>
                        </div>
                    </div>
                </div>
                {menu}
            </div>
        );
    }
}); 

module.exports = SideMenu;