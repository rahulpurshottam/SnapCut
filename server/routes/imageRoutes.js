import express from "express";
import authUser from "../middleware/auth.js";
import { removeBackground } from "../controllers/imageController.js";
import upload from "../middleware/multer.js";


const imageRouter = express.Router();

imageRouter.post("/remove-bg", upload.single("image"),authUser, removeBackground);

export default imageRouter;
