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
[![License](https://img.shields.io/github/license/react-cropper/react-cropper)](https://github.com/react-cropper/react-cropper/blob/develop/LICENSE)
[![codecov](https://codecov.io/gh/react-cropper/react-cropper/branch/develop/graph/badge.svg)](https://codecov.io/gh/react-cropper/react-cropper)

## Demo

[Click for a Demo](https://codesandbox.io/s/wonderful-pine-i7fs3)

## Docs

- [Cropperjs](https://github.com/fengyuanchen/cropperjs)

## Installation

Install via [npm](https://www.npmjs.com/package/react-cropper)

```shell
npm install --save react-cropper
```

You need `cropper.css` in your project which is from [cropperjs](https://www.npmjs.com/package/cropperjs).
Since this project have dependency on [cropperjs](https://www.npmjs.com/package/cropperjs), it located in `/node_modules/react-cropper/node_modules/cropperjs/dist/cropper.css` or `node_modules/cropperjs/dist/cropper.css` for npm version `3.0.0` later

## Breaking Change (version >= 2.0.0)

1. ~~Support for `ref` has been **removed**. Use the `onInitialized` method to get the `cropper` instance.~~ Added back ref support in 2.1.0.
2. To set initial aspect ratio, instead of using `aspectRatio` use `initialAspectRatio`.
3. Props `data`, `canvasData` and `cropBoxData` are directly passed on to `cropperjs` and their respective setters are **not** called as earlier.
4. React Cropper now does not try to use/execute `moveTo` as earlier. Directly use the `moveTo` method from the `cropper` instance.
5. React Cropper does not depend on `@types/react-cropper` and provides its own types. Please uninstall/remove `@types/react-cropper` as they might 'cause issues.

## Quick Example

```ts
import React, { useRef } from "react";
import Cropper from "react-cropper";
import "cropperjs/dist/cropper.css";

const Demo: React.FC = () => {
  const cropperRef = useRef<HTMLImageElement>(null);
  const onCrop = () => {
    const imageElement: any = cropperRef?.current;
    const cropper: any = imageElement?.cropper;
    console.log(cropper.getCroppedCanvas().toDataURL());
  };

  return (
    <Cropper
      src="https://raw.githubusercontent.com/roadmanfong/react-cropper/master/example/img/child.jpg"
      style={{ height: 400, width: "100%" }}
      // Cropper.js options
      initialAspectRatio={16 / 9}
      guides={false}
      crop={onCrop}
      ref={cropperRef}
    />
  );
};
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

[Fong Kuanghuei](mailto:fongkuanghui@gmail.com)

## Maintainer

[Shubhendu Shekhar](https://github.com/shekhar-shubhendu)

## License

MIT
