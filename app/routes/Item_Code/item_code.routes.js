const controller = require("../../controllers/Item_Code/item_code.controller");
const { authJwt } = require("../../middlewares");
module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.post(
    "/api/item/createItem",
    [authJwt.verifyToken],
    controller.createItem
  );
  app.get("/api/item/getItem", [authJwt.verifyToken], controller.findAll);
  app.get("/api/item/getItemByID", [authJwt.verifyToken], controller.findOne);
  app.delete("/api/item/deleteItem", [authJwt.verifyToken], controller.delete);
  app.patch("/api/item/updateItem", [authJwt.verifyToken], controller.update);
};
