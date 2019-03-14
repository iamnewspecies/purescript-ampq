const open = require('amqplib').connect('amqp://localhost');

var q = 'tasks';
var i = 0
var r = Math.random() * 1000

// Publisher
open.then(function(conn) {
  return conn.createChannel();
}).then(function(ch) {
  return ch.assertQueue(q).then(function(args) {
      setInterval(function() {
        i++;
        ch.sendToQueue(q, Buffer.from("server :: " + r + ', something to do :: ' + i));
      }, 1000);
  });
}).catch(console.warn);


