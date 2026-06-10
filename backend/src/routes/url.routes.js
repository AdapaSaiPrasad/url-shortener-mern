import express from "express";
import * as urlController from "../controllers/url.controller.js";
import authMiddleware from "../middlewares/authMiddleware.js"
 
const router = express.Router();
router.post(
  "/",
  authMiddleware,
  urlController.createShortUrl
);
router.get(
    "/myurls",
    authMiddleware,
    urlController.getUserUrls
)
router.get("/stats/:shortCode", urlController.getStats);
router.delete(
  "/:id",
  authMiddleware,
  urlController.deleteUrl
);
router.get("/:shortCode",urlController.redirectToOriginalUrl)

export default router;
