import React, { Component, useContext, useState } from 'react'
import Avatar from '@mui/material/Avatar';
import { LoginContext } from './ContextProvider/Context';
import { IconContext } from 'react-icons';
import { Link } from 'react-router-dom';
import * as FaIcons from 'react-icons/fa';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { SidebarData } from './SidebarData';
import * as AiIcons from 'react-icons/ai';
import { useNavigate } from 'react-router-dom';
let scriptTag = null;
export class Chat extends Component {


    componentDidMount() {

        var kommunicateSettings =
        {
            "appId": "29ad8d82fd8f942d70b7c6eb15fefbfa7",
            "popupWidget": true,
            "automaticChatOpenOnNavigation": true
        };

        scriptTag = document.createElement("script");
        scriptTag.type = "text/javascript";
        scriptTag.async = true;
        scriptTag.src = "https://widget.kommunicate.io/v2/kommunicate.app";

        var h = document.getElementsByTagName("head")[0];
        h.appendChild(scriptTag);
        window.kommunicate = window.kommunicat || {};
        window.kommunicate._globals = kommunicateSettings;



    }

    componentWillUnmount() {
        document.getElementById("kommunicate-widget-iframe")?.remove()
    }

    render() {

        return (
            <div>


            </div>
        )
    }
}
export default Chat