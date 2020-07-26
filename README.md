# react-cropper

[Cropperjs](https://github.com/fengyuanchen/cropperjs) as React component

[![NPM](https://img.shields.io/npm/v/react-cropper/latest)](https://www.npmjs.com/package/react-cropper)
[![NPM](https://img.shields.io/npm/v/react-cropper/beta)](https://www.npmjs.com/package/react-cropper)
[![NPM downloads](https://img.shields.io/npm/dt/react-cropper)](https://www.npmjs.com/package/react-cropper)
[![Dependencies](https://img.shields.io/david/react-cropper/react-cropper)](https://www.npmjs.com/package/react-cropper)
[![Language grade: JavaScript](https://img.shields.io/lgtm/grade/javascript/g/react-cropper/react-cropper.svg?logo=lgtm&logoWidth=18)](https://lgtm.com/projects/g/react-cropper/react-cropper/context:javascript)
[![Total alerts](https://img.shields.io/lgtm/alerts/g/react-cropper/react-cropper.svg?logo=lgtm&logoWidth=18)](https://lgtm.com/projects/g/react-cropper/react-cropper/alerts/)
[![Bundle Size minZip](https://img.shields.io/bundlephobia/minzip/react-cropper)](https://www.npmjs.com/package/react-cropper)
[![Bundle Size min](https://img.shields.io/bundlephobia/min/react-cropper)](https://www.npmjs.com/package/react-cropper)
[![Stars](https://img.shields.io/github/stars/react-cropper/react-cropper)](https://github.com/react-cropper/react-cropper/stargazers)
[![License](https://img.shields.io/github/license/react-cropper/react-cropper)](https://github.com/react-cropper/react-cropper/blob/develop/LICENSE)

## Demo

[Click for a Demo](http://roadmanfong.github.io/react-cropper/example/)

## Docs

-   [Image Cropper](https://github.com/fengyuanchen/cropper)

## Installation

Install via [npm](https://www.npmjs.com/package/react-cropper)

```shell
npm install --save react-cropper
```

You need `cropper.css` in your project which is from [cropperjs](https://www.npmjs.com/package/cropperjs).
Since this project have dependency on [cropperjs](https://www.npmjs.com/package/cropperjs), it located in `/node_modules/react-cropper/node_modules/cropperjs/dist/cropper.css` or `node_modules/cropperjs/dist/cropper.css` for npm version `3.0.0` later

## Breaking Change (version >= 2.0.0)

1. Support for `ref` has been **removed**. Use the `onInitialized` method to get the `cropper` instance.
2. To set initial aspect ratio, instead of using `aspectRatio` use `initialAspectRatio`.
3. Props `data`, `canvasData` and `cropBoxData` are directly passed on to `cropperjs` and their respective setters are **not** called as earlier.
4. React Cropper now does not try to use/execute `moveTo` as earlier. Directly use the `moveTo` method from the `cropper` instance.

## Quick Example

```js
import React, {Component} from 'react';
import Cropper from 'react-cropper';
import 'cropperjs/dist/cropper.css'; // see installation section above for versions of NPM older than 3.0.0
// If you choose not to use import, you need to assign Cropper to default
// var Cropper = require('react-cropper').default

class Demo extends Component {
    _crop() {
        // image in dataUrl
        console.log(this.cropper.getCroppedCanvas().toDataURL());
    }

    onCropperInit(cropper) {
        this.cropper = cropper;
    }

    render() {
        return (
            <Cropper
                src="http://fengyuanchen.github.io/cropper/images/picture.jpg"
                style={{height: 400, width: '100%'}}
                // Cropper.js options
                initialAspectRatio={16 / 9}
                guides={false}
                crop={this._crop.bind(this)}
                onInitialized={this.onCropperInit.bind(this)}
            />
        );
    }
}
```

## Options

### src

-   Type: `string`
-   Default: `null`

```js
<Cropper src="http://fengyuanchen.github.io/cropper/images/picture.jpg" />
```

### alt

-   Type: `string`
-   Default: `picture`

### crossOrigin

-   Type: `string`
-   Default: `null`

### dragMode

https://github.com/fengyuanchen/cropperjs#dragmode

### scaleX

https://github.com/fengyuanchen/cropperjs#scalexscalex

### scaleY

https://github.com/fengyuanchen/cropperjs#scalexscaley

### enable

https://github.com/fengyuanchen/cropperjs#enable

### disable

https://github.com/fengyuanchen/cropperjs#disable

### zoomTo

https://github.com/fengyuanchen/cropperjs#zoomto

### rotateTo

https://github.com/fengyuanchen/cropperjs#rotateto

### Other options

Accept all options in the [docs](https://github.com/fengyuanchen/cropperjs#options) as properties.

```js
<Cropper
    src="http://fengyuanchen.github.io/cropper/images/picture.jpg"
    initialAspectRatio={16 / 9}
    guides={false}
    crop={this._crop}
/>
```

## Methods

Use the `cropper` instance from `onInitialized` to access cropperjs [methods](https://github.com/fengyuanchen/cropper#methods)

## Build

```sh
npm run build
```

## Development

```sh
npm start
```

## Author

Fong Kuanghuei(fongkuanghui@gmail.com)

## Maintainer

[Shubhendu Shekhar](https://github.com/shekhar-shubhendu)

## License

MIT
