'use strict';
var React = require('react');
var ClassNames = require('classnames');

// DetailEdit
var DetailEdit = React.createClass({
    addDetailItem: function () {
        var input = this.refs.detailItemText;
        var inputVal = input.value;
        if ( inputVal != "" && inputVal ) {
            this.props.addDetailItem(inputVal);
            this.clearInput();
        } else {
            console.error("인풋을 채워주세요");
            return;
        }
    },
    clearInput: function () {
        this.refs.detailItemText.value = "";
    },
    render: function () {
        return (
            <section className="editor__section detail">
                <input ref="detailItemText" type="text" className="editor__input" placeholder="상세" />
                <a href="#" className="button button--block" onClick={this.addDetailItem}>추가</a>
                <DetailItems items={this.props.detail} detailItemClick={this.props.detailItemClick} />
            </section>
        );
    }
});

// DetailItems
var DetailItems = React.createClass({
    handleDetailItemClick: function (node, newItem) {
        var newItems = this.props.items;
        newItems[node] = newItem;
        this.props.detailItemClick(newItems);
    },
    render: function () {
        var items = this.props.items;
        var detailItemNodes = Object.keys(items).map(function(key){
            return (
                <DetailItem key={key} data={items[key]} detailItemClick={this.handleDetailItemClick.bind(this, key)}/>
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
    handleClick: function (e) {
        e.preventDefault();
        if (this.state.checked == true) {
            this.setState({checked: false}, function () {
                this.props.detailItemClick(this.state);
            }.bind(this));
        } else {
            this.setState({checked: true}, function () {
                this.props.detailItemClick(this.state);
            }.bind(this));
        }
    },
    render: function () {
        var data = this.props.data;
        var detailItemClasses = ClassNames({
            "editor__item": true,
            "active": data.checked
        });
        return (
            <a href="#" className={detailItemClasses} onClick={this.handleClick}>{data.text}</a>
        );
    }
});

module.exports = DetailEdit;