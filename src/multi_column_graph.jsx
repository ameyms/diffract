var React = require( 'react' ),
    Column, MultiColumnGraph;

Column = React.createClass({

    propTypes: {
        data: React.PropTypes.object.isRequired,
        height: React.PropTypes.number,
        width: React.PropTypes.number,
        colorGenerator: React.PropTypes.func,
        xMapping: React.PropTypes.func,
        yMapping: React.PropTypes.func,
        isStacked: React.PropTypes.bool
    },

    getInitialState: function () {
        return {};
    },

    render: function () {
        return (
            <svg className='multi-column' width={this.state.width}
                height={this.state.height}>

                <ReactTransitionGroup component='g' className='columns'>

                </ReactTransitionGroup>
            </svg>
        );
    }
});

module.exports = MultiColumnGraph;
