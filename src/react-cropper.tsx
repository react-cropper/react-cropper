import React, {useEffect, useRef, useLayoutEffect} from 'react';
import Cropper from 'cropperjs';

type ReactCropperRef =
    | ((instance: HTMLImageElement | null) => void)
    | React.MutableRefObject<HTMLImageElement | null>
    | null;

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
    zoomTo > 0 && cropper.zoomTo(zoomTo);
};

/**
 * sourced from: https://itnext.io/reusing-the-ref-from-forwardref-with-react-hooks-4ce9df693dd
 */
const useCombinedRefs = (...refs: ReactCropperRef[]): React.RefObject<HTMLImageElement> => {
    const targetRef = useRef<HTMLImageElement>(null);

    useLayoutEffect(() => {
        refs.forEach((ref) => {
            if (!ref) return;

            if (typeof ref === 'function') {
                ref(targetRef.current);
            } else {
                ref.current = targetRef.current;
            }
        });
    }, [refs]);

    return targetRef;
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
    const defaultOptions: ReactCropperDefaultOptions = {scaleY, scaleX, enable, zoomTo, rotateTo};
    const innerRef = useRef<HTMLImageElement>(null);
    const combinedRef = useCombinedRefs(ref, innerRef);
    useEffect(() => {
        if (combinedRef.current !== null) {
            const cropper = new Cropper(combinedRef.current, {
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
        }

        /**
         * destroy cropper on un-mount
         */
        return () => {
            const current = combinedRef.current as any;
            current.cropper?.destroy();
        };
    }, [combinedRef]);

    /**
     * re-render when src changes
     */
    useEffect(() => {
        const current = combinedRef.current as any;
        if (typeof current.cropper !== 'undefined' && typeof src !== 'undefined') {
            current.cropper.reset().clear().replace(src);
        }
    }, [src]);

    return (
        <div style={style} className={className}>
            <img
                crossOrigin={crossOrigin}
                src={src}
                alt={alt}
                style={{opacity: 0, maxWidth: '100%'}}
                ref={combinedRef}
            />
        </div>
    );
});

export {ReactCropper, ReactCropperProps, applyDefaultOptions};
