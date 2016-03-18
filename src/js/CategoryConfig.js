'use strict';
var React = require('react');
var ClassNames = require('classnames');

var CategoryConfig = React.createClass({
    render: function () {
        var categories = this.props.categories;
        var classes = ClassNames({
            'layer': true,
            'layer--config-category': true,
            'active': this.props.isActivated
        });
        var categoryNodes = Object.keys(categories).map(function(key){
            var category = categories[key];
            var inlineStyleColor = {color: category.color};
            var inlineStyleBackgroundColor = {backgroundColor: category.color};
            return (
                <a className="item" href="#" style={inlineStyleColor}><i className="sticker" style={inlineStyleBackgroundColor}></i>{category.name}</a>
            );
        });
        return (
            <div className={classes}>
                <div className="layer__dimmed" onClick={this.props.deactiveLayer}></div>
                <div className="layer__content">
                    <h2 className="layer__title">카테고리 관리</h2>
                    <div className="input-group">
                        <input type="text" className="input" placeholder="카테고리 색상"/>
                        <input type="text" className="input" placeholder="카테고리 이름"/>
                        <a href="#" className="button button--block"><i className="fa fa-plus"></i> 추가</a>
                        <div className="item-group">
                            {categoryNodes}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
});

module.exports = CategoryConfig;