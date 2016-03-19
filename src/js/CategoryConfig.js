'use strict';
var React = require('react');
var ClassNames = require('classnames');

var CategoryConfig = React.createClass({
    addCategory: function (event) {
        var categoryColor = this.refs.categoryColor.value;
        var categoryName = this.refs.categoryName.value;
        var i = this.getGuid();
        var newCategories = {};
        Object.keys(this.props.categories).map(function (key) {
            newCategories[key] = this.props.categories[key];
        }.bind(this));
        if ( categoryColor != "" && categoryName != "" ) {
            newCategories[i] = {
                "name": categoryName.toUpperCase(),
                "color": categoryColor
            };
            this.setState(newCategories, function () {
                this.props.addCategories(newCategories);
                this.clearInput();
            }.bind(this));
        } else {
            console.error("인풋을 채워주세요.");
        }
    },
    clearInput: function () {
        this.refs.categoryColor.value = "";
        this.refs.categoryName.value = "";
    },
    getGuid: function () {
        var s4 = function () {
            return Math.floor((1 + Math.random()) * 0x10000)
                .toString(16)
                .substring(1);
        };
        return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
    },
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
                <a className="item" href="#" style={inlineStyleColor} key={key}><i className="sticker" style={inlineStyleBackgroundColor}></i>{category.name}</a>
            );
        });
        return (
            <div className={classes}>
                <div className="layer__dimmed" onClick={this.props.deactiveLayer}></div>
                <div className="layer__content">
                    <h2 className="layer__title">카테고리 관리</h2>
                    <div className="input-group">
                        <input type="text" ref="categoryColor" className="input" placeholder="카테고리 색상"/>
                        <input type="text" ref="categoryName" className="input" placeholder="카테고리 이름"/>
                        <a href="#" className="button button--block" onClick={this.addCategory}><i className="fa fa-plus"></i> 추가</a>
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