# diffract
[![npm version](https://badge.fury.io/js/diffract.svg)](http://badge.fury.io/js/diffract)
[![devDependency Status](https://david-dm.org/ameyms/diffract/dev-status.svg)](https://david-dm.org/ameyms/diffract#info=devDependencies)
[![peerDependency Status](https://david-dm.org/ameyms/diffract/peer-status.svg)](https://david-dm.org/ameyms/diffract#info=peerDependencies)
[![Built with Grunt](https://cdn.gruntjs.com/builtwith.png)](http://gruntjs.com/)

A set of d3 based visualization components with **cool animations** built for React

Installation
---
Diffract is available via npm and can be used along with [browserify](http://browserify.org/)

```shell
npm install diffract

```

## Usage

After installing diffract via NPM, you may use the components in your code as follows:

```js
/** DeathStar.jsx */

import React from 'react';
import {Chart, DataSeries, Pie} from 'diffract';

// ...And use it in your code
class DeathStar extends Component {

  render: function() {
    return (
        <Chart width={width} height={height}>
            <DataSeries data={this.state.values}>
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
            </DataSeries>
        </Chart>
    );
  }

}

```

## Demo
### Donut
![Donut](https://raw.github.com/ameyms/diffract/master/etc/donut.gif)

### Bar Graph
![Bar Graph](https://raw.github.com/ameyms/diffract/master/etc/bar_graph_1.gif)




----


  License: MIT
