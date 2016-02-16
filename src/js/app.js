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
        return (
            <article className="task" onClick={this.handleClick}>
                <h3 className="task__category" style={inlineStyleColor}>
                    <i className="sticker" style={inlineStyleBackgroundColor}></i>
                    <em>{data.category}</em>
                </h3>

                <h2 className="task__title">{data.title}</h2>

                <div className="task__deploy">
                    배포
                    <i>{deployDate}</i>
                </div>
                <div className="task__origin">
                    출처
                    <i>{data.origin}</i>
                </div>
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
    getInitialState: function () {
        return {data: []}
    },
    render: function () {
        var data = this.props.data;
        var event = this.handleClickTask;
        var taskNodes = Object.keys(data).map(function (key) {
            var item = data[key];
            return (
                <Task data={item} statement={key} key={item.date}/>
            );
        });
        return (
            <div className="task-wrap list__item">
                {taskNodes}
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
        var taskWrapNodes = Object.keys(data).map(function (key) {
            var item = JSON.parse(data[key]);
            return (
                <TaskWrap data={item} statement={key} key={key}/>
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
var myStorage = window.localStorage;

// Render
ReactDOM.render(
    <TaskFlow data={myStorage} pollInterval={3000}/>,
    document.getElementById('content')
);
