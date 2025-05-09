import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
  secure: true,
});

export async function uploadAvatarImage(file: File): Promise<string> {
  const arrayBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);

  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        folder: 'avatars',
        resource_type: 'image',
        format: 'png',
        quality: 'auto',
      },
      (error, result) => {
        if (error) return reject(error);
        if (!result?.secure_url) {
          return reject(new Error('No URL returned by Cloudinary'));
        }
        resolve(result.secure_url);
      }
    );

    uploadStream.end(buffer);
  });
}
