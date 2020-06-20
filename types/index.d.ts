import React from 'react';
import Cropper from 'cropperjs';
export declare type ReactCropper = Cropper;
export interface ReactCropperProps
    extends Cropper.Options,
        Omit<React.HTMLProps<HTMLImageElement>, 'data' | 'ref' | 'crossOrigin'> {
    crossOrigin?: '' | 'anonymous' | 'use-credentials' | undefined;
    ref?: React.Ref<ReactCropper> | React.MutableRefObject<ReactCropper> | React.RefObject<ReactCropper>;
    on?: (eventName: string, callback: () => void | Promise<void>) => void | Promise<void>;
    scaleX?: number;
    scaleY?: number;
    enable?: boolean;
    zoomTo?: number;
    rotateTo?: number;
}
export declare const ReactCropper: React.FC<ReactCropperProps>;
export default ReactCropper;
