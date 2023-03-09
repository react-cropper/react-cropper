import serve from 'rollup-plugin-serve';
import jsx from 'acorn-jsx';
//import typescript from 'rollup-plugin-typescript2';
import typescript from '@rollup/plugin-typescript';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
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
    acornInjectPlugins: [jsx()],
    plugins: [
        replace({'process.env.NODE_ENV': JSON.stringify('development'), preventAssignment: true}),
        postcss({
            extract: path.resolve('example/assets/bundle.css'),
        }),
        resolve({
            browser: true,
        }),
        commonjs({
            include: /node_modules/,
        }),
        babel({babelHelpers: 'bundled'}),
        typescript({tsconfig: 'tsconfig.dev.json'}),
        serve({
            open: true,
            verbose: true,
            contentBase: 'example',
            host: 'localhost',
            port: 3000,
        }),
    ],
};
