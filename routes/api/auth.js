const express = require("express");
const { validateBody, authenticate, upLoad } = require("../../middlewares/");
const { schemas } = require("../../models/user");
const ctrl = require("../../controllers/auth");
const router = express.Router();

router.post("/register", validateBody(schemas.registerSchema), ctrl.register);
router.get("/verify/:verificationToken",ctrl.verifyEmail);
router.post("/login", validateBody(schemas.loginSchema), ctrl.login);
router.get("/current", authenticate, ctrl.current);
router.post("/logout", authenticate, ctrl.logout);
router.patch(
  "/subscription",
  authenticate,
  validateBody(schemas.subscriptionSchema),
  ctrl.subscription
);
router.patch("/avatars", authenticate, upLoad.single("avatar"), ctrl.updateAvatar);

module.exports = router;
