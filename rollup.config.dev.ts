import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import typescript from 'rollup-plugin-typescript2';
import postcss from 'rollup-plugin-postcss';
import replace from '@rollup/plugin-replace';
import babel from '@rollup/plugin-babel';
import path from 'path';

export default {
    input: `example/src/index.tsx`,
    output: {
        file: 'example/assets/bundle.js',
        format: 'iife',
        sourcemap: true,
        globals: {
            react: 'React',
            cropperjs: 'cropperjs',
            'react-dom': 'ReactDOM',
        },
    },
    watch: {
        include: ['src/**', 'example/**'],
        exclude: ['example/assets/**'],
    },
    plugins: [
        resolve({
            browser: true,
        }),
        commonjs({
            include: /node_modules/,
        }),
        babel(),
        typescript({
            useTsconfigDeclarationDir: true,
        }),
        postcss({
            extract: path.resolve('example/assets/bundle.css'),
        }),
        replace({'process.env.NODE_ENV': JSON.stringify('development')}),
    ],
};
