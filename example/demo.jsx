import React, {Component} from 'react';
import ReactDom from 'react-dom';
import diffract from 'diffract';

const {Donut, BarGraph} = diffract;

const colors = ['#E91E63', '#2196F3', '#FF9800', '#4CAF50', '#673AB7'];
const width = 320;
const height = 240;
let cnt = 1;

class App extends Component {

    constructor() {
        super();
        this.state = {
            values: [Math.random() * 10000, Math.random() * 10000,
                Math.random() * 10000, Math.random() * 10000,
                Math.random() * 10000],

            labels: ['Elves', 'Dwarves', 'Hobbits', 'Men', 'Wizards']
        };
    }

    componentDidMount() {
        this._updater = setInterval(this.updateData.bind(this), 5000);
    }

    componentWillUnmount() {
        clearInterval(this._updater);
    }

    getColors(d, i) {
        if (arguments.length === 2) {
            return colors[i];
        } else {
            return colors[d];
        }

    }

    getDonut() {
        return (
            <Donut values={this.state.values} title="Hello" subtitle="using react"
                segmentColor={this.getColors} width={width} height={height} />
        );
    }

    getMultiColumnGraph() {
        return null;

    }

    updateData() {

        if (cnt++ % 3) {
            this.setState({values: [Math.random() * 10000, Math.random() * 10000,
                Math.random() * 10000, Math.random() * 10000,
                Math.random() * 10000],

                labels: ['Elves', 'Dwarves', 'Hobbits', 'Men', 'Wizards']});
        } else {
            this.setState({values: [Math.random() * 10000, Math.random() * 10000,
                Math.random() * 10000, Math.random() * 10000],

                labels: ['Elves', 'Dwarves', 'Hobbits', 'Men']});
        }
    }

    getBarGraph() {
        return (
            <BarGraph values={this.state.values} barColor={this.getColors}
                labels={this.state.labels} leftMargin={40}
                width={width} height={height} />
        );
    }


    render() {

        const donut = this.getDonut();
        const barGraph = this.getBarGraph();
        const padding = {padding: '50px'};

        return (
            <div style={padding}>
                <div width="640" height="480">
                    <h2>{'Donut'}</h2>
                    {donut}
                </div>
                <div width="640" height="480">
                    <h2>{'Bar Graph'}</h2>
                    {barGraph}
                </div>
            </div>
        );
    }
}

App.displayName = 'App';

ReactDom.render(
    <App/>,
    document.getElementById('appRoot')
);
