import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import dts from 'rollup-plugin-dts';
import typescript from '@rollup/plugin-typescript';
import terser from '@rollup/plugin-terser';
import del from 'rollup-plugin-delete';
import bundleSize from 'rollup-plugin-bundle-size';

import pkg from './package.json' assert {type: 'json'};

export default [
    {
        input: `src/index.ts`,
        output: [
            {file: `${pkg.main}`, format: 'cjs'},
            {file: `${pkg.module}`, format: 'es'},
        ],
        external: [...Object.keys(pkg.dependencies || {}), ...Object.keys(pkg.peerDependencies || {})],
        watch: {
            include: 'src/**',
        },
        plugins: [resolve(), typescript(), commonjs(), terser(), bundleSize()],
    },
    {
        input: './dist/types/index.d.ts',
        output: [{file: 'dist/index.d.ts', format: 'es'}],
        plugins: [dts(), del({hook: 'buildEnd', targets: './dist/types'})],
    },
];
