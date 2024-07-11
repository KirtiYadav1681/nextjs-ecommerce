import { IncomingForm } from "formidable";
import { uploadImage } from "../config/cloudinary";

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req, res) {
  if (req.method === "POST") {
    const form = new IncomingForm();

    form.parse(req, async (err, fields, files) => {
      if (err) {
        res.status(500).json({ message: "Error parsing files", error: err });
        return;
      }

      const file = files.files;
      if (!file) {
        res.status(400).json({ message: "No file uploaded" });
        return;
      }
      try {
        const result = await uploadImage(file[0].filepath);
        if (result.success) {
          res
            .status(200)
            .json({ message: "Success", imgUrl: result.data.secure_url });
        } else {
          res
            .status(500)
            .json({ message: "Error uploading file", error: result.error });
        }
      } catch (error) {
        res.status(500).json({ message: "Error processing file", error });
      }
    });
  } else {
    res.status(405).json({ message: "Method Not Allowed" });
  }
}
