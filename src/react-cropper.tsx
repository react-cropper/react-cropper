import React, {useState, useEffect} from 'react';
import Cropper from 'cropperjs';

type ReactCropperRef = React.MutableRefObject<HTMLImageElement | null> | null;

interface ReactCropperDefaultOptions {
    scaleX?: number;
    scaleY?: number;
    enable?: boolean;
    zoomTo?: number;
    rotateTo?: number;
}

interface ReactCropperProps
    extends ReactCropperDefaultOptions,
        Cropper.Options,
        Omit<React.HTMLProps<HTMLImageElement>, 'data' | 'ref' | 'crossOrigin'> {
    crossOrigin?: '' | 'anonymous' | 'use-credentials' | undefined;
    on?: (eventName: string, callback: () => void | Promise<void>) => void | Promise<void>;
    onInitialized?: (instance: Cropper) => void | Promise<void>;
}

const applyDefaultOptions = (cropper: Cropper, options: ReactCropperDefaultOptions = {}): void => {
    const {enable = true, scaleX = 1, scaleY = 1, zoomTo = 0, rotateTo = 0} = options;
    enable ? cropper.enable() : cropper.disable();
    cropper.scaleX(scaleX);
    cropper.scaleY(scaleY);
    cropper.rotateTo(rotateTo);
    cropper.zoomTo(zoomTo);
};

const ReactCropper = React.forwardRef<HTMLImageElement, ReactCropperProps>(({...props}, ref) => {
    const {
        dragMode = 'crop',
        src,
        style,
        className,
        crossOrigin,
        scaleX,
        scaleY,
        enable,
        zoomTo,
        rotateTo,
        alt = 'picture',
        ready,
        onInitialized,
        ...rest
    } = props;
    const [cropper, setCropper] = useState<Cropper | undefined>(undefined);
    const defaultOptions: ReactCropperDefaultOptions = {scaleY, scaleX, enable, zoomTo, rotateTo};
    const cropperRef = ref as ReactCropperRef;
    useEffect(() => {
        if (cropperRef !== null && cropperRef.current !== null && typeof cropperRef !== 'undefined' && cropperRef) {
            const cropper = new Cropper(cropperRef.current, {
                dragMode,
                ...rest,
                ready: (e) => {
                    if (e.target !== null) {
                        const target = e.target as any;
                        applyDefaultOptions(target.cropper, defaultOptions);
                    }
                    ready && ready(e);
                },
            });
            onInitialized && onInitialized(cropper);
            setCropper(cropper);
        }

        /**
         * destroy cropper on un-mount
         */
        return () => {
            if (cropperRef !== null) {
                cropper?.destroy();
            }
        };
    }, [cropperRef]);

    /**
     * re-render when src changes
     */
    useEffect(() => {
        if (typeof cropper !== 'undefined' && typeof src !== 'undefined') {
            cropper.reset().clear().replace(src);
        }
    }, [src]);

    return (
        <div style={style} className={className}>
            <img crossOrigin={crossOrigin} src={src} alt={alt} style={{opacity: 0, maxWidth: '100%'}} ref={ref} />
        </div>
    );
});

export {ReactCropper, ReactCropperProps, applyDefaultOptions};
