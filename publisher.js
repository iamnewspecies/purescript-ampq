// const open = require('amqplib').connect('amqp://localhost');

var q = 'tasks';
var i = 0
var r = Math.random() * 1000

// Publisher
var q = 'tasks';

function bail(err) {
  console.error(err);
  process.exit(1);
}

// Publisher
function publisher(conn) {
  conn.createChannel(on_open);
  function on_open(err, ch) {
    if (err != null) bail(err);
    ch.assertQueue(q, {durable: true});
    setInterval(function() {
      i++;
      ch.sendToQueue(q, Buffer.from("server :: " + r + ', something to do :: ' + i), {persistent : 2});
    }, 10);
  }
}

require('amqplib/callback_api')
  .connect('amqp://localhost', function(err, conn) {
    if (err != null) bail(err);
    // consumer(conn);
    publisher(conn);
  });




// open.then(function(conn) {
//   return conn.createChannel();
// }).then(function(ch) {
//   return ch.assertQueue(q, {durable: true}).then(function(ok) {
//       console.log("it is here!");
//       console.log(ok);
//     setInterval(function() {
//       i++;
//       ch.sendToQueue(q, Buffer.from("server :: " + r + ', something to do :: ' + i));
//     }, 10);
//   });
// }).catch(console.warn);