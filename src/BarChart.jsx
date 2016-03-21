import React, {Component, PropTypes} from 'react';
import d3 from 'd3';
import {TransitionMotion, Motion, spring} from 'react-motion';

export default class BarChart extends Component {

    static displayName = 'BarChart'

    static propTypes = {
        style: PropTypes.func,
        xScale: PropTypes.func,
        yScale: PropTypes.func
    }

    static contextTypes = {
        data: PropTypes.arrayOf(PropTypes.number),
        height: PropTypes.number,
        width: PropTypes.number,
        margin: PropTypes.shape({
            top: PropTypes.number,
            bottom: PropTypes.number,
            left: PropTypes.number,
            right: PropTypes.number
        })
    }

    static childContextTypes = {
        data: PropTypes.arrayOf(PropTypes.number),
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
    }


    static defaultProps = {
        style: () => ({})
    }

    getChildContext() {
        const {xScale, yScale} = this.props;
        const {data, width, height, margin} = this.context;

        const wMax = width - margin.left - margin.right;
        const hMax = height - margin.top - margin.bottom;

        return {
            data, width, height, margin,
            xScale: xScale().
                    domain(d3.range(0, data.length)).
                    rangeRoundBands([0, wMax], 0.2),

            yScale: yScale().
                    rangeRound([hMax, 0]).
                    domain([0, d3.max(data)])
        };
    }

    willLeave({style}) {

        return {
            ...style,
            width: 0,
            x: style.x + style.width
        };
    }

    willEnter({style}) {
        const {height, margin} = this.context;
        const hMax = height - margin.top - margin.bottom;

        return {
            ...style,
            width: 0,
            height: 0,
            y: hMax
        };
    }

    render() {

        const {xScale, yScale} = this.props;
        const {width, height, data, margin} = this.context;

        const wMax = width - margin.left - margin.right;
        const hMax = height - margin.top - margin.bottom;

        const xScaleFn = xScale().
                domain(d3.range(0, data.length)).
                rangeRoundBands([0, wMax], 0.2);


        const yScaleFn = yScale().
                rangeRound([hMax, 0]).
                domain([0, d3.max(data)]);

        const motionStyles = data.map((d, i) => ({
            key: i + '',
            data: {...d, index: i},
            style: {
                width: xScaleFn.rangeBand(),
                height: hMax - yScaleFn(d),
                y: yScaleFn(d),
                x: xScaleFn(i)
            }
        }));

        const defaultStyles = data.map((d, i) => ({
            key: i + '',
            data: {...d, index: i},
            style: {
                width: xScaleFn.rangeBand(),
                height: 0,
                y: hMax,
                x: xScaleFn(i)
            }
        }));

        return (
            <g className="bar-chart">
                <TransitionMotion defaultStyles={defaultStyles} styles={motionStyles}
                    willEnter={this.willEnter.bind(this)} willLeave={this.willLeave.bind(this)}>
                    {interStyles => (
                        <g className="bars">
                        {interStyles.map(config => (
                                <Motion defaultStyle={{
                                    ...config.style,
                                    height: 0,
                                    y: config.style.y
                                }}
                                    key={config.key}
                                    style={{
                                        ...config.style,
                                        height: spring(config.style.height),
                                        y: spring(config.style.y),
                                        x: spring(config.style.x),
                                        width: spring(config.style.width)
                                    }}>
                                    {interStyle => (
                                        <rect className="bar" width={interStyle.width}
                                            height={interStyle.height}
                                            x={interStyle.x} y={interStyle.y}
                                            style={this.props.style(
                                                config.data.value,
                                                config.data.index
                                            )}/>
                                    )}
                                </Motion>
                            ))}
                        </g>
                    )}
                </TransitionMotion>
                {this.props.children}
            </g>
        );
    }
}
