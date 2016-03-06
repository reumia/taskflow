'use strict';
var React = require('react');
var ClassNames = require('classnames');

var CategoryConfig = React.createClass({
    render: function () {
        var classes = ClassNames({
            'layer': true,
            'layer_config_category': true,
            'active': this.props.isActivated
        });
        return (
            <div className={classes}>
                <div className="layer__dimmed" onClick={this.props.deactiveLayer}></div>
                <div className="layer__body">
                    <h2 className="layer__title">카테고리 관리</h2>
                </div>
            </div>
        );
    }
});

module.exports = CategoryConfig;