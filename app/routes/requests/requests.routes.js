const controller = require("../../controllers/Requests/requests.controller");

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.post("/api/requests/createRequests", controller.createRequests);
  app.get("/api/requests/getRequests", controller.findAll);
  app.get("/api/requests/getByRequestID", controller.getByRequest);
  app.delete("/api/requests/deleteRequests", controller.delete);
  app.patch("/api/requests/updateRequests", controller.update);
  app.get("/api/requests/getRequests_job", controller.getRequests_job);
};
