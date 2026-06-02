const urlService = require("../services/url.service");

const createShortUrl = async (req, res) => {
  try {
    console.log(req.body)
    const { originalUrl } = req.body;
    const url = await urlService.createShortUrl(originalUrl);
    return res.status(201).json({
      success: true,
      data: url,
    });
  } catch (error) {
    console.error(error);
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