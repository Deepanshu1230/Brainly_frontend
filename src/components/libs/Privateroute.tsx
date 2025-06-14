import { Navigate } from "react-router-dom";
import type {JSX, ReactNode}  from "react";

  interface Privateprop{
    children:ReactNode;
  }
export async function Privateroute({children}:Privateprop):Promise<JSX.Element>{


    const token=localStorage.getItem("token");

    if(!token){
        return <Navigate to="/login" replace />;;
    }

    return <>{children}</>;
}