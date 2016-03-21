import React, {Component, PropTypes} from 'react';
import d3 from 'd3';

export default class Stack extends Component {
    static contextTypes = {
        data: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.number)).isRequired,
        height: PropTypes.number.isRequired,
        width: PropTypes.number.isRequired,
        margin: PropTypes.shape({
            top: PropTypes.number,
            bottom: PropTypes.number,
            left: PropTypes.number,
            right: PropTypes.number
        }),
        xScale: PropTypes.func.isRequired,
        yScale: PropTypes.func.isRequired
    }

    static childContextTypes = {
        data: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.number)),
        height: PropTypes.number,
        width: PropTypes.number,
        margin: PropTypes.shape({
            top: PropTypes.number,
            bottom: PropTypes.number,
            left: PropTypes.number,
            right: PropTypes.number
        }),
        xScale: PropTypes.func.isRequired,
        yScale: PropTypes.func.isRequired,
        dataTransform: PropTypes.func,
        stackSize: PropTypes.number,
        groupWidth: PropTypes.number
    }

    getChildContext() {

        const {data} = this.context;

        return {
            ...this.context,
            stackSize: data[0].length,
            groupWidth: 1,
            dataTransform: this.dataTransform
        };
    }

    dataTransform(arr2d) {

        const txData = [];

        arr2d[0].forEach(() => {
            txData.push([]);
        });

        arr2d.forEach((samples, i) => {
            samples.forEach((s, j) => {
                txData[j].push({
                    x: i,
                    y: s,
                    z: i,
                    y0: 0,
                    dx: 0,
                    index: j
                });
            });
        });

        return Array.prototype.concat.apply([], d3.layout.stack()(txData));
    }

    render() {
        return (
            <g className="stack">
                {this.props.children}
            </g>
        );
    }
}
