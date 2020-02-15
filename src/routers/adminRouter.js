const express = require("express");
const Admin = require("../models/admin");
const adminRouter = express.Router();
const { compareHash } = require("../utils/hash");
const {
  adminTokenGenerator,
  adminTokenValidator
} = require("../utils/adminTokenManager");

adminRouter.post("/login", (req, res) => {
  const { email, password } = req.body;
  console.log(req.body);
  Admin.findOne({ email })
    .exec()
    .then(admin => {
      if (admin) {
        compareHash(password, admin.passwordHash)
          .then(result => {
            if (result) {
              const jwtToken = adminTokenGenerator({ email });
              res.cookie("jwt", jwtToken, { httpOnly: true });
              res.status(200).send({ status: "Success", jwtToken });
            } else {
              res.status(400).send("Invalid Request");
            }
          })
          .catch(error => {
            console.error(error);
            res.status(500).send("Internal Server Error");
          });
      } else {
        res.status(400).send("Invalid Request");
      }
    })
    .catch(err => {
      console.error(err);
      res.status(500).send("Internal Server Error");
    });
});

adminRouter.get("/isLoggedIn", (req, res) => {
  // const { jwt = "" } = req.cookies;// use this when using cookies
  const jwt = res.header("Authorization");
  if (adminTokenValidator(jwt)) {
    res.status(200).send({ message: "logged in" });
  } else {
    res.status(401).send("Unauthorized");
  }
});

module.exports = adminRouter;
