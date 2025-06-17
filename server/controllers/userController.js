import { Webhook } from "svix";
import getRawBody from "raw-body";
import userModel from "../models/userModel.js"; 

export const config = {
  api: {
    bodyParser: false,
  },
};

const clerkWebHooks = async (req, res) => {
  try {
    const payload = (await getRawBody(req)).toString("utf-8");

    const headers = {
      "svix-id": req.headers["svix-id"],
      "svix-timestamp": req.headers["svix-timestamp"],
      "svix-signature": req.headers["svix-signature"],
    };

    const wh = new Webhook(process.env.CLERK_WEBHOOK_SECRET);
    const evt = wh.verify(payload, headers);

    const eventType = evt.type;
    const userData = evt.data;

    switch (eventType) {
      case "user.created": {
        const newUser = {
          clerkId: userData.id,
          email: userData.email_addresses[0]?.email_address,
          firstname: userData.first_name,
          lastname: userData.last_name,
          photo: userData.image_url,
        };
        await userModel.create(newUser);
        break;
      }

      case "user.updated": {
        const updatedUser = {
          email: userData.email_addresses[0]?.email_address,
          firstname: userData.first_name,
          lastname: userData.last_name,
          photo: userData.image_url,
        };
        await userModel.findOneAndUpdate({ clerkId: userData.id }, updatedUser);
        break;
      }

      case "user.deleted": {
        await userModel.findOneAndDelete({ clerkId: userData.id });
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
