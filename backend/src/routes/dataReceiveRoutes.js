const express = require("express");
const dataReceiverController = require("../controllers/dataReceiverController");
const encoder = require("../middleware/encode");
const router = express.Router();

router.post("/", encoder, dataReceiverController.receiveData);

router.get("/getData", dataReceiverController.getData);

module.exports = router;
