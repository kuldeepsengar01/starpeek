const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

async function uploadVideo(fileBuffer) {
  const file = `data:video/mp4;base64,${fileBuffer.toString("base64")}`;
  const result = await cloudinary.uploader.upload(file, { resource_type: "video" });
  return result;
}

async function uploadImage(fileBuffer) {
  const file = `data:image/png;base64,${fileBuffer.toString("base64")}`;
  const result = await cloudinary.uploader.upload(file, { resource_type: "image" });
  return result;
}


module.exports = {uploadVideo, uploadImage};