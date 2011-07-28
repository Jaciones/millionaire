function LocalUtils() {

   this.getCookie = function(name, request) {      
      return request.cookies[name];
   };

   this.throwError = function(error, res) {
      console.log("Thrown error", error);
      if (res) {
         res.send("Error: " + (error.message || "no info"));
         res.end();
      }else {
         throw error;
      }
      
   };
}

exports = module.exports = new LocalUtils();