class Responsedata{
    statuscode = 200;
    message;
    constructor(statuscode, message) {
      this.statuscode = statuscode;
      this.message = message;
    }
  }

module.exports={Responsedata}