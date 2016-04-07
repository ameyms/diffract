import React, {PropTypes, Component} from 'react';
import {Axis as Styles} from './styles';
import d3 from 'd3';
import {scaleRange} from './helpers/scales';
import {getTicks} from './helpers/axes';
import {TransitionMotion, Motion, spring} from 'react-motion';

export default class YAxis extends Component {

    static displayName = 'YAxis'

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
        orientation: PropTypes.oneOf(['left', 'right']),
        tickFormat: PropTypes.func,
        outerTickSize: PropTypes.number,
        innerTickSize: PropTypes.number,
        tickPadding: PropTypes.number,
        tickValues: PropTypes.arrayOf(PropTypes.any),
        ticks: PropTypes.arrayOf(PropTypes.any),
        tickTextStyle: PropTypes.object,
        tickLineStyle: PropTypes.object,
        textRotation: PropTypes.number,
        debug: PropTypes.bool
    }

    static defaultProps = {
        tickFormat: v => v,
        labels: v => (v),
        orientation: 'left',
        outerTickSize: 6,
        innerTickSize: 6,
        tickPadding: 3,
        tickValues: null,
        ticks: [10],
        tickTextStyle: {},
        tickLineStyle: {},
        textRotation: 0
    }

    constructor(props) {
        super(props);
        this.state = {};
    }

    willEnter({style}) {
        return {
            ...style,
            opacity: 0
        };
    }

    willLeave({style}) {
        return {
            ...style,
            opacity: 0
        };
    }

    render() {

        const {
            orientation,
            outerTickSize,
            innerTickSize,
            tickValues,
            tickPadding,
            ticks,
            tickFormat,
            tickTextStyle,
            tickLineStyle,
            textRotation,
            /*eslint-disable no-unused-vars*/
            debug
            /*eslint-enable unused*/
        } = this.props;

        const {
            yScale, data, width, height, margin,
            dataTransform = arr => arr.map((d, i) => ({
                x: i,
                y0: 0,
                y: d,
                z: 0
            }))
        } = this.context;

        const txData = dataTransform(data);
        const tickSpacing = Math.max(innerTickSize, 0) + tickPadding;
        const wMax = width - margin.left - margin.right;
        const hMax = height - margin.top - margin.bottom;

        const scale = yScale.domain([0, d3.max(txData, d => d.y0 + d.y)]).copy();

        const ticksArr = getTicks(scale, tickValues, ticks);


        const displacement = orientation === 'right' ?
                                `translate(${wMax},0)` : 'translate(0, 0)';

        const sign = orientation === 'left' ? -1 : 1;

        const range = scaleRange(scale);
        const pathD = `M${sign * outerTickSize},${range[0]}H0V${range[1]}H${sign * outerTickSize}`;

        let dx = 0;
        if (scale.rangeBand) {
            dx = scale.rangeBand() / 2;
        }


        const defaultStyles = ticksArr.map((t, i) => ({
            key: i + '',
            data: {
                text: tickFormat(t, i)
            },
            style: {
                ty: scale(t) + dx,
                tx: 0,
                textRotation,
                opacity: 1
            }
        }));

        const motionStyles = ticksArr.map((t, i) => ({
            key: i + '',
            data: {
                text: tickFormat(t, i)
            },
            style: {
                ty: scale(t) + dx,
                tx: 0,
                textRotation,
                opacity: 1
            }
        }));


        return (
            <g className="axis" transform={displacement}>
                <TransitionMotion defaultStyles={defaultStyles} styles={motionStyles}
                    willEnter={this.willEnter.bind(this)} willLeave={this.willLeave.bind(this)}>
                    {interStyles => (
                        <g className="ticks">
                        {interStyles.map(config => (
                                <Motion defaultStyle={{
                                    ...config.style,
                                    opacity: 1
                                }}
                                    key={config.key}
                                    style={{
                                        ...config.style,
                                        tx: spring(config.style.tx),
                                        ty: spring(config.style.ty),
                                        textRotation: spring(config.style.textRotation),
                                        opacity: spring(config.style.opacity)
                                    }}>
                                    {interStyle => {
                                        return (
                                            <g className="tick"
                                                transform={
                                                    `translate(${interStyle.tx},${interStyle.ty})`
                                                }
                                                style={{
                                                    opacity: interStyle.opacity
                                                }}>
                                                <line x2={sign * innerTickSize}
                                                    style={{
                                                        ...Styles.lines,
                                                        ...tickLineStyle
                                                    }}/>
                                                <text
                                                    y={0}
                                                    x={sign * tickSpacing}
                                                    dy={'.32em'}
                                                    transform={
                                                        `rotate(${interStyle.textRotation},0,0)`
                                                    }
                                                    style={{
                                                        textAnchor: sign < 0 ? 'end' : 'start',
                                                        ...Styles.text,
                                                        ...tickTextStyle
                                                    }}>
                                                    {config.data.text}
                                                </text>
                                            </g>
                                        );
                                    }
                                }
                                </Motion>
                            ))}
                        </g>
                    )}
                </TransitionMotion>
                <path className="domain" style={Styles.paths} d={pathD}/>
            </g>
        );
    }
}
