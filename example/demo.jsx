import React, {Component} from 'react';
import ReactDom from 'react-dom';
import {Chart, Pie, Donut, BarGraph} from 'diffract';

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

    getPieChart() {
        return (
            <Chart width={width} height={height} data={this.state.values}>
                <Pie innerRadius={75} outerRadius={110}
                    style={(d, i) => ({fill: this.getColors(i)})}>
                    <text className="donut-title" textAnchor="middle"
                        x={0} y={0} fontSize={18}>
                        {'Hello'}
                    </text>
                    <text className="donut-subtitle" textAnchor="middle"
                        x={0} y={18} fontSize={10}>
                        {'diffract'}
                    </text>
                </Pie>
            </Chart>
        );
    }
    getDonut() {
        return (
            <Donut data={this.state.values} title="Hello" subtitle="using react"
                segmentColor={this.getColors} radius={Math.min(width, height) / 2}/>
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
