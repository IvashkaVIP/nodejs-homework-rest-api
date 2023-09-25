const { authenticate } = require("../middlewares/authenticate");
const { isValidId } = require("../middlewares/isValidId");
const { validateBody } = require("../middlewares/validateBody");
const { upLoad } = require('../middlewares/upload')

module.exports = {
    authenticate,
    isValidId,
    validateBody,
    upLoad
}