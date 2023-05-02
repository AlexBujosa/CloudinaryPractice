import cloudinaryV2 from './cloudinary';
import { IncomingForm } from 'formidable';
import crypto from 'crypto';
import mimeTypes from 'mime-types';

// eslint-disable-next-line import/no-anonymous-default-export
export default async (req, res) => {
  const data = await new Promise((resolve, reject) => {
    const form = new IncomingForm();

    form.parse(req, (err, fields, files) => {
      if (err) return reject(err);
      resolve({ fields, files });
    });
  });

  const file = data?.files?.inputFile.path;

  try {
    const videoFileName =
      crypto.randomUUID() + '.' + mimeTypes.extension(req.files[0].mimetype);

    const response = await cloudinaryV2.uploader.upload_large(file, {
      resource_type: 'video',
      public_id: `assets/uploads/${videoFileName}`,
      resource_type: 'video',
      chunk_size: 20000000,
      timeout: 60000,
    });
    return res.json(response);
  } catch (error) {
    console.log('Error', error);
    return res.json(error);
  }
};
