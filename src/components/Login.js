import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import { NavLink, useNavigate } from 'react-router-dom';
import { NotificationContainer, NotificationManager } from 'react-notifications';
const Login = () => {

    const [passShow, setPassShow] = useState(false);

    const [inpval, setInpval] = useState({
        email: "",
        password: "",
    });

    const history = useNavigate();

    const setVal = (e) => {

        const { name, value } = e.target;

        setInpval(() => {
            return {
                ...inpval,
                [name]: value
            }
        })
    };


    const loginuser = async (e) => {
        e.preventDefault();

        const { email, password } = inpval;

        if (email === "") {
            alert("email is required!");
        } else if (!email.includes("@")) {
            alert("includes @ in your email!");
        } else if (password === "") {
            alert("password is required!");
        } else if (password.length < 6) {
            alert("password must be 6 char!");
        } else {


            const response = await fetch("/auth/sign-in", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    email, password
                })
            }).then(data => data.json());

            if (response.success) {
                localStorage.setItem("usersdatatoken", res.result.token);
                history("/dash")
                setInpval({ ...inpval, email: "", password: "" });
            } else {
                NotificationManager.error('Error message', response.message, 5000);
            }
        }


    }


    return (
        <div classname="main">
            <div className="forml">
                <div className="box">
                    <h2>360-Bazar Affiliates login</h2>
                    <p>Thank you for your interest in the 360-Bazar affiliate program. Please provide the
                        following information to Login as an affiliate partner with 360-Bazar.</p>
                </div>
                <div className="form-body">
                    <div className="email">
                        <label className="form__label" htmlFor="email">Email </label><br />
                        <input type="email" id="email" className="form__input" name="email" value={inpval.email} onChange={setVal} />
                    </div>

                    <div className="password">
                        <label className="form__label" htmlFor="password">Password</label>
                        <div className="two">
                            <input className="form__inputpass" type={!passShow ? "password" : "text"} onChange={setVal} value={inpval.password} name="password" id="password" />
                            <div className="showpass" onClick={() => setPassShow(!passShow)}>
                                {!passShow ? "Show" : "Hide"}
                            </div>
                        </div>
                    </div>
                </div>
                <br />
                <br />
                <div class="footer">
                    <Link to='/dashboard' className='btn1' onClick={loginuser}><b>LOGIN</b></Link>
                </div>
                <br />
                <p>Don't have an Account?<Link to="/signup" id="signuplink">Sign Up</Link> </p>
                <p style={{ color: "black", fontWeight: "bold" }}>Forgot Password  <NavLink to="/password-reset">Click Here</NavLink> </p>
            </div>
            <NotificationContainer />
        </div>
    )
}
export default Login;
