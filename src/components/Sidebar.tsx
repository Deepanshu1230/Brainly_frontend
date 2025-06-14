import type { Dispatch, SetStateAction } from "react";

import { Brain } from "../icons/Brain";
import { Twitter } from "../icons/Twitter";
import { YouTube } from "../icons/Youtube";
import { SidebarContent } from "./ui/SidebarContent";
import { Logout } from "../icons/Logout";
import { BACKEND_URL } from "../config/config";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";


interface SidebarProps {
   setSelecttype: Dispatch<SetStateAction<"twitter" | "youtube" | null>>;
}

export function Sidebar({setSelecttype}:SidebarProps){
    // const {contents,setcontent,refresh} = Usecontent();
    const navigate=useNavigate();

   async function logout(){

    const token=localStorage.getItem("token");
    
    try{

        localStorage.removeItem("token")
       await axios.post(`${BACKEND_URL}/api/v1/logout`,{
            headers:{
                       "Authorization":`${token}` 
            
            }
        })
        toast.success("Logout");
        navigate("/login");
    

    }
    catch(err){
        toast.error("Logout failed");
    

    }
    


    }


    return(
        <div>
            <Toaster/>
            <div className=" top-0 left-0 absolute w-[250px] h-screen border-r border-gray-700">
                {/* Top section */}
                <div className="pt-5 flex pl-2 gap-x-4 items-center">
                    <div>
                        <Brain/>
                    </div>
                    <div className="text-white text-4xl  font-bold">Brainly</div>
                </div>

                {/* tag section */}


                <div className="flex flex-col text-white pt-9 pl-2">
                    <SidebarContent text="Twitter" onclick={() => setSelecttype("twitter")} icon={<Twitter/>} />
                    <SidebarContent text="Youtube" icon={<YouTube/>} onclick={() => setSelecttype("youtube")}/>


                </div>

                <div className="absolute flex items-center left-11 bottom-0 gap-x-3 mb-3 bg-blue-400 rounded-xl px-3 py-2 hover:bg-blue-600 transition-all duration-300" >
                    <div >
                        <Logout/>
                    </div>
                    <button onClick={logout} className="text-2xl font-semibold">Logout</button>
                </div>



            </div>
        </div>
    )
}