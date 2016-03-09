import React, {Component, PropTypes} from 'react';
import ReactDOM from 'react-dom';
import ReactTransitionGroup from 'react-addons-transition-group';
import Axis from './Axis';
import d3 from 'd3';
import {TRANSITION_DURATION} from './constants';


class Bar extends Component {

    constructor() {
        super();
        this.state = {};
    }

    componentDidUpdate() {
        const el = ReactDOM.findDOMNode(this);

        d3.select(el).
            transition().
            duration(TRANSITION_DURATION).
            attr('x', () => this.props.x).
            attr('y', () => this.props.y).
            attr('width', () => this.props.width).
            attr('fill', () => this.props.color).
            attr('height', () => this.props.height);
    }

    componentWillAppear(callback) {
        const el = ReactDOM.findDOMNode(this);

        d3.select(el).
            attr('x', () => this.props.x).
            attr('y', () => this.props.height + this.props.y).
            attr('width', () => this.props.width).
            attr('fill', () => this.props.color).
            transition().
            duration(TRANSITION_DURATION).
            attr('y', () => this.props.y).
            attr('height', () => this.props.height).
            each('end', callback);
    }


    componentWillEnter(callback) {
        const el = ReactDOM.findDOMNode(this);

        d3.select(el).
            attr('x', () => this.props.x).
            attr('y', () => this.props.height + this.props.y).
            attr('width', () => this.props.width).
            attr('fill', () => this.props.color).
            transition().
            duration(TRANSITION_DURATION).
            attr('y', () => this.props.y).
            attr('height', () => this.props.height).
            each('end', callback);

    }

    componentWillLeave(callback) {
        const el = ReactDOM.findDOMNode(this);

        d3.select(el).
            transition().
            duration(TRANSITION_DURATION).
            attr('x', () => this.props.x + this.props.width).
            attr('width', () => 0).
            each('end', callback);

    }



    render() {
        return (
            <rect className="bar" x="0" y="0"
                width="0" height="0" fill={this.props.color}/>
        );
    }
}

Bar.displayName = 'Bar';

Bar.propTypes = {
    color: PropTypes.string,
    height: PropTypes.number,
    width: PropTypes.number,
    x: PropTypes.number,
    y: PropTypes.number
};

export default class BarGraph extends React.Component {

    render() {

        const wMax = this.props.width - this.props.marginLeft - this.props.marginRight;
        const hMax = this.props.height - this.props.marginTop - this.props.marginBottom;

        const insetString = `translate(${this.props.marginLeft}, ${this.props.marginTop})`;
        const xScale = d3.scale.ordinal().
                domain(this.props.labels).
                rangeRoundBands([0, wMax], 0.2);


        const yScale = d3.scale.linear().
                rangeRound([hMax, 0]).
                domain([0, d3.max(this.props.values)]);

        const bars = this.props.values.map((v, i) => {
            const y = yScale(v);
            const h = hMax - y;

            return (
                <Bar height={h} color={this.props.barColor(i)}
                    width={xScale.rangeBand()} key={i}
                    y={y} x={xScale(this.props.labels[i])} />
            );
        });
        console.log(insetString);

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
}

BarGraph.displayName = 'BarGraph';
BarGraph.propTypes = {
    barColor: PropTypes.func,
    height: PropTypes.number,
    labels: PropTypes.arrayOf(PropTypes.string),
    marginBottom: PropTypes.number,
    marginLeft: PropTypes.number,
    marginRight: PropTypes.number,
    marginTop: PropTypes.number,
    values: PropTypes.arrayOf(PropTypes.number),
    width: PropTypes.number

};

BarGraph.defaultProps = {
    marginTop: 10,
    marginBottom: 50,
    marginRight: 10,
    marginLeft: 50

};
