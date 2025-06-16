import logo from "../assets/LOGO.png";
import hero_img from "../assets/hero_img.jpg";
import hero2 from "../assets/hero2.png";
import img_wb from "../assets/img_wb1.jpg";
import img_wo from "../assets/img_wo.png";
import logo1 from "../assets/logo.png";

export const assets = {
  logo,hero_img,hero2,img_wb,img_wo,logo1
};
export const testimonials = [
  {
    name: "Rahul Sharma",
    role: "Product Designer at Zenix",
    message: "This background remover saved me hours of manual editing. Super fast and accurate!",
    image: "https://randomuser.me/api/portraits/men/32.jpg"
  },
  {
    name: "Aditi Verma",
    role: "Freelance Photographer",
    message: "Clean cutouts every time. It's my go-to tool for all client projects!",
    image: "https://randomuser.me/api/portraits/women/45.jpg"
  }
];

export const plans = [
  {
    name: "Basic",
    price: "₹99",
    credits:"100",
    features: [
      "Standard cutout quality",
      "Basic support",
    ]
  },
  {
    name: "Pro",
    price: "₹299/month",
    credits:"500",
    features: [
      "Unlimited image uploads",
      "High-resolution cutouts",
      "Priority support",
      "Access to bulk remover"
    ]
  },
  {
    name: "Enterprise",
    price: "799",
    credits:"1000",
    features: [
      "Team access",
      "API integration",
      "Dedicated support",
      "On-premise deployment option"
    ]
  }
];
