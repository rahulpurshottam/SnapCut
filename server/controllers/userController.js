import { messageInRaw, Webhook } from "svix";
import userModel from "../models/userModel.js";
import razorpay from 'razorpay'
import transactionModel from "../models/transactionModel.js";
import { verifyToken } from '@clerk/backend';

// Clerk Webhook Handler
const clerkWebHooks = async (req, res) => {
 try {
  const whook = new Webhook(process.env.CLERK_WEBHOOK_SECRET)
  await whook.verify(JSON.stringify(req.body),{
      "svix-id": req.headers["svix-id"],
      "svix-timestamp": req.headers["svix-timestamp"],
      "svix-signature": req.headers["svix-signature"],
  })
  const {data,type}=req.body

   switch (type) {
      case "user.created": {
        const userData = {
          clerkId: data.id,
          email: data.email_addresses[0].email_address,
          firstName: data.first_name,
          lastName: data.last_name,
          photo: data.image_url,
        }
        await userModel.create(userData);
        res.json({})

        break;
      }
      case "user.updated": {
        const userData = {
          email: data.email_addresses[0].email_address, 
          firstName: data.first_name,
          lastName: data.last_name,
          photo: data.image_url,
        };
        await userModel.findOneAndUpdate({ clerkId: data.id }, userData);
        res.json({})

        break;
      }
      case "user.deleted": {
        await userModel.findOneAndDelete({ clerkId: data.id });
        res.json({})

        break;
      }
      default:
        break;
    }


 } catch (error) {
   console.error("Webhook Error:", error.message);
    res.json({ success: false, message: error.message });
 }
};

const userCredits = async (req, res) => {
  try {
    const { clerkId } = req; // ✅ access from req, not req.body

    const user = await userModel.findOne({ clerkId });

    if (!user) {
      return res.json({ success: false, message: "User not found" });
    }

    res.json({ success: true, credits: user.creditBalance });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ success: false, message: error.message });
  }
};

//gateway initialized
const razorpayInstance = new razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});



const paymentrazorpay = async (req, res) => {
  try {
    const { planId } = req.body;
    const clerkId = req.clerkId; // ✅ comes from auth middleware

    if (!clerkId || !planId) {
      return res.status(400).json({ success: false, message: "Missing clerkId or planId" });
    }

    const userData = await userModel.findOne({ clerkId });

    if (!userData) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    let credits, plan, amount;
    const date = Date.now();

    switch (planId) {
      case 'Basic':
        plan = 'Basic';
        credits = 100;
        amount = 799;
        break;
      case 'Pro':
        plan = 'Pro';
        credits = 300;
        amount = 1499;
        break;
      case 'Enterprise':
        plan = 'Enterprise';
        credits = 1000;
        amount = 1999;
        break;
      default:
        return res.status(400).json({ success: false, message: "Invalid Plan ID" });
    }

    const transactionData = {
      clerkId,
      plan,
      amount,
      credits,
      date,
    };

    const newTransaction = await transactionModel.create(transactionData);

    const options = {
      amount: amount * 100, // Razorpay expects paise
      currency: process.env.CURRENCY || "INR",
      receipt: newTransaction._id.toString(),
    };

    const order = await razorpayInstance.orders.create(options);

    res.json({ success: true, order });
  } catch (error) {
    console.error("Payment Razorpay Error:", error.message);
    res.status(500).json({ success: false, message: "Payment initiation failed" });
  }
};

const verifyrazorpay=async(req,res)=>{
try {
  const {razorpay_order_id}=req.body
  const orderInfo=await razorpayInstance.orders.fetch(razorpay_order_id)
  if(orderInfo.status==='paid'){
    const transactionData=await transactionModel.findById(orderInfo.receipt)
    if(transactionData.payment){
      return res.json({success: false, message: "Payment failed" })
    }
    const userData=await userModel.findOne({clerkId:transactionData.clerkId})
    const creditBalance=userData.creditBalance+transactionData.credits
    await userModel.findByIdAndUpdate(userData._id,{creditBalance})

    await transactionModel.findByIdAndUpdate(transactionData._id,{payment:true})
    res.json({success:true,message:"Credits Added"})
  }

} catch (error) {
  console.error("Payment Razorpay Error:", error.message);
    res.status(500).json({ success: false, message: "Verfication failed" });
}
}


export { clerkWebHooks, userCredits,paymentrazorpay,verifyrazorpay };
