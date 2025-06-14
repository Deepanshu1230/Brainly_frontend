import type { ReactElement } from "react"


interface SideContent{
    icon?:ReactElement,
    text?:string,
    onclick?:()=>any
}

export function SidebarContent({icon,text,onclick}:SideContent){
    return(
        <div>
        <div onClick={onclick} className="flex items-center  gap-x-4 hover:bg-shadBlack-500 rounded-md transition-all duration-150">
            <div>{icon}</div>
            <p>{text}</p>

            
        </div>

      


            </div>
    )
}