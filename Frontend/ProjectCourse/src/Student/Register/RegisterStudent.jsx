import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import { useState } from 'react';
import './RegisterStudent.scss';
import axios from 'axios'
import { data, useNavigate } from "react-router-dom"

function RegisterStudent() {

    //nhận biến và validate
    const [email, setEmail] = useState("");
    const [gender, setGender] = useState("");
    const [birthday, setBirthday] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const navigate = useNavigate();
    const role = "Student";
    const [emailExist, setEmailExist] = useState(false);


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
        if (emailExist) {
            newValidation.invalidEmail = false;
            newValidation.ErrorEmail = "Email đã tồn tại trong hệ thống";
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
            if (today - birthYear > 100) {
                newValidation.invalidBirthday = false;
                newValidation.ErrorBirthday = "You must be less than 100 years old";
                isValid = false;
            }
            if (today < birthYear) {
                newValidation.invalidBirthday = false;
                newValidation.ErrorBirthday = "birthday cannot be in the future";
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


    //nhận sau khi check ok 
    const handleSubmit = async (e) => {
        e.preventDefault();
        const emailToCheck = email;
        try {
            const res = await axios.get(`https://localhost:8888/api/check-email?email=${emailToCheck}`);
            const exists = res.data.exists;

            // cập nhật UI nếu cần
            setEmailExist(exists);
            if (exists) {
                setObjectInput(prev => ({
                    ...prev,
                    invalidEmail: false,
                    ErrorEmail: "Email đã được đăng ký"
                }));
            } else {
                try {
                    const formData = {
                        email: email,
                        password: password,
                        gender: gender,
                        DOB: birthday,
                        role: role

                    };
                    const res = await axios.post('https://localhost:8888/api/register', formData);
                    console.log(res.data);
                    const data = await res
                    if (res.status === 200) {
                        alert("vui Lòng kiểm tra email");
                        navigate('/verrifyEmail');
                    } else {
                        alert("Đăng kí thất bại");
                    }

                }
                catch (err) {
                    console.error("Error : " + err);
                }
            }

            return exists;
        } catch (err) {
            console.error("Lỗi kiểm tra email:", err);
            return false; //  throw nếu muốn xử lý lỗi ở ngoài
        }



    }




    return (
        <><div className="bigregisbody">
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
                                handleSubmit(e);
                            } else {
                                console.log("Form is invalid");
                            }
                        }}>Register</button>
                </form>

            </div>
        </div>
        </>
    );
}
export default RegisterStudent;