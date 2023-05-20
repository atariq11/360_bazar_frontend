import React, { useState } from 'react'
import { Link } from 'react-router-dom';
const Signup = () => {

    const [passShow, setPassShow] = useState(false);
    const [cpassShow, setCPassShow] = useState(false);

    const [inpval, setInpval] = useState({
        fname: "",
        email: "",
        password: "",
        cpassword: ""
    });
    const setVal = (e) => {

        const { name, value } = e.target;

        setInpval(() => {
            return {
                ...inpval,
                [name]: value
            }
        })
    };

    const addUserdata = async (e) => {

        e.preventDefault();
        const { fname, email, password, cpassword } = inpval;

        if (fname === "") {
            alert("fname is required!");
        }
        else if (!email.includes("@")) {
            alert("includes @ in your email!");
        } else if (password === "") {
            alert("password is required!");
        } else if (password.length < 6) {
            alert("password must be 6 char!");
        } else if (cpassword === "") {
            alert("cpassword is required!");
        }
        else if (cpassword.length < 6) {
            alert("confirm password must be 6 char!");
        } else if (password !== cpassword) {
            alert("pass and Cpass are not matching!");
        } else {



            const data = await fetch("/register ", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    fname, email, password, cpassword
                })
            });

            const res = await data.json();
            console.log(res.status);

            if (res.status === (201)) {
                alert(" user Registration done");
                setInpval({ ...inpval, fname: "", email: "", password: "", cpassword: "" })
            }

        }
    }
    return (

        <div classname="main">
            <div className="form">
                <div className="box">
                    <h2>360-Bazar Affiliates Signup</h2>
                    <p>Thank you for your interest in the 360-Bazar affiliate program. Please provide the
                        following information to sign-up as an affiliate partner with 360-Bazar.</p>
                </div>
                <div className="form-body">
                    <div className="username">
                        <label className="form__label" htmlFor="fname">Name </label><br />
                        <input className="form__input" type="text" id="firstName" name="fname" onChange={setVal} value={inpval.fname} />
                    </div>
                    <div className="email">
                        <label className="form__label" htmlFor="email">Email </label><br />
                        <input type="email" id="email" className="form__input" name="email" onChange={setVal} value={inpval.email} />
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

                    <div className="password">
                        <label className="form__label" htmlFor="password">Confirm Password</label>
                        <div className="two">
                            <input className="form__inputpass" type={!cpassShow ? "password" : "text"} value={inpval.cpassword} onChange={setVal} name="cpassword" id="cpassword" />
                            <div className="showpass" onClick={() => setCPassShow(!cpassShow)}>
                                {!cpassShow ? "Show" : "Hide"}
                            </div>
                        </div>
                    </div>
                </div>
                <br />
                <div class="footer">
                    <button className="btn1" onClick={addUserdata}><b>SIGN UP</b></button>
                </div>
                <br />
                <p>Already have an Account?<Link to="/login" id="loginlink">Login</Link> </p>
            </div>
        </div>

    )
}
export default Signup;
