const controller = require("../../controllers/User/user.controller");
const { authJwt } = require("../../middlewares");
const { verifySignUp } = require("../../middlewares");
module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.post(
    "/api/user/createUser",
    [
      authJwt.verifyToken,
      verifySignUp.checkDuplicateUsernameOrEmail,
      //   verifySignUp.checkRolesExisted,
    ],
    controller.createUser
  );
  app.get("/api/user/getUser", [authJwt.verifyToken], controller.findAll);
  app.get("/api/user/getUserByID", [authJwt.verifyToken], controller.findOne);
  app.delete("/api/user/deleteUser", [authJwt.verifyToken], controller.delete);
  app.patch(
    "/api/user/updateUser",
    [authJwt.verifyToken, verifySignUp.checkDuplicateEmail],
    controller.update
  );
};
