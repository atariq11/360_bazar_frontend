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
const lowercaseList = 'abcdefghijklmnopqrstuvwxyz';
const uppercaseList = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const numbersList = '0123456789';
const symbolsList = "!@#$%^&*()?";

const Dashboard = () => {

    const { logindata, setLoginData } = useContext(LoginContext);

    const [data, setData] = useState(false);

    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const logoutuser = async () => {
        let token = localStorage.getItem("usersdatatoken");

        const res = await fetch("/logout", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": token,
                Accept: "application/json"
            },
            credentials: "include"
        });

        const data = await res.json();
        console.log(data);

        if (data.status == 201) {

            console.log("use logout");
            localStorage.removeItem("usersdatatoken");
            setLoginData(false)
            history("/fpage");
        } else {
            console.log("error");
        }
    }



    const history = useNavigate();

    const DashboardValid = async () => {
        let token = localStorage.getItem("usersdatatoken");

        const res = await fetch("/validuser", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": token
            }
        });

        const data = await res.json();

        if (data.status == 401 || !data) {
            history("*");
        } else {
            console.log("user verify");
            setLoginData(data)
            history("/dash");
        }
    }


    useEffect(() => {
        DashboardValid();
    }, [])

    const [sidebar, setSidebar] = useState(false);

    const showSidebar = () => setSidebar(!sidebar);

    const [promocode, setPromocode] = useState('');
    const [lowerCase, setLowerCase] = useState(true);
    const [upperCase, setUpperCase] = useState(true);
    const [numbers, setNumbers] = useState(true);
    const [symbols, setSymbols] = useState(true);
    const [promocodeLength, setPromocodeLength] = useState(8);
    const [selectedChoices, setSelectedChoices] = useState(['lowercase', 'uppercase', 'numbers', 'symbols']);

    useEffect(() => {
        generatePromocode();
    }, [promocodeLength]);

    const handleCheckbox = (type) => {
        let tempChoices = selectedChoices;
        if (tempChoices.includes(type)) {
            const index = tempChoices.indexOf(type);
            tempChoices.splice(index, 1);
        }
        else {
            tempChoices.push(type);
        }
        console.log(tempChoices);
        setSelectedChoices(tempChoices);
    }

    const generatePromocode = () => {

        let characterList = '';

        if (lowerCase) {
            characterList += lowercaseList;
        }
        if (upperCase) {
            characterList += uppercaseList;
        }
        if (numbers) {
            characterList += numbersList;
        }
        if (symbols) {
            characterList += symbolsList;
        }

        let tempPromocode = '';
        const characterListLength = characterList.length;

        for (let i = 0; i < promocodeLength; i++) {
            const characterIndex = Math.round(Math.random() * characterListLength);
            tempPromocode += characterList.charAt(characterIndex);
        }

        setPromocode(tempPromocode);
    }

    const copyPromocode = async () => {
        const copiedText = await navigator.clipboard.readText();
        if (promocode.length && copiedText !== promocode) {
            navigator.clipboard.writeText(promocode);
            alert('Promocode copied to clipboard');
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
                                    logindata.ValidUserOne ? <Avatar style={{ background: "salmon", fontWeight: "bold", textTransform: "capitalize" }} onClick={handleClick}>{logindata.ValidUserOne.fname[0].toUpperCase()}</Avatar> :
                                        <Avatar style={{ background: "blue" }} onClick={handleClick} />
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
                                    logindata.ValidUserOne ? (
                                        <>

                                            <MenuItem onClick={() => {
                                                logoutuser()
                                                handleClose()
                                            }}>Logout</MenuItem>
                                        </>
                                    ) : (
                                        <>

                                        </>
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
                            <h2 style={{ color: "white", fontSize: "small" }}>UserEmail:<br />{logindata ? logindata.ValidUserOne.email : ""}</h2>
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
                <h2 className='title1'>PromoCode Generator</h2>
                <div className="password-wrapper">
                    <div className="password-area">
                        <div className="password">
                            <h1>Click on Generate Promocode</h1>
                            <input type="text" value={promocode} />
                        </div>
                    </div>
                </div>
                <br /><br /><br />
                <div className="setting">
                    <h3>Customize your promocode</h3>
                    <div className="customize">
                        <div className="checkboxes">
                            <div className="left">
                                <div className="checkbox-field">
                                    <input type="checkbox" name="lower" id="lower" checked={lowerCase} disabled={selectedChoices.length === 1 && selectedChoices.includes("lowercase")} onChange={() => { setLowerCase(!lowerCase); handleCheckbox('lowercase'); }} />
                                    <label htmlFor="lower">Include LowerCase(a-z)</label>
                                </div>
                                <div className="checkbox-field">
                                    <input type="checkbox" name="upper" id="upper" checked={upperCase} disabled={selectedChoices.length === 1 && selectedChoices.includes('uppercase')} onChange={() => { setUpperCase(!upperCase); handleCheckbox('uppercase'); }} />
                                    <label htmlFor="upper">Include UpperCase(A-Z)</label>
                                </div>
                            </div>
                            <div className="right">
                                <div className="checkbox-field">
                                    <input type="checkbox" name="numbers" id="numbers" checked={numbers} disabled={selectedChoices.length === 1 && selectedChoices.includes('numbers')} onChange={() => { setNumbers(!numbers); handleCheckbox('numbers'); }} />
                                    <label htmlFor="numbers">Include Numbers(0-9)</label>
                                </div>
                                <div className="checkbox-field">
                                    <input type="checkbox" name="symbols" id="symbols" checked={symbols} disabled={selectedChoices.length === 1 && selectedChoices.includes('symbols')} onChange={() => { setSymbols(!symbols); handleCheckbox('symbols'); }} />
                                    <label htmlFor="symbols">Include Symbols(&-#)</label>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="password-length">
                    <h3>PromoCode Length</h3>
                    <div className="slider">
                        <p className="rangeValue">{promocodeLength}</p>
                        <div className="range">
                            <input type="range" min={8} max={40} defaultValue={promocodeLength} onChange={(event) => setPromocodeLength(event.currentTarget.value)} />
                        </div>
                    </div>
                </div>
                <div className="buttons">
                    <button type='button' onClick={copyPromocode}>Copy PromoCode</button>
                    <button type='button' onClick={generatePromocode}>Generate PromoCode</button>
                </div>
            </div>
            <ToastContainer />


        </>
    )
}

export default Dashboard
