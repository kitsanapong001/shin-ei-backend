const controller = require("../../controllers/Item_Code/item_code.controller");

module.exports = function(app) {
    app.use(function(req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });

    app.post("/api/item/createItem", controller.createItem);
    app.get("/api/item/getItem", controller.findAll);
    app.get("/api/item/getItemByID", controller.findOne);
    app.delete("/api/item/deleteItem", controller.delete);
    app.patch("/api/item/updateItem", controller.update);
}