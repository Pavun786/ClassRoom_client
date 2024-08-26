// // import { useNavigate, useParams } from "react-router-dom";
// // import { Button } from "@mui/material";
// // import{useState,useEffect,useRef} from "react";
// // import Messages from "./Messages";
// // import {io} from "socket.io-client"


// // function QueryChat({conversation,setConversation}){
  
// //     const navigate = useNavigate()
// //     const {id} = useParams()
// //     const userId = localStorage.getItem("userId")
// //     const [message,setMessage] = useState([])
// //     const [newMessage,setNewMessage] = useState("")
// //     const [arrivalMessage,setArrivalMessage] = useState(null)
// //    //  const [socket,setSocket] = useState(null)
// //    // const socket = useRef()
// //    const socket = io('http://localhost:4600');

// //    console.log(socket.connected)
// //    socket.on("connect", () => {
// //       console.log("Connected to server");
// //   });

// //   socket.on("connect_error", (err) => {
// //    console.log(`Connection Error: ${err.message}`);
// // });

// //    let conversationId = conversation[0]?._id
// //     useEffect(()=>{
// //         console.log("useEffeect execute")
// //        socket.emit("addUser",userId) //conversationId
// //        socket.on("getUsers",users=>{
// //           console.log("us",users)
// //        })
// //        return () => {
// //          // User leaves room
// //          socket.disconnect();

// //          socket.off()
// //      }
// //     },[userId])


// //     useEffect(()=>{
// //       //  socket.current = io("http://localhost:4600")
// //        socket.on("getMessage",(data)=>{
// //           setArrivalMessage({
// //             sender : data.senderId,
// //             text : data.text,
// //             createdAt : Date.now()
// //           })
// //        })
// //        socket.on('roomMembers', usrs => {
// //          // setUsers(usrs)
// //          console.log(usrs)
// //      })
// //     },[])


// //     useEffect(()=>{
// //        arrivalMessage && conversation[0]?.members.includes(arrivalMessage.sender) && 
// //        setMessage((prev)=>[...prev,arrivalMessage])
// //     },[arrivalMessage,conversation])

// //    //  useEffect(()=>{
// //    //     socket?.on("welcome",message=>{
// //    //        console.log(message)
// //    //     })
// //    //  },[socket])

// //     useEffect(()=>{
// //        getMessages()
// //     },[conversation])

// //     const getMessages = async()=>{
// //       const data = await fetch(`http://localhost:4600/message/${conversation[0]?._id}`,{
// //           method : "GET"
// //       })
// //       const res = await data.json()
// //       console.log(res)
// //       setMessage(res)
// //   }

// //    console.log("msg",message)

   
// //    const sendMessage = async(e)=>{
// //       e.preventDefault()

// //       const messageData = {
// //          sender : userId,
// //          text : newMessage,
// //          conversationId : conversation[0]?._id
// //       }

// //       const receiverId = conversation[0]?.members?.find(member => member !== userId)

// //       socket.emit("sendMessage",{
// //          senderId : userId,
// //          receiverId,
// //          text : newMessage,
// //          //conversationId : conversationId
// //       })

// //       const data = await fetch('http://localhost:4600/message',{
// //           method : "POST",
// //           headers : {
// //             "Content-type" : "application/json"
// //           },
// //           body : JSON.stringify(messageData)
// //       })
// //       const res = await data.json()
// //       console.log(res)
// //       setMessage([...message,res])
// //       setNewMessage("")
// //    }

// //      return(
// //         <div className="chat-container">
// //          <h3>Chat box</h3>
// //          <Button onClick={()=> navigate(`/side-bar/${id}/quries`)}>Back</Button>
// //          <div>
// //             <div className="chatBox">
// //                {
// //                   message?.map((msg)=>{
// //                      return(
// //                         <Messages message={msg} own={msg?.sender === userId}/>
// //                      )
// //                   })
// //                }
// //                 </div>
// //            <div className="chatBox-Bottom">
// //            <input
// //              className="messageInput"
// //              placeholder="Enter your Message"
// //              onChange={(e)=> setNewMessage(e.target.value)}
// //              value={newMessage}
// //            >
// //            </input>
// //            <Button onClick={sendMessage}>send</Button>
// //            </div>
// //          </div>
// //         </div>
// //      )
// // }
// // export default QueryChat;


// import { useNavigate, useParams } from "react-router-dom";
// import { Button } from "@mui/material";
// import { useState, useEffect, useRef } from "react";
// import Messages from "./Messages";
// import { io } from "socket.io-client";

// function QueryChat({ conversation, setConversation }) {
//   const navigate = useNavigate();
//   const { id } = useParams();
//   const userId = localStorage.getItem("userId");
//   const [message, setMessage] = useState([]);
//   const [newMessage, setNewMessage] = useState("");
//   const [arrivalMessage, setArrivalMessage] = useState(null);
//   const socket = useRef();
// //const socket = io('http://localhost:4600');

//   useEffect(() => {
//     socket.current = io("http://localhost:4600");

//     socket.current.on("connect", () => {
//       console.log("Connected to server");
//       socket.current.emit("addUser", userId);
//     });

//     socket.current.on("connect_error", (err) => {
//       console.log(`Connection Error: ${err.message}`);
//     });

//     socket.current.on("getUsers", (users) => {
//       console.log("us", users);
//     });

//     socket.current.on("getMessage", (data) => {
//       setArrivalMessage({
//         sender: data.senderId,
//         text: data.text,
//         conversationId : data.conversationId,
//         createdAt: Date.now(),
       
//       });
//     });
   

//     return () => {
//       socket.current.disconnect();
//       socket.current.off();
//     };
//   }, [userId]);

