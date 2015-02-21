var React = require( 'react' ),
    d3 = require( 'd3' );

module.exports = React.createClass({

    propTypes: {
        values: React.PropTypes.arrayOf(React.PropTypes.number),
        title: React.PropTypes.string,
        subtitle: React.PropTypes.string,
        segmentColor: React.PropTypes.func
    },

    getInitialState: function () {

        return {};
    },

    renderDonut: function () {

        var self = this,
            element = this.getDOMNode(),
            parent = element.parentElement,
            svg = d3.select( element ),
            width = parent.clientWidth - 20,
            height = parent.clientHeight - 20,
            bottomPadding = 0,
            radius, arc, pie, arcTween,
            cx, cy,
            donut, donutFragment, title;


        if ( 0.5 * width > height ) {
            height = 0.5 * width  + bottomPadding;
        }


        svg.attr( 'width', width ).
            attr( 'height', height );

        radius = Math.min( width, height - bottomPadding ) / 2;

        cx = Math.max( width, radius * 2 ) / 2;
        cy = Math.max( height - bottomPadding, radius * 2 ) / 2;

        donutFragment = svg.select( 'g.donut-fragment' ).
            attr( 'transform', 'translate(' + cx + ',' + cy + ')' );

        title = this.props.title;

        donutFragment.select( 'text.donut-title' ).
            attr( 'x', 0 ).
            attr( 'y', 0 ).
            style( 'font-size', radius / 2 + 'px' ).
            text( title );

        donutFragment.select( 'text.donut-subtitle' ).
            attr( 'x', 0 ).
            attr( 'y', radius / 4 ).
            style( 'font-size', radius / 6 + 'px' ).
            text( this.props.subtitle );

        arc = d3.svg.arc()
                .outerRadius( radius * 0.95 )
                .innerRadius( radius * 0.75 );


        arcTween = function ( a ) {
            var i = d3.interpolate( this._current, a );
            this._current = i( 0 );

            return function ( t ) {
                return arc( i( t ) );
            };
        };

        console.log( this.props.values );
        pie = d3.layout.pie().
                sort( null ).
                value( function ( d ) { return d; } );


        donut = donutFragment.selectAll( 'path' ).
                data( pie( this.props.values ) );


        donut.attr( 'fill', function ( d, i ) {
                return self.props.segmentColor( d, i );

            } ).
            each( function ( d ) {
                this._current = {
                    startAngle: d.startAngle,
                    endAngle: d.startAngle,
                    value: 0
                };
            } ).
            transition().
            duration( 800 ).
            attrTween( 'd', arcTween );

        donut.enter().append( 'path' ).
            attr( 'fill', function ( d, i ) {
                return self.props.segmentColor( d, i );

            } ).
            each( function ( d ) {
                this._current = {
                    startAngle: d.startAngle,
                    endAngle: d.startAngle,
                    value: 0
                };
            } ).
            transition().
            duration( 800 ).
            attrTween( 'd', arcTween );


        donut.exit().
            each( function ( d ) {
                d.startAngle = 2 * Math.PI - 0.001;
                d.endAngle = 2 * Math.PI;
            } ).
            transition().
            duration( 800 ).
            attrTween( 'd', arcTween ).
            remove();

    },

    componentDidMount: function () {

        var el = this.getDOMNode(),
            svgEl = d3.select( el ).attr( 'class', 'donut' ),
            wrapG = svgEl.append( 'g' ),
            donutGrp;

        donutGrp = wrapG.append( 'g' ).attr( 'class', 'donut-fragment' );

        donutGrp.append( 'text' ).
            attr( 'class', 'donut-title' ).
            attr( 'text-anchor', 'middle' );

        donutGrp.append( 'text' ).
            attr( 'class', 'donut-subtitle' ).
            attr( 'text-anchor', 'middle' );

        this.renderDonut();
    },

    render: function () {
        return (
            <svg className="donut"></svg>
        );
    }

});
