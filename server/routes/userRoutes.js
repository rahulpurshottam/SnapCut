import express from 'express'
import { clerkWebHooks, paymentrazorpay, userCredits, verifyrazorpay } from '../controllers/userController.js'
import authUser from '../middleware/auth.js'

const userRouter=express.Router()

userRouter.post('/webhooks',clerkWebHooks)
userRouter.get('/credits',authUser, userCredits) 
userRouter.post('/pay-razorpay',authUser, paymentrazorpay) 
userRouter.post('/verify-payment', verifyrazorpay) 

export default userRouter;
 
