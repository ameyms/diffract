var React = require( 'react' ),
    d3 = require( 'd3' ),
    makeGroupedColumns, makeStackedColmuns;

makeGroupedColumns = function ( x, y, height, bars ) {

    var slen = this.props.data[ 0 ].length,
        self = this;

    bars.attr( 'class', 'column' ).
        transition().
        duration( 800 ).
        attr( 'fill', function ( d ) {
            return self.props.colorGenerator( d.z );
        } ).
        attr( 'y', function ( d ) {
            return y( d.y );
        } ).
        attr( 'x', function ( d ) {
            return x( d.x ) + x.rangeBand() / slen * d.z;
        } ).
        attr( 'width', function () { return x.rangeBand() / slen; } ).
        attr( 'height', function ( d ) {
            return height - y( d.y );
        } );

    bars.enter().
        append( 'rect' ).
        attr( 'class', 'column' ).
        attr( 'fill', function ( d ) {
            return self.props.colorGenerator( d.z );
        } ).
        transition().
        duration( 800 ).
        attr( 'y', function ( d ) {
            return y( d.y );
        } ).
        attr( 'x', function ( d ) {
            return x( d.x ) + x.rangeBand() / slen * d.z;
        } ).
        attr( 'width', function () { return x.rangeBand() / slen; } ).
        attr( 'height', function ( d ) {
            return height - y( d.y );
        } );

    bars.exit().
        transition().
        attr( 'height', function () { return 0; } ).
        remove();
};

makeStackedColmuns = function ( x, y, bars ) {

    var self = this;

    bars.attr( 'class', 'column' ).
        transition().
        duration( 800 ).
        attr( 'fill', function ( d ) {
            return self.colorGenerator( { $series: d.z } );
        } ).
        attr( 'y', function ( d ) {
            return y( d.y0 + d.y );
        } ).
        attr( 'x', function ( d ) { return x( d.x ); } ).
        attr( 'width', function () { return x.rangeBand(); } ).
        attr( 'height', function ( d ) {
            return y( d.y0 ) - y( d.y0 + d.y );
        } );

    bars.enter().
        append( 'rect' ).
        attr( 'class', 'column' ).
        transition().
        duration( 800 ).
        attr( 'fill', function ( d ) {
            return self.props.colorGenerator( d.z );
        } ).
        attr( 'y', function ( d ) {
            return y( d.y0 + d.y );
        } ).
        attr( 'x', function ( d ) { return x( d.x ); } ).
        attr( 'width', function () { return x.rangeBand(); } ).
        attr( 'height', function ( d ) {
            return y( d.y0 ) - y( d.y0 + d.y );
        } );

    bars.exit().
        transition().
        attr( 'height', function () { return 0; } ).
        remove();
};

module.exports = React.createClass( {

    propTypes: {
        data: React.PropTypes.arrayOf(React.PropTypes.number).isRequired,
        isStacked: React.PropTypes.bool,
        colorGenerator: React.PropTypes.func,
        xAxisTickFormatter: React.PropTypes.func,
        yAxisTickFormatter: React.PropTypes.func
    },

    getInitialState: function () {
        return {};
    },

    renderGraph: function () {

        var self = this,
            element = this.getDOMNode(),
            parent = element.parentElement,
            svg = d3.select( element ),
            width = parent.clientWidth - 20,
            height = parent.clientHeight - 20,
            transformedData = [],
            slen = 0,
            graphGrp = svg.select( 'g' ),
            barsData, bars, x, y, xAxis, yAxis, i, j, vArr, yMax;

        svg.attr( 'width', width ).
            attr( 'height', height );

        slen = this.props.data[ 0 ].length;

        for ( i = 0; i < slen; i++ ) {
            transformedData.push( [] );
        }

        for ( i = 0; i < this.props.data.length; i++ ) {
            vArr = self.props.data[ i ];
            for ( j = 0; j < vArr.length; j++ ) {
                transformedData[ j ].push( {
                    x: i,
                    y: vArr[ j ],
                    z: j,
                    y0: 0
                } );
            }

        }


        x = d3.scale.ordinal().
                rangeRoundBands( [ 0, width ], 0.33 ).
                domain( d3.range( self.props.data.length ) );

        y = d3.scale.linear().range( [ height, 0 ] );


        if ( self.props.isStacked ) {
            barsData = Array.prototype.concat.apply( [], d3.layout.stack()( transformedData ) );
        } else {
           barsData = Array.prototype.concat.apply( [], transformedData );
        }

        yMax = d3.max( barsData, function ( d ) { return d.y0 + d.y; } );
        y.domain( [ 0, yMax ] );

        xAxis = d3.svg.axis().scale( x ).orient( 'bottom' ).
                tickFormat( function ( d ) {
                    return self.props.xAxisTickFormatter( d );
                } ).
                innerTickSize( -height );

        yAxis = d3.svg.axis().
                scale( y ).orient( 'left' ).
                tickFormat( function ( d ) {
                    return self.props.yAxisTickFormatter( d );
                } ).
                innerTickSize( -width ).
                tickPadding( 10 );

        //graphGrp.attr( 'transform', 'translate(' + leftMargin + ',' + margin.top + ')' );

        graphGrp.select( 'g.x-axis' ).
            attr( 'transform', 'translate(0,' + height + ')' ).
            transition().
            duration( 800 ).
            call( xAxis );


        graphGrp.select( 'g.y-axis' ).
            transition().
            duration( 800 ).
            call( yAxis );


        bars = graphGrp.select( 'g.chart' ).
                   selectAll( 'rect' ).data( barsData );

           if ( self.props.isStacked ) {
               makeStackedColmuns.call( this, x, y, bars );
           } else {
               makeGroupedColumns.call( this, x, y, height, bars );
           }

    },

    componentDidMount: function () {
        var element = this.getDOMNode(),
            svg = d3.select( element ),
            graphGrp;

        svg.attr( 'class', 'multi-column' );
        graphGrp = svg.append( 'g' );

        graphGrp.append( 'g' ).attr( 'class', 'axis x-axis' );
        graphGrp.append( 'g' ).attr( 'class', 'axis y-axis' );
        graphGrp.append( 'g' ).attr( 'class', 'chart' );

        this.renderGraph();
    },

    render: function () {
        return (
            <svg className="multi-column"></svg>
        );
    }
} );
