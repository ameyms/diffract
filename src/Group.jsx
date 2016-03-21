import React, {Component, PropTypes} from 'react';

export default class Group extends Component {

    static displayName = 'Group'

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
        groupWidth: PropTypes.number,
        stackSize: PropTypes.number
    }

    getChildContext() {

        const {data} = this.context;

        return {
            ...this.context,
            groupWidth: data[0].length,
            stackSize: 1,
            dataTransform: this.dataTransform
        };
    }

    dataTransform(arr2d) {

        const txData = [];

        arr2d.forEach((samples, i) => {
            txData.push(samples.map((sample, j) => ({
                x: i,
                dx: j,
                y: sample,
                z: i,
                y0: 0,
                index: j
            })));
        });

        return Array.prototype.concat.apply([], txData);
    }

    render() {
        return (
            <g className="stack">
                {this.props.children}
            </g>
        );
    }
}
