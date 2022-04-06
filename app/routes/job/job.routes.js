const controller = require("../../controllers/Job/job.controller");

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });
  app.post("/api/job/createJob", controller.createJob);
  app.get("/api/job/getJob", controller.findAll);
  app.get("/api/job/getJobByID", controller.findOne);
  app.delete("/api/job/deleteJob", controller.delete);
  app.patch("/api/job/updateJob", controller.update);
  app.get("/api/job/getJobChart", controller.getJobChart);
};
