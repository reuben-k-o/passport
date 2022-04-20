const express = require("express");
const authRoutes = require("./routes/auth");

const app = express();

app.set("view engine", "ejs");

app.use(authRoutes);

app.listen(4000);
