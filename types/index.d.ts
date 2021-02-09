import type Instance from 'cropperjs';
import type React from 'react';

interface EventHandler {
    onInitialized?(instance: Instance): void;
    onReady?(event: Instance.ReadyEvent): void;
    onCrop?(event: Instance.CropEvent): void;
    onCropStart?(event: Instance.CropStartEvent): void;
    onCropMove?(event: Instance.CropMoveEvent): void;
    onCropEnd?(event: Instance.CropEndEvent): void;
    onZoom?(event: Instance.ZoomEvent): void;
}

type Options = Omit<Cropper.Options, 'ready' | 'crop' | 'cropstart' | 'cropmove' | 'cropend' | 'zoom'>;
type ElementProps = Omit<React.HTMLProps<HTMLImageElement>, 'data' | 'ref' | 'crossOrigin'>;

interface Props extends EventHandler, Options, ElementProps {
    enable?: boolean;
    scaleX?: number;
    scaleY?: number;
    zoomTo?: number;
    rotateTo?: number;
    crossOrigin?: '' | 'anonymous' | 'use-credentials';
}

declare const Cropper: React.ForwardRefExoticComponent<Props & React.RefAttributes<HTMLImageElement>>;

export {Cropper, Instance, EventHandler};
export {Props as ReactCropperProps};
export default Cropper;
