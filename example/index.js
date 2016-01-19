import React from 'react';
import ReactDOM from 'react-dom';

import Cropper from '../dist/react-cropper';

const Demo = React.createClass({

  getInitialState() {
    return {
      src: 'http://fengyuanchen.github.io/cropper/img/picture.jpg',
      cropResult: null
    };
  },

  _cropImage(){
    if(typeof this.refs.cropper.getCroppedCanvas() === 'undefined'){
      return;
    }
    this.setState({
      cropResult: this.refs.cropper.getCroppedCanvas().toDataURL()
    });
  },

  _onChange(e){
    e.preventDefault();
    let files;
    if (e.dataTransfer) {
      files = e.dataTransfer.files;
    } else if (e.target) {
      files = e.target.files;
    }
    let reader = new FileReader();
    reader.onload = () => {
      this.setState({src: reader.result});
    };
    reader.readAsDataURL(files[0]);
  },

  _useDefaultImage(){
    this.setState({src: this.getInitialState().src});
  },

  render() {
    return (
      <div>
        <div style={{width: '100%'}}>
          <input type='file' onChange={this._onChange} />
          <button onClick={this._useDefaultImage}>Use default img</button>
          <br />
          <br />
          <Cropper
            style={{height: 400, width: '100%'}}
            aspectRatio={16 / 9}
            preview='.img-preview'
            guides={false}
            src={this.state.src}
            ref='cropper'
            crop={this._crop} />
        </div>
        <div>
          <div className='box' style={{width: '50%', float: 'right'}}>
            <h1>Preview</h1>
            <div className="img-preview" style={{width: '100%', float: 'left', height: 300}}/>
          </div>
          <div className='box' style={{width: '50%', float: 'right'}}>
            <h1 style={{display: 'inline-block'}}>
              Crop
              <button onClick={this._cropImage} style={{float: 'right'}}>Crop Image</button>
            </h1>
            <img style={{width: '100%'}} src={this.state.cropResult}/>
          </div>
        </div>
        <br style={{clear: 'both'}}/>
      </div>
    );
  }

});

ReactDOM.render(<Demo />, document.getElementById('main'));
