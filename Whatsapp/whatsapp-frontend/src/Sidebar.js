import React from 'react'
import './sidebar.css'
import DonutLargeIcon from '@mui/icons-material/DonutLarge';
import {IconButton} from "@material-ui/core"
import ChatIcon from '@mui/icons-material/Chat';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { Avatar } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import SidebarChat from './sidebarChat';

function Sidebar() {
    return (
        <div className="sidebar">

            <div className="sidebar__header">

                   <Avatar src='https://www.pngkey.com/png/full/114-1149878_setting-user-avatar-in-specific-size-without-breaking.png'/>

                    <div className="sidebar__headerRight">

                       <IconButton>
                            <DonutLargeIcon />
                       </IconButton>
                       <IconButton>
                            <ChatIcon />
                       </IconButton>
                       <IconButton>
                            <MoreVertIcon />
                       </IconButton>

                    </div>


            </div>

            <div className="sidebar__search">
                         <div className="sidebar__searchContainer">
                              <SearchIcon />
                              <input type="text" placeholder="Search or Start new Chat!"/> 
                         </div>
            </div>

            <div className="sidebar__chats">
               <SidebarChat />
               <SidebarChat />
               <SidebarChat />
            </div>

        </div>
    )
}

export default Sidebar
