libp2p-streammuxer-bug
======================

This is an example repo to show a bug in the stream multiplexers. There order of them changes the behaviour.

    // Works as expected
    streamMuxer: [ mplex, spdy ]

    // Splits things on the receiving side into 8k chunks
    streamMuxer: [ spdy, mplex ]

This code is heavily based on [libp2p's chat example].

Installation
------------

    npm install

Usage
-----

You need to start it in 3 separate terminals. One for the listener, two for the dialers.

First start the listener on terminal 1:

    node src/listener.js

Once started, you should see a message like:

    Listener ready, listening on:
    /ip4/127.0.0.1/tcp/10333/ipfs/QmcrQZ6RJdpYuGvZqD5QEHAv6qX4BrQLJLQPQUrTrzdcgm/ipfs/QmcrQZ6RJdpYuGvZqD5QEHAv6qX4BrQLJLQPQUrTrzdcgm
    /ip4/192.168.0.2/tcp/10333/ipfs/QmcrQZ6RJdpYuGvZqD5QEHAv6qX4BrQLJLQPQUrTrzdcgm/ipfs/QmcrQZ6RJdpYuGvZqD5QEHAv6qX4BrQLJLQPQUrTrzdcgm

Now start a dialer on terminal 2:

    node src/dialer.js

It receives some data and prints the number of bytes received. In the working case it should print `8202`, in the broken case it prints `8192` and `10` as things are split into 8k chunks


License
-------

[MIT]


[libp2p's chat example]: https://github.com/libp2p/js-libp2p/tree/7baf9f47ac09c3d24d1141761e4f87e16b385522/examples/chat
[MIT]: LICENSE
