import { Navigate } from "react-router-dom"
import Login from "./Auth/Login/Login"


function ProtectRoute({children}){
 
    let token = localStorage.getItem("token")

    return(
       <>
        { token ? children : <Navigate to="/" /> }
       </>
    )
}

export default ProtectRoute;