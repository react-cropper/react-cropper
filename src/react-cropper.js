import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Cropper from 'cropperjs';

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
  'wheelZoomRation',
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
    const options = Object.keys(this.props)
    .filter(propKey => optionProps.indexOf(propKey) !== -1)
    .reduce((prevOptions, propKey) =>
      Object.assign({}, prevOptions, { [propKey]: this.props[propKey] })
    , {});
    this.cropper = new Cropper(this.img, options);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.src !== this.props.src) {
      this.cropper.reset().clear().replace(nextProps.src);
    }
    if (nextProps.aspectRatio !== this.props.aspectRatio) {
      this.setAspectRatio(nextProps.aspectRatio);
    }
    if (nextProps.data !== this.props.data) {
      this.setData(nextProps.data);
    }
    if (nextProps.dragMode !== this.props.dragMode) {
      this.setDragMode(nextProps.dragMode);
    }
    if (nextProps.cropBoxData !== this.props.cropBoxData) {
      this.setCropBoxData(nextProps.cropBoxData);
    }
    if (nextProps.canvasData !== this.props.canvasData) {
      this.setCanvasData(nextProps.canvasData);
    }
    if (nextProps.moveTo !== this.props.moveTo) {
      if (nextProps.moveTo.length > 1) {
        this.moveTo(nextProps.moveTo[0], nextProps.moveTo[1]);
      } else {
        this.moveTo(nextProps.moveTo[0]);
      }
    }
    if (nextProps.zoomTo !== this.props.zoomTo) {
      this.zoomTo(nextProps.zoomTo);
    }
    if (nextProps.rotateTo !== this.props.rotateTo) {
      this.rotateTo(nextProps.rotateTo);
    }
    if (nextProps.scaleX !== this.props.scaleX) {
      this.scaleX(nextProps.scaleX);
    }
    if (nextProps.scaleY !== this.props.scaleY) {
      this.scaleY(nextProps.scaleY);
    }
    if (nextProps.enable !== this.props.enable) {
      if (nextProps.enable) {
        this.enable();
      } else {
        this.disable();
      }
    }

    Object.keys(nextProps).forEach((propKey) => {
      let isDifferentVal = nextProps[propKey] !== this.props[propKey];
      const isUnchangeableProps = unchangeableProps.indexOf(propKey) !== -1;

      if (typeof nextProps[propKey] === 'function' && typeof this.props[propKey] === 'function') {
        isDifferentVal = nextProps[propKey].toString() !== this.props[propKey].toString();
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
    } = this.props;

    return (
      <div
        src={null}
        crossOrigin={null}
        alt={null}
        style={this.props.style}
        className={this.props.className}
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
  wheelZoomRation: PropTypes.number,
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
};

export default ReactCropper;
