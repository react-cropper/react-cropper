import type Instance from 'cropperjs';
import type React from 'react';

interface EventMap {
    crop: Instance.CropEvent;
    cropend: Instance.CropEndEvent;
    cropmove: Instance.CropMoveEvent;
    cropstart: Instance.CropStartEvent;
    ready: Instance.ReadyEvent;
    zoom: Instance.ZoomEvent;
}

interface EventHandler {
    <K extends keyof EventMap>(eventName: K, callback: (event: EventMap[K]) => void): Promise<void>;
}

interface Props extends Cropper.Options, Omit<React.HTMLProps<HTMLImageElement>, 'data' | 'ref' | 'crossOrigin'> {
    enable?: boolean;
    scaleX?: number;
    scaleY?: number;
    zoomTo?: number;
    rotateTo?: number;
    crossOrigin?: '' | 'anonymous' | 'use-credentials';
    on?: EventHandler;
    onInitialized?: (instance: Instance) => void;
}

declare const ReactCropper: React.ForwardRefExoticComponent<Props & React.RefAttributes<HTMLImageElement>>;

export {Instance, EventHandler};
export {ReactCropper as Cropper};
export {ReactCropper as default};
export {Props as ReactCropperProps};
