import React, {Component, PropTypes} from 'react';

export default class DataSeries extends Component {

    static displayName = 'DataSeries'

    static propTypes = {
        xScale: PropTypes.func,
        yScale: PropTypes.func,
        data: PropTypes.oneOfType([
            PropTypes.arrayOf(PropTypes.number),
            PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.number))
        ]).isRequired
    }

    static childContextTypes = {
        xScale: PropTypes.func,
        yScale: PropTypes.func,
        data: PropTypes.oneOfType([
            PropTypes.arrayOf(PropTypes.number),
            PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.number))
        ])
    }

    getChildContext() {
        const {xScale, yScale, data} = this.props;
        return {xScale, yScale, data};
    }

    render() {
        return (
            <g>
                {this.props.children}
            </g>
        );
    }
}
