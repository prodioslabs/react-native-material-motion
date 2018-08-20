const path = require('path');
const blacklist = require('metro/src/blacklist'); // eslint-disable-line import/no-extraneous-dependencies
const glob = require('glob-to-regexp');

const pak = require('../package.json');

const dependencies = Object.keys(pak.dependencies);

module.exports = {
  getProjectRoots() {
    return [__dirname, path.resolve(__dirname, '..')];
  },
  getProvidesModuleNodeModules() {
    return [...dependencies];
  },
  getBlacklistRE() {
    return blacklist([glob(`${path.resolve(__dirname, '..')}/node_modules/*`)]);
  },
};
