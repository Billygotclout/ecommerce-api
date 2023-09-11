const jwt = require("jsonwebtoken");

const validateToken = async (req, res, next) => {
  let token;
  let authHeaders = req.headers.Authorization || req.headers.authorization;
  if (authHeaders && authHeaders.startsWith("Bearer")) {
    token = authHeaders.split(" ")[1];
    jwt.verify(token, process.env.TOKEN_SECRET, (err, decoded) => {
      if (err) {
        res.status(401);
        res.json({ message: "User is not authorized " });
      }
      req.user = decoded.user;
      next();
    });
    if (!token) {
      res.status(401);
      res.json({ message: "User is not authorized " });
    }
  }
};

module.exports = validateToken;
