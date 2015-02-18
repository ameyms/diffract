diffract
==

A set of d3 based visualization components built for React

Installation
---
Diffract is available via npm and can be used along with [browserify](http://browserify.org/)

```shell
npm install diffract

```

Usage
---
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


----


  License: MIT
