
var http = require('http')
var createHandler = require('node-github-webhook')
var handler = createHandler([ // multiple handlers
  { path: '/nodeblog', secret: '123456' },
  { path: '/koablogdemo', secret: '123456' },
  { path: '/sanjiadian', secret: '123456' },
  { path: '/NodeChat', secret: '123456' },
])
// var handler = createHandler({ path: '/webhook1', secret: 'secret1' }) // single handler

function RunCmd(cmd, args, cb) {
  var spawn = require('child_process').spawn;
  var child = spawn(cmd, args);
  var result = '';
  child.stdout.on('data', function(data) {
    result += data.toString();
  });
  child.stdout.on('end', function() {
    cb(result)
  });
}

http.createServer(function (req, res) {
  handler(req, res, function (err) {
    res.statusCode = 404
    res.end('no such location')
  })
}).listen(3333)

handler.on('error', function (err) {
  console.error('Error:', err.message)
})

handler.on('push', function (event) {
  console.log('Received a push event for %s to %s',
    event.payload.repository.name,
    event.payload.ref);
  var shpath = './' + event.payload.repository.name + '.sh';
  RunCmd('sh', [shpath], function(result) {
      console.log(result);
  })

  switch(event.path) {
    case '/webhook1':
      // do sth about webhook1
      break
    case '/webhook2':
      // do sth about webhook2
      break
    default:
      // do sth else or nothing
      break
  }
})