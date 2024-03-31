const express = require("express");
const app = express();
const cookie = require("cookie-parser");
require("dotenv").config();
app.use(cookie());
app.use(express.json());

const PORT = process.env.PORT;

//connect db
const connectDb = require("./config/database");
connectDb();

//mounting
const user = require("./routes/User");
app.use("/api/v1", user);

app.listen(PORT, () => {
  console.log("Backend listening on port " + PORT);
});

app.get("/", (req, res) => {
  res.send(`<h1>Authentication</h1>`);
});
