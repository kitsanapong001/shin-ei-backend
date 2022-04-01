const controller = require("../controllers/gen_id.controller");

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  // app.post("/api/gen_id/createGenID", controller.createGenID);
  app.get("/api/gen_id/getGenID", controller.findAll);

  // app.get("/api/item/getItemByID", controller.findOne);
  // app.delete("/api/item/deleteItem", controller.delete);
  // app.patch("/api/item/updateItem", controller.update);
};
