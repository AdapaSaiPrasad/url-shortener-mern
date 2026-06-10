import { createShortUrlSchema } from "../validators/url.validations.js";
import * as urlService from "../services/url.service.js";

// Create Short URL
export const createShortUrl = async (req, res) => {
  try {
    const validatedData = createShortUrlSchema.parse(req.body);

    const url = await urlService.createShortUrl(
      validatedData.originalUrl,
      req.user.userId,
      validatedData.customAlias
    );

    return res.status(201).json({
      success: true,
      data: url,
    });

  } catch (error) {
    console.error(error);

    if (error.message === "Custom alias already exists") {
      return res.status(400).json({
        success: false,
        message:"Alias already taken. Try another one."
      ,
      });
    }

    return res.status(500).json({
      success: false,
      message: "Something went wrong",
    });
  }
};


// Redirect
export const redirectToOriginalUrl = async (req, res) => {
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

// Analytics
export const getStats = async (req, res) => {
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

export const getUserUrls=async(req,res)=>{
    try{
        const userId=req.user.userId;
        const urls=await  urlService.getUserUrls(userId);

        return res.status(200).json({
            success:true,
            data:urls
        })
    }
    catch(error){
        return res.status(500).json(
            {
                message:error.message,
                success:false
            }
        )
            
    }
}

export const deleteUrl=async(req,res)=>{
  try{
    const {id}=req.params;
    const userId=req.user.userId;
    const deletedUrl=await urlService.deleteUrl(
      id,userId
    );
    if(!deletedUrl){
      return res.status(404).json({
        success:false,
        message:"Url not found"
      });
    }
    return res.status(200).json({
      success:true,
      message:"URL deleted successfully"
    });

  }
  catch(error){
    return res.status(500).json({
      success:false,
      message:error.message
    })
  }
}