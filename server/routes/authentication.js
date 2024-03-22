const { Router } = require("express");
const { signUp } = require("../controllers/auth-controller");
const router = Router();

router.post("/sign-up", signUp);

module.exports = {
  router,
};
