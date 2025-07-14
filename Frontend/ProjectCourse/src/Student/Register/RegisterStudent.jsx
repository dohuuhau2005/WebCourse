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
        invalidConfirmPassword: true,
        ErrorEmail: "",
        ErrorBirthday: "",
        ErrorPassword: "",
        ErrorConfirmPassword: ""
    };
    const [objectInput, setObjectInput] = useState(defaultValidation);
    const isvalidInput = () => {
        let isValid = true;
        let newValidation = { ...defaultValidation };

        if (email === "" || !email.includes("@gmail.com")) {
            newValidation.invalidEmail = false;
            newValidation.ErrorEmail = "forgot @gmail.com domain";
            isValid = false;
        }
        if (birthday === "") {
            newValidation.invalidBirthday = false;
            newValidation.ErrorBirthday = "Please select your birthday";
            isValid = false;
        } else {
            const today = new Date().getFullYear();
            const birthYear = new Date(birthday).getFullYear();
            if (today - birthYear < 5) {
                newValidation.invalidBirthday = false;
                newValidation.ErrorBirthday = "You must be at least 5 years old";
                isValid = false;
            }
        }
        if (password === "" || password.length < 6 || password === " ") {
            newValidation.invalidPassword = false;
            newValidation.ErrorPassword = "At least 6 characters long and cannot be empty or whitespace";
            isValid = false;
        }
        if (confirmPassword !== password) {
            newValidation.invalidConfirmPassword = false;
            newValidation.ErrorConfirmPassword = "Confirm password does not match";
            isValid = false;
        }
        setObjectInput(newValidation);
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
                        {!objectInput.invalidEmail && <p className="invalid-feedback">{objectInput.ErrorEmail}</p>}
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Gender</label>
                        <select className="form-control" value={gender} onChange={(e) => setGender(e.target.value)}>
                            <option value="">---Select---</option>
                            <option value="Male">Male</option>
                            <option value="FeMale">FeMale</option>
                            <option value="Other">Other</option>

                        </select>
                        {!objectInput.invalidBirthday && <p className="invalid-feedback">{objectInput.ErrorBirthday}</p>}
                    </div>
                    <div className="mb-3">
                        <label className="form-label">BirthDay</label>
                        <input type="date" className={objectInput.invalidBirthday ? "form-control" : "form-control is-invalid"} placeholder="Enter your BirthDay" required
                            onChange={(e) => setBirthday(e.target.value)}
                        />
                        {!objectInput.invalidBirthday && <p className="invalid-feedback">{objectInput.ErrorBirthday}</p>}
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Password</label>
                        <input type="password" className={objectInput.invalidPassword ? "form-control" : "form-control is-invalid"} placeholder="Enter your Password" required
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        {!objectInput.invalidPassword && <p className="invalid-feedback">{objectInput.ErrorPassword}</p>}
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Confirm Password</label>
                        <input type="password" className={objectInput.invalidConfirmPassword ? "form-control" : "form-control is-invalid"} placeholder="Confirm your Password" required
                            onChange={(e) => setConfirmPassword(e.target.value)} />
                        {!objectInput.invalidConfirmPassword && <p className="invalid-feedback">{objectInput.ErrorConfirmPassword}</p>}
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