'use strict';
var React = require('react');
var ClassNames = require('classnames');

// CategoryEdit
var CategoryEdit = React.createClass({
    getInitialState: function () {
        return {
            isActivated: false,
            currentCategoryId: this.props.categoryId
        };
    },
    handleClickSelect: function (e) {
        e.preventDefault();
        this.toggleSelectBox(this);
    },
    handleClickItem: function (categoryId) {
        this.setState({currentCategoryId: categoryId});
        this.props.categoryChange(categoryId);
        this.toggleSelectBox(this);
    },
    toggleSelectBox: function (self) {
        if (self.state.isActivated) {
            self.setState({isActivated: false});
        } else {
            self.setState({isActivated: true});
        }
    },
    componentWillReceiveProps: function (nextProp) {
        this.setState({currentCategoryId: nextProp.categoryId});
    },
    render: function () {
        var currentCategory = this.props.categories[this.state.currentCategoryId];
        var buttonStyle = {color: ""};
        var buttonText = "카테고리 선택";
        if (currentCategory != undefined) {
            buttonStyle.color = currentCategory.color;
            buttonText = currentCategory.name;
        }
        return (
            <section className="editor__section category">
                <div className="table">
                    <a href="#" className="button table__item" onClick={this.handleClickSelect} style={buttonStyle}>
                        <i className="fa fa-chevron-down"></i> {buttonText}
                    </a>
                    <a href="#" className="button table__item" onClick={this.props.activeCategoryConfig}>
                        <i className="fa fa-gear"></i> 카테고리 관리
                    </a>
                </div>
                <CategorySelectbox onClick={this.handleClickButton} itemClick={this.handleClickItem} categories={this.props.categories} isActivated={this.state.isActivated} />
            </section>
        );
    }
});

// CategorySelectbox
var CategorySelectbox = React.createClass({
    handleClickItem: function (key) {
        this.props.itemClick(key);
    },
    render: function () {
        var categories = this.props.categories;
        var selectboxNodes = Object.keys(categories).map(function (key) {
            var category = categories[key];
            var inlineStyleColor = {color: category.color};
            var inlineStyleBackgroundColor = {backgroundColor: category.color};
            return (
                <div className="selectbox__item" style={inlineStyleColor} key={key} onClick={this.handleClickItem.bind(this, key)}>
                    <i className="sticker" style={inlineStyleBackgroundColor}></i> {category.name}
                </div>
            );
        }.bind(this));
        var selectboxClass = ClassNames({
            'selectbox': true,
            'active': this.props.isActivated
        });
        return (
            <div className={selectboxClass}>
                {selectboxNodes}
            </div>
        );
    }
});

module.exports = CategoryEdit;