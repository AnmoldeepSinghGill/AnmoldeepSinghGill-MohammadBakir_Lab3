//Load the 'index' controller
var index = require("../controllers/index.server.controller");

/*
 * Name: Anmoldeep Singh Gill, Mohammad bakir
 * Student Number: 301044883, 300987420
 */

//handle routing for get and post request
module.exports = function (app) {
  //handle a get request made to root path
  app.get("/", index.render); //go to http://localhost:5000/
};
