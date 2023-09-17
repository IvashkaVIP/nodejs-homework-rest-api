const express = require("express");
const router = express.Router();
const ctrl = require("../../controllers/contacts");
const { validateBody } = require("../../middlewares/validateBody");
const { isValidId } = require("../../middlewares/isValidId");
const schemas = require("../../models/contact");

router.get("/", ctrl.listContacts);
router.post("/", validateBody(schemas.addSchema), ctrl.addContact);
router.get("/:id", isValidId, ctrl.getContactById);
router.put(
  "/:id",
  isValidId,
  validateBody(schemas.addSchema),
  ctrl.updateContact
);
router.patch(
  "/:id/favorite",
  isValidId,
  validateBody(schemas.updateFavoriteSchema),
  ctrl.updateFavorite
);

router.delete("/:id", isValidId, ctrl.removeContact);

module.exports = router;
