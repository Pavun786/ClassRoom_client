import { Button } from "@mui/material"
import { useState,useEffect } from "react"
import { useSearchParams } from "react-router-dom"
import "../Quries/Quries.css"
import QueryChat from "./QueryChat"

function GetSingleQuery(){

   const[query,setQuery] = useState("")
   const [searchParams] = useSearchParams()
   let queryId = searchParams.get("queryId")
   const [conversation,setConversation] = useState("")

    useEffect(()=>{
       getData()
       getConversation()
    },[])

    const getData = async()=>{
        const data = await fetch(`http://localhost:4600/query/single/${queryId}`,{
            method : "GET"
        })
        const res = await data.json()
        setQuery(res)
    }
    console.log("lat",query)

    const getConversation = async()=>{
        const data = await fetch(`http://localhost:4600/conversation/result/${queryId}`,{
            method : "GET"
        })
        const res = await data.json()
        setConversation(res)
    }
   
    console.log(conversation)
   

    return(
        <div className="qcontainer">
            <QueryChat conversation={conversation} setConversation={setConversation} query={query}/>
            <div className="getQuery-container">
            <div className="sub1">
               {/* <div>Recent-Query</div> */}
                <div>{query && query.queryTitle}</div>
             </div>
             <div className="sub2">
                <div className="time">
                    <div>
                    <div>createdAt :</div>
                    <div>{query && query.createdAt}</div>
                    </div>
                    <div>
                    <div>Assigned To :</div>
                    <div>{query?.assignedTo?.Username}</div>
                    </div>
                </div>
                <div className="sub3">
                    <div>Category : {query && query.category}</div>
                    <div>Language : {query && query.language}</div>
                </div>
                <div className="sub4">
                    <p>Description :</p>
                    <p>{query && query.queryTitle}</p>
                </div>
                <div className="query-btn">
               
                </div>
             </div>
              
            
            </div>
        </div>
       
    )
} 
export default GetSingleQuery;