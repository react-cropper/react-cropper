import React, { Component } from 'react';
import 'cropperjs/dist/cropper.css';

import Cropper from '../../src/react-cropper';

/* global FileReader */

const src = 'img/child.jpg';

export default class Demo extends Component {

  constructor(props) {
    super(props);
    this.state = {
      src,
      cropResult: null,
    };
    this.cropImage = this.cropImage.bind(this);
    this.onChange = this.onChange.bind(this);
    this.useDefaultImage = this.useDefaultImage.bind(this);
  }

  onChange(e) {
    e.preventDefault();
    let files;
    if (e.dataTransfer) {
      files = e.dataTransfer.files;
    } else if (e.target) {
      files = e.target.files;
    }
    const reader = new FileReader();
    reader.onload = () => {
      this.setState({ src: reader.result });
    };
    reader.readAsDataURL(files[0]);
  }

  cropImage() {
    if (typeof this.cropper.getCroppedCanvas() === 'undefined') {
      return;
    }
    this.setState({
      cropResult: this.cropper.getCroppedCanvas().toDataURL(),
    });
  }

  useDefaultImage() {
    this.setState({ src });
  }

  render() {
    return (
      <div>
        <div style={{ width: '100%' }}>
          <input type="file" onChange={this.onChange} />
          <button onClick={this.useDefaultImage}>Use default img</button>
          <br />
          <br />
          <Cropper
            style={{ height: 400, width: '100%' }}
            aspectRatio={16 / 9}
            preview=".img-preview"
            guides={false}
            src={this.state.src}
            ref={cropper => { this.cropper = cropper; }}
          />
        </div>
        <div>
          <div className="box" style={{ width: '50%', float: 'right' }}>
            <h1>Preview</h1>
            <div className="img-preview" style={{ width: '100%', float: 'left', height: 300 }} />
          </div>
          <div className="box" style={{ width: '50%', float: 'right' }}>
            <h1>
              <span>Crop</span>
              <button onClick={this.cropImage} style={{ float: 'right' }}>
                Crop Image
              </button>
            </h1>
            <img style={{ width: '100%' }} src={this.state.cropResult} alt="cropped image" />
          </div>
        </div>
        <br style={{ clear: 'both' }} />
      </div>
    );
  }
}
