import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { LoginContext } from './ContextProvider/Context';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Avatar from '@mui/material/Avatar';
import { Link } from 'react-router-dom';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import { SidebarData } from './SidebarData';
import { IconContext } from 'react-icons';
import { FcConferenceCall } from "react-icons/fc";
import { FcBearish } from "react-icons/fc";
import { FcLike } from "react-icons/fc";
import { FcSalesPerformance } from "react-icons/fc";


import { ToastContainer, toast } from 'react-toastify';

const Dashboard = () => {

    const { loginData, setLoginData } = useContext(LoginContext);
    const [promoCode, setPromoCode] = useState({ success: false });
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

    const validateDashboard = async () => {

        const response = await fetch("/users/self", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem("usersdatatoken")}`,
                Accept: "application/json"
            },
            credentials: "include"
        }).then(data => data.json());

        if (!response.success) {
            history("*");
        } else {
            console.log("user verify", response);
            getPromoCode(response);
            setLoginData(response)
            history("/dash");
        }
    }

    const getPromoCode = async ({ data }) => {

        const response = await fetch(`/promo-codes/add-fetch/${data.id}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem("usersdatatoken")}`,
                Accept: "application/json"
            },
            credentials: "include"
        }).then(data => data.json());

        if (!response.success) {
            history("*");
        } else {
            console.log("getPromoCode success");
            setPromoCode(response)
        }
    }

    useEffect(() => {
        validateDashboard();
    }, [])

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
            <br />

            <div className="cardBox" style={{ display: 'flex' }}>
                <div className="card">
                    <div>
                        <div className="cardName">Commission</div>
                        <div className="numbers">Rs 1,500.000</div>
                        <FcSalesPerformance id="money" size={40}></FcSalesPerformance>

                    </div>
                </div>

                <div className="card1">
                    <div>
                        <div className="cardName">Sales</div>
                        <div className="numbers">300+</div>
                        <FcBearish size={40}></FcBearish>

                    </div>
                </div>
                <div className="card2">
                    <div>
                        <div className="cardName">Users</div>
                        <div className="numbers">30+</div>
                        <FcConferenceCall size={40}></FcConferenceCall>

                    </div>
                </div>
                <div className="card3">
                    <div>
                        <div className="cardName">Rewards</div>
                        <div className="numbers">5+</div>
                        <FcLike size={40}></FcLike>

                    </div>
                </div>
            </div>


            <br />
            <div className='container1'>
                <h2 className='title1'>PromoCode : {promoCode && promoCode.success && promoCode.data.code}</h2>
            </div>
            <ToastContainer />
        </>
    )
}

export default Dashboard
