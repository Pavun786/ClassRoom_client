
// import { useEffect, useState } from "react";
// import SylabusPlan from "../Components/SylabusPlan/SylabusPlan";
// import "../SideBar/SideBar.css"
// import { Outlet, useNavigate,Link,useParams } from "react-router-dom";


//  function SideBar(){

//     const navigate = useNavigate()

//     const[sideBarOpen,setSideBarOpen] = useState(false)
    

//     const {id} = useParams()

//     const components = [
//         {"title" : "Class",
//           "to" : `/side-bar/${id}/class`
//         },
//         {"title" : "DashBoard",
//          "to" : `/side-bar/${id}/dashboard`
//        },
//        {"title" : "Tasks",
//         "to" : `/side-bar/${id}/tasks`
//        },
//        {"title" : "Quries",
//         "to" : `/side-bar/${id}/quries`
//        },
//        {"title" : "LeaderBoard",
//         "to" : `/side-bar/${id}/leader-board`
//        },
//     ]

//     useEffect(()=>{

//     },[])

//     const openSideBar =()=>{
//        setSideBarOpen(!sideBarOpen)
//     }
     
//      return (
//          <>
//           <span className="open-btn" onClick={openSideBar}>button</span>  
//          <div className="side-bar" >
         
//           <div className={sideBarOpen ? "sideopening" : "sidebar-container"}> 
//           <ul>
//              {components.map((ele,index)=>{
//                 return(
//                     <li key={index}>
//                         <Link to={ele.to}>{ele.title}</Link>
//                     </li>
//                 )
//              })}
//           </ul>
//           </div> 
//           <div className="outlet">
//           <Outlet/>
//           </div>
         
//          </div>
//          </>
//      )
//  }
//  export default SideBar;



import { useEffect, useState } from "react";
import { Outlet, Link, useParams } from "react-router-dom";
import "../SideBar/SideBar.css";

function SideBar() {
  const [sideBarOpen, setSideBarOpen] = useState(false);
  const { id } = useParams();

  const components = [
    { title: "Class", to: `/side-bar/${id}/class` },
    { title: "DashBoard", to: `/side-bar/${id}/dashboard` },
    { title: "Tasks", to: `/side-bar/${id}/tasks` },
    { title: "Quries", to: `/side-bar/${id}/quries` },
    { title: "LeaderBoard", to: `/side-bar/${id}/leader-board` },
  ];

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 768) {
        setSideBarOpen(false);  
      }
    };

    handleResize();

    // Add event listener to monitor screen size changes
    window.addEventListener("resize", handleResize);

    // Cleanup event listener on component unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const openSideBar = () => {
    setSideBarOpen(!sideBarOpen);
  };

  return (
    <>
      <span className="open-btn" onClick={openSideBar}>
        button
      </span>
      <div className="side-bar">
        <div className={sideBarOpen ? "sideopening" : "sidebar-container"}>
          <ul>
            {components.map((ele, index) => (
              <li key={index} onClick={openSideBar}>
                <Link to={ele.to} className="custom-link">{ele.title}</Link>
              </li>
            ))}
          </ul>
        </div>
        <div className="outlet">
          <Outlet />
        </div>
      </div>
    </>
  );
}

export default SideBar;

