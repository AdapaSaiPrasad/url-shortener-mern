const { createShortUrlSchema } = require('../validators/url.validations');
const urlService = require("../services/url.service");

// Merged and formatted createShortUrl controller
const createShortUrl = async (req, res) => {
  try {
    // Validates request body using your Zod schema
    const validatedData = createShortUrlSchema.parse(req.body);
    
    const url = await urlService.createShortUrl(validatedData.originalUrl);
    
    return res.status(201).json({
      success: true,
      data: url,
    });
  } catch (error) {
    console.error(error);
    
    if (error.name === "ZodError") {
      return res.status(400).json({
        success: false,
        errors: error.issues,
      });
    }
    
    return res.status(500).json({
      success: false,
      message: "Something went wrong",
    });
  }
};

const redirectToOriginalUrl = async (req, res) => {
  try {
    const { shortCode } = req.params;
    const originalUrl = await urlService.getOriginalUrl(shortCode);

    if (!originalUrl) {
      return res.status(404).json({
        success: false,
        message: "Short URL not found",
      });
    }

    return res.redirect(originalUrl);
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Something went wrong",
    });
  }
};

const getStats = async (req, res) => {
  try {
    const { shortCode } = req.params;
    const stats = await urlService.getStats(shortCode);

    if (!stats) {
      return res.status(404).json({
        success: false,
        message: "Short URL not found",
      });
    }

    return res.status(200).json({
      success: true,
      data: stats,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Something went wrong",
    });
  }
};

module.exports = {
  createShortUrl,
  redirectToOriginalUrl,
  getStats
};
