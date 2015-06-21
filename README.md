# [react-cropper](http://roadmanfong.github.io/react-cropper/)

[![NPM](https://nodei.co/npm/react-cropper.png?downloads=true)](https://www.npmjs.com/package/react-cropper)

[Cropper](https://github.com/fengyuanchen/cropper) as React components

[Demo](http://roadmanfong.github.io/react-cropper/example/)

Currently only support webpack

## Docs
* [Image Cropper](https://github.com/fengyuanchen/cropper)

## Installation
Install via [npm](https://www.npmjs.com/package/react-cropper)

```shell
npm install --save react-cropper
```

### Webpack User

You also need a couple of loaders for webpack

```shell
npm install style-loader css-loader
```

### Browserify User

https://github.com/cheton/browserify-css

```shell
npm i --save-dev browserify-css
```

Compile your project with command line like

```shell
 browserify -t reactify -g browserify-css index.jsx > bundle.js
```

## Todo
* Unit test
* Put demo in [http://roadmanfong.github.io/react-cropper/](http://roadmanfong.github.io/react-cropper/)

## Quick Example
```js
var Cropper = require('react-cropper');
var Demo = React.createClass({
  _crop: function(){
    // image in dataUrl
    console.log(this.refs.cropper.getCroppedCanvas().toDataURL());
  },

  render: function() {
    return (
      <Cropper
        ref='cropper'
        src='http://fengyuanchen.github.io/cropper/img/picture.jpg'
        style={{height: 400, width: '100%'}}
        // Cropper.js options
        aspectRatio={16 / 9}
        guides={false}
        crop={this._crop} />
    );
  }
});

```

## Options

### src
* Type: `string`
* Default: `null`

```js
  <Cropper src='http://fengyuanchen.github.io/cropper/img/picture.jpg' />
```

### Other options

Accept all options in the [docs](https://github.com/fengyuanchen/cropper#options) as attributes.

```js
  <Cropper
    src='http://fengyuanchen.github.io/cropper/img/picture.jpg'
    aspectRatio={16 / 9} 
    guides={false} 
    crop={this._crop} />
```

## Methods
Assign a `ref` attribute to use [methods](https://github.com/fengyuanchen/cropper#methods)

```js
var Demo = React.createClass({

  _crop: function(){
    var dataUrl = this.refs.cropper.getCroppedCanvas().toDataURL();
    console.log(dataUrl);
  },

  render: function() {
    return (
      <Cropper
        ref='cropper'
        crop={this._crop} />
    );
  }
})
```

## Events

Assign [Events](https://github.com/fengyuanchen/cropper#events) handler with `.on(eventname, callback)` and `ref`.

```js

componentDidMount: function(){
  this.refs.cropper.on('dragstart.cropper', function (e) {
    console.log(e.type); // dragstart
    console.log(e.namespace); // cropper
    console.log(e.dragType); // ...
  });
},

```

## Build

```
npm run build
```

## Author
Fong Kuanghuei(waneblade@gmail.com)

## License
MIT
