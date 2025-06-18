import { useAuth, useClerk, useUser } from "@clerk/clerk-react";
import { createContext, useState } from "react";
import axios from 'axios'
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export const AppContext=createContext()

const AppContextProvider=(props)=>{
  const [loading, setLoading] = useState(false);
const [credit,setCredit]=useState(false) 
const [image,setImage]=useState(false)
const [resultImage,setResultImage]=useState(false)
const backendUrl=import.meta.env.VITE_BACKEND_URL
const {getToken}=useAuth()
const {isSignedIn}=useUser ()
const {openSignIn}=useClerk()
const navigate=useNavigate()


const loadCreditsData = async () => {
  try {
    const token = await getToken();
    const { data } = await axios.get(backendUrl+ '/api/user/credits', {
      headers: { token },
    });
    
    if (data.success) {
      setCredit(data.credits);  
       
    } 
  } catch (error) {
    console.log(error);
    toast.error("Failed to load credit data");
  }
};

const removeBg = async (file) => {
  setLoading(true);
  try {
    setImage(file);

    
    const token = await getToken();
    const formData = new FormData();
    formData.append("image", file);

    const { data } = await axios.post(`${backendUrl}/api/image/remove-bg`, formData, {
      headers: {
        token,
        "Content-Type": "multipart/form-data",
      },
    });
    console.log(data);
    if (data.success) {
      setResultImage(data.resultImage); // ✅ base64 image
      setCredit(data.creditBalance); // Optional: update credits
      navigate("/result"); // ✅ Move after setting result
    } else {
      toast.error(data.message);
    }
  } catch (error) {
    console.error("Upload error", error);
    toast.error("Failed to remove background.");
  }finally {
    setLoading(false);
  }

};


    const value={
        credit,setCredit,loadCreditsData,backendUrl,image,setImage,removeBg,
        resultImage,setResultImage,
    }
    return(
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    )
}

export default AppContextProvider