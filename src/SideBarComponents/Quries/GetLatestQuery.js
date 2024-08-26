import { Button } from "@mui/material"
import { useState,useEffect } from "react"
import "../Quries/Quries.css"
import { useNavigate, useParams } from "react-router-dom"

function GetLatestQuery(){

   const[latestData,setLatestData] = useState("")
   const {id} = useParams()
   const navigate = useNavigate()
   const userId = localStorage.getItem("userId")
    useEffect(()=>{
       getData()
    },[])

    const getData = async()=>{
        const data = await fetch(`http://localhost:4600/query/latest-query/${userId}`,{
            method : "GET"
        })
        const res = await data.json()
        setLatestData(res)
    }
    console.log("lat",latestData)

    return(
        <div className="newQuery-container">
            
            <div className="query-sub1">
           <div>Recent-Query</div>
            <div>{ latestData.queryTitle}</div>
         </div>
         <div className="query-sub2">
            <div className="time">
                <div>
                <div>createdAt :</div>
                <div>{latestData.createdAt}</div>
                </div>
                <div>
                <div>Assigned To :</div>
                <div>{latestData?.assignedTo?.Username}</div>
                </div>
            </div>
            <div className="query-sub3">
                <p>Description :</p>
                <p>{latestData.queryTitle}</p>
            </div>
            <div className="query-btn">
            <Button onClick={()=>navigate(`/side-bar/${id}/query?queryId=${latestData._id}`)}>Go to query</Button>
            </div>
         </div>
           
        
        </div>
    )
} 
export default GetLatestQuery;