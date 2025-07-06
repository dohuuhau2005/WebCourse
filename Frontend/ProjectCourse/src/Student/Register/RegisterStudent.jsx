import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import { useState } from 'react';
import './RegisterStudent.scss';
function RegisterStudent() {
    const [email, setEmail] = useState("");
    const [gender, setGender] = useState("");
    const [birthday, setBirthday] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const check = () => {
        console.log("date :", gender);
        console.log("date :", email);
        console.log("date :", birthday);
        console.log("date :", password);
        console.log("date :", confirmPassword);
    }
    const defaultValidation = {
        invalidEmail: true,
        invalidBirthday: true,
        invalidPassword: true,
        invalidConfirmPassword: true
    };
    const [objectInput, setObjectInput] = useState(defaultValidation);
    const isvalidInput = () => {
        let isValid = true;
        setObjectInput(defaultValidation);
        if (email === "" || !email.includes("@gmail.com")) {
            setObjectInput({ ...defaultValidation, invalidEmail: false });
            isValid = false;
        }
        if (birthday === "") {
            setObjectInput({ ...defaultValidation, invalidBirthday: false });
            isValid = false;
        }
        if (password === "" || password.length < 6 || password === " ") {
            setObjectInput({ ...defaultValidation, invalidPassword: false });
            isValid = false;
        }
        if (confirmPassword !== password) {
            setObjectInput({ ...defaultValidation, invalidConfirmPassword: false });
            isValid = false;
        }
        return isValid;

    }
    return (
        <>
            <div className="contanerCenter">
                <form className='Form_Register'>
                    <div className="mb-3">
                        <label className="form-label">Email</label>
                        <input type="email" className={objectInput.invalidEmail ? "form-control" : "form-control is-invalid"} placeholder="Enter your Email" required
                            onChange={(e) => setEmail(e.target.value)} />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Gender</label>
                        <select className="form-control" value={gender} onChange={(e) => setGender(e.target.value)}>
                            <option value="">---Select---</option>
                            <option value="Male">Male</option>
                            <option value="FeMale">FeMale</option>
                            <option value="Other">Other</option>

                        </select>
                    </div>
                    <div className="mb-3">
                        <label className="form-label">BirthDay</label>
                        <input type="date" className={objectInput.invalidBirthday ? "form-control" : "form-control is-invalid"} placeholder="Enter your BirthDay" required
                            onChange={(e) => setBirthday(e.target.value)}
                        />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Password</label>
                        <input type="password" className={objectInput.invalidPassword ? "form-control" : "form-control is-invalid"} placeholder="Enter your Password" required
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Confirm Password</label>
                        <input type="password" className={objectInput.invalidConfirmPassword ? "form-control" : "form-control is-invalid"} placeholder="Confirm your Password" required
                            onChange={(e) => setConfirmPassword(e.target.value)} />
                    </div>
                    <button type="submit" className="btn btn-primary"
                        onClick={(e) => {
                            e.preventDefault();
                            check();
                            if (isvalidInput()) {
                                console.log("Form is valid");
                                // Here you can add the logic to submit the form data
                            } else {
                                console.log("Form is invalid");
                            }
                        }}>Register</button>
                </form>

            </div>
        </>
    );
}
export default RegisterStudent;