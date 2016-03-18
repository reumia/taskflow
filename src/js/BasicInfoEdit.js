'use strict';
var React = require('react');
var ClassNames = require('classnames');

// BasicInfoEdit
var BasicInfoEdit = React.createClass({
    handleChange: function (node, event) {
        this.props.basicInfoChange(node, event.target.value);
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
                <textarea className="editor__textarea" cols="30" rows="4" placeholder="제목" value={this.props.title} onChange={this.handleChange.bind(this, "title")} />
                <input className="editor__input" type="text" placeholder="배포 20160218" value={this.props.deploy} onChange={this.handleChange.bind(this, "deploy")} />
                <input className="editor__input" type="text" placeholder="출처 GRAFOLIO-3000" value={this.props.origin} onChange={this.handleChange.bind(this, "origin")} />
            </section>
        );
    }
});

module.exports = BasicInfoEdit;