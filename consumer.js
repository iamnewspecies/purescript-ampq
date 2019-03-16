const open = require('amqplib').connect('amqp://localhost');

var q = 'tasks';

// Consumer

//need to figure out how to throttle consumer.

open.then(function(conn) {
    return conn.createChannel();
  }).then(function(ch) {
    return ch.assertQueue(q, {durable: true}).then(function(ok) {
      return ch.consume(q, function(msg) {
        if (msg !== null) {
          console.log(msg.content.toString());
          ch.ack(msg);
        }
      });
    });
  }).catch(console.warn);
  