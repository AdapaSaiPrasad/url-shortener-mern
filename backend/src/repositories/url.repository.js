const Url=require('../models/url.model')

const create = async (urlData) => {
  const doc=await Url.create(urlData);
  console.log(doc)
  return doc
};
const incrementClicks = async (shortCode) => {
  return Url.findOneAndUpdate(
    { shortCode },
    { $inc: { clicks: 1 } },
    { new: true }
  );
};
const findByShortCode = async (shortCode) => {
  return await Url.findOne({ shortCode });
};

module.exports = {
  create,
  findByShortCode,
  incrementClicks
};
 