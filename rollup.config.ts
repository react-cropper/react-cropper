import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import typescript from 'rollup-plugin-typescript2';

import pkg from './package.json';

export default {
    input: `src/index.ts`,
    output: [
        {file: `${pkg.main}`, format: 'cjs'},
        {file: `${pkg.module}`, format: 'es'},
    ],
    external: [...Object.keys(pkg.dependencies || {}), ...Object.keys(pkg.peerDependencies || {})],
    watch: {
        include: 'src/**',
    },
    plugins: [
        resolve(),
        typescript({
            useTsconfigDeclarationDir: true,
        }),
        commonjs(),
    ],
};
