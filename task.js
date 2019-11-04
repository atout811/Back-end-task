const express = require("express");
const app = express();
const router = require("./courses");
const mongoose = require("mongoose");

app.use("/api/courses", router);
app.use(express.json());

app.listen(3000);
