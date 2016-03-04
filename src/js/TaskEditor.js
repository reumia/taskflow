'use strict';
var React = require('react');
var ClassNames = require('classnames');
var PropTypes = React.PropTypes;

// TaskEditor
var TaskEditor = React.createClass({
    getInitialState: function(){
        return {
            task: {
                title: "",
                deploy: "",
                origin: "",
                detail: []
            }
        }
    },
    componentWillReceiveProps: function(nextProps){
        var tasks = this.props.tasks;
        var currentTaskKey = nextProps.currentTaskKey;
        if ( currentTaskKey.length > 0 ){
            this.setState({
                task: tasks[currentTaskKey[0]][currentTaskKey[1]]
            });
        }
    },
    render: function () {
        var task = this.state.task;
        return (
            <form className="editor">
                <h2 className="editor__title">Edit Task</h2>
                <CategoryEdit categories={this.props.categories}/>
                <BasicInfoEdit title={task.title} deploy={task.deploy} origin={task.origin} />
                <DetailEdit detail={task.detail} />
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
        var selectboxClass = ClassNames({
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
    propTypes: {
        items: PropTypes.array,
        deploy: PropTypes.any,
        origin: PropTypes.string
    },
    getDateByTimestamp: function (string) {
        var timestamp = new Date(string);
        if (timestamp.getTime() > 0) {
            return timestamp.toLocaleDateString();
        } else {
            return string;
        }
    },
    render: function () {
        return (
            <section className="editor__section">
                <textarea className="editor__textarea" name="" id="" cols="30" rows="4" placeholder="제목" value={this.props.title} />
                <input className="editor__input" type="text" placeholder="배포 20160218" value={this.getDateByTimestamp(this.props.deploy)} />
                <input className="editor__input" type="text" placeholder="출처 GRAFOLIO-3000" value={this.props.origin} />
            </section>
        );
    }
});

// DetailEdit
var DetailEdit = React.createClass({
    getInitialState: function () {
        return {
            items: []
        }
    },
    componentWillReceiveProps: function (nextProp) {
        this.setState({
            items: nextProp.detail
        })
    },
    render: function () {
        return (
            <section className="editor__section detail">
                <input type="text" className="editor__input" placeholder="상세" />
                <a href="#" className="button button--block">추가</a>
                <DetailItems items={this.state.items} />
            </section>
        );
    }
})

// DetailItems
var DetailItems = React.createClass({
    getInitialState: function () {
        return {
            items: this.props.items
        };
    },
    componentWillReceiveProps: function (nextProp) {
        this.setState({items: nextProp.items});
    },
    render: function () {
        var detailItemNodes = Object.keys(this.state.items).map(function(key){
            console.log(this.state.items[key]);
            return (
                <DetailItem data={this.state.items[key]} />
            );
        }.bind(this));
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
        return this.props.data;
    },
    componentWillReceiveProps: function (nextProp) {
        this.setState(nextProp.data);
    },
    handleClickItem: function (e) {
        e.preventDefault();
        if (this.state.checked) {
            this.setState({
                checked: false
            });
        } else {
            this.setState({
                checked: true
            });
        }
    },
    render: function () {
        var detailItemClasses = ClassNames({
            "editor__item": true,
            "active": this.state.checked
        });
        var data = this.state;
        return (
            <a href="#" className={detailItemClasses} onClick={this.handleClickItem} checked={this.state.checked} >{data.text}</a>
        );
    }
});

module.exports = TaskEditor;