import type { ReactElement } from "react";



type Varient="primary" | "secondary";

interface Buttonprops{
    varient:Varient,
    size?:"md" | "lg" | "sm",
    startIcon?:ReactElement,
    endIcon?:ReactElement,
    text?:string,
    onclick?:()=> void

}

const varientClass:Record<Varient,string>={
    "primary":"flex items-center gap-x-1 rounded-md px-4 py-1 text-black bg-white  ",
    "secondary":"flex items-center gap-x-1 bg-black rounded-md px-4 py-1 text-white "

}

export const Button=({varient,startIcon,text,onclick}:Buttonprops)=>{

    return(
        <button onClick={onclick} className={`${varientClass[varient]}  `}>{startIcon} {text}</button>
    )

}