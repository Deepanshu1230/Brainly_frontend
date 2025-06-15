// import { useState } from "react";
import { useRef } from "react";
import { Input } from "./Input";
import { BACKEND_URL } from "../config/config";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast,{Toaster} from "react-hot-toast";



export function Signup(){
    const navigate=useNavigate();
    const firstref=useRef<HTMLInputElement>(null);
    const lastref=useRef<HTMLInputElement>(null);
    const emailref=useRef<HTMLInputElement>(null);
    const Password=useRef<HTMLInputElement>(null);

   async function signup(){
        const firstName=firstref.current?.value;
        const lastName=lastref.current?.value;
        const emailId=emailref.current?.value;
        const password=Password.current?.value;

        try{
            await axios.post(BACKEND_URL+"/api/v1/signup",{
        
            firstName,
            lastName,
            emailId,
            password

        


       })

       toast.success("Sign up Succesfully");
       navigate("/login");
       

        }
        catch(err:any){

            if(err){
                   const errorMessage=err.response.data?.message;
                   toast.error(errorMessage);
            }

        } 
  
    }
    
    
    return (
        <div>
            <Toaster/>
        <div className="relative text-white w-screen h-screen flex items-center justify-center">
           
            <div className="relative  border border-slate-600 flex flex-col p-5 md:pl-16 md:pr-16 pt-6 pb-7 bg-shadBlack-700 rounded-lg">
                 
                    
                 
                 {/* Choice between */}
                 <div className="bg-shadBlack-700">
                    <div className=" text-center ">
                       <div className="text-4xl font-bold ">Signup</div>  
                  

                    </div>
                    
                 </div>
                <div className="space-y-3">
                    <div>
                       <p className="pt-3 pb-1">FirstName</p>
                    <Input  ref={firstref} placeholder="FirstName"/>
                    </div>
                     
                     <div>
                       <p className="pb-1">LastName</p>
                    <Input ref={lastref} placeholder="LastName"/> 
                     </div>

                     <div>
                     <p className="pb-1">Email</p>
                    <Input ref={emailref} placeholder="test@gmail.com"/>
                     </div>
                    
                       <div>
                        <p className="pb-1">Password</p>
                    <Input ref={Password} placeholder="********" />
                       </div>

                      
                </div> 

                {/* Button Component */}
                <div className="pt-5">
                    <button onClick={signup} className="bg-blue-500 shadow-lg shadow-blue-500/50 w-full text-white font-semibold text-center rounded-md py-2">Login</button>

                </div>

                {/* Note  */}
                <div className="text-center pt-5">
                    <p>Already Signup? <span onClick={() => navigate("/login")} className="font-bold cursor-pointer hover:text-blue-400 duration-200 transition-all" >Login</span>
                    </p>
                </div>
            </div>
        </div>
        </div>
    )
}




