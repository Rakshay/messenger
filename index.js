'use strict';

require('babel-core/register')();
require('babel-polyfill');
require('./config');
require('./app').default;
