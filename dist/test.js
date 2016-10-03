"use strict";

var Calendar = React.createClass({
    displayName: "Calendar",

    getInitialState: function getInitialState() {
        return {
            month: this.props.selected.clone()
        };
    },

    previous: function previous() {
        var month = this.state.month;
        month.add(-1, "M");
        this.setState({ month: month });
    },

    next: function next() {
        var month = this.state.month;
        month.add(1, "M");
        this.setState({ month: month });
    },

    select: function select(day) {
        this.props.selected = day.date;
        this.forceUpdate();
    },

    render: function render() {
        return React.createElement(
            "div",
            null,
            React.createElement(
                "div",
                { className: "header" },
                React.createElement("i", { className: "fa fa-angle-left", onClick: this.previous }),
                this.renderMonthLabel(),
                React.createElement("i", { className: "fa fa-angle-right", onClick: this.next })
            ),
            React.createElement(DayNames, null),
            this.renderWeeks()
        );
    },

    renderWeeks: function renderWeeks() {
        var weeks = [],
            done = false,
            date = this.state.month.clone().startOf("month").add("w" - 1).day("Sunday"),
            monthIndex = date.month(),
            count = 0;

        while (!done) {
            weeks.push(React.createElement(Week, { key: date.toString(), date: date.clone(), month: this.state.month, select: this.select, selected: this.props.selected }));
            date.add(1, "w");
            done = count++ > 2 && monthIndex !== date.month();
            monthIndex = date.month();
        }

        return weeks;
    },

    renderMonthLabel: function renderMonthLabel() {
        return React.createElement(
            "span",
            null,
            this.state.month.format("MMMM, YYYY")
        );
    }
});

ReactDOM.render(React.createElement(Calendar, null), docuemtn.getElementById("container"));