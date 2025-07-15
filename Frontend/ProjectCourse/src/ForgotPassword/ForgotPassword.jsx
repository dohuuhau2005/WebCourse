import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import { useState } from 'react';
import './Forgotpassword.scss'
function ForgotPassword() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    return (
        <>
            <div className="bodyForgotPassword">
                <div className="Container">
                    <div className="ContainerForgot">
                        <form className='formForgotPassword'>
                            <div className="mb-3">
                                <label className="form-label" htmlFor="email">Email</label>
                                <input className='form-control' type="email" name="email" required onChange={(e) => setEmail(e.target.value)} />

                            </div>

                            <div className="mb-3">
                                <label className='form-label' htmlFor="password">Password:</label>
                                <input className='form-control' type="password" name="password" required onChange={(e) => setPassword(e.target.value)} />
                            </div>
                            <div className="mb-3">
                                <label className='form-label' htmlFor="password">ConfirmPassword:</label>
                                <input className='form-control' type="password" name="password" required onChange={(e) => setConfirmPassword(e.target.value)} />
                            </div>
                            <div className="btnChangePass">
                                <button type="submit" className="btn btn-primary"  >
                                    Change Password
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}
export default ForgotPassword;
