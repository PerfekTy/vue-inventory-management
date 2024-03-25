const { Router } = require("express");
const { validateToken } = require("../controllers/jwt");
const { getCurrentUser } = require("../controllers/user");
const router = Router();

router.get("/current-user", validateToken, getCurrentUser);

module.exports = {
  users: router,
};
