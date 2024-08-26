
import SylabusPlan from "../Components/SylabusPlan/SylabusPlan";
import "../SideBar/SideBar.css"
import { Outlet, useNavigate,Link,useParams } from "react-router-dom";


 function SideBar(){

    const navigate = useNavigate()

    const {id} = useParams()

    const components = [
        {"title" : "Class",
          "to" : `/side-bar/${id}/class`
        },
        {"title" : "DashBoard",
         "to" : `/side-bar/${id}/dashboard`
       },
       {"title" : "Tasks",
        "to" : `/side-bar/${id}/tasks`
       },
       {"title" : "Quries",
        "to" : `/side-bar/${id}/quries`
       },
       {"title" : "LeaderBoard",
        "to" : `/side-bar/${id}/leader-board`
       },
    ]
     
     return (

         <div className="side-bar">
          <div> 
          <ul>
             {components.map((ele,index)=>{
                return(
                    <li key={index}>
                        <Link to={ele.to}>{ele.title}</Link>
                    </li>
                )
             })}
          </ul>
          </div> 
          <div className="outlet">
          <Outlet/>
          </div>
         
         </div>
     )
 }
 export default SideBar;


