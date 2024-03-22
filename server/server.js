const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const auth = require("./routes/authentication");

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(cors({ origin: "http://localhost:3000" }));

app.use("/api", auth.router);

app.listen(8080);
