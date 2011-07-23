function LocalUtils() {

   this.getCookie = function(name, request) {      
      return request.cookies[name];
   };

   this.setCookie = function(name, val, response) {
      response.writeHead(200, {
         'Set-Cookie': name + '=' + val,
         'Content-Type': 'text/plain'
      });
   };

   this.throwError = function(error, res) {
      console.log("Thrown error", error);
      res.send("Error: " + (error.message || "no info"));
      res.end();
   };
}

exports = module.exports = new LocalUtils();