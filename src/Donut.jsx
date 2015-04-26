var React = require( 'react/addons' ),
    ReactTransitionGroup = React.addons.TransitionGroup,
    d3 = require( 'd3' ),
    arcGeneratorFn, pieGeneratorFn,
    Donut, Slice;


pieGeneratorFn =  d3.layout.pie().sort( null ).value( function ( d ) { return d; } );

arcGeneratorFn = function ( innerR, outerR ) {
    var arc, arcTween;

    arc = d3.svg.arc().
        outerRadius( outerR ).
        innerRadius( innerR );

    return function ( a ) {
        var i = d3.interpolate( this._current, a );
        this._current = i( 0 );

        return function ( t ) {
            return arc( i( t ) );
        };
    };
};


Slice = React.createClass({

    propTypes: {
        arcDescriptor: React.PropTypes.shape({
            value: React.PropTypes.number,
            startAngle: React.PropTypes.number,
            endAngle: React.PropTypes.number,
            padAngle: React.PropTypes.number,
            data: React.PropTypes.number
        }),

        tween: React.PropTypes.func,
        index: React.PropTypes.number,
        color: React.PropTypes.func
    },

    getInitialState: function () {
        return {};
    },

    componentDidUpdate: function (prevProps) {
        var pathEl = React.findDOMNode(this),
            self = this,
            d = self.props.arcDescriptor;

        d3.select( pathEl ).
            datum( d ).
            attr( 'fill', function () {
                return self.props.color( d, self.props.index );
            } ).
            each( function () {
                this._current = {
                    startAngle: prevProps.arcDescriptor.startAngle,
                    endAngle: prevProps.arcDescriptor.endAngle,
                    value: 0
                };
            } ).
            transition().
            duration( 800 ).
            attrTween( 'd', self.props.tween );
    },

    componentWillAppear: function() {
        var pathEl = React.findDOMNode(this),
            self = this,
            d = self.props.arcDescriptor;

        d3.select( pathEl ).
            datum( d ).
            attr( 'fill', function () {
                return self.props.color( d, self.props.index );
            } ).
            each( function () {
                this._current = {
                    startAngle: d.startAngle,
                    endAngle: d.endAngle,
                    value: 0
                };
            } ).
            transition().
            duration( 800 ).
            attrTween( 'd', self.props.tween );
    },

    componentWillEnter: function ( callback ) {
        var pathEl = React.findDOMNode(this),
            self = this,
            d = self.props.arcDescriptor;

        d3.select( pathEl ).
        datum( d ).
        attr( 'fill', function () {
            return self.props.color( d, self.props.index );

        } ).
        each( function () {
            this._current = {
                startAngle: d.startAngle,
                endAngle: d.startAngle,
                value: 0
            };
        } ).
        transition().
        duration( 800 ).
        attrTween( 'd', self.props.tween ).
        each( 'end', callback );

    },

    componentWillLeave: function ( callback ) {
        var pathEl = React.findDOMNode(this),
            self = this,
            d = self.props.arcDescriptor,
            sAngle = d.startAngle;

        d.startAngle = d.endAngle;
        d.value = 0;
        d.data = 0;

        d3.select( pathEl ).
        datum( d ).
        each( function () {
            this._current = {
                startAngle: sAngle,
                endAngle: d.endAngle,
                value: 0
            };
        } ).
        transition().
        duration( 800 ).
        attrTween( 'd', self.props.tween ).
        each( 'end', callback );

    },

    render: function () {
        return ( <path className="slice"></path> );
    }

});

Donut = React.createClass({

    propTypes: {
        values: React.PropTypes.arrayOf(React.PropTypes.number),
        title: React.PropTypes.string,
        subtitle: React.PropTypes.string,
        segmentColor: React.PropTypes.func,
        width: React.PropTypes.number,
        height: React.PropTypes.number
    },

    getInitialState: function () {

        return {};
    },

    componentDidMount: function () {

    },

    render: function () {
        var slices = [],
            len = this.props.values.length,
            height = this.props.height,
            width = this.props.width,
            radius = Math.min(width, height) / 2,
            i, arcDescriptors, a, arcTween,
            cx, cy, centerTransform;

        cx = Math.max( width, radius * 2 ) / 2;
        cy = Math.max( height, radius * 2 ) / 2;

        centerTransform = 'translate(' + cx + ',' + cy + ')';

        arcTween = arcGeneratorFn( 0.75 * radius, 0.95 * radius );
        arcDescriptors = pieGeneratorFn( this.props.values );

        for ( i = 0; i < len; i++ ) {
            a = arcDescriptors[ i ];
            slices.push( <Slice className="slice" arcDescriptor={a}
                key={i} index={i} color={this.props.segmentColor} tween={arcTween}>
            </Slice> );
        }

        return (
            <svg className="donut" width={width} height={height}>
                <g transform={centerTransform}>
                    <ReactTransitionGroup component="g" className="slices">
                        { slices }
                    </ReactTransitionGroup>
                    <g className="labels">
                        <text className="donut-title" textAnchor="middle"
                            x={0} y={0} fontSize={radius/4}>
                            {this.props.title}
                        </text>
                        <text className="donut-subtitle" textAnchor="middle"
                             x={0} y={radius/4} fontSize={radius/8}>
                            {this.props.subtitle}
                        </text>
                    </g>
                </g>
            </svg>
        );
    }

});


module.exports = Donut;
