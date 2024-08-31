import CreateQuery from "./CreateQuery";
import {json, useNavigate, useParams} from "react-router-dom"
import { Button} from "@mui/material";
import { useEffect,useState } from "react";
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import GetLatestQuery from "./GetLatestQuery";

 function Quries(){

    const DemoPaper = styled(Paper)(({ theme }) => ({
        width: 550,
        height: 70,
        margin :15,
        padding: theme.spacing(2),
        ...theme.typography.body2,
        textAlign: 'center',
      }));

    const navigate = useNavigate()
    const {id} = useParams()
    const userId = localStorage.getItem("userId")
    const role = localStorage.getItem("role")

    const [queries,setQueries]= useState([])
    

    useEffect(()=>{
      {role == 2 ? getAllQueryById() : getAllQuery() } 
    },[])

    const getAllQueryById = async()=>{
        const data = await fetch(`http://localhost:4600/query/all-queries/${userId}`,{
            method : "GET"
        })
        const res = await data.json() 
        setQueries(res)
    }

    const getAllQuery = async()=>{
        const data = await fetch(`http://localhost:4600/query/allQueries/${id}`,{
            method : "GET"
        })
        const res = await data.json() 
        setQueries(res)
    }


    const takeQuery = async(id,queryById)=>{

        console.log(queryById)

        const values = {
            "status" : "Assigned",
            "assignedTo" : userId
        }

        const data = await fetch(`http://localhost:4600/query/assigned/${id}`,{
            method : "PUT",
            headers :{
                "Content-type" : "application/json"
            },
            body : JSON.stringify(values)
        })
        const res = await data.json()

        conversationCreate(id,queryById) 
        getAllQuery()
         
    }


    const conversationCreate = async(id,queryById)=>{

        const Ids = {
            senderId : userId,
            receiverId : queryById,
            queryId : id
        }

        const data = await fetch("http://localhost:4600/conversation/",{
            method : "POST",
            headers : {
                "Content-type" : "application/json"
            },
            body :JSON.stringify(Ids)
        })
        const result = await data.json()

    }

     console.log(queries)
     return(
        <div className="query-main">
         <h3>Quries</h3>
        { role == 2 ? <Button onClick={()=>navigate(`/side-bar/${id}/query-create`)}>create-Query</Button> : null} 
         <div className="query-container">
         <div className="query-list">
            { queries && queries.map((ele,index)=>{
                return(
                    // <DemoPaper key={index} >
                    //     <div className="query-detail">
                    //     <div>QN-{index+1}-{ele.queryTitle}</div>
                    //     <div className="quer-status">{ele.status}</div>
                    //     </div>
                    //     <div className="category">{ele.category}</div>
                    //     {role == 2 || role == 3 ? <Button onClick={()=>navigate(`/side-bar/${id}/query?queryId=${ele._id}`)}>View</Button>: null}
                    //     {role == 3 ? <Button onClick={()=>takeQuery(ele._id ,ele.createdBy)} >Take the query</Button>: null}
                    // </DemoPaper>
                    <div >
                        <div className="query-detail">
                        <div>QN-{index+1}-{ele.queryTitle}</div>
                        <div className="quer-status">{ele.status}</div>
                        </div>
                        <div className="category">{ele.category}</div>
                        {role == 2 || role == 3 ? <Button onClick={()=>navigate(`/side-bar/${id}/query?queryId=${ele._id}`)}>View</Button>: null}
                        {role == 3 ? <Button onClick={()=>takeQuery(ele._id ,ele.createdBy)} >Take the query</Button>: null}
                   
                    </div>
                )
            }) }
         </div>
         { role == 2 ? <GetLatestQuery/> : null} 
         </div>
        </div>
     )
 }
 export default Quries;


