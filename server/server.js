const express = require("express");
const cookieParser = require("cookie-parser");
const auth = require("./routes/authentication");

const app = express();
app.use(express.json());
app.use(cookieParser());

app.use("/api", auth.router);

app.listen(8080);
