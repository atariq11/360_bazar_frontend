import React, { Component, useContext, useState } from 'react'
import Avatar from '@mui/material/Avatar';
import { LoginContext } from './ContextProvider/Context';
// import React, { useContext, useState } from 'react';
import { IconContext } from 'react-icons';
import { Link } from 'react-router-dom';
import * as FaIcons from 'react-icons/fa';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { SidebarData } from './SidebarData';
import * as AiIcons from 'react-icons/ai';
import { useNavigate } from 'react-router-dom';

export class Chat extends Component {


    componentDidMount() {

        (function (d, m) {
            var kommunicateSettings =
            {
                "appId": "29ad8d82fd8f942d70b7c6eb15fefbfa7",
                "popupWidget": true,
                "automaticChatOpenOnNavigation": true
            };

            var s = document.createElement("script");
            s.type = "text/javascript";
            s.async = true;
            s.src = "https://widget.kommunicate.io/v2/kommunicate.app";

            var h = document.getElementsByTagName("head")[0];
            h.appendChild(s);
            window.kommunicate = m;
            m._globals = kommunicateSettings;

        })(document, window.kommunicate || {});

        /* NOTE : Use web server to view HTML files as real-time update will not work if you directly open the HTML file in the browser. */

    }
    render() {

        return (
            <div>


            </div>
        )
    }
}
export default Chat