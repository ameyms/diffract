
var React = require( 'react' ),
    Donut = require( 'diffract' ).Donut,
    donutData = [20, 30, 40, 60],
    colors = [ '#E91E63', '#2196F3', '#FF9800', '#4CAF50' ],
    App;

App = React.createClass({

    getColors: function ( d, i ) {
        return colors[ i ];
    },

    render: function () {
        return (
            <Donut values={donutData} title="Hello" subtitle="using react"
                segmentColor={this.getColors}>
            </Donut>
        );
    }
});


React.render(
    <App/>,
    document.getElementById( 'appRoot' )
);
