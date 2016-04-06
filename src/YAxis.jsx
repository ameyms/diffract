import React, {PropTypes, Component} from 'react';
import ReactDom from 'react-dom';
import {Axis as Styles} from './styles';
import {TRANSITION_DURATION} from './constants';
import d3 from 'd3';

export default class YAxis extends Component {

    static displayName = 'Axis'

    static contextTypes = {
        yScale: PropTypes.func.isRequired,
        dataTransform: PropTypes.func,
        data: PropTypes.oneOfType([
            PropTypes.arrayOf(PropTypes.number),
            PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.number))
        ]),
        height: PropTypes.number,
        width: PropTypes.number,
        margin: PropTypes.shape({
            top: PropTypes.number,
            bottom: PropTypes.number,
            left: PropTypes.number,
            right: PropTypes.number
        })
    }

    static propTypes = {
        labels: PropTypes.func,
        orientation: PropTypes.string,
        tickFormat: PropTypes.func
    }

    static defaultProps = {
        tickFormat: v => (v),
        labels: v => (v)
    }

    componentDidMount() {
        this.drawAxis();
    }

    componentDidUpdate() {
        this.drawAxis();
    }

    drawAxis() {

        const el = d3.select(ReactDom.findDOMNode(this));
        const {orientation = 'left', tickFormat} = this.props;
        const {
            yScale, width, height, margin, data,
            dataTransform = arr => arr.map((d, i) => ({
                x: i,
                y0: 0,
                y: d,
                z: 0
            }))
        } = this.context;

        const wMax = width - margin.left - margin.right;
        const hMax = height - margin.top - margin.bottom;
        const txData = dataTransform(data);

        let displacement;
        const scale = yScale().
                    rangeRound([hMax, 0]).
                    domain([0, d3.max(txData, d => d.y0 + d.y)]);

        switch (orientation) {

            case 'right':
                displacement = `translate(${wMax}, 0)`;
                break;

            case 'left':
            default:
                displacement = 'translate(0, 0)';
                break;
        }

        const axisFn = d3.svg.axis().
                            scale(scale).
                            orient(orientation).
                            tickFormat(tickFormat).
                            innerTickSize(5);

        el.attr('transform', displacement);

        el.transition().duration(TRANSITION_DURATION).call(axisFn);
        el.selectAll('text').style(Styles.text);
        el.selectAll('path').style(Styles.paths);
        el.selectAll('line').style(Styles.lines);
    }

    render() {
        return (
            <g className="axis">
            </g>
        );
    }
}
