'use strict';
var React = require('react');
var ReactDOM = require('react-dom');
var ClassNames = require('classnames');
var TaskWrap = require('./TaskWrap');
var TaskEditor = require('./TaskEditor');
var CategoryConfig = require('./CategoryConfig');

// TaskFlow
var TaskFlow = React.createClass({
    loadTasksFromStorage: function () {
        var myTasks = {};
        var myCategories = {};
        if (localStorage.length > 0) {
            myTasks = JSON.parse(window.localStorage.tasks);
            myCategories = JSON.parse(window.localStorage.categories);
        }
        this.setState({
            tasks: myTasks,
            categories: myCategories
        }, function(){
            console.log("Data Loaded", this.state);
        }.bind(this));
    },
    getInitialState: function () {
        return {
            tasks: {},
            categories: {},
            currentTaskKey: false,
            isCategoryConfigActivated: false
        };
    },
    componentDidMount: function () {
        this.loadTasksFromStorage();
        // setInterval(this.loadTasksFromStorage, 3000);
    },
    handleClickTask: function (node, event) {
        this.setState({currentTaskKey: node});
    },
    toggleCategoryConfig: function () {
        if (this.state.isCategoryConfigActivated) {
            this.setState({isCategoryConfigActivated: false});
        } else {
            this.setState({isCategoryConfigActivated: true});
        }
    },
    addCategories: function (newCategories) {
        this.setState({
            categories: newCategories
        }, function () {
            var newCategories = JSON.stringify(this.state.categories);
            window.localStorage.setItem("categories", newCategories);
        }.bind(this));
    },
    render: function () {
        var categories = this.state.categories;
        var tasks = this.state.tasks;
        var taskWrapNodes = Object.keys(tasks).map(function (key) {
            var task = tasks[key];
            return (
                <TaskWrap task={task} categories={categories} statement={key} key={key} taskClick={this.handleClickTask} />
            );
        }.bind(this));
        return (
            <div className="taskflow">
                <aside className="taskflow__aside"><TaskEditor categories={categories} tasks={tasks} currentTaskKey={this.state.currentTaskKey} activeCategoryConfig={this.toggleCategoryConfig} /></aside>
                <section className="taskflow__body">{taskWrapNodes}</section>
                <CategoryConfig categories={categories} isActivated={this.state.isCategoryConfigActivated} deactiveLayer={this.toggleCategoryConfig} addCategories={this.addCategories} />
            </div>
        );
    }
});

// Render
ReactDOM.render(
    <TaskFlow />,
    document.getElementById('content')
);