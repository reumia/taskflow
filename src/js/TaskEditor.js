'use strict';
var React = require('react');
var ClassNames = require('classnames');
var PropTypes = React.PropTypes;

// TaskEditor
var TaskEditor = React.createClass({
    getInitialState: function(){
        return {
            categoryId: null,
            title: "",
            deploy: "",
            origin: "",
            detail: []
        }
    },
    componentWillReceiveProps: function(nextProps){
        var tasks = this.props.tasks;
        var currentTaskKey = nextProps.currentTaskKey;
        if ( currentTaskKey.length > 0 ){
            this.setState(tasks[currentTaskKey[0]][currentTaskKey[1]]);
        }
    },
    handleCategoryChange: function (newCategoryId) {
        this.setState({categoryId: newCategoryId})
    },
    handleBasicInfoChange: function (dataKey, newDataValue) {
        console.log(this.state);
    },
    render: function () {
        var task = this.state;
        return (
            <form className="editor">
                <h2 className="editor__title">Edit Task</h2>
                <CategoryEdit categories={this.props.categories} activeCategoryConfig={this.props.activeCategoryConfig} categoryId={task.categoryId} categoryChange={this.handleCategoryChange} />
                <BasicInfoEdit title={task.title} deploy={task.deploy} origin={task.origin} basicInfoChange={this.handleBasicInfoChange} />
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
        return {
            isActivated: false,
            currentCategoryId: this.props.categoryId
        };
    },
    handleClickSelect: function (e) {
        e.preventDefault();
        this.toggleSelectBox(this);
    },
    handleClickItem: function (categoryId) {
        this.setState({currentCategoryId: categoryId});
        this.props.categoryChange(categoryId);
        this.toggleSelectBox(this);
    },
    toggleSelectBox: function (self) {
        if (self.state.isActivated) {
            self.setState({isActivated: false});
        } else {
            self.setState({isActivated: true});
        }
    },
    componentWillReceiveProps: function (nextProp) {
        this.setState({currentCategoryId: nextProp.categoryId});
    },
    render: function () {
        var currentCategory = this.props.categories[this.state.currentCategoryId];
        var buttonStyle = {color: ""};
        var buttonText = "카테고리 선택";
        if (currentCategory != undefined) {
            buttonStyle.color = currentCategory.color;
            buttonText = currentCategory.name;
        }
        return (
            <section className="editor__section category">
                <div className="table">
                    <a href="#" className="button table__item" onClick={this.handleClickSelect} style={buttonStyle}>
                        <i className="fa fa-chevron-down"></i> {buttonText}
                    </a>
                    <a href="#" className="button table__item" onClick={this.props.activeCategoryConfig}>
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
    handleClickItem: function (key) {
        this.props.itemClick(key);
    },
    render: function () {
        var categories = this.props.categories;
        var selectboxNodes = Object.keys(categories).map(function (key) {
            var category = categories[key];
            var inlineStyleColor = {color: category.color};
            var inlineStyleBackgroundColor = {backgroundColor: category.color};
            return (
                <div className="selectbox__item" style={inlineStyleColor} key={category.color} onClick={this.handleClickItem.bind(this, key)}>
                    <i className="sticker" style={inlineStyleBackgroundColor}></i> {category.name}
                </div>
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
    getInitialState: function () {
        return {
            title: this.props.title,
            deploy: this.props.deploy,
            origin: this.props.origin
        }
    },
    componentWillReceiveProps: function (nextProp) {
        this.setState({
            title: nextProp.title,
            deploy: nextProp.deploy,
            origin: nextProp.origin
        })
    },
    handleChange: function (node, event) {
        switch (node) {
            case "title" : this.setState({ title: event.target.value }); break;
            case "deploy" : this.setState({ deploy: event.target.value }); break;
            case "origin" : this.setState({ origin: event.target.value }); break;
        }
        //console.log(this.state);
        //this.props.basicInfoChange();
    },
    validateDate: function (string) {
        var newString;
        if (/[\D-]/.test(string)) {
            newString = string.slice(0, -1);
            return newString;
        } else {
            return string;
        }
    },
    render: function () {
        return (
            <section className="editor__section">
                <textarea className="editor__textarea" cols="30" rows="4" placeholder="제목" value={this.state.title} onChange={this.handleChange.bind(this, "title")} />
                <input className="editor__input" type="text" placeholder="배포 20160218" value={this.state.deploy} onChange={this.handleChange.bind(this, "deploy")} />
                <input className="editor__input" type="text" placeholder="출처 GRAFOLIO-3000" value={this.state.origin} onChange={this.handleChange.bind(this, "origin")} />
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
    addDetailItem: function (callback) {
        var input = this.refs.detailItemText;
        var inputVal = input.value;
        var newItems = this.state.items;
        var newItem;
        if (inputVal == "") {
            console.error("내용이 없습니다.");
            return;
        } else {
            newItem = {
                text: inputVal,
                checked: false
            };
            newItems = newItems.concat(newItem);
            this.setState({items: newItems});
            this.props.detailItemsChange(newItems);
            callback.apply(this);
        }
    },
    clearInput: function () {
        this.refs.detailItemText.value = "";
    },
    render: function () {
        return (
            <section className="editor__section detail">
                <input ref="detailItemText" type="text" className="editor__input" placeholder="상세" />
                <a href="#" className="button button--block" onClick={this.addDetailItem.bind(this, this.clearInput)}>추가</a>
                <DetailItems items={this.state.items} />
            </section>
        );
    }
})

// DetailItems
var DetailItems = React.createClass({
    render: function () {
        var items = this.props.items;
        var detailItemNodes = Object.keys(items).map(function(key){
            return (
                <DetailItem key={key} itemKey={key} data={items[key]} />
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
        return this.props.data
    },
    componentWillReceiveProps: function (nextProp) {
        this.setState(nextProp.data);
    },
    handleClick: function (e) {
        e.preventDefault();
        var itemKey = this.props.itemKey;
        if (this.state.checked == true) {
            this.setState({checked: false});
        } else {
            this.setState({checked: true});
        }
    },
    render: function () {
        var data = this.state;
        var detailItemClasses = ClassNames({
            "editor__item": true,
            "active": data.checked
        });
        return (
            <a href="#" className={detailItemClasses} onClick={this.handleClick} checked={data.checked} >{data.text}</a>
        );
    }
});

module.exports = TaskEditor;