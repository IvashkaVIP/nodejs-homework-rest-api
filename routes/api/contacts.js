const express = require("express");
const router = express.Router();
const ctrl = require("../../controllers/contacts");
const { validateBody } = require("../../middlewares/validateBody");
const schemas = require("../../schemas/contacts");

router.get("/", ctrl.listContacts);
router.post("/", validateBody(schemas.addSchema), ctrl.addContact);
// router.get("/:id", ctrl.getContactById);

// router.delete("/:id", ctrl.removeContact);
// router.put("/:id", validateBody(schemas.addSchema), ctrl.updateContact);

module.exports = router;
