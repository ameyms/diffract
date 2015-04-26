var React = require( 'react/addons' ),
    MultiSeriesColumnGraph;


MultiSeriesColumnGraph = React.createClass({

    displayName: 'MultiSeriesColumnGraph',

    getInitialState: function () {
        return {};
    },

    getDefaultProps: function() {
        return {};
    },

    render: function () {
        return (
            <svg className="multi-column">

            </svg>
        );
    }

});

module.exports = MultiSeriesColumnGraph;
