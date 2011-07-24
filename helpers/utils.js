function LocalUtils() {

   this.getCookie = function(name, request) {      
      return request.cookies[name];
   };

   this.throwError = function(error, res) {
      console.log("Thrown error", error);
      res.send("Error: " + (error.message || "no info"));
      res.end();
   };
}

exports = module.exports = new LocalUtils();