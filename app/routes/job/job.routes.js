const controller = require("../../controllers/Job/job.controller");
const { authJwt } = require("../../middlewares");
module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });
  app.post("/api/job/createJob", [authJwt.verifyToken], controller.createJob);
  app.get("/api/job/getJob", [authJwt.verifyToken], controller.findAll);
  app.get("/api/job/getJobByID", [authJwt.verifyToken], controller.findOne);
  app.delete("/api/job/deleteJob", [authJwt.verifyToken], controller.delete);
  app.patch("/api/job/updateJob", [authJwt.verifyToken], controller.update);
  app.get("/api/job/getJobChart", controller.getJobChart);
  app.get(
    "/api/job/getJobInYear",
    [authJwt.verifyToken],
    controller.findAllInYear
  );
};
