'use strict'
/* eslint-disable no-console */

const PeerId = require('peer-id')
const PeerInfo = require('peer-info')
const Node = require('./libp2p-bundle.js')
const pull = require('pull-stream')
const Pushable = require('pull-pushable')

const SIZE = 8 * 1024 + 10

let data = ''
for (let ii = 0; ii < SIZE; ii++) {
  data += 'a'
}

PeerId.createFromJSON(require('../conf/peer-id-listener.json'), (err, idListener) => {
  if (err) {
    throw err
  }
  const peerListener = new PeerInfo(idListener)
  peerListener.multiaddrs.add('/ip4/0.0.0.0/tcp/10333')
  const nodeListener = new Node({
    peerInfo: peerListener
  })

  nodeListener.start((err) => {
    if (err) {
      throw err
    }

    nodeListener.on('peer:connect', (peerInfo) => {
      console.log(peerInfo.id.toB58String())
    })

    nodeListener.handle('/chat/1.0.0', (protocol, conn) => {
      const p = Pushable()
      pull(
        p,
        conn
      )

      setInterval(() => {
        // Send data to dialer
        p.push(data)
      }, 1000)
    })

    console.log('Listener ready, listening on:')
    peerListener.multiaddrs.forEach((ma) => {
      console.log(ma.toString() + '/ipfs/' + idListener.toB58String())
    })
  })
})
