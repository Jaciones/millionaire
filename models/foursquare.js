var config = {
   "secrets": {
      "clientId": "A1NL3FU1D1QS2SH5YCXQX5D4Y1NMQUXRKV0HZOBBIADI4CBH",
      "clientSecret": "UEFWAG4WSEAY5S3QIN1AS3ULF30HAZZGEOEGHCG0N2Z0AMLS",
      "redirectUrl": "http://millionaire.jaciones.cloud9ide.com/callback"
   }
};

var	config2 = {// Localhost
	"secrets" : {
		"clientId" : "0TGWQIYUBES4JTALL5SDTF0AKFKBH0DB25QTSILZR2FYHQZ2",
		"clientSecret" : "GZ2DIL4XVMILJF1PTFIR0PJHAB3E1SOWSX04AVFQNCE1KPTQ",
		"redirectUrl": "http://localhost:3000/callback"
	}
};

Foursquare = require("node-foursquare")(config);