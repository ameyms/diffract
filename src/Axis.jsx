import React from 'react/addons';
import {Axis as Styles} from './styles';
import TRANSITION_DURATION from './constants';
import d3 from 'd3';

export default class Axis extends React.Component {

    getDefaultProps() {
        return {
            displacement: 0,
            leftMargin: 0
        };
    }

    drawAxis() {
        let el = this.getDOMNode(),
            axisFn, orientation, axisEl;

        orientation = this.props.behavior === 'X' ? 'bottom' : 'left';

        axisFn = d3.svg.axis().scale(this.props.scale).orient(orientation).
                    tickFormat(function(v) {
                        return v;
                    }).
                    innerTickSize(5);

        axisEl = d3.select(el);

        if (this.props.behavior === 'X') {
            axisEl.attr('transform', `translate(0, ${this.props.displacement})`);
        }

        axisEl.transition().duration(TRANSITION_DURATION).call(axisFn);
        axisEl.selectAll('text').style(Styles.text);
        axisEl.selectAll('path').style(Styles.paths);
        axisEl.selectAll('line').style(Styles.lines);
    }

    componentDidMount() {
        this.drawAxis();
    }

    componentDidUpdate() {
        this.drawAxis();
    }

    render() {
        var classString = `${this.props.behavior}-axis axis`;
        return (
            <g className={classString}>
            </g>
        );
    }
}

Axis.displayName = 'Axis';

Axis.propTypes = {
    behavior: React.PropTypes.oneOf(['X', 'Y']),
    scale: React.PropTypes.func,
    displacement: React.PropTypes.number,
    offset: React.PropTypes.number
};
