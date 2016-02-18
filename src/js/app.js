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
        var data = this.props.data;
        var taskWrapNodes = Object.keys(data).map(function (key) {
            var item = JSON.parse(data[key]);
            return (
                <TaskWrap data={item} statement={key} key={key} />
            );
        });
        return (
            <div className="taskflow">
                <aside className="taskflow__aside"><TaskEditor /></aside>
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
                <CategoryEdit />
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
    handleClickButton: function (e) {
        e.preventDefault();
        if (this.state.isActivated) {
            this.setState({isActivated: false});
        } else {
            this.setState({isActivated: true});
        }
    },
    render: function () {
        return (
            <section className="editor__section table category">
                <a href="#" className="button table__item" onClick={this.handleClickButton}>
                    <span className="icon icon--caret-down"></span>
                </a>
                <input type="text" className="editor__input table__item" placeholder="카테고리" />
                <CategorySelectbox onClick={this.handleClickButton} isActivated={this.state.isActivated} />
            </section>
        );
    }
});

// CategorySelectbox
var CategorySelectbox = React.createClass({
    getStickerColors: function () {
        var colorArray = ['#FFCC00', 'orange', 'red', 'blueviolet', 'blue', 'darkturquoise', 'limegreen', 'hotpink'];
        return colorArray;
    },
    render: function () {
        var selectboxNodes = this.getStickerColors().map(function (color) {
            var inlineStyleColor = {color: color};
            var inlineStyleBackgroundColor = {backgroundColor: color};
            return (
                <a href="#" className="selectbox__item" style={inlineStyleColor} key={color}>
                    <i className="sticker" style={inlineStyleBackgroundColor}></i>
                </a>
            );
        });
        var selectboxClass = classNames({
            'selectbox': true,
            'active': this.props.isActivated
        });
        return (
            <div className={selectboxClass}>
                <a href="#" className="selectbox__item"><i className="sticker"></i>NONE</a>
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
        var data = this.props.data;
        var event = this.handleClickTask;
        var statement = this.getStatement(this.props.statement);
        var taskNodes = Object.keys(data).map(function (key) {
            var item = data[key];
            return (
                <Task data={item} statement={key} key={item.date}/>
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
    getDateByTimeStamp: function (string) {
        var timestamp = new Date(string);
        if (timestamp.getTime() > 0) {
            return timestamp.toLocaleDateString();
        } else {
            return string;
        }
    },
    handleClick: function () {
        console.log('Task Clicked!');
    },
    render: function () {
        var data = this.props.data;
        var inlineStyleColor = {color: data.categoryColor};
        var inlineStyleBackgroundColor = {backgroundColor: data.categoryColor};
        var deployDate = this.getDateByTimeStamp(data.deploy);
        var stickerNodes = data.detail.map(function (sticker) {
            return (
                <i className="sticker" data-checked={sticker.checked} data-text={sticker.text}></i>
            );
        });
        return (
            <article className="task" onClick={this.handleClick}>
                <h3 className="task__category" style={inlineStyleColor}>
                    <i className="sticker" style={inlineStyleBackgroundColor}></i>
                    <em>{data.category}</em>
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
var myStorage = window.localStorage;

// Render
ReactDOM.render(
    <TaskFlow data={myStorage} pollInterval={3000}/>,
    document.getElementById('content')
);
