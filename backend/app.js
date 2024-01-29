const express = require("express");
const app = express();
const cors = require("cors");
const router = require("./src/routes/dataReceiveRoutes");
const bodyParser = require("body-parser");
const initializeScript = require("./src/scripts/imageScrapper");
const cron = require("node-cron");

const PORT = 3000;

app.use(express.json());
app.use(cors());
app.use(bodyParser.json());

initializeScript();

cron.schedule("0 */2 * * *", function () {
  initializeScript();
});

app.use("/", router);

app.listen(PORT, () => {
  console.log("working");
});
