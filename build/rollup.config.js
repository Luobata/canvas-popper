import rollup from 'rollup';
import babel from 'rollup-plugin-babel';
import uglify from 'rollup-plugin-uglify';
import alias from 'rollup-plugin-alias';
import commonjs from 'rollup-plugin-commonjs';
import resolve from 'rollup-plugin-node-resolve';
import path from 'path';
import flow from 'rollup-plugin-flow';
import livereload from 'rollup-plugin-livereload';
import typescript from 'rollup-plugin-typescript2';

const root = path.resolve(__dirname, './');
const port = 10002;

module.exports = {
    input: 'src/canvas.ts',
    name: 'projectName',
    sourcemap: true,
    output: {
        file: 'dist/bundle.js',
        format: 'umd',
    },
    plugins: [
        // uglify(),
        resolve(),
        typescript(),
        commonjs(),
        babel({
            exclude: 'node_modules/**',
            presets: [['env', { modules: false }]],
        }),
        alias({
            ASSETS: path.resolve(__dirname, '../asserts'),
            LIB: path.resolve(__dirname, '../src/canvas/lib'),
        }),
    ],
};
