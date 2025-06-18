import axios from 'axios'
import userModel from "../models/userModel.js";
import fs from "fs";
import formData from 'form-data';
import path from "path";

const removeBackground = async (req, res) => {
  try {
    const clerkId = req.clerkId;
    const user = await userModel.findOne({ clerkId });

    if (!user) {
      return res.json({ success: false, message: 'User Not Found' });
    }

    if (user.creditBalance === 0) {
      return res.json({ success: false, message: 'No Credit Balance', creditBalance: user.creditBalance });
    }

    const imagePath = req.file.path; 
    const imagefile = fs.createReadStream(imagePath);

const formdata = new formData(); 
    formdata.append('image_file', imagefile);

    const { data } = await axios.post('https://clipdrop-api.co/remove-background/v1', formdata, {
      headers: {
        'x-api-key': process.env.CLIP_DROP_API,
        ...formdata.getHeaders(),
      },
      responseType: 'arraybuffer',
    });

    const base64Image = Buffer.from(data, 'binary').toString('base64');
    const resultImage = `data:${req.file.mimetype};base64,${base64Image}`;

    await userModel.findByIdAndUpdate(user._id, { creditBalance: user.creditBalance - 1 });

    res.json({ success: true, resultImage, creditBalance: user.creditBalance - 1, message: "Background removed" });
  } catch (error) {
    console.error("Image processing error:", error.message);
    res.json({ success: false, message: error.message });
  }
};


export { removeBackground };
