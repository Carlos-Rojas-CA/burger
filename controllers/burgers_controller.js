var express = require("express");
var router = express.Router();
var burger = require("../models/burger.js");

// Create the get route to call all burgers from DB.
router.get("/", function(req, res) {
  burger.all(function(data) {
    var hbsObject = {
      burgers: data
    };
    console.log(hbsObject);
    res.render("index", hbsObject);
  });
});

//Creates new burgers for to insert into the DB.
router.post("/", function(req, res) {
  burger.create([
    "burger_name", "devoured"
  ], [
    req.body.burger_name, req.body.devoured
  ], function() {
    res.redirect("/");
  });
});

//Updates burger in the DB.
router.post("/:id", function(req, res) {
  var condition = "id = " + req.params.id;
console.log(req.body.devoured)
  console.log("condition", condition);

  burger.update({
    devoured: req.body.devoured
  }, condition, function() {
    res.redirect("/");
  });
});

//not used
// router.delete("/:id", function(req, res) {
//   var condition = "id = " + req.params.id;

//   burger.delete(condition, function() {
//     res.redirect("/");
//   });
// });

// Export routes for server.js to use.
module.exports = router;