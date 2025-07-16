import Header from "../component/Header";
import "./Register.scss"
import { Link } from "react-router-dom";

function Register() {
    return (
        <>
            <Header />
            <div className="bodyRegister">
                <div className="Container">
                    <p>Would you want to become ??</p>
                    <div className="ChooseContainer">
                        <div className="LeftStudent">
                            <p>Student</p>
                            <img src="https://plus.unsplash.com/premium_photo-1663089667998-77622508cd27?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NTN8fHN0dWRlbnR8ZW58MHx8MHx8fDA%3D" alt="" />
                            <Link>Register Student</Link>
                        </div>
                        <div className="RightInstructor">
                            <p className="bigpp">Instructor</p>
                            <p>Publish the Course you want and get revenue from them</p>
                            <p>Teach what you know and help learners explore their interests, gain new skills, and advance their careers.</p>
                            <p>Expand your professional network, build your expertise, and earn money on each paid enrollment.</p>
                            <Link>Register Teacher</Link>
                        </div>
                    </div>

                </div>
            </div>

        </>
    )
}
export default Register;