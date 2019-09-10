import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Cropper from 'cropperjs';
import isEqual from 'lodash/isEqual';
import debounce from 'lodash/debounce';

const optionProps = [
  'dragMode',
  'aspectRatio',
  'data',
  'crop',
  // unchangeable props start from here
  'viewMode',
  'preview',
  'responsive',
  'restore',
  'checkCrossOrigin',
  'checkOrientation',
  'modal',
  'guides',
  'center',
  'highlight',
  'background',
  'autoCrop',
  'autoCropArea',
  'movable',
  'rotatable',
  'scalable',
  'zoomable',
  'zoomOnTouch',
  'zoomOnWheel',
  'wheelZoomRatio',
  'cropBoxMovable',
  'cropBoxResizable',
  'toggleDragModeOnDblclick',
  'minContainerWidth',
  'minContainerHeight',
  'minCanvasWidth',
  'minCanvasHeight',
  'minCropBoxWidth',
  'minCropBoxHeight',
  'ready',
  'cropstart',
  'cropmove',
  'cropend',
  'zoom',
];

const unchangeableProps = optionProps.slice(4);

class ReactCropper extends Component {
  componentDidMount() {
    const { cropDebounceDelay } = this.props;
    const options = Object.keys(this.props)
      .filter(propKey => optionProps.indexOf(propKey) !== -1)
      .reduce((prevOptions, propKey) =>
        Object.assign({}, prevOptions, { [propKey]: this.props[propKey] }), {});

    options.crop = debounce(options.crop, cropDebounceDelay);

    this.cropper = new Cropper(this.img, options);
  }

  shouldComponentUpdate(nextProps) {
    return !isEqual(nextProps, this.props);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.src !== this.props.src) {
      this.cropper.reset().clear().replace(this.props.src);
    }
    if (prevProps.aspectRatio !== this.props.aspectRatio) {
      this.setAspectRatio(this.props.aspectRatio);
    }
    if (prevProps.data !== this.props.data) {
      this.setData(this.props.data);
    }
    if (prevProps.dragMode !== this.props.dragMode) {
      this.setDragMode(this.props.dragMode);
    }
    if (prevProps.cropBoxData !== this.props.cropBoxData) {
      this.setCropBoxData(this.props.cropBoxData);
    }
    if (prevProps.canvasData !== this.props.canvasData) {
      this.setCanvasData(this.props.canvasData);
    }
    if (prevProps.moveTo !== this.props.moveTo) {
      if (this.props.moveTo.length > 1) {
        this.moveTo(this.props.moveTo[0], this.props.moveTo[1]);
      } else {
        this.moveTo(this.props.moveTo[0]);
      }
    }
    if (prevProps.zoomTo !== this.props.zoomTo) {
      this.zoomTo(this.props.zoomTo);
    }
    if (prevProps.rotateTo !== this.props.rotateTo) {
      this.rotateTo(this.props.rotateTo);
    }
    if (prevProps.scaleX !== this.props.scaleX) {
      this.scaleX(this.props.scaleX);
    }
    if (prevProps.scaleY !== this.props.scaleY) {
      this.scaleY(this.props.scaleY);
    }
    if (prevProps.enable !== this.props.enable) {
      if (this.props.enable) {
        this.enable();
      } else {
        this.disable();
      }
    }

