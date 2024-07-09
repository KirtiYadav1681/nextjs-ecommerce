import multer from "multer";
import path from "path";
import { promisify } from "util";
import fs from "fs";
import { isAdminRequest } from "./auth/[...nextauth]";

// Configure multer for multiple file uploads
const upload = multer({
  storage: multer.diskStorage({
    destination: "./public/uploads",
    filename: (req, file, cb) => cb(null, Date.now() + "-" + file.originalname),
  }),
}).array("files"); // Define multer configuration

const mkdir = promisify(fs.mkdir);

export default async function handler(req, res) {
  await isAdminRequest(req, res);
  await mkdir("./public/uploads", { recursive: true });

  upload(req, res, function (err) {
    if (err) {
      return res.status(500).json({ error: err.message });
    }

    // Generate links for the uploaded files
    const links = req.files.map((file) => {
      const relativePath = path.relative("./public", file.path);
      const protocol = req.headers["x-forwarded-proto"] || "http";
      const host = req.headers.host;
      return `${protocol}://${host}/${relativePath.replace(/\\/g, "/")}`;
    });

    return res.json({ links });
  });
}

export const config = {
  api: { bodyParser: false },
};
