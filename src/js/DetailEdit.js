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
    render: function () {
        var items = this.props.items;
        var detailItemNodes = Object.keys(items).map(function(key){
            return (
                <DetailItem key={key} itemKey={key} data={items[key]} detailItemClick={this.props.detailItemClick}/>
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
    handleClick: function (e) {
        e.preventDefault();
        var itemKey = this.props.itemKey;
        var newItem = {};
        if (this.props.data.checked == true) {
            newItem = {
                text: this.props.data.text,
                checked: false
            };
        } else {
            newItem = {
                text: this.props.data.text,
                checked: true
            };
        }
        this.props.detailItemClick(itemKey, newItem);
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