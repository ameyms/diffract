
var React = require( 'react' ),
    Donut = require( 'diffract' ).Donut,
    MultiColumnGraph = require( 'diffract' ).MultiColumnGraph,
    colors = [ '#E91E63', '#2196F3', '#FF9800', '#4CAF50', '#673AB7' ],
    App;

App = React.createClass({

    getColors: function ( d, i ) {
        if ( arguments.length == 2 ) {
            return colors[ i ];
        } else {
            return colors[ d ];
        }

    },

    getDonut: function () {

        var donutData = [20, 30, 40, 60];

        return (
            <Donut values={donutData} title="Hello" subtitle="using react"
                segmentColor={this.getColors}>
            </Donut>
        );
    },

    getMultiColumnGraph: function () {
        var columnData =    [ [ Math.random() * 10000, Math.random() * 10000,
            Math.random() * 10000, Math.random() * 10000,
            Math.random() * 10000 ],
            [ Math.random() * 10000, Math.random() * 10000,
            Math.random() * 10000, Math.random() * 10000,
            Math.random() * 10000 ],
            [ Math.random() * 10000, Math.random() * 10000,
            Math.random() * 10000, Math.random() * 10000,
            Math.random() * 10000 ],
            [ Math.random() * 10000, Math.random() * 10000,
            Math.random() * 10000, Math.random() * 10000,
            Math.random() * 10000 ],
            [ Math.random() * 10000, Math.random() * 10000,
            Math.random() * 10000, Math.random() * 10000,
            Math.random() * 10000 ] ],

            xFormat = function ( n ) {
                return n;
            },

            yFormat = function ( n ) {
                return n;
            };


        return (
            <MultiColumnGraph data={columnData} colorGenerator={this.getColors}
                xAxisTickFormatter={xFormat} yAxisTickFormatter={yFormat}>
            </MultiColumnGraph>
        )
    },

    render: function () {
        return this.getMultiColumnGraph();
    }
});


React.render(
    <App/>,
    document.getElementById( 'appRoot' )
);
