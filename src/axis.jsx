var React = require('react'),
    Constants = require('./constants'),
    ReactTransitionGroup = React.addons.TransitionGroup,
    _transitionDuration = Constants.TRANSITION_DURATION,
    Axis;

Axis = React.createClass({

    statics: {
        MARGIN: 30
    },

    propTypes: {
        behavior: React.PropTypes.oneOf(['X', 'Y']),
        scale: React.PropTypes.func,
        displacement: React.PropTypes.number,
        offset: React.PropTypes.number
    },

    getDefaultProps: function() {
        return {
            displacement: 0,
            leftMargin: 0
        };
    },

    drawAxis: function() {
        var self = this,
            el = self.getDOMNode(),
            axisFn, orientation, axisEl;

        orientation = this.props.behavior === 'X' ? 'bottom' : 'left';

        axisFn = d3.svg.axis().scale(this.props.scale).orient(orientation).
                    tickFormat(function(v) {
                        return v;
                    }).
                    innerTickSize(5);

        axisEl = d3.select(el);

        if (this.props.behavior === 'X') {
            axisEl.attr( 'transform', 'translate(' + (Axis.MARGIN + this.props.leftMargin) + ',' +
                (this.props.displacement - Axis.MARGIN) + ')');
        } else {
            axisEl.attr( 'transform', 'translate(' +
                (Axis.MARGIN + this.props.displacement + this.props.leftMargin) + ',0)');
        }

        axisEl.transition().duration(_transitionDuration).call(axisFn);
    },

    componentDidMount: function() {
        this.drawAxis();
    },

    componentDidUpdate: function() {
        this.drawAxis();
    },

    render: function() {
        var classString = this.props.behavior + '-axis axis';
        return (
            <g className={classString}>
            </g>
        );
    }

});

module.exports = Axis;
