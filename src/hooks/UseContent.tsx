import { useEffect, useState } from "react"
import { BACKEND_URL } from "../config/config";
import axios from "axios";


interface Content {
  _id: string;
  title?: string;
  type?: string;
  link?: string;
  tags?: string;
  createdAt: string;
}


export function Usecontent(){
    const [contents,setcontent]=useState<Content[]>([]); 
    
    function refresh(){
        

    
        

            // const token=localStorage.getItem("token");
            // console.log("TOken is valid: "+token);

         // if(token){
         //    console.warn("Token is invalid");
            
         // }

          axios.get(`${BACKEND_URL}`+"/api/v1/content",{
            headers:{
                "Authorization":localStorage.getItem("token")
            }
         }).then((response) => {
            setcontent(response.data.Content);


         })

        //  console.log("Response is this " + response.data.Content);

         


      
    
   
        
    

    }

    useEffect(()=>{

     refresh();

     let interval=setInterval(()=>{
        refresh();

     },5 *1000);

     return()=>{
        clearInterval(interval);
     }
        
   
        
    },[]);
    return {contents,setcontent,refresh};
}