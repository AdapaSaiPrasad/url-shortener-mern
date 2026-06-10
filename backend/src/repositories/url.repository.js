import Url from "../models/url.model.js";

const create = async (urlData) => {
  const doc = await Url.create(urlData);

  console.log(doc);

  return doc;
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
const findUrlsByUser=async(userId)=>{
  return await Url.find({user:userId});
};

const deleteUrl=async(id,userId)=>{
  return await Url.findOneAndDelete({_id:id,user:userId});
};

export {
  create,
  deleteUrl,
  findByShortCode,
  incrementClicks,
  findUrlsByUser
};