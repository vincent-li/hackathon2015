var Icon = Components.Icon;

module.exports = function(title, desc, iconName){
    return (
                <div className="leyo-flex flex-v dialog-content">
                    <Icon name={iconName} />
                    <div className="dialog-title">{title}</div>
                    <div className="dialog-desc">{desc}</div>
                    <div className="dialog-close">
                        <Icon name="cancel" />
                    </div>
                </div>
            );
}
