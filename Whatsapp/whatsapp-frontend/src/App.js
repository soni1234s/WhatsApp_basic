import './App.css';
import Sidebar from './Sidebar';
import Chat from './Chat';
import Pusher from 'pusher-js'
import React, {useEffect, useState} from 'react';
import axios from './axios.js'


function App() {
  
  const[messages, setMessages] = useState([]);

  useEffect(() => {
      axios.get("/messages/sync/").then((res) => {
         setMessages(res.data);
      }) 
  }, [])


  useEffect(() => {
    var pusher = new Pusher('a350eb562a2d7b262725', {
      cluster: 'eu'
    });

    var channel = pusher.subscribe('Messages');
    channel.bind('inserted', function(newMessage) {
      alert(JSON.stringify(newMessage));
      setMessages([...messages, newMessage]);
    });
    
    
    return () => {
    channel.unsubscribe();
    channel.unbind_all();}


  }, [messages]);

  console.log(messages)
  return (
    <div className="App">

       <div className="app__body">
          <Sidebar />
          <Chat messages = {messages}/>
       </div>   

    </div>
  );
}

export default App;
