const express = require("express");
const router = express.Router();
const ctrl = require("../../controllers/contacts");
const { validateBody } = require("../../middlewares/validateBody");
const shemas = require("../../shemas/contacts");

router.get("/", ctrl.listContacts);
router.get("/:id", ctrl.getContactById);
router.post("/", validateBody(shemas.addShema), ctrl.addContact);
router.delete("/:id", ctrl.removeContact);
router.put("/:id", validateBody(shemas.addShema), ctrl.updateContact);

module.exports = router;
