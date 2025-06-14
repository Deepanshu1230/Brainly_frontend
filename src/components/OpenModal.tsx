// import { useState } from "react"
import { useRef, useState } from "react";
import { Close } from "../icons/Close";
import { Button } from "./ui/Button";
// import { YouTube } from "../icons/Youtube";
import axios from "axios";
import { BACKEND_URL } from "../config/config";
import toast,{Toaster} from "react-hot-toast";

enum ContentType { 
    Twitter="twitter",
    Youtube="youtube"

}
export function OpenModal({open,Onclose}){
   const titleref=useRef<HTMLInputElement>(null);
   const linkref=useRef<HTMLInputElement>(null);
   

   const [type,setType]=useState(ContentType.Youtube);


    // const [modelopen,setmodelopen]=useState(false);

   async function addContent(){

    try{
      const title=titleref.current?.value;
      const link=linkref.current?.value;

       await axios.post(`${BACKEND_URL}`+"/api/v1/content",{
             title,
             link,
             type,
             
       },
           {
            headers:{
              "Authorization":localStorage.getItem("token")
            }
           }
      )

      Onclose();
      toast.success("Added");


    }
    catch(err){
      console.log(String(err));

    }
    
      }



   


  return (
    

    <div>
      <Toaster/>
       { open && <div className=" flex items-center  justify-center h-screen w-screen bg-black/5 backdrop-blur-sm fixed z-10 top-0 left-0">
       
       <div className="text-white bg-shadBlack-500 p-5 rounded-md">
          {/* Top bar */}
          <div className="flex justify-between">
           <p className="text-lg">Add Link</p>
          <div onClick={Onclose} className="cursor-pointer"><Close /></div> 
          </div>

          {/* Link  */}
          <div className="flex flex-col gap-y-4">
            <div className="pt-3 flex flex-col">
                <p className="pl-1 ">Title</p>
                <Input ref={titleref} placeholder={"Title"}/>

            </div>

            <div>
                <p className="pl-1 ">Link</p>
                <Input ref={linkref} placeholder={"Link"}/>

            </div>
            
            <div className="flex  justify-center pt-5 gap-x-4">
              <Button text="Youtube" varient={type === ContentType.Youtube
                  ?      
                  ("primary") :("secondary")}
                  onclick={() => {
                    setType(ContentType.Youtube);
                  }}

                  
                  
                  />

                  <Button text="Twitter" varient={type === ContentType.Twitter ? ("primary") :  ("secondary")}
                      onclick={() => {
                        setType(ContentType.Twitter);
                      }}
                  />
            </div>
            
            
          </div>

          {/* Button */}
          <div className=" flex justify-center  pt-4 font-semibold">
            <Button onclick={addContent}  varient="primary" text="Submit"/>
          </div>
          
       </div>

       </div> }
    </div>

    
    
    
  );
}


function Input({onChange,placeholder,ref}:{placeholder?:string,onChange?:()=>void,ref?:any}){
    return(
        <div>
            <input ref={ref} placeholder={placeholder} type="text" className="bg-shadBlack-700 border border-shadBlack-800 outline-none rounded-md px-3 py-1 " onChange={onChange} ></input>
        </div>

    )
}

