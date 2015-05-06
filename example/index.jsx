var React = require('react');

var Cropper = require('../dist/react-cropper');

var Demo = React.createClass({

  getInitialState: function() {
    return {
      src: null,
      preview: null
    };
  },

  _crop(){
    this.setState({
      preview: this.refs.cropper.getCroppedCanvas().toDataURL()
    });
  },

  _onChange(e){
    e.preventDefault();
    var files;
    if (e.dataTransfer) {
      files = e.dataTransfer.files;
    } else if (e.target) {
      files = e.target.files;
    }
    var reader = new FileReader();
    reader.onload = () => {
      this.setState({src: reader.result});
    };
    reader.readAsDataURL(files[0]);
  },

  render() {

    return (
      <div>
        <div className='box' style={{width: '70%'}}>
          <input type='file' onChange={this._onChange} />
          <br/>
          <Cropper
            style={{height: 400, width: '100%'}}
            aspectRatio={16 / 9}
            guides={false}
            src={this.state.src}
            ref='cropper'
            crop={this._crop} />
        </div>

        <div className='box' style={{width: '30%'}}>
          <h1>Preview</h1>
          <img style={{width: '100%'}} src={this.state.preview}/>
        </div>
        <br style={{clear: 'both'}}/>
      </div>
    );
  }

});

React.render(<Demo />, document.getElementById('main'));
