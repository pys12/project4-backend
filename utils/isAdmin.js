const User = require("../models/user");

const isAdmin = async (req, res, next) => {
    const user = await User.findById(req.user.id)
    if (user && user.isAdmin) {
        console.log(`user.isAdmin = ${user.isAdmin}`)
        next();
  } else {
    res.status(401).send("User is not admin");
  }
};

module.exports = isAdmin;
