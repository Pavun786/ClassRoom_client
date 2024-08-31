import { useState } from "react";
import "../Navbar/Navbar.css"
import MenuIcon from '@mui/icons-material/Menu';
import {Link, useNavigate} from "react-router-dom"

function Navbar (){

  const [show,setShow] = useState(true)
  const[dropMenu,setDropMenu] = useState(true)
  const role = localStorage.getItem("role")
  const navigate = useNavigate()

  const handleChage = () =>{
      setShow(!show)
      console.log("clicked")
  }

  const logoutFunction = ()=>{
     localStorage.clear()
     navigate("/")
  }


    return(
        <nav>
         <div className="logo">
          ClassRoom.com
         </div>
         { role == 1 ? (<ul className={show ? "showMenu" : ""}>
            <li><Link to="/list">All-Courses</Link></li>
            <li><Link to="/add-course">Add-NewCourse</Link></li>
            <li><Link to="/all-students">All-Students</Link></li>
            <li><Link to="/all-mentors">All-Mentors</Link></li>
            
             <li><Link to="/all-req">Course Allocation</Link></li>
         </ul>) : <ul> 
         {/* <li><Link to="/list">All-Courses</Link></li> */}
        
         </ul> }
        
         {role ? <button onClick={logoutFunction}>Logout</button> : "Login" }
         <div className="amber" onClick={()=>handleChage()}>
        
            <MenuIcon/>
         </div>
        </nav>
    )
}
export default Navbar;