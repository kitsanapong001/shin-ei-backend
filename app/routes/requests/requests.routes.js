const controller = require("../../controllers/Requests/requests.controller");
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
    "/api/requests/createRequests",
    [authJwt.verifyToken],
    controller.createRequests
  );
  app.get(
    "/api/requests/getRequests",
    [authJwt.verifyToken],
    controller.findAll
  );
  app.get(
    "/api/requests/getByRequestID",
    [authJwt.verifyToken],
    controller.getByRequest
  );
  app.delete(
    "/api/requests/deleteRequests",
    [authJwt.verifyToken],
    controller.delete
  );
  app.patch(
    "/api/requests/updateRequests",
    [authJwt.verifyToken],
    controller.update
  );
  app.get(
    "/api/requests/getRequests_job",
    [authJwt.verifyToken],
    controller.getRequests_job
  );
};
