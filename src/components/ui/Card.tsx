import axios from "axios";
import { Delete } from "../../icons/Delete";
import { Shareicon } from "../../icons/Share";
import { BACKEND_URL } from "../../config/config";
import { Usecontent } from "../../hooks/UseContent";
import toast,{Toaster} from "react-hot-toast";

type Social="youtube" | "twitter";


interface Cardprops{
    type:Social,
    link:string,
    title:string,
    time:string,
    setcontent?:React.Dispatch<React.SetStateAction<any[]>>;
    contentId:string
    
}

 

export function Card({contentId,type,link,title,time}:Cardprops){
      const {setcontent} = Usecontent();
    
    
    async function deleteContent(contentId:any){    
        
              await axios.delete(`${BACKEND_URL}/api/v1/content/${contentId}`,{
                headers:{
                  "Authorization":localStorage.getItem("token")
                }
                
        
                
              })
              toast.success("Deleted Succesfull");
               setcontent((prev) => prev.filter((item) => item._id !== contentId));
               
        
    }
    return (
    <div >
        <Toaster/>

            <div className="bg-shadBlack-500 border  border-gray-700 max-w-80  md:max-w-74  p-4 outline-slate-400 rounded-lg shadow-md text-white
            min-h-56 min-w-64 md:min-w-52">
                {/* top Bar */}
                <div className="flex items-center justify-between">
                    
                    <div className="antialiased">{title}</div>
                    
                    <div className="flex items-center  gap-x-4">
                           
                            
                           <div 
                            onClick={() => deleteContent(contentId)}
                            className="cursor-pointer hover:opacity-70"
                        >
                            <Delete />
                        </div>                     


                        <a href={link} target="_blank"><Shareicon/></a>
                        </div>
                </div>

                {/* link and section */}
                <div className="pt-4">
                    {type === "youtube" && <iframe className="w-full"  src={link.replace("watch","embed").replace("?v=","/")} title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe> }
                  {type === "twitter"  &&  <blockquote className="twitter-tweet"><a  href={link.replace("x.com","twitter.com")}></a> 
                  </blockquote> }
                 

                </div>

                {/* tags section */}
                <div></div>

                {/* Time */}
                <div className="pt-2">
                    <p>Added On {time}</p>
                </div>


            </div>

    
       
        

    </div>)
};