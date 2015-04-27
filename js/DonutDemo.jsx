var Donut = Diffract.Donut,
    colors = [ '#E91E63', '#2196F3', '#FF9800', '#4CAF50', '#673AB7' ],
    width = 320, height = 240,
    cnt = 0;

var DonutDemo = React.createClass({

    getInitialState: function() {
        return {
            values: [ Math.random() * 10000, Math.random() * 10000,
                Math.random() * 10000, Math.random() * 10000,
                Math.random() * 10000 ],

            labels: ['Elves', 'Dwarves', 'Hobbits', 'Men', 'Wizards']
        };
    },


    updateData: function() {
        if (cnt++ % 3) {
            this.setState({values: [ Math.random() * 10000, Math.random() * 10000,
                Math.random() * 10000, Math.random() * 10000,
                Math.random() * 10000 ],

                labels: ['Elves', 'Dwarves', 'Hobbits', 'Men', 'Wizards']});
        } else {
            this.setState({values: [ Math.random() * 10000, Math.random() * 10000,
                Math.random() * 10000, Math.random() * 10000 ],

                labels: ['Elves', 'Dwarves', 'Hobbits', 'Men']});
        }
    },


    componentDidMount: function() {
       this._updater = setInterval(this.updateData, 2000);
   },

   componentDidUnmount: function() {
       clearInterval(this._updater);
   },

    getColors: function ( d, i ) {
        if ( arguments.length === 2 ) {
            return colors[ i ];
        } else {
            return colors[ d ];
        }

    },


    render: function () {
        return  (
            <Donut values={this.state.values}
                title="Hello" subtitle="using react"
                segmentColor={this.getColors} width={width} height={height} />
        );
    }
});


React.render(
    <DonutDemo/>,
    document.getElementById( 'donutDemo' )
);
