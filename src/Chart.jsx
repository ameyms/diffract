// "transform-remove-console"
import React, {Component, PropTypes} from 'react';

export default class Chart extends Component {

    static displayName = 'Chart';
    static childContextTypes = {
        data: PropTypes.arrayOf(PropTypes.number),
        height: PropTypes.number,
        width: PropTypes.number
    };

    static propTypes = {
        data: PropTypes.arrayOf(PropTypes.number),
        height: PropTypes.number,
        width: PropTypes.number

    };

    getChildContext() {
        const {data, width, height} = this.props;

        return {data, width, height};
    }

    render(): () => any {

        const {width, height} = this.props;

        return (
            <svg className="dffract-svg" width={width} height={height}>
                <g className="conatiner">
                    {this.props.children}
                </g>
            </svg>
        );
    }
}
