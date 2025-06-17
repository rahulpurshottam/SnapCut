// controllers/userController.js
import { Webhook } from "svix";
import getRawBody from "raw-body";
import userModel from "../models/userModel.js";
import connectDB from "../configs/mongodb.js";

export const config = {
  api: {
    bodyParser: false,
  },
};

const clerkWebHooks = async (req, res) => {
  await connectDB(); // 👈 ensure DB connection

  try {
    const payload = (await getRawBody(req)).toString("utf-8");

    const headers = {
      "svix-id": req.headers["svix-id"],
      "svix-timestamp": req.headers["svix-timestamp"],
      "svix-signature": req.headers["svix-signature"],
    };
    console.log("📦 Headers:", headers);
console.log("📨 Raw Payload:", payload);

    const wh = new Webhook(process.env.CLERK_WEBHOOK_SECRET);
   let evt;
try {
  evt = wh.verify(payload, headers);
} catch (err) {
  console.error("❌ SVIX Verification Failed:", err);
  return res.status(400).json({ error: "SVIX verification failed" });
}

    const eventType = evt.type;
    const data = evt.data;

    switch (eventType) {
      case "user.created": {
        const newUser = {
          clerkId: data.id,
          email: data.email_addresses?.[0]?.email_address,
          firstname: data.first_name,
          lastname: data.last_name,
          photo: data.image_url,
        };

        try {
          const result = await userModel.create(newUser);
          console.log("✅ User created:", result);
        } catch (err) {
          console.error("❌ Failed to insert user:", err);
        }

        break;
      }

      case "user.updated": {
        const updatedUser = {
          email: data.email_addresses?.[0]?.email_address,
          firstname: data.first_name,
          lastname: data.last_name,
          photo: data.image_url,
        };

        await userModel.findOneAndUpdate({ clerkId: data.id }, updatedUser);
        break;
      }

      case "user.deleted": {
        await userModel.findOneAndDelete({ clerkId: data.id });
        break;
      }

      default:
        console.log("Unhandled event type:", eventType);
    }

    return res.status(200).json({ success: true });
  } catch (error) {
    console.error("Webhook verification failed:", error);
    return res.status(400).json({ error: "Webhook verification failed" });
  }
};

export default clerkWebHooks;
