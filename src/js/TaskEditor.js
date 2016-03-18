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
            detail: []
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
        switch (node) {
            case "title" : this.setState({ title: value }); break;
            case "deploy" : this.setState({ deploy: value }); break;
            case "origin" : this.setState({ origin: value }); break;
        }
    },
    handleAddDetailItem: function (itemString) {
        var newDetail = this.state.detail;
        newDetail.push({
            "text": itemString,
            "checked": false
        });
        this.setState({detail: newDetail});
    },
    toggleDetailItem: function (itemKey, newItem) {
        var newDetail = this.state.detail;
        newDetail[itemKey] = newItem;
        this.setState({detail: newDetail});
    },
    render: function () {
        var task = this.state;
        var submitStr = this.props.currentTaskKey ? "수정" : "추가";
        console.log(task);
        return (
            <form className="editor">
                <h2 className="editor__title">Edit Task</h2>
                <CategoryEdit categories={this.props.categories} activeCategoryConfig={this.props.activeCategoryConfig} categoryId={task.categoryId} categoryChange={this.handleCategoryChange} />
                <BasicInfoEdit title={task.title} deploy={task.deploy} origin={task.origin} basicInfoChange={this.handleBasicInfoChange} />
                <DetailEdit detail={task.detail} addDetailItem={this.handleAddDetailItem} detailItemClick={this.toggleDetailItem} />
                <div className="table">
                    <a href="#" className="button table__item">{submitStr}</a>
                    <a href="#" className="button table__item">취소</a>
                </div>
            </form>
        );
    }
});

module.exports = TaskEditor;