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

var React = require('react'),
  diffract = require('diffract'),
  Donut = diffract.Donut,
  myarr, colorFn;

/* Define myarr and colorFn here */

// ...And use it in your code
var DeathStar = React.createClass({

  render: function() {
    return (
      <Donut title="42" subtitle="answer to everything"
       values={myarr} segmentColor={colorFn} />
    );
  }

});

module.exports = DeathStar;


```

## Demo
### Donut
![Donut](https://raw.github.com/ameyms/diffract/master/etc/donut.gif)

### Bar Graph
![Bar Graph](https://raw.github.com/ameyms/diffract/master/etc/bar_graph_1.gif)




----


  License: MIT
