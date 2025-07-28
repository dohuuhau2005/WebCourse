import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import { useState } from 'react';
import './Login.scss';
import { Link, Navigate } from 'react-router-dom';
import { data, useNavigate } from "react-router-dom"
import axios from 'axios';
function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const [loginError, setLoginError] = useState(false);


    const HandleLogin = async (e) => {
        try {
            const res = await axios.post(`https://localhost:8888/api/Login`,
                {
                    email, password
                }
            );
            const success = res.data.success;
            localStorage.setItem("token", res.data.token);
            if (success === true) {
                setLoginError(false);
                const role = res.data.user?.role;
                if (role === "Student") {
                    navigate('/Home');
                }
                if (role === "Instructor") {

                }
            }
            else {
                setLoginError(true);
            }


        } catch (err) {
            console.error(err);
            setLoginError(true);
        }
    }

    return (
        <>
            <div className="Loginbody">
                <div className="Container">
                    <h1 className="titleLogin">Welcome to 1A3H</h1>
                    <div className="ContainerLogin">


                        <form className="formLogin">
                            <div className="mb-3">
                                <label className='form-label' htmlFor="email">Email:</label>
                                <input className='form-control' type="email" name="email" required onChange={(e) => setEmail(e.target.value)} />
                            </div>
                            <div className="mb-3">
                                <label className='form-label' htmlFor="password">Password:</label>
                                <input className='form-control' type="password" name="password" required onChange={(e) => setPassword(e.target.value)} />
                            </div>
                            <div className="mb-3 forgotPassword">
                                <Link to="" className="link">Forgot Password ?</Link>
                            </div>
                            <div className="mb-3 dontAccount">
                                <p>I don't have Account ? </p>{" "}<Link to="" className="link">Register</Link>
                            </div>
                            <div className="center">
                                <button type="submit" className="btn btn-primary" onClick={
                                    (e) => {
                                        e.preventDefault();
                                        HandleLogin(e);
                                    }
                                } >
                                    Login
                                </button>
                            </div>
                            {loginError &&
                                (<div className="alert alert-danger mt-3" role="alert">
                                    Password or Email is incorrect!
                                </div>

                                )
                            }


                        </form>

                    </div>
                </div>
            </div>
        </>
    )
}
export default Login;