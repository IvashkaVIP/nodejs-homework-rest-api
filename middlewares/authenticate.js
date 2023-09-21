const HttpError = require("../helpers/HttpErrors");
const jwt = require("jsonwebtoken");
const { User } = require("../models/user");

const authenticate = async (req, res, next) => {
  const { SECRET_KEY } = process.env;
  const { authorization="" } = req.headers;
  const [bearer, token] = authorization.split(" ");
  if (bearer !== "Bearer") next(HttpError(401));

  try {
    const { id } = jwt.verify(token, SECRET_KEY);
    const user = await User.findById(id);
    if (!user) next(HttpError(401));
    next();
  } catch (err) {
    next(HttpError(401));
  }
};

module.exports = { authenticate };
