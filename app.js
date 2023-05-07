const express = require("express");
const logger = require("morgan");
const cors = require("cors");

const swaggerUi = require("swagger-ui-express");
const YAML = require("yamljs");
const path = require("path");

require("dotenv").config();

const authRouter = require("./routes/api/auth");
const cardsRouter = require("./routes/api/cards");

const app = express();

const formatsLogger = app.get("env") === "development" ? "dev" : "short";
const swaggerDocument = YAML.load(path.join(__dirname, "swagger.yaml"));

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());

app.use("/api/auth", authRouter);
app.use("/api/cards", cardsRouter);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use((req, res) => {
  res.status(404).json({ message: "Not found" });
});

app.use((err, req, res, next) => {
  const { status = 500, message = "Server error" } = err;
  res.status(status).json({ message });
});

module.exports = app;
