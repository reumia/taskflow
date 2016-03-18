'use strict';
var React = require('react');
var ClassNames = require('classnames');
var CategoryEdit = require('./CategoryEdit');
var BasicInfoEdit = require('./BasicInfoEdit');
var DetailEdit = require('./DetailEdit');
var PropTypes = React.PropTypes;

// TaskEditor
var TaskEditor = React.createClass({
    getInitialState: function(){
        return {
            categoryId: null,
            title: "",
            deploy: "",
            origin: "",
            detail: {}
        }
    },
    componentWillReceiveProps: function(nextProps){
        var tasks = this.props.tasks;
        var currentTaskKey = nextProps.currentTaskKey;
        if ( currentTaskKey.length > 0 ){
            this.setState(tasks[currentTaskKey[0]][currentTaskKey[1]]);
        }
    },
    handleCategoryChange: function (newCategoryId) {
        this.setState({categoryId: newCategoryId})
    },
    handleBasicInfoChange: function (node, value) {
        var date;
        switch (node) {
            case "title":
                this.setState({ title: value });
                break;
            case "deploy":
                date = this.validateDate(value);
                this.setState({ deploy: date });
                break;
            case "origin":
                this.setState({ origin: value });
                break;
        }
    },
    handleDetailItemChange: function (newItem, i) {
        var newItems = {};
        Object.keys(this.state.detail).map(function(key){
            newItems[key] = this.state.detail[key];
        }.bind(this));
        newItems[i] = newItem;
        this.setState({detail: newItems});
    },
    validateDate: function (string) {
        var newString;
            if (/[\D-]/.test(string)) {
                newString = string.slice(0, -1);
                return newString;
            } else {
                return string;
            }
    },
    render: function () {
        var task = this.state;
        var submitStr = this.props.currentTaskKey ? "수정" : "추가";
        return (
            <form className="editor">
                <h2 className="editor__title">Edit Task</h2>
                <CategoryEdit categories={this.props.categories} activeCategoryConfig={this.props.activeCategoryConfig} categoryId={task.categoryId} categoryChange={this.handleCategoryChange} />
                <BasicInfoEdit title={task.title} deploy={task.deploy} origin={task.origin} basicInfoChange={this.handleBasicInfoChange} />
                <DetailEdit detail={task.detail} addDetailItem={this.handleDetailItemChange} detailItemClick={this.handleDetailItemChange} />
                <div className="table">
                    <a href="#" className="button table__item">{submitStr}</a>
                    <a href="#" className="button table__item">취소</a>
                </div>
            </form>
        );
    }
});

module.exports = TaskEditor;