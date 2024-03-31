const express = require("express");
const app = express();
const cors = require("cors");
const cookieParser = require("cookie-parser");
require("dotenv").config();
app.use(express.json());
app.use(
  cors({
    origin: ["http://localhost:5173"],
    credentials: true,
  })
);
//app.use(cors());
app.use(cookieParser());
// connecting database
const connectDb = require("./config/database.js");
connectDb();

//mounting
const router = require("./routes/user.js");
app.use("/auth", router);

app.listen(process.env.PORT, () => {
  console.log("Backend listening on port " + process.env.PORT);
});
