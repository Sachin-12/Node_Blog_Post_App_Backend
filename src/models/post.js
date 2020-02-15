require("../config/config"); // This is only when testing mongodb from node.
const mongoose = require("mongoose");
const uuid = require("uuid/v4");

const { Schema, model } = mongoose;

const PostSchema = new Schema({
  id: {
    type: String,
    default: uuid()
  },
  title: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true
  },
  datetime: {
    type: Date,
    default: Date.now
  },
  author: {
    type: Schema.Types.ObjectId,
    ref: "Author",
    required: true
  }
});

PostSchema.virtual("createdAt").get(function() {
  return this.datetime;
});

const Post = model("Post", PostSchema);

// The below code is only for testing purpose
// const myTestPost = new Post({
//   title: "Nano Science",
//   content:
//     "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.",
//   author: "5e3b0b52e5f0e70ad215cfb3"
// });

// myTestPost
//   .save()
//   .then(response => {
//     console.log(response);
//   })
//   .catch(console.error);

module.exports = Post;
