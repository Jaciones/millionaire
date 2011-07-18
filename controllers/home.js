require 'http'

app.get('/', function(req, res){
  res.render('index', {
    title: 'Express',
    bar: 'Bar'
  });
});

app.get('/connect', function(req, res){

});
