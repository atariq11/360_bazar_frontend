import Avatar from '@mui/material/Avatar';
import { LoginContext } from './ContextProvider/Context';
import React, { useContext, useState } from 'react';
import { IconContext } from 'react-icons';
import { Link } from 'react-router-dom';
import * as FaIcons from 'react-icons/fa';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { SidebarData } from './SidebarData';
import * as AiIcons from 'react-icons/ai';
import { useNavigate } from 'react-router-dom';

import { TextField } from "@mui/material";

const Profile = () => {

    const { loginData, setLoginData } = useContext(LoginContext);
    const [anchorEl, setAnchorEl] = React.useState(null);

    const [sidebar, setSidebar] = useState(false);
    const showSidebar = () => setSidebar(!sidebar);

    const history = useNavigate();

    const open = Boolean(anchorEl);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    }

    const handleClose = () => {
        setAnchorEl(null);
    }

    const logoutUser = async () => {

        const response = await fetch("/auth/sign-out", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem("usersdatatoken")}`,
                Accept: "application/json"
            },
            credentials: "include"
        }).then(data => data.json());

        if (response.success) {

            console.log("use logout");
            localStorage.removeItem("usersdatatoken");
            setLoginData("")
            history("/fpage");
        } else {
            console.log("error");
        }
    }

    return (
        <>

            <div>  <IconContext.Provider value={{ color: 'purple' }}>
                <div className='navbar'>
                    <Link to='#' className='menu-bars'>
                        <FaIcons.FaBars onClick={showSidebar} />
                    </Link>
                    <header>
                        <nav>
                            <h1 style={{ color: "white" }}>Welcome Affiliate Marketer</h1>

                            <div className="avtar">
                                {
                                    loginData.success ? (<Avatar
                                        style={{
                                            background: "salmon",
                                            fontWeight: "bold",
                                            textTransform: "capitalize"
                                        }}
                                        onClick={handleClick}> {
                                            loginData.data.fullName[0].toUpperCase()
                                        }
                                    </Avatar>) : (<Avatar style={{ background: "blue" }} onClick={handleClick} />)
                                }

                            </div>
                            <Menu
                                id="basic-menu"
                                anchorEl={anchorEl}
                                open={open}
                                onClose={handleClose}
                                MenuListProps={{
                                    'aria-labelledby': 'basic-button',
                                }}
                            >
                                {
                                    loginData.success ? (
                                        [
                                            <MenuItem onClick={() => {
                                                logoutUser()
                                                handleClose()
                                            }}>Logout</MenuItem>
                                        ]
                                    ) : (
                                        []
                                    )
                                }
                            </Menu>

                        </nav>
                    </header>
                </div>
                <nav className={sidebar ? 'nav-menu active' : 'nav-menu'}>
                    <ul className='nav-menu-items' onClick={showSidebar}>
                        <li className='navbar-toggle'>
                            <Link to='#' className='menu-bars'>
                                <AiIcons.AiOutlineClose />
                            </Link>
                        </li>
                        <li>
                            <h2 style={{ color: "white", fontSize: "small" }}>UserEmail:<br />{loginData.success && loginData.data.email}</h2>
                        </li>
                        {SidebarData.map((item, index) => {
                            return (
                                <li key={index} className={item.cName}>
                                    <Link to={item.path}>
                                        {item.icon}
                                        <span>{item.title}</span>
                                    </Link>
                                </li>
                            );
                        })}
                    </ul>
                </nav>
            </IconContext.Provider></div>
            <div className='profile'>
                <h2 class="mt-5 ml-5" style={{ color: 'black', marginLeft: "42%" }}>My Profile</h2>
                <div className="avatar">
                    {
                        loginData.success ? (<Avatar
                            style={{
                                background: "salmon",
                                fontWeight: "bold",
                                textTransform: "capitalize",
                                height: "10rem",
                                width: "10rem",
                                marginLeft: "40%"
                            }}
                            onClick={handleClick}> {
                                loginData.data.fullName[0].toUpperCase()
                            }
                        </Avatar>) : (<Avatar style={{ background: "blue" }} onClick={handleClick} />)
                    }
                    <div >
                        <h1 style={{ color: 'black' }} >Full Name</h1>
                        <TextField id="standard-basic" label={loginData.success && loginData.data.fullName} variant="standard" style={{ width: "80%" }} />


                        <h1 style={{ color: 'black' }}>Email Address</h1>
                        <TextField id="standard-basic" label={loginData.success && loginData.data.email} variant="standard" style={{ width: "80%", color: "black" }} />



                    </div>

                </div>
            </div>



        </>



    );
};
export default Profile;