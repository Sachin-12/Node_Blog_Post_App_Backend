require("../config/config");

const mongoose = require("mongoose");
const uuid = require("uuid/v4");
const { Schema, model } = mongoose;
const AuthorSchema = new Schema({
  id: {
    type: String,
    default: uuid()
  },
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  age: {
    type: Number,
    required: true
  }
});
AuthorSchema.virtual("fullname").get(function() {
  return this.firstName + " " + this.lastName;
});

const Author = model("Author", AuthorSchema);

// const testAuthor = new Author({
//   firstName: "Gokul",
//   lastName: "Kannan",
//   age: 29
// });

// testAuthor
//   .save()
//   .then(response => {
//     console.log(response);
//   })
//   .catch(err => {
//     console.error(err);
//   });

module.exports = Author;
