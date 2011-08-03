function LocalUtils() {
    this.getCookie = function(name, request) {
        return request.cookies[name];
    };
    this.throwError = function(error, res) {
        console.log("Thrown error", error);
        if (res) {
            res.send("Error: " + (error.message || "no info"));
            res.end();
        }
        else {
            throw error;
        }
    };
    
    this.isMobile = function(req) {
        var ua = req.headers['user-agent'];
        
        if (/mobile/i.test(ua)) 
            return true;

        if (/iPhone/.test(ua) ||  /iPad/.test(ua))
            return true;

        if (/Android/.test(ua))
            return true;
    };
}
exports = module.exports = new LocalUtils();