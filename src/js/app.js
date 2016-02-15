// Task
var Task = React.createClass({
    render: function () {
        return (
            <article className="task">
                <h3 className="task__category">
                    <i className="sticker"></i>
                    <em>GRAFOLIO</em>
                </h3>
                <h2 className="task__title">[기타] 다이어리 팝업에서 제목 표시줄에 있는 아이콘이 기본 브라우저 아이콘으로 노출됨</h2>
                <div className="task__deploy">
                    배포
                    <i>미정</i></div>
                <div className="task__origin">
                    출처
                    <i>E-mail</i></div>
                <div className="task__detail">
                    상세
                    <div className="sticker-wrap">
                        <i className="sticker"></i>
                        <i className="sticker"></i>
                        <i className="sticker"></i>
                        <i className="sticker"></i>
                        <i className="sticker"></i>
                        <i className="sticker"></i>
                    </div>
                </div>
            </article>
        );
    }
});

// TaskWrap
var TaskWrap = React.createClass({
    render: function () {
        console.log(this.props.data);
        return (
            <div className="task-wrap list__item">
                <h1>{this.props.category}</h1>
                <Task data={this.props.data} />
            </div>
        );
    }
});

// TaskFlow
var TaskFlow = React.createClass({
    loadTasksFromStorage: function () {
        this.setState({data: this.props.data});
    },
    getInitialState: function () {
        return {data: []};
    },
    componentDidMount: function () {
        this.loadTasksFromStorage();
    },
    render: function () {
        var data = this.props.data;
        var taskWrapNodes = Object.keys(data).map(function(key) {
            var item = data[key];
            return (
                <TaskWrap data={item} category={item.state} />
            );
        });
        return (
            <div className="taskflow list list--equal">
                {taskWrapNodes}
            </div>
        );
    }
});

// Set Database
// var myStorage = window.localStorage;
var myStorage = {
    0 : {
        "state": "todo"
    },
    1 : {
        "state": "progress"
    },
    2 : {
        "state": "done"
    },
    3 : {
        "state": "next"
    }
}

// Render
ReactDOM.render(
    <TaskFlow data={myStorage} pollInterval={3000} />,
    document.getElementById('content')
);
