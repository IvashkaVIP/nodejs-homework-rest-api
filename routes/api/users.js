const express = require("express");
const router = express.Router();
const { validateBody } = require("../../middlewares/validateBody");
const { schemas } = require("../../models/user");

router.post("/register", validateBody(schemas.registerSchema));

module.exports = router;