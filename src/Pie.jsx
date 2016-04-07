import React, {Component, PropTypes} from 'react';
import d3 from 'd3';
import {TransitionMotion, Motion, spring} from 'react-motion';

export default class Pie extends Component {

    static displayName = 'Pie'

    static propTypes = {
        innerRadius: PropTypes.number,
        outerRadius: PropTypes.number,
        style: PropTypes.func,
        onClick: PropTypes.func
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

    static defaultProps = {
        style: () => ({}),
        onClick: () => {}
    }

    willLeave({style}) {
        return {
            ...style,
            startAngle: style.endAngle
        };
    }

    willEnter({style}) {
        return {
            ...style,
            endAngle: style.startAngle
        };
    }

    render() {
        const {width, height, data} = this.context;
        const pieFn = d3.layout.pie().sort(null);
        const {style, onClick} = this.props;

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
                                                style={style(
                                                    config.data.value,
                                                    config.data.index
                                                )}
                                                onClick={e => {
                                                    onClick(
                                                        e, config.data.value,
                                                        config.data.index
                                                    );
                                                }
                                            }/>
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
