const jwt = require('jsonwebtoken')

const isAuthenticated = (req, res, next) => {
  let token;
  const authorization = req.headers.authorization;
  console.log(authorization);
  const secret = process.env.JWT_SECRET;

  if (authorization && authorization.startsWith("Bearer")) {
    token = authorization.split(" ")[1];
    jwt.verify(token, secret, (err, decoded) => {
      if (err) {
        res.status(401).send("Invalid Token");
      } else {
        console.log(decoded)
        req.user = decoded;
        console.log(`req.user = ${req.user.id}`)
        next();
      }
    });
  } else {
    res.status(401).send("No Token");
  }
};

module.exports = isAuthenticated