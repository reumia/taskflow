'use strict';
var React = require('react');
var ClassNames = require('classnames');

// DetailEdit
var DetailEdit = React.createClass({
    addDetailItem: function () {
        var input = this.refs.detailItemText;
        var inputVal = input.value;
        var i = this.getObjectSize(this.props.detail);
        var newItem = {
            text: "",
            checked: false
        };
        if ( inputVal != "" && inputVal ) {
            newItem.text = inputVal;
            this.props.addDetailItem(newItem, i);
            this.clearInput();
        } else {
            console.error("인풋을 채워주세요");
            return;
        }
    },
    clearInput: function () {
        this.refs.detailItemText.value = "";
    },
    getObjectSize: function (obj) {
        var size = 0, key;
        for (key in obj) {
            if (obj.hasOwnProperty(key)) size++;
        }
        return size;
    },
    render: function () {
        return (
            <section className="editor__section input-group">
                <input ref="detailItemText" type="text" className="input" placeholder="상세" />
                <a href="#" className="button button--block" onClick={this.addDetailItem}>추가</a>
                <DetailItems items={this.props.detail} detailItemClick={this.props.detailItemClick} />
            </section>
        );
    }
});

// DetailItems
var DetailItems = React.createClass({
    handleDetailItemClick: function (node, newItem) {
        this.props.detailItemClick(newItem, node);
    },
    render: function () {
        var items = this.props.items;
        var detailItemNodes = Object.keys(items).map(function(key){
            return (
                <DetailItem key={key} data={items[key]} detailItemClick={this.handleDetailItemClick.bind(this, key)}/>
            );
        }.bind(this));
        return (
            <div className="item-group">
                {detailItemNodes}
            </div>
        );
    }
});

// DetailItem
var DetailItem = React.createClass({
    handleClick: function (e) {
        e.preventDefault();
        var newItem = {
            text: this.props.data.text,
            checked: false
        };
        if (this.props.data.checked == true) {
            this.props.detailItemClick(newItem);
        } else {
            newItem.checked = true;
            this.props.detailItemClick(newItem);
        }
    },
    render: function () {
        var data = this.props.data;
        var detailItemClasses = ClassNames({
            "item": true,
            "active": data.checked
        });
        return (
            <a href="#" className={detailItemClasses} onClick={this.handleClick}>{data.text}</a>
        );
    }
});

module.exports = DetailEdit;