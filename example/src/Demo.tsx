import React, {useState, useRef} from 'react';
import 'cropperjs/dist/cropper.css';
import {Cropper, ReactCropperElement} from '../../src';

const defaultSrc = 'img/child.jpg';

export const Demo: React.FC = () => {
    const [image, setImage] = useState(defaultSrc);
    const [cropData, setCropData] = useState('#');
    const cropperRef = useRef<ReactCropperElement>(null);
    const onChange = (e: any) => {
        e.preventDefault();
        let files;
        if (e.dataTransfer) {
            files = e.dataTransfer.files;
        } else if (e.target) {
            files = e.target.files;
        }
        const reader = new FileReader();
        reader.onload = () => {
            setImage(reader.result as any);
        };
        reader.readAsDataURL(files[0]);
    };

    const getCropData = () => {
        if (typeof cropperRef.current?.cropper !== 'undefined') {
            const cropper = cropperRef.current?.cropper;
            setCropData(cropper.getCroppedCanvas().toDataURL());
        }
    };

    return (
        <div>
            <div style={{width: '100%'}}>
                <input type="file" onChange={onChange} />
                <button>Use default img</button>
                <br />
                <br />
                <Cropper
                    style={{height: 400, width: '100%'}}
                    initialAspectRatio={16 / 9}
                    preview=".img-preview"
                    guides={true}
                    src={image}
                    ref={cropperRef}
                    dragMode={'move'}
                    checkOrientation={true} // https://github.com/fengyuanchen/cropperjs/issues/671
                />
            </div>
            <div>
                <div className="box" style={{width: '50%', float: 'right'}}>
                    <h1>Preview</h1>
                    <div className="img-preview" style={{width: '100%', float: 'left', height: 300}} />
                </div>
                <div className="box" style={{width: '50%', float: 'right'}}>
                    <h1>
                        <span>Crop</span>
                        <button style={{float: 'right'}} onClick={getCropData}>
                            Crop Image
                        </button>
                    </h1>
                    <img style={{width: '100%'}} src={cropData} alt="cropped image" />
                </div>
            </div>
            <br style={{clear: 'both'}} />
        </div>
    );
};

export default Demo;