    Object.keys(this.props).forEach((propKey) => {
      let isDifferentVal = prevProps[propKey] !== this.props[propKey];
      const isUnchangeableProps = unchangeableProps.indexOf(propKey) !== -1;

      if (typeof this.props[propKey] === 'function' && typeof this.props[propKey] === 'function') {
        isDifferentVal = prevProps[propKey].toString() !== this.props[propKey].toString();
      }

      if (isDifferentVal && isUnchangeableProps) {
        throw new Error(`prop: ${propKey} can't be change after componentDidMount`);
      }
    });
  }

  componentWillUnmount() {
    if (this.img) {
      // Destroy the cropper, this makes sure events such as resize are cleaned up and do not leak
      this.cropper.destroy();
      delete this.img;
      delete this.cropper;
    }
  }

  setDragMode(mode) {
    return this.cropper.setDragMode(mode);
  }

  setAspectRatio(aspectRatio) {
    return this.cropper.setAspectRatio(aspectRatio);
  }

  getCroppedCanvas(options) {
    return this.cropper.getCroppedCanvas(options);
  }

  setCropBoxData(data) {
    return this.cropper.setCropBoxData(data);
  }

  getCropBoxData() {
    return this.cropper.getCropBoxData();
  }

  setCanvasData(data) {
    return this.cropper.setCanvasData(data);
  }

  getCanvasData() {
    return this.cropper.getCanvasData();
  }

  getImageData() {
    return this.cropper.getImageData();
  }

  getContainerData() {
    return this.cropper.getContainerData();
  }

  setData(data) {
    return this.cropper.setData(data);
  }

  getData(rounded) {
    return this.cropper.getData(rounded);
  }

  crop() {
    return this.cropper.crop();
  }

  move(offsetX, offsetY) {
    return this.cropper.move(offsetX, offsetY);
  }

  moveTo(x, y) {
    return this.cropper.moveTo(x, y);
  }

  zoom(ratio) {
    return this.cropper.zoom(ratio);
  }

  zoomTo(ratio) {
    return this.cropper.zoomTo(ratio);
  }

  rotate(degree) {
    return this.cropper.rotate(degree);
  }

  rotateTo(degree) {
    return this.cropper.rotateTo(degree);
  }

  enable() {
    return this.cropper.enable();
  }

  disable() {
    return this.cropper.disable();
  }

  reset() {
    return this.cropper.reset();
  }

  clear() {
    return this.cropper.clear();
  }

  replace(url, onlyColorChanged) {
    return this.cropper.replace(url, onlyColorChanged);
  }

  scale(scaleX, scaleY) {
    return this.cropper.scale(scaleX, scaleY);
  }

  scaleX(scaleX) {
    return this.cropper.scaleX(scaleX);
  }

  scaleY(scaleY) {
    return this.cropper.scaleY(scaleY);
  }

  render() {
    const {
      src,
      alt,
      crossOrigin,
      style,
      className,
    } = this.props;

    return (
      <div
        style={style}
        className={className}
      >
        <img
          crossOrigin={crossOrigin}
          ref={(img) => { this.img = img; }}
          src={src}
          alt={alt === undefined ? 'picture' : alt}
          style={{ opacity: 0 }}
        />
      </div>
    );
  }
}

ReactCropper.propTypes = {
  style: PropTypes.object, // eslint-disable-line react/forbid-prop-types
  className: PropTypes.string,

  // react cropper options
  crossOrigin: PropTypes.string,
  src: PropTypes.string,
  alt: PropTypes.string,
  cropDebounceDelay: PropTypes.number,

  // props of option can be changed after componentDidmount
  aspectRatio: PropTypes.number,
  dragMode: PropTypes.oneOf(['crop', 'move', 'none']),
  data: PropTypes.shape({
    x: PropTypes.number,
    y: PropTypes.number,
    width: PropTypes.number,
    height: PropTypes.number,
    rotate: PropTypes.number,
    scaleX: PropTypes.number,
    scaleY: PropTypes.number,
  }),
  scaleX: PropTypes.number,
  scaleY: PropTypes.number,
  enable: PropTypes.bool,
  cropBoxData: PropTypes.shape({
    left: PropTypes.number,
    top: PropTypes.number,
    width: PropTypes.number,
    height: PropTypes.number,
  }),
  canvasData: PropTypes.shape({
    left: PropTypes.number,
    top: PropTypes.number,
    width: PropTypes.number,
    height: PropTypes.number,
  }),
  zoomTo: PropTypes.number,
  moveTo: PropTypes.arrayOf(PropTypes.number),
  rotateTo: PropTypes.number,

  // cropperjs options
  // https://github.com/fengyuanchen/cropperjs#options
  // aspectRatio, dragMode, data
  viewMode: PropTypes.oneOf([0, 1, 2, 3]),
  preview: PropTypes.string,
  responsive: PropTypes.bool,
  restore: PropTypes.bool,
  checkCrossOrigin: PropTypes.bool,
  checkOrientation: PropTypes.bool,
  modal: PropTypes.bool,
  guides: PropTypes.bool,
  center: PropTypes.bool,
  highlight: PropTypes.bool,
  background: PropTypes.bool,
  autoCrop: PropTypes.bool,
  autoCropArea: PropTypes.number,
  movable: PropTypes.bool,
  rotatable: PropTypes.bool,
  scalable: PropTypes.bool,
  zoomable: PropTypes.bool,
  zoomOnTouch: PropTypes.bool,
  zoomOnWheel: PropTypes.bool,
  wheelZoomRatio: PropTypes.number,
  cropBoxMovable: PropTypes.bool,
  cropBoxResizable: PropTypes.bool,
  toggleDragModeOnDblclick: PropTypes.bool,
  minContainerWidth: PropTypes.number,
  minContainerHeight: PropTypes.number,
  minCanvasWidth: PropTypes.number,
  minCanvasHeight: PropTypes.number,
  minCropBoxWidth: PropTypes.number,
  minCropBoxHeight: PropTypes.number,
  ready: PropTypes.func,
  cropstart: PropTypes.func,
  cropmove: PropTypes.func,
  cropend: PropTypes.func,
  crop: PropTypes.func,
  zoom: PropTypes.func,
};

ReactCropper.defaultProps = {
  src: null,
  dragMode: 'crop',
  data: null,
  scaleX: 1,
  scaleY: 1,
  enable: true,
  zoomTo: 1,
  rotateTo: 0,
  cropDebounceDelay: 0,
};

export default ReactCropper;
