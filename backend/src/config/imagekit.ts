import Imagekit from 'imagekit';
import { config } from './env';

const imagekit = new Imagekit({
  publicKey: config.IMAGEKIT_PUBLIC_KEY,
  privateKey: config.IMAGEKIT_PRIVATE_KEY,
  urlEndpoint: config.IMAGEKIT_URL_ENDPOINT,
});

export const uploadImage = async (fileBuffer: Buffer, fileName: string) => {
  return await imagekit.upload({
    file: fileBuffer.toString('base64'), // Buffer → base64
    fileName,
    folder: '/blog-images',
  });
};

export const imageUrl = (response: { filePath: string }) => {
  return imagekit.url({
    path: response.filePath,
    transformation: [
      { quality: 'auto' },
      { format: 'webp' },
      { width: '1024' },
    ],
  });
};
