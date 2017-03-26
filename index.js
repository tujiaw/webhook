var http = require('http')
var createHandler = require('github-webhook-handler')
var handler = createHandler({ path: '/nodeblog', secret: '123456' })

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

/* 单应用
http.createServer(function (req, res) {
  handler(req, res, function (err) {
    res.statusCode = 404;
    res.end('no such location');
  })
}).listen(3333)

handler.on('error', function (err) {
  console.error('Error:', err.message);
})

handler.on('push', function (event) {
  console.log('Received a push event for %s to %s',
    event.payload.repository.name,
    event.payload.ref);
  var shpath = './' + event.payload.repository.name + '.sh';
  RunCmd('sh', [shpath], function(result) {
      console.log(result);
  })
})

handler.on('issues', function (event) {
  console.log('Received an issue event for %s action=%s: #%d %s',
    event.payload.repository.name,
    event.payload.action,
    event.payload.issue.number,
    event.payload.issue.title);
})
*/

/////多应用/////////////////////////////////////
function generaterHandler(handlerOpts) {
  var handlers = handlerOpts.reduce(function(hs, opts) {
    hs[opts.path] = createHandler(opts)
    return hs
  }, {})

  return http.createServer(function(req, res) {
    var handler = handlers[req.url]
    handler(req, res, function(err) {
      res.statusCode = 404
      res.end('no such location')
    })
  }).listen(3333)
}

var http = require('http')
var createHandler = require('github-webhook-handler')
var handlerOpts = [{
  path: '/nodeblog',
  secret: '123456'
}, {
  path: '/koablogdemo',
  secret: '123456'
}]
var handler = generaterHandler(handlerOpts)

handler.on('error', function(err) {
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
 )
