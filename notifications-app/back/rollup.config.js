import babel from 'rollup-plugin-babel';
import babelrc from 'babelrc-rollup';
import commonjs from 'rollup-plugin-commonjs';
import graphql from 'rollup-plugin-graphql';
import pkg from './package.json';

const plugins = [
  babel(babelrc()),
  commonjs(),
  graphql(),
];

export default {
  input: 'src/index.js',
  plugins: plugins,
  output: [
    {
      file: pkg.main,
      format: 'umd',
      name: 'graphql-backend',
      sourcemap: false,
    },
  ]
};