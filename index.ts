import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import multer from "multer";
import cloudinaryV2 from "./lib/cloudinary";
import mimeTypes from "mime-types";
import crypto from "crypto";
dotenv.config();

const app: Express = express();
const port = process.env.PORT;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const upload = multer({});
app.get("/", (req: Request, res: Response) => {
  res.send("Express + TypeScript Server");
});

interface uploadFiles {
  video: Express.Multer.File[];
  image: Express.Multer.File[];
  [key: string]: Express.Multer.File[];
}

app.post(
  "/uploads",
  upload.fields([
    { name: "video", maxCount: 1 },
    { name: "image", maxCount: 1 },
  ]),

  (req: Request, res: Response) => {
    const { video, image }: uploadFiles = req.files! as uploadFiles;
    const videoFileName =
      crypto.randomUUID() + "." + mimeTypes.extension(video[0].mimetype);
    const imageFileName =
      crypto.randomUUID() + "." + mimeTypes.extension(image[0].mimetype);
    const videoBase64 = `data:${
      video[0].mimetype
    };base64,${video[0].buffer.toString("base64")}`;

    const imageBase64 = `data:${
      image[0].mimetype
    };base64,${image[0].buffer.toString("base64")}`;

    cloudinaryV2.uploader
      .upload(imageBase64, {
        public_id: `assets/images/${imageFileName}`,
        resource_type: "image",
      })
      .then((result) => console.log(result))
      .catch((error) => {
        console.log(error);
      });
    console.log(req.files);
    res.send({ message: "sucessfull", body: req.body });

    cloudinaryV2.uploader
      .upload_large(videoBase64, {
        public_id: `assets/uploads/${videoFileName}`,
        resource_type: "video",
        chunk_size: 20000000,
        timeout: 60000,
      })
      .then((result) => console.log(result))
      .catch((error) => {
        console.log(error);
      });
  }
);

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
