# react-cropper

[Cropperjs](https://github.com/fengyuanchen/cropperjs) as React components

[![NPM](https://nodei.co/npm/react-cropper.png)](https://www.npmjs.com/package/react-cropper)

[Demo](http://roadmanfong.github.io/react-cropper/example/)


## Docs

* [Image Cropper](https://github.com/fengyuanchen/cropper)

## Installation

Install via [npm](https://www.npmjs.com/package/react-cropper)

```shell
npm install --save react-cropper
```

You need `cropper.css` in your project which is from [cropperjs](https://www.npmjs.com/package/cropperjs).
Since this project have dependency on [cropperjs](https://www.npmjs.com/package/cropperjs), it located in `/node_modules/react-cropper/node_modules/cropperjs/dist/cropper.css` or `node_modules/cropperjs/dist/cropper.css` for npm version `3.0.0` later

# Changelog


## Todo
* Unit test

## Quick Example
```js
import React, {Component} from 'react';
import Cropper from 'react-cropper';
import 'cropperjs/dist/cropper.css'; // see installation section above for versions of NPM older than 3.0.0
// If you choose not to use import, you need to assign Cropper to default
// var Cropper = require('react-cropper').default

const cropper = React.createRef(null);

class Demo extends Component {
  _crop(){
    // image in dataUrl
    console.log(this.refs.cropper.getCroppedCanvas().toDataURL());
  }

  render() {
    return (
      <Cropper
        ref={cropper}
        src='http://fengyuanchen.github.io/cropper/img/picture.jpg'
        style={{height: 400, width: '100%'}}
        // Cropper.js options
        aspectRatio={16 / 9}
        guides={false}
        crop={this._crop.bind(this)} />
    );
  }
}
```

## Options

### src
* Type: `string`
* Default: `null`

```js
  <Cropper src='http://fengyuanchen.github.io/cropper/img/picture.jpg' />
```
### alt
* Type: `string`
* Default: `picture`

### crossOrigin
* Type: `string`
* Default: `null`

### aspectRatio
https://github.com/fengyuanchen/cropperjs#aspectratio

### dragMode
https://github.com/fengyuanchen/cropperjs#dragmode

### data
https://github.com/fengyuanchen/cropperjs#setdatadata

### scaleX
https://github.com/fengyuanchen/cropperjs#scalexscalex

### scaleY
https://github.com/fengyuanchen/cropperjs#scalexscaley

### enable
https://github.com/fengyuanchen/cropperjs#enable

### disable
https://github.com/fengyuanchen/cropperjs#disable

### cropBoxData
https://github.com/fengyuanchen/cropperjs#setcropboxdatadata

### canvasData
https://github.com/fengyuanchen/cropperjs#setcanvasdata

### zoomTo
https://github.com/fengyuanchen/cropperjs#zoomto

### moveTo
https://github.com/fengyuanchen/cropperjs#moveto

### rotateTo
https://github.com/fengyuanchen/cropperjs#rotateto

### Other options
Accept all options in the [docs](https://github.com/fengyuanchen/cropperjs#options) as properties.
Except previous mentioned options, other options don't take effect after component mount.

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

const cropper = React.createRef(null);

class Demo extends Component {

  _crop(){
    const dataUrl = this.refs.cropper.getCroppedCanvas().toDataURL();
    console.log(dataUrl);
  },

  render() {
    return (
      <Cropper
        ref={cropper}
        crop={this._crop.bind(this)} />
    );
  }
}
```

## Build

```
npm run build
npm run build-example
```

## Author
Fong Kuanghuei(fongkuanghui@gmail.com)

## License
MIT
