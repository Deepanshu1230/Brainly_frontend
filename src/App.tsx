
// import { Dashboard } from "./components/Dashboard";
import {BrowserRouter,Routes,Route} from "react-router-dom";

import { Login } from "./components/Login";
import { Signup } from "./components/Signup";

import { Dashboard } from "./components/Dashboard";
import { Privateroute } from "./components/libs/Privateroute";
import { Sharecontent } from "./components/Sharecontent";



function App() {
  return(
        <BrowserRouter>
        <Routes>
           <Route path="/" element={<Signup />} />
          <Route path="/signup" element={<Signup/>}/>
          <Route path="/login" element={<Login/>}/>

          <Route path="/dashboard" index element={
            <Privateroute>
             <Dashboard/>
            </Privateroute>}/>
            <Route path="/share/:sharelink" element={<Sharecontent/>}/>
          
        </Routes>
        </BrowserRouter>
   
      
  )
}

export default App
