import React from 'react';
import Cropper from 'cropperjs';

export interface ReactCropperProps
    extends Cropper.Options,
        Omit<React.HTMLProps<HTMLImageElement>, 'data' | 'ref' | 'crossOrigin'> {
    crossOrigin?: '' | 'anonymous' | 'use-credentials' | undefined;
    on?: (eventName: string, callback: () => void | Promise<void>) => void | Promise<void>;
    scaleX?: number;
    scaleY?: number;
    enable?: boolean;
    zoomTo?: number;
    rotateTo?: number;
    onInitialized?: (instance: Cropper) => void | Promise<void>;
}

export declare const ReactCropper: React.FC<ReactCropperProps>;
export default ReactCropper;
