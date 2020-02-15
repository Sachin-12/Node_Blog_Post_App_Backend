const express = require("express");
const Author = require("../models/author");
const Post = require("../models/post");

const authorsRouter = express.Router();

authorsRouter
  .get("/", (req, res) => {
    Author.find({})
      .exec()
      .then(data => {
        console.log(data);
        res.status(200).json({ authors: data });
      })
      .catch(err => {
        console.error(err);
        res.status(500).send("Internal Server Error");
      });
  })
  .get("/:authorname", (req, res) => {
    const { authorname = "" } = req.params;
    Post.find({ author: authorname })
      .populate("author", "_id firstName lastName")
      .exec()
      .then(data => {
        console.log(data);
        res.status(200).json({ author: data });
      })
      .catch(err => {
        console.error(err);
        res.status(500).send("Internal Server Error");
      });
  });

module.exports = authorsRouter;
