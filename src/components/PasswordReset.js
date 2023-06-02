import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
const PasswordReset = () => {

    const [email, setEmail] = useState("");

    const [message, setMessage] = useState("");

    const setVal = (e) => {
        setEmail(e.target.value)
    }
    const sendLink = async (e) => {
        e.preventDefault();

        const response = await fetch("/auth/send-password-link", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ email })
        }).then(data => data.json());

        if (response.success) {
            setEmail("");
            setMessage(true)
        } else {
            toast.error("Invalid User", {
                position: "top-center"
            })
        }
    }

    return (
        <div className="main">
            <div className="formpr">
                <div className="box1">
                    <h1>Enter your Email</h1>
                </div>
                <div className="form-body">
                    {message ? <p style={{ color: "green", fontWeight: "bold" }}>password reset link send Successfully in Your Email</p> : ""}
                    <div className="email">
                        <label className="form__label" htmlFor="email">Email </label><br />
                        <input type="email" id="email" className="form__input" name="email" value={email} onChange={setVal} />
                    </div>
                    <br />
                    <br />
                    <div className="footer">
                        <Link className='btn1' onClick={sendLink}><b>SEND</b></Link>
                    </div>
                    <ToastContainer />
                </div>

            </div></div>
    )

}

export default PasswordReset
