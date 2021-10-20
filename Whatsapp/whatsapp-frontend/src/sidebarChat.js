import React from 'react'
import {Avatar} from '@mui/material';
import './sidebarChat.css'

function SidebarChat() {
    return (
        <div className="sidebarchat">
            <Avatar />
            <div className="sidebarchat__info">
                  <h2>Username</h2>
                  <p>this is last message!</p>
            </div>
        </div>
    )
}

export default SidebarChat
