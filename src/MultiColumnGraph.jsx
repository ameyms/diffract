var React = require( 'react/addons' ),
    ReactTransitionGroup = React.TransitionGroup,
    MultiSeriesColumnGraph;


MultiSeriesColumnGraph = React.createClass({

    getInitialState: function () {
        return {};
    },

    getDefaultProps: function() {
        return {};
    },

    componentWillUpdate: function() {
        var self = this,
            el = React.findDOMNode(self),
            sampleSets = this.props.children,
            i, len;

        len = sampleSets.length;

        for (i = 0; i < len; i++) {
            console.log(sampleSets[i]);
        }
    },

    render: function () {
        return (
            <svg className='multi-column'>

            </svg>
        );
    }

});

module.exports = MultiSeriesColumnGraph;
