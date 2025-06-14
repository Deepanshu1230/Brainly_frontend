import { Navigate } from "react-router-dom";
import type {JSX, ReactNode}  from "react";

  interface Privateprop{
    children:ReactNode;
  }
export  function Privateroute({children}:Privateprop):JSX.Element{


    const token=localStorage.getItem("token");

    if(!token){
        return <Navigate to="/login" replace />;;
    }

    return <>{children}</>;
}