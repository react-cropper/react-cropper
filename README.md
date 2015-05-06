# react-cropper
Cropper as React components

Currently only support Webpack build

## Docs
* [Image Cropper](https://github.com/fengyuanchen/cropper)

## Installation

```cli
npm install webpack
npm install style-loader css-loader
npm install react react-cropper
```


## Usage
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
        src={'http://fengyuanchen.github.io/cropper/img/picture.jpg'}
        style={{height: 400, width: '100%'}}
        // Cropper.js options
        aspectRatio={16 / 9}
        guides={false}
        crop={this._crop} />
    );
  }
});

```
