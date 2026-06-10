
import {nanoid} from "nanoid";
import * as urlRepository from "../repositories/url.repository.js";
import redisClient from "../config/redis.js";

const createShortUrl = async (originalUrl,userId,customAlias) => {
  const shortCode =  customAlias || nanoid(7);
const existingShortCode =
  await urlRepository.findByShortCode(
    shortCode
  );if (existingShortCode) {
  throw new Error(
    "Custom alias already exists"
  );
}
  const url = await urlRepository.create({
    originalUrl,
    shortCode,
    user:userId
  });

  return url;
};



const deleteUrl=async(id,userId)=>{
  return await urlRepository.deleteUrl(id,userId)
};
const getOriginalUrl = async (shortCode) => {
  const cachedUrl=await redisClient.get(shortCode);
  if(cachedUrl){
    console.log("Cache hit");
    await urlRepository.incrementClicks(
      shortCode
    );
    return cachedUrl
  }
   console.log("Cache MISS");
  // MongoDB lookup
  const url = await urlRepository.findByShortCode(shortCode);

  if (!url) {
    return null;
  }
  //Store in Redis
  await redisClient.set(
    shortCode,url.originalUrl
  )
  await urlRepository.incrementClicks(shortCode);

  return url.originalUrl;
};
const getStats = async (shortCode) => {
  return await urlRepository.findByShortCode(shortCode);
};
const getUserUrls=async(userId)=>{
  return await urlRepository.findUrlsByUser(userId);
}
export  {
  createShortUrl,
  getOriginalUrl,
  getStats,
  getUserUrls,
  deleteUrl
};