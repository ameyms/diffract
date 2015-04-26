var Colors = require('./Colors');

module.exports = {
    Axis: {
        text: {
            'font-size': '0.8em'
        },
        paths: {
            fill: 'none',
            stroke: Colors.AXIS_LINES,
            'shape-rendering': 'crispEdges'
        },
        lines: {
            fill: 'none',
            stroke: Colors.AXIS_LINES,
            'shape-rendering': 'crispEdges'
        }
    }
};
