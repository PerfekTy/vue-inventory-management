const express = require("express");
const auth = require("./routes/authentication");

const app = express();
app.use(express.json());

app.use("/api", auth.router);
app.listen(8080);
