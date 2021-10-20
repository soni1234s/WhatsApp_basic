import { AttachFile, Mic, SearchOutlined } from '@material-ui/icons'
import MoreVert from '@mui/icons-material/MoreVert'
import { Avatar, IconButton } from '@mui/material'
import React, {useState} from 'react'
import './chat.css'
import InsertEmoticonIcon from '@mui/icons-material/InsertEmoticon';
import axios from './axios';

function Chat({messages}) {

    const[Input, setInput] =  useState('');

    const sendmessage = async (e) => {
        e.preventDefault();
        
      await axios.post("/messages/new", {
            message : Input,
            name : "david",
            time: "apna tym ayega",
            reciever: true
        });

        setInput('');

    };

    return (
        <div className="chat">
            <div className="chat__header">
                <Avatar />

                <div className="chat__headerInfo">
                   <h3>Username</h3>
                   <p>last seen at..</p>
                </div>

                
                <div className="chat__headerIcons">
                        <IconButton>
                            <SearchOutlined/>
                        </IconButton>
                        <IconButton>
                            <AttachFile/>
                        </IconButton>
                        <IconButton>
                            <MoreVert/>
                        </IconButton>
                </div>

            </div>

            <div className="chat__body">
                 
                 {
                    messages.map( (message) => (
                    <p className= {`chat__message ${message.reciever && "chat__reciever"}`}>"
                   <span className="chat__Name">{message.name}</span>
                    {message.message}
                   <span className="chat__Time">{message.time}</span>
                   </p>
                   
                 ))}

            </div>

            <div className="chat__footer">
                <InsertEmoticonIcon />

                <form>
                    <input value={Input} 
                           onChange =  {e => setInput(e.target.value)} 
                           type="text" 
                           placeholder="Enter a message!"/>
                    <button onClick={sendmessage} type="submit">SEND</button>
                </form>

                <Mic />
            </div>

        </div>
    )
}

export default Chat
