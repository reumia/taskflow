'use strict';

// require
var classNames = require('classnames');

// TaskFlow
var TaskFlow = React.createClass({
    loadTasksFromStorage: function () {
        console.log("Data Loaded");
        this.setState({data: this.props.data});
    },
    getInitialState: function () {
        return {data: []};
    },
    componentDidMount: function () {
        this.loadTasksFromStorage();
        setInterval(this.loadTasksFromStorage, this.props.pollInterval);
    },
    render: function () {
        var categories = this.props.categories;
        var tasks = this.props.tasks;
        var taskWrapNodes = Object.keys(tasks).map(function (key) {
            var task = tasks[key];
            return (
                <TaskWrap task={task} categories={categories} statement={key} key={key} />
            );
        });
        return (
            <div className="taskflow">
                <aside className="taskflow__aside"><TaskEditor categories={categories}/></aside>
                <section className="taskflow__body">{taskWrapNodes}</section>
            </div>
        );
    }
});

// TaskEditor
var TaskEditor = React.createClass({
    render: function () {
        return (
            <form className="editor">
                <h2 className="editor__title">Edit Task</h2>
                <CategoryEdit categories={this.props.categories}/>
                <BasicInfoEdit />
                <DetailEdit />
                <div className="table">
                    <a href="#" className="button table__item">추가</a>
                    <a href="#" className="button table__item">취소</a>
                </div>
            </form>
        );
    }
});

// CategoryEdit
var CategoryEdit = React.createClass({
    getInitialState: function () {
        return {isActivated: false};
    },
    handleClickSelect: function (e) {
        e.preventDefault();
        if (this.state.isActivated) {
            this.setState({isActivated: false});
        } else {
            this.setState({isActivated: true});
        }
    },
    handleClickItem: function (e) {
        e.preventDefault();
        console.log('Item Clicked');
    },
    render: function () {
        return (
            <section className="editor__section category">
                <div className="table">
                    <a href="#" className="button table__item" onClick={this.handleClickSelect}>
                        <i className="fa fa-chevron-down"></i> 카테고리 선택
                    </a>
                    <a href="#" className="button table__item" onClick={this.handleClickConfig}>
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
    render: function () {
        var categories = this.props.categories;
        var selectboxNodes = Object.keys(categories).map(function (key) {
            var category = categories[key];
            var inlineStyleColor = {color: category.color};
            var inlineStyleBackgroundColor = {backgroundColor: category.color};
            return (
                <a href="#" className="selectbox__item" style={inlineStyleColor} key={category.color} onClick={this.props.itemClick}>
                    <i className="sticker" style={inlineStyleBackgroundColor}></i> {category.name}
                </a>
            );
        }.bind(this));
        var selectboxClass = classNames({
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

// BasicInfoEdit
var BasicInfoEdit = React.createClass({
    render: function () {
        return (
            <section className="editor__section">
                <textarea className="editor__textarea" name="" id="" cols="30" rows="4" placeholder="제목" />
                <input className="editor__input" type="text" placeholder="배포 20160218" />
                <input className="editor__input" type="text" placeholder="출처 GRAFOLIO-3000" />
            </section>
        );
    }
});

// DetailEdit
var DetailEdit = React.createClass({
    render: function () {
        return (
            <section className="editor__section detail">
                <input type="text" className="editor__input" placeholder="상세" />
                <a href="#" className="button button--block">추가</a>
                <DetailItems />
            </section>
        );
    }
})

// DetailItem
var DetailItems = React.createClass({
    render: function () {
        var detailItemNodes = [0,1,2].map(function(detailItem){
            return (
                <DetailItem />
            );
        });
        return (
            <div className="detail-group">
                {detailItemNodes}
            </div>
        );
    }
});

// DetailItem
var DetailItem = React.createClass({
    getInitialState: function () {
        return {isActivated: false};
    },
    handleClickItem: function (e) {
        e.preventDefault();
        if (this.state.isActivated) {
            this.setState({isActivated: false});
        } else {
            this.setState({isActivated: true});
        }
    },
    render: function () {
        var detailItemClasses = classNames({
            "editor__item": true,
            "active": this.state.isActivated
        })
        return (
            <a href="#" className={detailItemClasses} onClick={this.handleClickItem} isActivated={this.state.isActivated}>asdasd</a>
        );
    }
});

// TaskWrap
var TaskWrap = React.createClass({
    getInitialState: function () {
        return {data: []};
    },
    getStatement: function(num) {
        switch (parseInt(num)) {
            case 0:
                return "TODO";
                break;
            case 1:
                return "IN PROGRESS";
                break;
            case 2:
                return "DONE";
                break;
            case 3:
                return "NEXT";
                break;
        }
    },
    render: function () {
        var task = this.props.task;
        var categories = this.props.categories;
        var statement = this.getStatement(this.props.statement);
        var taskNodes = Object.keys(task).map(function (key) {
            var item = task[key];
            return (
                <Task data={item} categories={categories} statement={key} key={item.date}/>
            );
        });
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
        return {data: this.props.data}
    },
    getDateByTimeStamp: function (string) {
        var timestamp = new Date(string);
        if (timestamp.getTime() > 0) {
            return timestamp.toLocaleDateString();
        } else {
            return string;
        }
    },
    handleClickTask: function () {
        console.log('Task Clicked!');
    },
    render: function () {
        var data = this.state.data;
        var categories = this.props.categories;
        var categoryId = data.categoryId;
        var inlineStyleColor = {color: categories[categoryId].color};
        var inlineStyleBackgroundColor = {backgroundColor: categories[categoryId].color};
        var deployDate = this.getDateByTimeStamp(data.deploy);
        var stickerNodes = data.detail.map(function (sticker) {
            return (
                <i className="sticker" data-checked={sticker.checked} data-text={sticker.text}></i>
            );
        });
        return (
            <article className="task" onClick={this.handleClickTask}>
                <h3 className="task__category" style={inlineStyleColor}>
                    <i className="sticker" style={inlineStyleBackgroundColor}></i>
                    <em>{categories[categoryId].name}</em>
                </h3>
                <h2 className="task__title">{data.title}</h2>
                <div className="task__deploy">배포<i>{deployDate}</i></div>
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

// Set Database
var myTasks = JSON.parse(window.localStorage.tasks);
var myCategories = JSON.parse(window.localStorage.categories);

// Render
ReactDOM.render(
    <TaskFlow tasks={myTasks} categories={myCategories} pollInterval={3000}/>,
    document.getElementById('content')
);
