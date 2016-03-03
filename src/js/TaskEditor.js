'use strict';
var React = require('react');
var ClassNames = require('classnames');

// TaskEditor
var TaskEditor = React.createClass({
    getInitialState: function(){
        return {
            task: {}
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
        return (
            <form className="editor">
                <h2 className="editor__title">Edit Task</h2>
                <CategoryEdit categories={this.props.categories}/>
                <BasicInfoEdit taskTitle={this.state.task.title}/>
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
    render: function () {
        return (
            <section className="editor__section">
                <textarea className="editor__textarea" name="" id="" cols="30" rows="4" placeholder="제목" value={this.props.taskTitle} />
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
        var detailItemClasses = ClassNames({
            "editor__item": true,
            "active": this.state.isActivated
        })
        return (
            <a href="#" className={detailItemClasses} onClick={this.handleClickItem} isActivated={this.state.isActivated}>asdasd</a>
        );
    }
});

module.exports = TaskEditor;