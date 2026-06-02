const express = require("express");
const router = express.Router();

const urlController = require("../controllers/url.controller");

router.post("/", urlController.createShortUrl);
router.get("/stats/:shortCode", urlController.getStats);
router.get("/:shortCode",urlController.redirectToOriginalUrl)

module.exports = router;
