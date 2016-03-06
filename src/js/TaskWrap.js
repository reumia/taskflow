'use strict';
var React = require('react');

// TaskWrap
var TaskWrap = React.createClass({
    getInitialState: function () {
        return {
            statement: ["TODO", "IN PROGRESS", "DONE", "NEXT"]
        };
    },
    getStatement: function (num) {
        return this.state.statement[num];
    },
    handleClickTask: function (node) {
        this.props.taskClick(node);
    },
    render: function () {
        var task = this.props.task;
        var categories = this.props.categories;
        var statement = this.getStatement(this.props.statement);
        var taskNodes = Object.keys(task).map(function (key) {
            var item = task[key];
            var taskKey = [Number(this.props.statement), Number(key)];
            return (
                <Task data={item} categories={categories} key={item.date} taskClick={this.handleClickTask.bind(this, taskKey)} />
            );
        }.bind(this));
        return (
            <div className="task-wrap">
                <h2 className="task-statement">{statement}</h2>
                {taskNodes}
            </div>
        );
    }
});

// Task
var Task = React.createClass({
    getInitialState: function () {
        return this.props.data
    },
    render: function () {
        var data = this.state;
        var categories = this.props.categories;
        var categoryId = data.categoryId;
        var inlineStyleColor = {color: categories[categoryId].color};
        var inlineStyleBackgroundColor = {backgroundColor: categories[categoryId].color};
        var stickerNodes = data.detail.map(function (sticker) {
            return (
                <i className="sticker" data-checked={sticker.checked} data-text={sticker.text}></i>
            );
        });
        return (
            <article className="task" onClick={this.props.taskClick}>
                <h3 className="task__category" style={inlineStyleColor}>
                    <i className="sticker" style={inlineStyleBackgroundColor}></i>
                    <em>{categories[categoryId].name}</em>
                </h3>
                <h2 className="task__title">{data.title}</h2>
                <div className="task__deploy">배포<i>{data.deploy}</i></div>
                <div className="task__origin">출처<i>{data.origin}</i></div>
                <div className="task__detail">상세
                    <div className="sticker-wrap">
                        {stickerNodes}
                    </div>
                </div>
            </article>
        );
    }
});

module.exports = TaskWrap;