import React, {useState, useEffect} from 'react';
import Cropper from 'cropperjs';

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

const __applyDefaultOptions = (cropper: Cropper, options: ReactCropperDefaultOptions = {}): void => {
    const {enable = true, scaleX = 1, scaleY = 1, zoomTo = 1, rotateTo = 0} = options;
    enable ? cropper.enable() : cropper.disable();
    cropper.scaleX(scaleX);
    cropper.scaleY(scaleY);
    cropper.rotateTo(rotateTo);
    cropper.zoomTo(zoomTo);
};

const ReactCropper: React.FC<ReactCropperProps> = (props) => {
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
    const imageRef = React.createRef<HTMLImageElement>();
    const defaultOptions: ReactCropperDefaultOptions = {scaleY, scaleX, enable, zoomTo, rotateTo};

    useEffect(() => {
        if (imageRef.current !== null && imageRef.current.src) {
            const cropper = new Cropper(imageRef.current, {
                dragMode,
                ...rest,
                ready: (e) => {
                    if (e.target !== null) {
                        const target = e.target as any;
                        __applyDefaultOptions(target.cropper, defaultOptions);
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
            if (imageRef.current !== null) {
                cropper?.destroy();
            }
        };
    }, [imageRef.current]);

    /**
     * re-render when src changes
     */
    useEffect(() => {
        if (typeof cropper !== 'undefined' && typeof src !== 'undefined') {
            cropper.reset().clear().replace(src);
            __applyDefaultOptions(cropper, defaultOptions);
        }
    }, [src]);

    return (
        <div style={style} className={className}>
            <img crossOrigin={crossOrigin} src={src} alt={alt} style={{opacity: 0, maxWidth: '100%'}} ref={imageRef} />
        </div>
    );
};

export {ReactCropper, ReactCropperProps, __applyDefaultOptions};
