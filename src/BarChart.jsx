import React, {Component, PropTypes} from 'react';
import d3 from 'd3';
import {TransitionMotion, Motion, spring} from 'react-motion';

export default class BarChart extends Component {

    static displayName = 'BarChart'

    static propTypes = {
        style: PropTypes.func
    }

    static contextTypes = {
        data: PropTypes.oneOfType([
            PropTypes.arrayOf(PropTypes.number),
            PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.number))
        ]),
        height: PropTypes.number.isRequired,
        width: PropTypes.number.isRequired,
        margin: PropTypes.shape({
            top: PropTypes.number,
            bottom: PropTypes.number,
            left: PropTypes.number,
            right: PropTypes.number
        }),
        xScale: PropTypes.func.isRequired,
        yScale: PropTypes.func.isRequired,
        dataTransform: PropTypes.func,
        groupWidth: PropTypes.number
    }

    static defaultProps = {
        style: () => ({})
    }

    willLeave({style}) {

        return {
            ...style,
            width: 0,
            x: style.x + style.width
        };
    }

    willEnter({style}) {
        return {
            ...style,
            width: 0,
            x: style.x + style.width
        };
    }

    render() {

        const {
            width, height, margin, xScale, yScale, data,
            dataTransform = arr => arr.map((d, i) => ({
                x: i,
                dx: 0,
                y0: 0,
                y: d,
                z: 0,
                index: i
            })),
            groupWidth = 1

        } = this.context;

        const wMax = width - margin.left - margin.right;
        const hMax = height - margin.top - margin.bottom;
        const txData = dataTransform(data);

        const xScaleFn = xScale().
                domain(d3.range(data.length)).
                rangeRoundBands([0, wMax], 0.2);


        const yScaleFn = yScale().
                rangeRound([hMax, 0]).
                domain([0, d3.max(txData, d => d.y0 + d.y)]);

        const motionStyles = txData.map(d => ({
            key: d.index + '-' + d.z,
            data: {...d, index: d.index},
            style: {
                width: xScaleFn.rangeBand() / groupWidth,
                height: yScaleFn(d.y0) - yScaleFn(d.y0 + d.y),
                y0: yScaleFn(d.y0),
                y: yScaleFn(d.y0 + d.y),
                x: xScaleFn(d.x) + xScaleFn.rangeBand() / groupWidth * d.dx

            }
        }));

        const defaultStyles = txData.map(d => ({
            key: d.index + '-' + d.z,
            data: {...d, index: d.index},
            style: {
                width: xScaleFn.rangeBand() / groupWidth,
                height: 0,
                y0: yScaleFn(d.y0),
                y: yScaleFn(d.y0),
                x: xScaleFn(d.x) + xScaleFn.rangeBand() / groupWidth * d.dx
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
                                    {interStyle => {

                                        return (
                                            <rect className="bar" width={interStyle.width}
                                                height={interStyle.height}
                                                x={interStyle.x} y={interStyle.y}
                                                style={this.props.style(
                                                    config.data.value,
                                                    config.data.index
                                                )}/>
                                        );
                                    }
                                }
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
