// Task
var Task = React.createClass({
    getDateByTimeStamp : function(string){
        var timestamp = new Date(string);
        if (timestamp.getTime() > 0) {
            return timestamp.toLocaleDateString();
        } else {
            return string;
        }
    },
    render: function () {
        var data = this.props.data;
        var inlineStyleColor = {color: data.categoryColor};
        var inlineStyleBackgroundColor = {backgroundColor: data.categoryColor};
        var deployDate = this.getDateByTimeStamp(data.deploy);
        return (
            <article className="task">
                <h3 className="task__category" style={inlineStyleColor}>
                    <i className="sticker" style={inlineStyleBackgroundColor}></i>
                    <em>{data.category}</em>
                </h3>
                <h2 className="task__title">{data.title}</h2>
                <div className="task__deploy">
                    배포
                    <i>{deployDate}</i></div>
                <div className="task__origin" >
                    출처
                    <i>{data.origin}</i></div>
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
        var data = this.props.data;
        var taskNodes = Object.keys(data).map(function(key) {
            var item = data[key];
            return (
                <Task data={item} statement={key} key={item.date}/>
            );
        });
        return (
            <div className="task-wrap list__item">
                <h1>{this.props.statement}</h1>
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
        var taskWrapNodes = Object.keys(data).map(function(key) {
            var item = data[key];
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
// var myStorage = window.localStorage;
var myStorage = {
    "todo" : [
        {"date":1455523409565,"category":"GRAFOLIO","categoryColor":"#2ecc71","title":"[기타] 다이어리 팝업에서 제목 표시줄에 있는 아이콘이 기본 브라우저 아이콘으로 노출됨","deploy":1458226800000,"origin":"GRAFOLIO-3000","originLink":"#","detail":["aaa", "bbb"]},
        {"date":1455523409566,"category":"GRAFOLIO","categoryColor":"#2ecc71","title":"테스트 ㅎㅎ","deploy":"미정","origin":"E-mail","originLink":"#","detail":["aaa", "bbb"]}
    ],
    "progress" : [
        {"date":1455523409567,"category":"LINEPLAY-DIARY","categoryColor":"red","title":"하트를 준 아바타 : 아바타 위치 수정","deploy":"미정","origin":"E-mail","originLink":"#","detail":["aaa", "bbb"]},
        {"date":1455523409568,"category":"GRAFOLIO","categoryColor":"#2ecc71","title":"[기타] 다이어리 팝업에서 제목 표시줄에 있는 아이콘이 기본 브라우저 아이콘으로 노출됨","deploy":"미정","origin":"E-mail","originLink":"#","detail":["aaa", "bbb"]},
        {"date":1455523409569,"category":"GRAFOLIO","categoryColor":"#2ecc71","title":"[기타] 다이어리 팝업에서 제목 표시줄에 있는 아이콘이 기본 브라우저 아이콘으로 노출됨","deploy":"미정","origin":"E-mail","originLink":"#","detail":["aaa", "bbb"]}
    ],
    "done" : [
        {"date":1455523409571,"category":"GRAFOLIO","categoryColor":"#2ecc71","title":"[기타] 다이어리 팝업에서 제목 표시줄에 있는 아이콘이 기본 브라우저 아이콘으로 노출됨","deploy":"미정","origin":"E-mail","originLink":"#","detail":["aaa", "bbb"]},
        {"date":1455523409572,"category":"GRAFOLIO","categoryColor":"#2ecc71","title":"[기타] 다이어리 팝업에서 제목 표시줄에 있는 아이콘이 기본 브라우저 아이콘으로 노출됨","deploy":"미정","origin":"E-mail","originLink":"#","detail":["aaa", "bbb"]},
        {"date":1455523409573,"category":"GRAFOLIO","categoryColor":"#2ecc71","title":"[기타] 다이어리 팝업에서 제목 표시줄에 있는 아이콘이 기본 브라우저 아이콘으로 노출됨","deploy":"미정","origin":"E-mail","originLink":"#","detail":["aaa", "bbb"]}
    ],
    "next" : [
        {"date":1455523409574,"category":"GRAFOLIO","categoryColor":"#2ecc71","title":"[기타] 다이어리 팝업에서 제목 표시줄에 있는 아이콘이 기본 브라우저 아이콘으로 노출됨","deploy":"미정","origin":"E-mail","originLink":"#","detail":["aaa", "bbb"]},
        {"date":1455523409575,"category":"GRAFOLIO","categoryColor":"#2ecc71","title":"[기타] 다이어리 팝업에서 제목 표시줄에 있는 아이콘이 기본 브라우저 아이콘으로 노출됨","deploy":"미정","origin":"E-mail","originLink":"#","detail":["aaa", "bbb"]},
        {"date":1455523409576,"category":"GRAFOLIO","categoryColor":"#2ecc71","title":"[기타] 다이어리 팝업에서 제목 표시줄에 있는 아이콘이 기본 브라우저 아이콘으로 노출됨","deploy":"미정","origin":"E-mail","originLink":"#","detail":["aaa", "bbb"]},
        {"date":1455523409577,"category":"GRAFOLIO","categoryColor":"#2ecc71","title":"[기타] 다이어리 팝업에서 제목 표시줄에 있는 아이콘이 기본 브라우저 아이콘으로 노출됨","deploy":"미정","origin":"E-mail","originLink":"#","detail":["aaa", "bbb"]}
    ]
}

// Render
ReactDOM.render(
    <TaskFlow data={myStorage} pollInterval={3000} />,
    document.getElementById('content')
);
