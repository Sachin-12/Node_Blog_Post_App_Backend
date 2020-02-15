const express = require("express");
const bodyParser = require("body-parser");
const authorsRouter = require("./routers/authorsRouter");
const postsRouter = require("./routers/postsRouter");
const cors = require("cors");
const adminRouter = require("./routers/adminRouter");
const cookieParser = require("body-parser");
const app = express();

app.set("trust proxy", 1);
app.use(bodyParser.json());
app.use(cors());
app.use(cookieParser());
app.get("/", (req, res) => {
  res.status(200).send("Backend Node Blog server started");
});

app.use("/authors", authorsRouter);
app.use("/posts", postsRouter);
app.use("/admin", adminRouter);

const server = app.listen(8080, () => {
  console.log("Server running on port", server.address().port);
});
