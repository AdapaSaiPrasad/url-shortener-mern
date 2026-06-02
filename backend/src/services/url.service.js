const { nanoid } = require("nanoid");
const urlRepository = require("../repositories/url.repository");

const createShortUrl = async (originalUrl) => {
  const shortCode = nanoid(7);

  const url = await urlRepository.create({
    originalUrl,
    shortCode,
  });

  return url;
};
const getOriginalUrl = async (shortCode) => {
  const url = await urlRepository.findByShortCode(shortCode);

  if (!url) {
    return null;
  }

  await urlRepository.incrementClicks(shortCode);

  return url.originalUrl;
};
const getStats = async (shortCode) => {
  return await urlRepository.findByShortCode(shortCode);
};
module.exports = {
  createShortUrl,
  getOriginalUrl,
  getStats
};