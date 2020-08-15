import React from 'react';
import {create} from 'react-test-renderer';
import {render, waitFor} from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import {ReactCropper as Cropper, __applyDefaultOptions} from '../src/react-cropper';

const image = 'http://fengyuanchen.github.io/cropper/images/picture.jpg';

describe('Cropper Render Tests', () => {
    test('Cropper snapshot', () => {
        const component = create(<Cropper src={image} />).toJSON();
        expect(component).toMatchSnapshot();
    });

    test('renders cropper and calls onInitialized', async () => {
        const onInitialized = jest.fn();
        render(<Cropper src={image} onInitialized={onInitialized} />);
        await waitFor(() => expect(onInitialized).toHaveBeenCalledTimes(1));
    });
});

describe('Test Cropper Methods', () => {
    const enable = jest.fn();
    const scaleX = jest.fn();
    const scaleY = jest.fn();
    const rotateTo = jest.fn();
    const zoomTo = jest.fn();
    const disable = jest.fn();

    let cropper;
    beforeAll(() => {
        cropper = {enable, disable, scaleX, scaleY, rotateTo, zoomTo};
    });

    test('Test applyDefaultOptions with default params', () => {
        __applyDefaultOptions(cropper);
        expect(enable).toHaveBeenCalledTimes(1);
        expect(disable).toHaveBeenCalledTimes(0);

        expect(scaleX).toHaveBeenCalledWith(1);
        expect(scaleY).toHaveBeenCalledWith(1);
        expect(scaleX).toHaveBeenCalledTimes(1);
        expect(scaleY).toHaveBeenCalledTimes(1);

        expect(rotateTo).toHaveBeenCalledWith(0);
        expect(zoomTo).toHaveBeenCalledWith(1);
        expect(rotateTo).toHaveBeenCalledTimes(1);
        expect(zoomTo).toHaveBeenCalledTimes(1);
    });

    test('Test applyDefaultOptions with custom params', () => {
        __applyDefaultOptions(cropper, {enable: false});
        expect(enable).toHaveBeenCalledTimes(0);
        expect(disable).toHaveBeenCalledTimes(1);
    });
});
