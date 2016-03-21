// "transform-remove-console"
import React, {Component, PropTypes} from 'react';

export default class Chart extends Component {

    static displayName = 'Chart'

    static childContextTypes = {
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
        }),
        xScale: PropTypes.func,
        yScale: PropTypes.func
    };

    static propTypes = {
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
        }),
        xScale: PropTypes.func,
        yScale: PropTypes.func

    };

    static defaultProps = {
        height: 0,
        width: 0,
        margin: {
            top: 0,
            bottom: 0,
            left: 0,
            right: 0
        }
    };


    getChildContext() {
        const {data, width, height, xScale, yScale} = this.props;
        let {margin} = this.props;

        margin = {
            top: 0,
            bottom: 0,
            left: 0,
            right: 0,
            ...margin
        };

        return {data, width, height, margin, xScale, yScale};
    }
    render(): () => any {

        const {width, height} = this.props;
        let {margin} = this.props;

        margin = {
            top: 0,
            bottom: 0,
            left: 0,
            right: 0,
            ...margin
        };

        const insetString = `translate(${margin.left}, ${margin.top})`;
        return (
            <svg className="dffract-svg" width={width} height={height}>
                <g className="conatiner" transform={insetString}>
                    {this.props.children}
                </g>
            </svg>
        );
    }
}
