const withCss = require('@zeit/next-css')

// Deprecated
// if (typeof require !== 'undefined') {
//     require.extensions['.css'] = file => {}
// }

module.exports = withCss({})