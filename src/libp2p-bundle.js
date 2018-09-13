'use strict'

const TCP = require('libp2p-tcp')
const spdy = require('libp2p-spdy')
const mplex = require('libp2p-mplex')
const defaultsDeep = require('@nodeutils/defaults-deep')
const libp2p = require('libp2p')

class Node extends libp2p {
  constructor (_options) {
    const defaults = {
      modules: {
        transport: [ TCP ],
        // Works as expected
        // streamMuxer: [ mplex, spdy ]
        // Splits into 8k chunks
        streamMuxer: [ spdy, mplex ]
      }
    }

    super(defaultsDeep(_options, defaults))
  }
}

module.exports = Node
