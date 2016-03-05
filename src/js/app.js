'use strict';
var React = require('react');
var ReactDOM = require('react-dom');
var ClassNames = require('classnames');
var TaskWrap = require('./TaskWrap');
var TaskEditor = require('./TaskEditor');

// TaskFlow
var TaskFlow = React.createClass({
    loadTasksFromStorage: function () {
        console.log("Data Loaded");
        this.setState({data: this.props.data});
    },
    getInitialState: function () {
        return {
            data: [],
            currentTaskKey: []
        };
    },
    componentDidMount: function () {
        this.loadTasksFromStorage();
    },
    handleClickTask: function (node, event) {
        this.setState({currentTaskKey: node});
    },
    render: function () {
        var categories = this.props.categories;
        var tasks = this.props.tasks;
        var taskWrapNodes = Object.keys(tasks).map(function (key) {
            var task = tasks[key];
            return (
                <TaskWrap task={task} categories={categories} statement={key} key={key} taskClick={this.handleClickTask} />
            );
        }.bind(this));
        return (
            <div className="taskflow">
                <aside className="taskflow__aside"><TaskEditor categories={categories} tasks={tasks} currentTaskKey={this.state.currentTaskKey} /></aside>
                <section className="taskflow__body">{taskWrapNodes}</section>
            </div>
        );
    }
});

// Set Database
var myTasks = {};
var myCategories = {};
if (localStorage.length > 0){
    myTasks = JSON.parse(window.localStorage.tasks);
    myCategories = JSON.parse(window.localStorage.categories);
}

// Render
ReactDOM.render(
    <TaskFlow tasks={myTasks} categories={myCategories} />,
    document.getElementById('content')
);