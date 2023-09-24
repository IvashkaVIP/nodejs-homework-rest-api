const { authenticate } = require("../middlewares/authenticate");
const { isValidId } = require("../middlewares/isValidId");
const { validateBody } = require("../middlewares/validateBody");

module.exports = {
    authenticate,
    isValidId,
    validateBody,
}