//   useEffect(() => {
//     if (
//       (arrivalMessage?.conversationId == conversation[0] ) &&
//       conversation[0]?.members.includes(arrivalMessage.sender)
//     ) {
//       console.log("Message updated -1")
//       setMessage((prev) => [...prev, arrivalMessage]);
//       //getMessages(arrivalMessage)
//     }
//   }, [arrivalMessage, conversation]);

//   console.log("arraival",arrivalMessage)

//   useEffect(() => {
//     getMessages();
//   }, [conversation]);

//   const getMessages = async () => {
//     const data = await fetch(
//       `http://localhost:4600/message/${conversation[0]?._id}`,
//       {
//         method: "GET",
//       }
//     );
//     const res = await data.json();
//     console.log(res);
//     setMessage(res);
   
//     // if(arrivalMessage){
//     //   console.log("exe---1");
      
//     //   setMessage((prev) => [...prev, arrivalMessage])
//     // }else{
//     //   console.log("exe----2");
      
//     //   setMessage(res);
//     // }
  
//   };

//   const sendMessage = async (e) => {
//     e.preventDefault();

//     const messageData = {
//       sender: userId,
//       text: newMessage,
//       conversationId: conversation[0]?._id,
//     };

//     const receiverId = conversation[0]?.members?.find(
//       (member) => member !== userId
//     );

//     socket.current.emit("sendMessage", {
//       senderId: userId,
//       receiverId,
//       text: newMessage,
//       conversationId : conversation[0]?._id
//     });

//     const data = await fetch("http://localhost:4600/message", {
//       method: "POST",
//       headers: {
//         "Content-type": "application/json",
//       },
//       body: JSON.stringify(messageData),
//     });
//     const res = await data.json();
//     console.log(",,,",res);
//     setMessage([...message, res]);
//     setNewMessage("");
//   };

//   console.log("Messss",message)

//   return (
//     <div className="chat-container">
//       <h3>Chat box</h3>
//       <Button onClick={() => navigate(`/side-bar/${id}/quries`)}>Back</Button>
//       <div>
//         <div className="chatBox">
//           {message?.map((msg) => (
//             <Messages key={msg._id} message={msg} own={msg?.sender === userId} />
//           ))}
//         </div>
//         <div className="chatBox-Bottom">
//           <input
//             className="messageInput"
//             placeholder="Enter your Message"
//             onChange={(e) => setNewMessage(e.target.value)}
//             value={newMessage}
//           />
//           <Button onClick={sendMessage}>send</Button>
//         </div>
//       </div>
//     </div>
//   );
// }
// export default QueryChat;


import { useNavigate, useParams } from "react-router-dom";
import { Button } from "@mui/material";
import { useState, useEffect, useRef } from "react";
import Messages from "./Messages";
import { io } from "socket.io-client";

function QueryChat({ conversation, setConversation,query }) {
  const navigate = useNavigate();
  const { id } = useParams();
  const userId = localStorage.getItem("userId");
  const [message, setMessage] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [arrivalMessage, setArrivalMessage] = useState(null);
  const socket = useRef();

  useEffect(() => {
    socket.current = io("http://localhost:4600");

    socket.current.on("connect", () => {
      console.log("Connected to server");
      socket.current.emit("addUser", userId);
    });

    socket.current.on("connect_error", (err) => {
      console.log(`Connection Error: ${err.message}`);
    });

    socket.current.on("getUsers", (users) => {
      console.log("us", users);
    });

    socket.current.on("getMessage", (data) => {
      setArrivalMessage({
        sender: data.senderId,
        text: data.text,
        conversationId: data.conversationId,
        createdAt: Date.now(),
      });
    });

    return () => {
      socket.current.disconnect();
      socket.current.off();
    };
  }, [userId]);

  useEffect(() => {
    if (
      arrivalMessage &&
      arrivalMessage.conversationId === conversation[0]?._id &&
      conversation[0]?.members.includes(arrivalMessage.sender)
    ) {
      setMessage((prev) => [...prev, arrivalMessage]);
    }
  }, [arrivalMessage, conversation]);

  useEffect(() => {
    getMessages();
  }, [conversation]);

  const getMessages = async () => {
    const data = await fetch(
      `http://localhost:4600/message/${conversation[0]?._id}`,
      {
        method: "GET",
      }
    );
    const res = await data.json();
    setMessage(res);
  };

  const sendMessage = async (e) => {
    e.preventDefault();

    const messageData = {
      sender: userId,
      text: newMessage,
      conversationId: conversation[0]?._id,
    };

    const receiverId = conversation[0]?.members?.find(
      (member) => member !== userId
    );

    socket.current.emit("sendMessage", {
      senderId: userId,
      receiverId,
      text: newMessage,
      conversationId: conversation[0]?._id,
    });

    const data = await fetch("http://localhost:4600/message", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(messageData),
    });
    const res = await data.json();
    setMessage([...message, res]);
    setNewMessage("");
  };

  return (
    <div className="chat-container">
      <h3>Chat box</h3>
      <Button onClick={() => navigate(`/side-bar/${id}/quries`)}>Back</Button>
      <div>
        <div className="chatBox">
          {message?.map((msg) => (
            <Messages key={msg._id} message={msg} own={msg?.sender === userId} />
          ))}
        </div>
        <div className="chatBox-Bottom">
          <input
            className="messageInput"
            placeholder="Enter your Message"
            onChange={(e) => setNewMessage(e.target.value)}
            value={newMessage}
          />
          <Button disabled={query.assignedTo == null ? true : false} onClick={sendMessage}>send</Button>
        </div>
      </div>
    </div>
  );
}

export default QueryChat;



