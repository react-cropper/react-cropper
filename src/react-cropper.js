import React, { Component, PropTypes } from 'react';
import Cropper from 'cropperjs';
import 'cropperjs/dist/cropper.css';
import ReactDOM from 'react-dom';

class ReactCropper extends Component {

  componentDidMount() {
    const options = {};
    for (const prop in this.props) {
      if (prop !== 'src' && prop !== 'alt' && prop !== 'crossOrigin') {
        options[prop] = this.props[prop];
      }
    }
    this.img = ReactDOM.findDOMNode(this.refs.img);
    this.cropper = new Cropper(this.img, options);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.src !== this.props.src) {
      this.cropper.reset().clear().replace(nextProps.src);
    }
    if (nextProps.aspectRatio !== this.props.aspectRatio) {
      this.setAspectRatio(nextProps.aspectRatio);
    }
  }

  componentWillUnmount() {
    if (this.img) {
      // Destroy the cropper, this makes sure events such as resize are cleaned up and do not leak
      this.cropper.destroy();
      delete this.img;
      delete this.cropper;
    }
  }

  setDragMode() {
    return this.cropper.setDragMode();
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
    return this.cropper.crop;
  }

  move(offsetX, offsetY) {
    return this.cropper.move(offsetX, offsetY);
  }

  moveTo(offsetX, offsetY) {
    return this.cropper.move(offsetX, offsetY);
  }

  zoom(ratio) {
    return this.cropper.zoom(ratio);
  }

  rotate(degree) {
    return this.cropper.rotate(degree);
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

  replace(url) {
    return this.cropper.replace(url);
  }

  render() {
    return (
      <div {...this.props} src={null} crossOrigin={null} alt={null}>
        <img
          crossOrigin={this.props.crossOrigin}
          ref="img"
          src={this.props.src}
          alt={this.props.alt === undefined ? 'picture' : this.props.alt}
          style={{ opacity: 0 }}
        />
      </div>
    );
  }
}

ReactCropper.propTypes = {
  // react cropper options
  crossOrigin: PropTypes.string,
  src: PropTypes.string,
  alt: PropTypes.string,

  // cropper options
  aspectRatio: PropTypes.number,
  crop: PropTypes.func,
  preview: PropTypes.string,
  strict: PropTypes.bool,
  responsive: PropTypes.bool,
  checkImageOrigin: PropTypes.bool,
  background: PropTypes.bool,
  modal: PropTypes.bool,
  guides: PropTypes.bool,
  highlight: PropTypes.bool,
  autoCrop: PropTypes.bool,
  autoCropArea: PropTypes.number,
  dragCrop: PropTypes.bool,
  movable: PropTypes.bool,
  cropBoxMovable: PropTypes.bool,
  cropBoxResizable: PropTypes.bool,
  doubleClickToggle: PropTypes.bool,
  zoomable: PropTypes.bool,
  mouseWheelZoom: PropTypes.bool,
  touchDragZoom: PropTypes.bool,
  rotatable: PropTypes.bool,
  minContainerWidth: PropTypes.number,
  minContainerHeight: PropTypes.number,
  minCanvasWidth: PropTypes.number,
  minCanvasHeight: PropTypes.number,
  minCropBoxWidth: PropTypes.number,
  minCropBoxHeight: PropTypes.number,
  build: PropTypes.func,
  built: PropTypes.func,
  dragstart: PropTypes.func,
  dragmove: PropTypes.func,
  dragend: PropTypes.func,
  zoomin: PropTypes.func,
  zoomout: PropTypes.func,
};
ReactCropper.defaultProps = {
  src: null,
};

export default ReactCropper;
