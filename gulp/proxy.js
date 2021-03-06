 /*jshint unused:false */

/***************

  This file allow to configure a proxy system plugged into BrowserSync
  in order to redirect backend requests while still serving and watching
  files from the web project

  IMPORTANT: The proxy is disabled by default.

  If you want to enable it, watch at the configuration options and finally
  change the `module.exports` at the end of the file

***************/

'use strict';

var httpProxy = require('http-proxy');
var chalk = require('chalk');
var elasticsearch = require('elasticsearch');


/*
 * Location of your backend server
 */
var proxyTarget = 'http://server/context/';

var proxy = httpProxy.createProxyServer({
  target: proxyTarget
});

var proxyElastic = httpProxy.createProxyServer({
  target: 'http://localhost:9200'
});

proxy.on('error', function(error, req, res) {
  res.writeHead(500, {
    'Content-Type': 'text/plain'
  });

  console.error(chalk.red('[Proxy]'), error);
});






  // this.


function sendImage(req, res, next) {
  
    var client = elasticsearch.Client({
        host: 'localhost:9200'
    });
    var query = req._parsedUrl.query;
    console.log(req._parsedUrl.query);

    client.search({
        index: 'pictures', 
        q: 'checksum:' + query
    }, function(error, response) {
        if (response.hits.hits.length !== 0) {

            var b = new Buffer(response.hits.hits[0]._source.content, 'base64');
            res.writeHead(200, { 'Content-Type': 'image/jpeg'});
            res.write(b);
            res.end();
        } else {

            res.write("none");
            res.end();
        }
    });




}


  //       //bad but need to investigate ;)

  //       // $scope.loadImg = (recipe) => {
  //       //     this.client.search({
  //       //         index: 'pictures',
  //       //         q: 'checksum:' + recipe._source.checksum
  //       //     }, (error, response) => {
  //       //         if (response.hits.length !== 0) {
  //       //             $scope.$apply(() => {
  //       //                 console.log(response.hits[0]);
  //       //                 recipe.img = response.hits.hits[0]._source.content;
  //       //             });
  //       //         }
  //       //         //recipe.base64Img = 






/*
 * The proxy middleware is an Express middleware added to BrowserSync to
 * handle backend request and proxy them to your backend.
 */
function proxyMiddleware(req, res, next) {
  /*
   * This test is the switch of each request to determine if the request is
   * for a static file to be handled by BrowserSync or a backend request to proxy.
   *
   * The existing test is a standard check on the files extensions but it may fail
   * for your needs. If you can, you could also check on a context in the url which
   * may be more reliable but can't be generic.
   */
  // if (/\.(html|css|js|png|jpg|jpeg|gif|ico|xml|rss|txt|eot|svg|ttf|woff|cur)(\?((r|v|rel|rev)=[\-\.\w]*)?)?$/.test(req.url)) {
  //   console.log('static');
  //   next();
  // } else {

  //   if (/recipes/.test(req.url)) {
  //     console.log('elastic');
  //     proxyElastic.web(req, res);
  //   } else {
  //     console.log('web');
  //     proxy.web(req, res);  
  //   }

    
  // }


 if(/pictures/.test(req.url)) {
    return sendImage(req, res, next);
 }

  if (/recipes/.test(req.url)) {
       proxyElastic.web(req, res);
  } else {
      next();  
  }
  
}

/*
 * This is where you activate or not your proxy.
 *
 * The first line activate if and the second one ignored it
 */

module.exports = [proxyMiddleware];
//module.exports = [];
