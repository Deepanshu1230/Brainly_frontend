import { Card } from "./ui/Card";
import photo from "../images/create_somthing_like_a_boy_holding_the_brain__4a7db2de.png";
import { OpenModal } from "./OpenModal";
import { useEffect, useState } from "react";
import cartoon from "../images/87729996d6a03f5285b9048aaa674ea2.webp";
import {Footer} from "./Footer";
import { Usecontent } from "../hooks/UseContent";
import axios from "axios";
import { BACKEND_URL } from "../config/config";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import gif from "../images/fa_a_o_personagem_andar_20250611_141842_0_v3.gif";

export function Navbar(){
  const navigate=useNavigate();
      const [openmodal,setopenmodal]=useState(false);
      const {contents,refresh}=Usecontent();

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

     async function Sharecontent(){
     
           const response=await axios.post(`${BACKEND_URL}/api/v1/brain/share`,{
              share:true
           },{
             headers:{
               "Authorization":localStorage.getItem("token")
             } 
     
     
             
           })
     
           const shareUrl=`${window.location.origin}/${response.data.hash}`;
           navigator.clipboard.writeText(shareUrl);
           alert(shareUrl);
     
     
         }


      useEffect(()=>{
        refresh();
      },[openmodal]);
  
    return (
         <div className="bg-black min-h-full min-w-full">
          <OpenModal open={openmodal} Onclose={()=>{
                      setopenmodal(false);
                    }}/>
            <div className="navbar fixed backdrop-blur-md top-0 border-b-2 border-white-400 ">
  <div className="flex-1 pt-4">
    <div className="flex items-center backdrop-blur-md">
      <span>
        <img className="w-[60px]" src={photo} alt="" />
      </span>
      
    <a className="btn btn-ghost text-4xl pr-11">Brainly</a>

    </div>
    
  </div>
  <div className="gap-2 pt-3">
   
    <div className="dropdown dropdown-end">
      <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
        <div className="w-16 rounded-full">
          <img
            alt="Tailwind CSS Navbar component"
            src={cartoon}/>
        </div>
      </div>
      <ul
        tabIndex={0}
        className="menu menu-sm dropdown-content bg-shadBlack-500  border border-white rounded-box z-[10] mt-3 w-52 p-2 shadow">
        <li>
          <a >
            <p onClick={() => {setopenmodal(true)}}>Add content</p>
            
          </a>
        </li>
        <li ><button onClick={Sharecontent} className="justify-between">Share
          <span className="bg-green-400 text-white text-[10px] rounded-xl px-1 py-1">New</span>
          </button> </li>
        <li><button onClick={logout}>Logout</button></li>
      </ul>
    </div>
    
  </div>
</div>

<div>
  { contents ? (<div className="flex flex-wrap items-center justify-center space-y-4 pt-32">
   
                 {contents.map((content,idx) => (
          <Card
            key={idx}
            type={content.type as any}
            link={content.link as string}
            title={content.title as string}
            contentId={content._id}
            time={new Date(content.createdAt).toLocaleDateString("en-GB")}
          />
        ))}
            </div>) : (<div className="min-h-screen text-bold text-3xl flex flex-col items-center justify-center">
    <img className="w-[100px]" src={gif} alt="" />
    <p className="text-white">Add your Brain</p>
  </div>)}
</div>
            {/* Footer  */}
            <div className=" pt-11">
              <Footer/>
            </div>

        </div> 
    )
}