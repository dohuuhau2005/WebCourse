import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useEffect } from 'react';
import { useState } from 'react';
import './Profile.scss';
import axios from 'axios'
import { data, useNavigate } from "react-router-dom"
import Header from '../../component/Header';
function ProfileStudent() {

    //nhận biến và validate
    const [email, setEmail] = useState("");
    const [gender, setGender] = useState("");
    const [birthday, setBirthday] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const navigate = useNavigate();
    const role = "Student";
    const [emailExist, setEmailExist] = useState(false);
    const [idUser, setIdUser] = useState("");

    const [newemail, setNewEmail] = useState("");
    const [newgender, setNewGender] = useState("");
    const [newbirthday, setNewBirthday] = useState("");
    const [newpassword, setNewPassword] = useState("");
    const [newconfirmPassword, setNewConfirmPassword] = useState("");

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            try {
                const decodedToken = JSON.parse(atob(token.split('.')[1]));
                setEmail(decodedToken.email);
                setIdUser(decodedToken.id);
                console.log("User ID:", decodedToken.id);
                axios.get(`https://localhost:8888/api/GetUserByID/${decodedToken.id}`)
                    .then(response => {
                        if (response.data.success) {
                            const userData = response.data.user;
                            setGender(userData.gender);
                            setBirthday(userData.DOB);
                            console.log("User data fetched successfully:", userData.DOB);
                        }
                    });

            } catch (erro) {

                console.error("Error parsing token:", error);
            }
        }
    }, []);
    const check = () => {
        console.log("date :", newgender);
        console.log("date :", newemail);
        console.log("date :", newbirthday);
        console.log("date :", newpassword);
        console.log("date :", newconfirmPassword);
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

        const checkedEmail = newemail.trim();
        if (checkedEmail !== "") {
            if (!checkedEmail.includes("@gmail.com")) {
                newValidation.invalidEmail = false;
                newValidation.ErrorEmail = "forgot @gmail.com domain";
                isValid = false;
            }
        }
        if (emailExist) {
            newValidation.invalidEmail = false;
            newValidation.ErrorEmail = "Email đã tồn tại trong hệ thống";
            isValid = false;
        }

        const checkedBirthday = newbirthday.trim();
        if (checkedBirthday !== "") {
            const today = new Date().getFullYear();
            const birthYear = new Date(checkedBirthday).getFullYear();
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

        const checkedPassword = newpassword.trim();


        if (checkedPassword !== "") {
            if (newpassword.length < 6 || newpassword === " ") {
                newValidation.invalidPassword = false;
                newValidation.ErrorPassword = "At least 6 characters long and cannot be empty or whitespace";
                isValid = false;
            } if (newconfirmPassword !== newpassword) {
                newValidation.invalidConfirmPassword = false;
                newValidation.ErrorConfirmPassword = "Confirm password does not match";
                isValid = false;
            }
        };


        setObjectInput(newValidation);
        return isValid;

    }


    //nhận sau khi check ok 
    const handleSubmit = async (e) => {
        e.preventDefault();
        const emailToCheck = newemail;
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
                    const rawData = {
                        email: newemail,
                        password: newpassword,
                        gender: newgender,
                        DOB: newbirthday,
                        id: idUser

                    };
                    const formData = Object.fromEntries(
                        Object.entries(rawData).filter(([key, value]) => value !== "")
                    );
                    console.log("Form data to submit:", formData);
                    const res = await axios.post('https://localhost:8888/api/ChangeProfile', formData);

                    console.log(res.data);
                    const data = await res
                    if (res.status === 200) {
                        alert("Thay đổi thành công");
                        navigate("/ProfileStudent");

                    } if (res.status === 500) {
                        alert("Loi server");
                    }
                    if (res.status === 404) {
                        alert("không co thông tin nào để thay đổi");
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




    return (<>
        <Header />
        <div className="bigregisbody">
            <p >Profile</p>
            <div className="contanerCenter">
                <form className='Form_Register'>
                    <div className="mb-3">
                        <label className="form-label">Email</label>
                        <input type="email" className={objectInput.invalidEmail ? "form-control" : "form-control is-invalid"} placeholder="Enter your Email" required
                            value={email}
                            onChange={(e) => setNewEmail(e.target.value)} />
                        {!objectInput.invalidEmail && <p className="invalid-feedback">{objectInput.ErrorEmail}</p>}
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Gender</label>
                        <select className="form-control" value={gender} onChange={(e) => setNewGender(e.target.value)}>
                            <option value="">{gender}</option>
                            <option value="Male">Male</option>
                            <option value="FeMale">FeMale</option>
                            <option value="Other">Other</option>

                        </select>
                        {!objectInput.invalidBirthday && <p className="invalid-feedback">{objectInput.ErrorBirthday}</p>}
                    </div>
                    <div className="mb-3">
                        <label className="form-label">BirthDay</label>
                        <input type="date" className={objectInput.invalidBirthday ? "form-control" : "form-control is-invalid"} placeholder="Enter your BirthDay" required
                            value={newbirthday || birthday.split('T')[0]} onChange={(e) => setNewBirthday(e.target.value)}
                        />
                        {!objectInput.invalidBirthday && <p className="invalid-feedback">{objectInput.ErrorBirthday}</p>}
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Password</label>
                        <input type="password" className={objectInput.invalidPassword ? "form-control" : "form-control is-invalid"} placeholder="Enter your Password" required
                            onChange={(e) => setNewPassword(e.target.value)}
                        />
                        {!objectInput.invalidPassword && <p className="invalid-feedback">{objectInput.ErrorPassword}</p>}
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Confirm Password</label>
                        <input type="password" className={objectInput.invalidConfirmPassword ? "form-control" : "form-control is-invalid"} placeholder="Confirm your Password" required
                            onChange={(e) => setNewConfirmPassword(e.target.value)} />
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
                        }}>Save</button>
                </form>

            </div>
        </div>
    </>
    );
}
export default ProfileStudent;