var React = require('react/addons'),
    Axis = require('./Axis'),
    Constants = require('./constants'),
    ReactTransitionGroup = React.addons.TransitionGroup,
    _transitionDuration = Constants.TRANSITION_DURATION,
    BarGraph, Bar;

Bar = React.createClass({

    displayName: 'Bar',

    propTypes: {
        color: React.PropTypes.string,
        height: React.PropTypes.number,
        width: React.PropTypes.number,
        x: React.PropTypes.number,
        y: React.PropTypes.number
    },

    getInitialState: function() {
        return {};
    },

    componentWillAppear: function(callback) {
        var self = this,
            el = React.findDOMNode(this);

        d3.select(el).
            attr('x', function() { return self.props.x; }).
            attr('y', function() { return self.props.height + self.props.y; }).
            attr('width', function() { return self.props.width; }).
            attr('fill', function() { return self.props.color; }).
            transition().
            duration(_transitionDuration).
            attr('y', function() { return self.props.y; }).
            attr('height', function() { return self.props.height; }).
            each('end', callback);
    },


    componentWillEnter: function(callback) {
        var self = this,
            el = React.findDOMNode(this);

        d3.select(el).
            attr('x', function() { return self.props.x; }).
            attr('y', function() { return self.props.height + self.props.y; }).
            attr('width', function() { return self.props.width; }).
            attr('fill', function() { return self.props.color; }).
            transition().
            duration(_transitionDuration).
            attr('y', function() { return self.props.y; }).
            attr('height', function() { return self.props.height; }).
            each('end', callback);

    },

    componentWillLeave: function(callback) {
        var self = this,
            el = React.findDOMNode(this);

        d3.select(el).
            transition().
            duration(_transitionDuration).
            attr('x', function() { return self.props.x + self.props.width; }).
            attr('width', function() { return 0; }).
            each('end', callback);

    },

    componentDidUpdate: function() {
        var self = this,
            el = React.findDOMNode(this);

        d3.select(el).
            transition().
            duration(_transitionDuration).
            attr('x', function() { return self.props.x; }).
            attr('y', function() { return self.props.y; }).
            attr('width', function() { return self.props.width; }).
            attr('fill', function() { return self.props.color; }).
            attr('height', function() { return self.props.height; });
    },

    render: function() {
        return (
            <rect className="bar" x="0" y="0" width="0" height="0" fill={this.props.color}></rect>
        );
    }


});

BarGraph = React.createClass({

    displayName: 'BarGraph',

    propTypes: {
        values: React.PropTypes.arrayOf(React.PropTypes.number),
        labels: React.PropTypes.arrayOf(React.PropTypes.string),
        barColor: React.PropTypes.func,
        width: React.PropTypes.number,
        height: React.PropTypes.number,

        marginTop: React.PropTypes.number,
        marginRight: React.PropTypes.number,
        marginBottom: React.PropTypes.number,
        marginLeft: React.PropTypes.number
    },

    getInitialState: function() {
        return {};
    },

    getDefaultProps: function() {
        return {
            marginTop: 10,
            marginBottom: 50,
            marginRight: 10,
            marginLeft: 50
        };
    },


    render: function() {

        var len = this.props.values.length,
            bars = [],
            insetString,
            h, y, i, xScale, yScale, hMax, wMax;


        wMax = this.props.width - this.props.marginLeft - this.props.marginRight;
        hMax = this.props.height - this.props.marginTop - this.props.marginBottom;

        insetString = 'translate(' + this.props.marginLeft + ',' + this.props.marginTop + ')';
        xScale = d3.scale.ordinal().
                domain(this.props.labels).
                rangeRoundBands([0, wMax], 0.2);


        yScale = d3.scale.linear().
                rangeRound([hMax, 0]).
                domain([0, d3.max(this.props.values)]);

        for (i = 0; i < len; i++) {

            h = hMax - yScale(this.props.values[i]);
            y = yScale(this.props.values[i]);
            bars.push(
                <Bar height={h} color={this.props.barColor(i)}
                    width={xScale.rangeBand()} key={i}
                    y={y} x={xScale(this.props.labels[i])} />
            );
        }

        return (
            <svg width={this.props.width} height={this.props.height} className="bar-graph">
                <g className="wrap" transform={insetString}>
                    <ReactTransitionGroup component="g"
                        className="bars-container">
                        {bars}
                    </ReactTransitionGroup>
                    <g className="axes-container">
                        <Axis behavior={"X"} scale={xScale}
                            displacement={hMax}/>
                        <Axis behavior={"Y"} scale={yScale}/>
                    </g>
                </g>
            </svg>
        );
    }
});

module.exports = BarGraph;
