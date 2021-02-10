const express = require("express");
const router = express.Router();
const controller = require("./controller");

router.get("/api/speed-test", controller.getInternetSpeed);

module.exports = router;