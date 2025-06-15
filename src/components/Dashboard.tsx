import { useEffect, useState } from "react";
import { OpenModal } from "./OpenModal";
import { Sidebar } from "./Sidebar";
import { Button } from "./ui/Button";
import { Card } from "./ui/Card";
import { Shareicon } from "../icons/Share";
import { Plusicon } from "../icons/Plus";
import { Navbar } from "./Navbarmd";
import { Usecontent } from "../hooks/UseContent";
import axios from "axios";
import { BACKEND_URL } from "../config/config";




export function Dashboard(){
   const {contents,refresh} = Usecontent();
    const [openmodal,setopenmodal]=useState(false);
    const [selectType,setSelecttype]=useState<"twitter"|"youtube"|null>(null);

    async function Sharecontent(){

      const response=await axios.post(`${BACKEND_URL}/api/v1/brain/share`,{
         share:true
      },{
        headers:{
          "Authorization":localStorage.getItem("token")
        } 


        
      })

      const shareUrl=`${BACKEND_URL}/api/v1/brain/${response.data.hash}`;
      navigator.clipboard.writeText(shareUrl);
      alert(shareUrl);


    }


      const filtercontents=selectType
      ? contents.filter((content) => content.type === selectType) : contents
    

    useEffect(()=>{
      refresh();

    },[openmodal]);

    

      return (
          <div className="w-screen h-screen bg-black-400 pb-8">
  
   {/* Modal */}
  <OpenModal open={openmodal} Onclose={() => setopenmodal(false)} />
  
  {/* For Mobile */}

  <div className="w-full h-full block md:hidden">
    <Navbar />
  </div>

 

  {/* Desktop View */}
  <div className="hidden md:flex h-full">
    {/* Sidebar */}
    <div className="w-[259px] shrink-0">
      <Sidebar setSelecttype={setSelecttype} />
    </div>

    {/* Main Content */}
    <div className="flex-1 flex flex-col px-6 pt-6 overflow-y-auto">
      {/* Top Right Buttons */}
      <div className="flex items-center justify-end gap-4">
        <Button
          varient="primary"
          text="Share"
          onclick={Sharecontent}
          startIcon={<Shareicon />}
        />
        <Button
          onclick={() => setopenmodal(true)}
          varient="secondary"
          text="Add Content"
          startIcon={<Plusicon />}
        />
      </div>

      {/* Cards Section */}
      <div className="flex flex-wrap gap-3 pt-11">
          {/* {JSON.stringify(contents)} */}
        { Array.isArray(filtercontents) &&
    filtercontents.map(( content,idx) => (
          <Card
            key={content._id || idx}
            contentId={content._id} 
            type={content.type as any}
            link={content.link as string}
            title={content.title as string}
            
            time={new Date(content.createdAt).toLocaleDateString("en-GB")}
          />
        ))}
      </div>
    </div>
  </div>
</div>

        
          
        )
};