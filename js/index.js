import React, {Component} from 'react';
import ReactDom from 'react-dom';
import {
    util, Chart, DataSeries, BarChart, Pie, XAxis, YAxis, Stack, Group
} from 'diffract';

const colors = ['#E91E63', '#2196F3', '#FF9800', '#4CAF50', '#673AB7'];
const width = 640;
const height = 240;
let cnt = 1;

const getRandomValuesArray = () => ([
    Math.random() * 10000, Math.random() * 10000,
    Math.random() * 10000, Math.random() * 10000,
    Math.random() * 10000
]);

const margins = {
    left: 50,
    bottom: 20,
    top: 0,
    right: 0
};

const xScale = util.scale.ordinal().rangeRoundBands([0, width - margins.left - margins.right], 0.2);
const yScale = util.scale.linear().rangeRound([height - margins.top - margins.bottom, 0]);

class Demo extends Component {

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

            labels: ['Elves', 'Dwarves',
                        'Hobbitses', 'Men', 'Wizards']
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
            <Chart width={width} height={height}>
                <DataSeries data={this.state.values}>
                    <Pie innerRadius={75} outerRadius={110}
                        onClick={(e, v, i) => console.log(this.state.labels[i] + ' clicked')}
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
                </DataSeries>
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
                labels: ['Elves', 'Dwarves',
                            'Hobbitses', 'Men', 'Some really long label']});
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

                labels: ['Elves', 'Dwarves',
                            'Hobbitses', 'Men']});
        }
    }

    getBarChart() {
        return (
            <Chart width={width} height={height}
                margin={margins}>
                <DataSeries data={this.state.values}
                    xScale={xScale} yScale={yScale}>
                    <BarChart onClick={(e, v, i) => console.log(this.state.labels[i] + ' clicked')}
                        style={(d, i) => ({fill: this.getColors(i)})}/>
                    <XAxis textRotation={30} tickFormat={(d, i) => this.state.labels[i]} debug/>
                    <YAxis
                        tickFormat={d => {
                            return d;
                        }}/>
                </DataSeries>
            </Chart>
        );
    }

    getStackedBarChart() {
        return (
            <Chart width={width} height={height}
                margin={margins}>
                <DataSeries data={this.state.multiValues}
                    xScale={xScale} yScale={yScale}>
                    <Stack>
                        <BarChart style={(d, i) => ({fill: this.getColors(i)})}/>
                        <XAxis tickFormat={(d, i) => this.state.labels[i]}/>
                        <YAxis
                            tickFormat={d => {
                                return d;
                            }}/>
                    </Stack>
                </DataSeries>
            </Chart>
        );
    }

    getGroupedBarChart() {
        return (
            <Chart width={width} height={height} data={this.state.multiValues}
                xScale={xScale} yScale={yScale}
                margin={margins}>
                <DataSeries data={this.state.multiValues}
                    xScale={xScale} yScale={yScale}>
                    <Group>
                        <BarChart style={(d, i) => ({fill: this.getColors(i)})}/>
                        <XAxis tickFormat={(d, i) => this.state.labels[i]}/>
                        <YAxis
                            tickFormat={d => {
                                return d;
                            }}/>
                    </Group>
                </DataSeries>
            </Chart>
        );
    }

    render() {

        const donut = this.getPieChart();
        const barGraph = this.getBarChart();
        const stackedBarGraph = this.getStackedBarChart();
        const groupedBarGraph = this.getGroupedBarChart();

        return (
          <div>
            <div className="row component-showcase">
              <div className="row">
                <div className="col-xs-12">
                  <h3>{'Pies & Donuts'}</h3>
                </div>
              </div>
              <div className="col-xs-5">
                <pre><code className="language-jsx">
                {
`
import React, {Component} from 'react';
import ReactDom from 'react-dom';
import {Chart, DataSeries, Pie} from 'diffract';

const DonutDemo = () => (
  <Chart width={width} height={height}>
      <DataSeries data={this.state.values}>
          <Pie innerRadius={75} outerRadius={110}
              onClick={(e, v, i) => console.log(this.state.labels[i] + ' clicked')}
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
      </DataSeries>
  </Chart>
);
React.render(
  <DonutDemo/>;,
  document.getElementById( 'donutDemo' )
);`
                }
                </code></pre>
              </div>
              <div className="col-xs-7">
                  <div id="donutDemo">
                    {donut}
                  </div>
              </div>
            </div>

            <div className="row component-showcase">
              <div className="row">
                <div className="col-xs-12">
                  <h3>{'Simple Bar Charts'}</h3>
                </div>
              </div>
              <div className="col-xs-5">
                <pre><code className="language-jsx">
                {
`
import React, {Component} from 'react';
import ReactDom from 'react-dom';
import {
    util, Chart, DataSeries, BarChart, XAxis, YAxis
} from 'diffract';

const BarGraphDemo = () => (
  <Chart width={width} height={height}
      margin={margins}>
      <DataSeries data={this.state.values}
          xScale={xScale} yScale={yScale}>
          <BarChart onClick={(e, v, i) => console.log(this.state.labels[i] + ' clicked')}
              style={(d, i) => ({fill: this.getColors(i)})}/>
          <XAxis textRotation={30} tickFormat={(d, i) => this.state.labels[i]} debug/>
          <YAxis
              tickFormat={d => {
                  return d;
              }}/>
      </DataSeries>
  </Chart>
);
React.render(
  <BarGraphDemo/>;,
  document.getElementById( 'barGraphDemo' )
);`
                }
                </code></pre>
              </div>
              <div className="col-xs-7">
                  <div id="barGraphDemo">
                    {barGraph}
                  </div>
              </div>
            </div>

            <div className="row component-showcase">
              <div className="row">
                <div className="col-xs-12">
                  <h3>{'Stacked Bar Charts'}</h3>
                </div>
              </div>
              <div className="col-xs-5">
                <pre><code className="language-jsx">
                {
`
import React, {Component} from 'react';
import ReactDom from 'react-dom';
import {
    util, Chart, DataSeries, BarChart, XAxis, YAxis, Stack
} from 'diffract';

const StackedBarGraphDemo = () => (
  <Chart width={width} height={height}
      margin={margins}>
      <DataSeries data={this.state.multiValues}
          xScale={xScale} yScale={yScale}>
          <Stack>
              <BarChart style={(d, i) => ({fill: this.getColors(i)})}/>
              <XAxis tickFormat={(d, i) => this.state.labels[i]}/>
              <YAxis
                  tickFormat={d => {
                      return d;
                  }}/>
          </Stack>
      </DataSeries>
  </Chart>
);

React.render(
  <StackedBarGraphDemo/>,
  document.getElementById( 'stackedBarGraphDemo' )
);`}
                </code></pre>
              </div>
              <div className="col-xs-7">
                  <div id="stackedBarGraphDemo">
                    {stackedBarGraph}
                  </div>
              </div>
            </div>

            <div className="row component-showcase">
              <div className="row">
                <div className="col-xs-12">
                  <h3>{'Grouped Bar Charts'}</h3>
                </div>
              </div>
              <div className="col-xs-5">
                <pre><code className="language-jsx">
                {
`
import React, {Component} from 'react';
import ReactDom from 'react-dom';
import {
    util, Chart, DataSeries, BarChart, XAxis, YAxis, Group
} from 'diffract';

const GroupedBarGraphDemo = () => (
  <Chart width={width} height={height} data={this.state.multiValues}
      xScale={xScale} yScale={yScale}
      margin={margins}>
      <DataSeries data={this.state.multiValues}
          xScale={xScale} yScale={yScale}>
          <Group>
              <BarChart style={(d, i) => ({fill: this.getColors(i)})}/>
              <XAxis tickFormat={(d, i) => this.state.labels[i]}/>
              <YAxis
                  tickFormat={d => {
                      return d;
                  }}/>
          </Group>
      </DataSeries>
  </Chart>
);


React.render(
  <GroupedBarGraphDemo/>,
  document.getElementById( 'groupedBarGraphDemo' )
);
`
                }
                </code></pre>
              </div>
              <div className="col-xs-7">
                  <div id="groupedBarGraphDemo">
                    {groupedBarGraph}
                  </div>
              </div>
            </div>

          </div>
        );
    }
}

Demo.displayName = 'Demo';

ReactDom.render(
    <Demo/>,
    document.getElementById('demoRoot')
);
