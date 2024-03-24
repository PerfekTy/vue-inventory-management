const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const { auth } = require("./routes/authentication");
const { users } = require("./routes/users");

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(cors({ origin: "http://localhost:3000" }));

app.use("/api", auth);
app.use("/api", users);

app.listen(8080);
