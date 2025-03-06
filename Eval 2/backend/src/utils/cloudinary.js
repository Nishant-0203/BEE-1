import { v2 as cloudinary } from 'cloudinary';
import fs from "fs";

cloudinary.config({ 
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
    api_key: process.env.CLOUDINARY_API_KEY, 
    api_secret: process.env.CLOUDINARY_API_SECRET
});

export const uploadOnCloudinary = async (localFilePath) => {
    try {
        if (!localFilePath) return null;
        const response = await cloudinary.uploader.upload(localFilePath, {
            // image, video, etc
            resource_type: 'auto'
        });
        console.log("File uploaded to cloudinary", response.url);
        fs.unlinkSync(localFilePath);
        return response;    
    } catch (error) {
        fs.unlinkSync(localFilePath);
        return null;
    }
}

export const deleteFromCloudinary = async (publicId) => {
    try {
        if (!publicId) return null;
        const response = await cloudinary.uploader.destroy(publicId);
        console.log("File deleted from cloudinary");
        return response;    
    } catch (error) {
        console.log("Error deleting file from cloudinary");
        return null;
    }
}