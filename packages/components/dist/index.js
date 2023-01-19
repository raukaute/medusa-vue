
'use strict'

if (process.env.NODE_ENV === 'production') {
  module.exports = require('./components.cjs.production.min.js')
} else {
  module.exports = require('./components.cjs.development.js')
}
