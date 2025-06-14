import { Input } from "./Input";
import cartoon from "../images/login_cartton-removebg-preview.png";
import { useNavigate } from "react-router-dom";
import { useRef } from "react";
import axios from "axios";
import { BACKEND_URL } from "../config/config";
import toast, { Toaster } from 'react-hot-toast';

export function Login(){
    const userRef=useRef<HTMLInputElement>(null);
    const Password=useRef<HTMLInputElement>(null);
    
    

    async function login(){

        try{

            const emailId=userRef.current?.value;
        const password=Password.current?.value;


      const response= await axios.post(BACKEND_URL+"/api/v1/login",{
            emailId,
            password

        })

        const jwt=response.data.token;
        localStorage.setItem("token",jwt);

        toast.success("Login Sucess");
        navigate("/dashboard");



        }
        catch(err:any){

            const errorMessage = err.response.data?.message || "Login failed!";
            toast.error(errorMessage); 

        }
     

        
    }
    const navigate=useNavigate();
    return (
        <div>
            <Toaster/>
            <div className="relative text-white w-screen h-screen flex items-center justify-center">
                        <div className=" relative  border border-slate-600 flex flex-col p-5 md:pl-16 md:pr-16 pt-6 pb-7 bg-shadBlack-700 rounded-lg">
                             
                               <div className=" flex items-center justify-center pb-2 ">
                                <img src={cartoon} alt="" className="w-[100px] border rounded-full shadow-xl shadow-blue-500/50" />
                                </div>  
                            
                             {/* Choice between */}
                             <div className="bg-shadBlack-700">
                                <div className=" text-center ">
                                   <div className="text-4xl font-bold ">Login</div>  
                                {/* <div>
                                    Sign Up
                                </div>     */}
            
                                </div>
                                
                             </div>
                            <div className="space-y-3">
                              
            
                                 <div>
                                 <p className="pb-1">Email</p>
                                <Input ref={userRef} placeholder="test@gmail.com"/>
                                 </div>
                                
                                   <div>
                                    <p className="pb-1">Password</p>
                                <Input ref={Password} placeholder="********" />
                                   </div>
                                   <div></div>
            
                                  
                            </div> 
            
                            {/* Button Component */}
                            <div className="pt-5">
                                <button   onClick={login} className="bg-blue-500 shadow-lg shadow-blue-500/50 w-full text-white font-semibold text-center rounded-md py-2">Login</button>
            
                            </div>
            
                            {/* Note  */}
                            <div className="text-center pt-5">
                                New User? <span onClick={() => navigate("/signup")} className="font-bold cursor-pointer hover:text-blue-400 transition-all duration-150">Signup</span>
                                
                            </div>
                        </div>
                    </div>

        </div>
    )
}