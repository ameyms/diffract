import React, {Component, PropTypes} from 'react';
import d3 from 'd3';
import {TransitionMotion, Motion, spring} from 'react-motion';

export default class Pie extends Component {

    static propTypes = {
        innerRadius: PropTypes.number,
        outerRadius: PropTypes.number,
        style: PropTypes.func
    }

    static contextTypes = {
        data: PropTypes.arrayOf(PropTypes.number),
        height: PropTypes.number,
        width: PropTypes.number
    }

    willLeave(leavingStyle) {
        console.log(leavingStyle);
        return {
            ...leavingStyle.style,
            startAngle: leavingStyle.style.endAngle
        };
    }

    willEnter(entryStyle) {
        console.log(entryStyle);
        return {
            ...entryStyle.style,
            endAngle: entryStyle.style.startAngle
        };
    }

    render() {
        const {width, height, data} = this.context;
        const pieFn = d3.layout.pie().sort(null);

        const arcFn = d3.svg.arc().
                    outerRadius(this.props.outerRadius).
                    innerRadius(this.props.innerRadius);

        const pieData = pieFn(data);
        const motionStyles = pieData.map((d, i) => ({
            key: i + '',
            data: {...d, index: i},
            style: d
        }));

        const defaultStyles = pieData.map((d, i) => ({
            key: i + '',
            data: {...d, index: i},
            style: {...d, endAngle: d.startAngle}
        }));

        const centerTransform = `translate(${width / 2}, ${height / 2})`;


        return (
            <g className="pie" transform={centerTransform}>
                <TransitionMotion defaultStyles={defaultStyles} styles={motionStyles}
                    willEnter={this.willEnter} willLeave={this.willLeave}>
                    {interStyles => (
                        <g className="slices">
                        {interStyles.map(config => (
                                    <Motion defaultStyle={{
                                        ...config.style,
                                        endAngle: config.data.startAngle
                                    }}
                                        key={config.key}
                                        style={{
                                            ...config.style,
                                            startAngle: spring(config.style.startAngle),
                                            endAngle: spring(config.style.endAngle)
                                        }}>
                                        {interStyle =>
                                            <path d={arcFn(interStyle)}
                                                style={this.props.style(
                                                    config.data.value,
                                                    config.data.index
                                                )}/>
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
