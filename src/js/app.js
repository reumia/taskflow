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

// TaskEditor
var TaskEditor = React.createClass({
    render: function () {
        return (
            <form className="editor">
                <h2 className="editor__title">Edit Task</h2>
                /* Todo : 카테고리 선택 UI */
                <section className="editor__section">
                    <select className="editor__select" name="" id="">
                        <option value="">AA</option>
                        <option value="">BB</option>
                        <option value="">CC</option>
                    </select>
                </section>
                <section className="editor__section">
                    <textarea className="editor__textarea" name="" id="" cols="30" rows="4" placeholder="제목" />
                    <input className="editor__input" type="text" placeholder="배포 20160218" />
                    <input className="editor__input" type="text" placeholder="출처 GRAFOLIO-3000" />
                </section>
                <section className="editor__section">
                    <input type="text" className="editor__input" placeholder="상세" />
                    <a href="#" className="button button--block">추가</a>
                    <a href="#" className="editor__item">asdasd</a>
                    <a href="#" className="editor__item">asdasd</a>
                    <a href="#" className="editor__item active">asdasd</a>
                    <a href="#" className="editor__item active">asdaksjdfljasldfjlaksjdflkjasl jdflkjasldfjlkasjfjkasd</a>
                    <a href="#" className="editor__item">asdasd</a>
                </section>
                <div className="button-wrap">
                    <a href="#" className="button">추가</a>
                    <a href="#" className="button">취소</a>
                </div>
            </form>
        );
    }
});

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
                <TaskWrap data={item} statement={key} key={key}/>
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

// Set Database
var myStorage = window.localStorage;

// Render
ReactDOM.render(
    <TaskFlow data={myStorage} pollInterval={3000}/>,
    document.getElementById('content')
);
