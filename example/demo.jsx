import React, {Component} from 'react';
import ReactDom from 'react-dom';
import {util, Chart, BarChart, Pie, Axis, Stack, Group} from 'diffract';

const colors = ['#E91E63', '#2196F3', '#FF9800', '#4CAF50', '#673AB7'];
const width = 640;
const height = 240;
let cnt = 1;

const getRandomValuesArray = () => ([
    Math.random() * 10000, Math.random() * 10000,
    Math.random() * 10000, Math.random() * 10000,
    Math.random() * 10000
]);

class App extends Component {

    constructor() {
        super();
        this.state = {
            values: [Math.random() * 10000, Math.random() * 10000,
                Math.random() * 10000, Math.random() * 10000,
                Math.random() * 10000],

            multiValues: [
                getRandomValuesArray(), getRandomValuesArray(),
                getRandomValuesArray(), getRandomValuesArray(),
                getRandomValuesArray()
            ],

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

    updateData() {

        if (cnt++ % 3) {
            this.setState({

                values: getRandomValuesArray(),

                multiValues: [
                    getRandomValuesArray(), getRandomValuesArray(),
                    getRandomValuesArray(), getRandomValuesArray(),
                    getRandomValuesArray()
                ],
                labels: ['Elves', 'Dwarves', 'Hobbits', 'Men', 'Wizards']});
        } else {
            this.setState({
                values: [
                    Math.random() * 10000, Math.random() * 10000,
                    Math.random() * 10000, Math.random() * 10000
                ],
                multiValues: [
                    getRandomValuesArray(), getRandomValuesArray(),
                    getRandomValuesArray(), getRandomValuesArray()
                ],

                labels: ['Elves', 'Dwarves', 'Hobbits', 'Men']});
        }
    }

    getBarChart() {
        return (
            <Chart width={width} height={height} data={this.state.values}
                xScale={util.scale.ordinal} yScale={util.scale.linear}
                margin={{
                    left: 50,
                    bottom: 20,
                    top: 0,
                    right: 0
                }}>
                <BarChart style={(d, i) => ({fill: this.getColors(i)})}/>
                <Axis orientation="bottom" tickFormat={(d, i) => this.state.labels[i]}/>
                <Axis orientation="left"
                    tickFormat={d => {
                        return d;
                    }}/>
            </Chart>
        );
    }

    getStackedBarChart() {
        return (
            <Chart width={width} height={height} data={this.state.multiValues}
                xScale={util.scale.ordinal} yScale={util.scale.linear}
                margin={{
                    left: 50,
                    bottom: 20,
                    top: 0,
                    right: 0
                }}>
                <Stack>
                    <BarChart style={(d, i) => ({fill: this.getColors(i)})}/>
                    <Axis orientation="bottom" tickFormat={(d, i) => this.state.labels[i]}/>
                    <Axis orientation="left"
                        tickFormat={d => {
                            return d;
                        }}/>
                </Stack>
            </Chart>
        );
    }

    getGroupedBarChart() {
        return (
            <Chart width={width} height={height} data={this.state.multiValues}
                xScale={util.scale.ordinal} yScale={util.scale.linear}
                margin={{
                    left: 50,
                    bottom: 20,
                    top: 0,
                    right: 0
                }}>
                <Group>
                    <BarChart style={(d, i) => ({fill: this.getColors(i)})}/>
                    <Axis orientation="bottom" tickFormat={(d, i) => this.state.labels[i]}/>
                    <Axis orientation="left"
                        tickFormat={d => {
                            return d;
                        }}/>
                </Group>
            </Chart>
        );
    }

    render() {

        const donut = this.getPieChart();
        const barGraph = this.getBarChart();
        const stackedBarGraph = this.getStackedBarChart();
        const groupedBarGraph = this.getGroupedBarChart();
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
                <div width="640" height="480">
                    <h2>{'Stacked Chart'}</h2>
                    {stackedBarGraph}
                </div>
                <div width="640" height="480">
                    <h2>{'Grouped Chart'}</h2>
                    {groupedBarGraph}
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
