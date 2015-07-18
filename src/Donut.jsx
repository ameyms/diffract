import React, {Component, PropTypes} from 'react/addons';
import d3 from 'd3';

let ReactTransitionGroup = React.addons.TransitionGroup;


let pieGeneratorFn = d3.layout.pie().sort(null).value(d => d);

let arcGeneratorFn = function(innerR, outerR) {
    var arc;

    arc = d3.svg.arc().
        outerRadius(outerR).
        innerRadius(innerR);

    return function(a) {
        var i = d3.interpolate(this._current, a);
        this._current = i(0);

        return (t) => {
            return arc(i(t));
        };
    };
};


class Slice extends Component {

    componentDidUpdate(prevProps) {
        var pathEl = React.findDOMNode(this),
            d = this.props.arcDescriptor;

        d3.select(pathEl).
            datum(d).
            attr('fill', () => this.props.color(d, this.props.idx)).
            each(function() {
                this._current = {
                    startAngle: prevProps.arcDescriptor.startAngle,
                    endAngle: prevProps.arcDescriptor.endAngle,
                    value: 0
                };
            }).
            transition().
            duration(800).
            attrTween('d', this.props.tween);
    }

    componentWillAppear(callback) {

        var pathEl = React.findDOMNode(this),
            d = this.props.arcDescriptor;

        d3.select(pathEl).
            datum(d).
            attr('fill', () => this.props.color(d, this.props.idx)).
            each(function() {
                this._current = {
                    startAngle: d.startAngle,
                    endAngle: d.endAngle,
                    value: 0
                };
            }).
            transition().
            duration(800).
            attrTween('d', this.props.tween).
            each('end', callback);
    }

    componentWillEnter(callback) {

        var pathEl = React.findDOMNode(this),
            d = this.props.arcDescriptor;

        d3.select(pathEl).
        datum(d).
        attr('fill', () => this.props.color(d, this.props.idx)).
        each(function() {
            this._current = {
                startAngle: d.startAngle,
                endAngle: d.startAngle,
                value: 0
            };
        }).
        transition().
        duration(800).
        attrTween('d', this.props.tween).
        each('end', callback);

    }

    componentWillLeave(callback) {
        var pathEl = React.findDOMNode(this),
            d = this.props.arcDescriptor,
            sAngle = d.startAngle;

        d.startAngle = d.endAngle;
        d.value = 0;
        d.data = 0;

        d3.select(pathEl).
        datum(d).
        each(function() {
            this._current = {
                startAngle: sAngle,
                endAngle: d.endAngle,
                value: 0
            };
        }).
        transition().
        duration(800).
        attrTween('d', this.props.tween).
        each('end', callback);

    }


    render() {
        return (
            <path className="slice" />
        );
    }
}

Slice.displayName = 'Slice';

Slice.propTypes = {
    arcDescriptor: PropTypes.shape({
        value: PropTypes.number,
        startAngle: PropTypes.number,
        endAngle: PropTypes.number,
        padAngle: PropTypes.number,
        data: PropTypes.number
    }),

    tween: PropTypes.func,
    idx: PropTypes.number,
    color: PropTypes.func
};

export default class Donut extends React.Component {

    render() {
        let slices = [],
            height = this.props.height,
            width = this.props.width,
            radius = Math.min(width, height) / 2,
            titleSize = radius / 4,
            subtitleSize = radius / 8,
            arcDescriptors, arcTween,
            cx, cy, centerTransform;

        cx = Math.max(width, radius * 2) / 2;
        cy = Math.max(height, radius * 2) / 2;

        centerTransform = `translate(${cx}, ${cy})`;

        arcTween = arcGeneratorFn(0.75 * radius, 0.95 * radius);
        arcDescriptors = pieGeneratorFn(this.props.values);

        slices = arcDescriptors.map((a, i) => {
            return (
                <Slice className="slice" arcDescriptor={a}
                    key={i} idx={i}
                    color={this.props.segmentColor} tween={arcTween} />
            );
        });


        return (
            <svg className="donut" width={width} height={height}>
                <g transform={centerTransform}>
                    <ReactTransitionGroup component="g" className="slices"
                        transitionAppear={true} transitionEnter={true}
                        transitionLeave={true}>
                        { slices }
                    </ReactTransitionGroup>
                    <g className="labels">
                        <text className="donut-title" textAnchor="middle"
                            x={0} y={0} fontSize={titleSize}>
                            {this.props.title}
                        </text>
                        <text className="donut-subtitle" textAnchor="middle"
                             x={0} y={titleSize} fontSize={subtitleSize}>
                            {this.props.subtitle}
                        </text>
                    </g>
                </g>
            </svg>
        );
    }
}

Donut.displayName = 'Donut';

Donut.propTypes = {
    values: PropTypes.arrayOf(PropTypes.number),
    title: PropTypes.string,
    subtitle: PropTypes.string,
    segmentColor: PropTypes.func,
    width: PropTypes.number,
    height: PropTypes.number
};
