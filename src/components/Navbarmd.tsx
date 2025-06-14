import { Card } from "./ui/Card";
import photo from "../images/create_somthing_like_a_boy_holding_the_brain__4a7db2de.png";
import { OpenModal } from "./OpenModal";
import { useEffect, useState } from "react";
import cartoon from "../images/87729996d6a03f5285b9048aaa674ea2.webp";
import {Footer} from "./Footer";
import { Usecontent } from "../hooks/UseContent";

export function Navbar(){
      const [openmodal,setopenmodal]=useState(false);
      const {contents,setcontent,refresh}=Usecontent();


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
        <li ><a className="justify-between">Share
          <span className="bg-green-400 text-white text-[10px] rounded-xl px-1 py-1">New</span>
          </a> </li>
        <li><a>Logout</a></li>
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
            </div>) : (<div className="text-white">Hlleo ji</div>)}
</div>
            {/* Footer  */}
            <div className=" pt-11">
              <Footer/>
            </div>

        </div> 
    )
}