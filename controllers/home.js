/*var connect = require('connect');   
var url= require('url')
var MemoryStore = require('connect/middleware/session/memory');
var OAuth= require('oauth').OAuth;
var oa= new OAuth("http://localhost:3000/oauth/request_token",
                 "http://localhost:3000/oauth/access_token", 
                 "JiYmll7CX3AXDgasnnIDeg",  "mWPBRK5kG2Tkthuf5zRV1jYWOEwnjI6xs3QVRqOOg", 
                 "1.0A", "http://localhost:4000/oauth/callback", "HMAC-SHA1");       

*/

app.get('/', function(req, res){
  res.render('index', {
    title: 'Express',
    bar: 'Bar'
  });
});

app.get('/callback', function(req, res){
  res.render('index', {
    title: 'Express',
    bar: 'Bar'
  });
});
