import React, { useEffect, useState } from 'react'
import { useNavigate, Link, useParams } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';


const ForgotPassword = () => {

    const { id, token } = useParams();

    const [password, setPassword] = useState("");

    const [message, setMessage] = useState("");

    const history = useNavigate();

    const userValid = async () => {

        const response = await fetch(`/auth/forgot-password/${id}/${token}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        }).then(data => data.json());

        if (response.success) {
            console.log("user valid")
        } else {
            history("*")
        }
    }

    const setval = (e) => {
        setPassword(e.target.value)
    }
    const sendpassword = async (e) => {
        e.preventDefault();

        if (password === "") {
            toast.error("password is required!", {
                position: "top-center"
            });
        } else if (password.length < 6) {
            toast.error("password must be 6 char!", {
                position: "top-center"
            });
        } else {

            const response = await fetch(`http://localhost:9786/auth/rest-password/${id}/${token}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ password })
            }).then(data => data.json());

            if (response.success) {
                setPassword("")
                setMessage(true)
            } else {
                alert("! Token Expired generate new LInk", {

                })
            }
        }
    }
    useEffect(() => {
        userValid()
    }, [])
    return (
        <div className="main">
            <div className="formpr">
                <div className="box1">
                    <h1>Enter your New Password</h1>
                </div>
                {message ? <p style={{ color: "green", fontWeight: "bold" }}>Password Succesfully Update </p> : ""}
                <div className="form-body">
                    <div className="email">
                        <label className="form__label" htmlFor="email">Password </label><br />
                        <input type="password" id="password" className="form__input" name="password" value={password} onChange={setval} />
                    </div>
                    <br />
                    <br />
                    <div className="footer">
                        <Link className='btn1' onClick={sendpassword}><b>SendPassword</b></Link>
                    </div>
                    <ToastContainer />
                </div>
            </div>
        </div>
    )
}

export default ForgotPassword
