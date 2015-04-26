var React = require('react/addons'),
    Axis = require('./axis'),
    Constants = require('./constants'),
    ReactTransitionGroup = React.addons.TransitionGroup,
    _transitionDuration = Constants.TRANSITION_DURATION,
    _inset = Axis.MARGIN,
    BarGraph, Bar;

Bar = React.createClass({

    propTypes: {
        color: React.PropTypes.string,
        height: React.PropTypes.number,
        width: React.PropTypes.number,
        x: React.PropTypes.number,
        y: React.PropTypes.number
    },

    getInitialState: function() {
        return {
            lastUpdate: 0,
        };
    },

    componentWillAppear: function(callback) {
        var self = this,
            el = React.findDOMNode(this);

        console.log('Rect has mounted...' + self.props.height);
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

        console.log('Rect is entering...' + self.props.height);
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

        console.log('Rect is exiting...');
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

    propTypes: {
        values: React.PropTypes.arrayOf(React.PropTypes.number),
        labels: React.PropTypes.arrayOf(React.PropTypes.string),
        barColor: React.PropTypes.func,
        leftMargin: React.PropTypes.number,
        width: React.PropTypes.number,
        height: React.PropTypes.number
    },

    getInitialState: function() {
        return {};
    },

    getDefaultProps: function() {
        return {
            leftMargin: 0
        };
    },

    render: function() {

        var len = this.props.values.length,
            bars = [],
            insetString,
            h, y, i, xScale, yScale;


        insetString = 'translate(' + (_inset + this.props.leftMargin) + ',' + (-_inset) + ' )';
        xScale = d3.scale.ordinal().
                domain(this.props.labels).
                rangeRoundBands([0, this.props.width - this.props.leftMargin - _inset], 0.2);


        yScale = d3.scale.linear().
                rangeRound([this.props.height - _inset, 0]).
                domain([0, d3.max(this.props.values)]);

        for (i = 0; i < len; i++) {

            h = this.props.height - yScale(this.props.values[i]);
            y = yScale(this.props.values[i]);
            bars.push(
                <Bar height={h} color={this.props.barColor(i)}
                    width={xScale.rangeBand()} key={i} y={y} x={xScale(this.props.labels[i])}>
                </Bar>
            );
        }

        return (
            <svg width={this.props.width} height={this.props.height} className="bar-graph">
                <g className="wrap">
                    <ReactTransitionGroup component="g"
                        transform={insetString} className="bars-container">
                        {bars}
                    </ReactTransitionGroup>
                    <g className="axes-container">
                        <Axis behavior={"X"} scale={xScale}
                            displacement={this.props.height} leftMargin={this.props.leftMargin}/>
                        <Axis behavior={"Y"} scale={yScale} leftMargin={this.props.leftMargin}/>
                    </g>
                </g>
            </svg>
        );
    }
});

module.exports = BarGraph;
