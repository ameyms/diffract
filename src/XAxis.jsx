import React, {PropTypes, Component} from 'react';
import {Axis as Styles} from './styles';
import d3 from 'd3';
import {scaleRange} from './helpers/scales';
import {getTicks} from './helpers/axes';
import {TransitionMotion, Motion, spring} from 'react-motion';

export default class XAxis extends Component {

    static displayName = 'XAxis'

    static contextTypes = {
        xScale: PropTypes.func.isRequired,
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
        orientation: PropTypes.oneOf(['top', 'bottom']),
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
        orientation: 'bottom',
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

        const {xScale, data, width, height, margin} = this.context;

        const tickSpacing = Math.max(innerTickSize, 0) + tickPadding;
        const wMax = width - margin.left - margin.right;
        const hMax = height - margin.top - margin.bottom;

        const scale = xScale.domain(d3.range(data.length)).copy();

        const ticksArr = getTicks(scale, tickValues, ticks);


        const displacement = orientation === 'bottom' ?
                                `translate(0, ${hMax})` : 'translate(0, 0)';

        const sign = orientation === 'top' ? -1 : 1;

        const range = scaleRange(scale);
        const pathD = `M${range[0]},${sign * outerTickSize}V0H${range[1]}V${sign * outerTickSize}`;

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
                tx: scale(t) + dx,
                ty: 0,
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
                tx: scale(t) + dx,
                ty: 0,
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
                                                <line y2={sign * innerTickSize}
                                                    style={{
                                                        ...Styles.lines,
                                                        ...tickLineStyle
                                                    }}/>
                                                <text
                                                    x={0}
                                                    y={sign * tickSpacing}
                                                    dy={sign < 0 ? 0 : '.71em'}
                                                    transform={
                                                        `rotate(${interStyle.textRotation},0,0)`
                                                    }
                                                    style={{
                                                        textAnchor: interStyle.textRotation ?
                                                            'start' : 'middle',
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
