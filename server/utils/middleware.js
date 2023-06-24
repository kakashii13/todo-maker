const jwt = require("jsonwebtoken");

const tokenExtractor = (req) => {
  const auth = req.get("Authorization");
  if (auth && auth.toLowerCase().startsWith("bearer ")) {
    return auth.substring(7);
  }
  return null;
};

const auth = (req, res, next) => {
  // send token data through function to extract token
  const token = tokenExtractor(req);

  const decodedToken = jwt.decode(token);

  // validate if exist token or if is correct
  if (!token || !decodedToken) {
    return res.status(401).json({ error: "Missing or invalid token" });
  }
  req.token = decodedToken;
  next();
};

const unknownError = (req, res, next) => {
  res.status(404).send({ error: "Unknown endpoint" });
  next();
};

const handleErrors = (error, req, res, next) => {
  // console.log(error);
  if (error.name === "ValidationError") {
    return res.status(400).send({
      error: error.message,
    });
  }
  next(error);
};

module.exports = {
  unknownError,
  auth,
  tokenExtractor,
  handleErrors,
};
