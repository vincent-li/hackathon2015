var Icon = React.createClass({
    getInitialState: function() {
        return {};
    },
    render: function() {
        var c = "iconfont leyo-app-icon-" + this.props.name;
        return (
            <i className={c}></i>
        );
    }
});

module.exports = Icon;