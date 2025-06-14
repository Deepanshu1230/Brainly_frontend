
// import { Dashboard } from "./components/Dashboard";
import {BrowserRouter,Routes,Route} from "react-router-dom";

import { Login } from "./components/Login";
import { Signup } from "./components/Signup";

import { Dashboard } from "./components/Dashboard";



function App() {
  return(
        <BrowserRouter>
        <Routes>
          <Route path="/signup" element={<Signup/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="/dashboard" index element={<Dashboard/>}/>
          
        </Routes>
        </BrowserRouter>
   
      
  )
}

export default App
