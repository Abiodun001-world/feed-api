const express = require("express");
 // const AuthRoute = require("./routes/auth.routes");
 // const PostRoute = require("./routes/post.routes");

const PORT = 4001;

const app = express();

app.get("/", (req, res) => {
  res.json({ message: "Welcome to Feed API" });
});

app.listen(PORT, () => {
  console.log(`App is running on port ${PORT}`);
});
