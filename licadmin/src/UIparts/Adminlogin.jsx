import Mainwrapper from '@/Mainwrapper'
import React, { useState } from 'react'
import axios from "axios";
import toast from 'react-hot-toast';
import { Icon } from '@iconify/react/dist/iconify.js';
import { useNavigate } from 'react-router-dom';
const Adminlogin = () => {
    const navigate = useNavigate();
    const [isButtonDisabled, setIsButtonDisabled] = useState(false);
    const [formData, setFormData] = useState({
        UserName: "",
        Password: ""
    })
    const handleChange = (e) => {
        const { id, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [id]: value
        }))
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsButtonDisabled(true);
        try {
            const response = await axios.post("http://lic.swiftmore.in/LicAdmin/adminloginapi.php", formData, {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                }
            }
            );
            console.log("Response", response.data);
            const { message, result, userType } = response.data;
            console.log(result);
            if (result === 1) {
                toast.success(message);
                localStorage.setItem("UserType", JSON.stringify({ userType }));
                navigate(`/dashboard`);
            } else {
                toast.error(message);
            }
        } catch (error) {
            toast.error("Error during login");
            console.log(error.response?.data || error.message);
        } finally {
            setIsButtonDisabled(false);
        }
    }
    return (
        <div>
            <Mainwrapper>
                <div
                    className="position-relative overflow-hidden text-bg-light min-vh-100 d-flex align-items-center justify-content-center">
                    <div className="d-flex align-items-center justify-content-center w-100">
                        <div className="row justify-content-center w-100">
                            <div className="col-md-8 col-lg-6 col-xxl-3">
                                <div className="card mb-0">
                                    <div className="card-body">
                                        <p className="text-center h4">Welcome Back</p>
                                        <form onSubmit={(e) => handleSubmit(e)}>
                                            <div className="mb-3">
                                                <label htmlFor="username" className="form-label">User Name</label>
                                                <input type="text" className="form-control" id="UserName" value={formData.UserName} onChange={(e) => handleChange(e)} required />
                                            </div>
                                            <div className="mb-4">
                                                <label htmlFor="password" className="form-label">Password</label>
                                                <input type="password" className="form-control" id="Password" value={formData.Password} onChange={(e) => handleChange(e)} required />
                                            </div>
                                            <button type="submit" className="btn btn-primary w-100 py-8 fs-4 mb-4 rounded-2" disabled={isButtonDisabled}>{isButtonDisabled ?
                                                <div className="d-flex justify-content-center">
                                                    <Icon
                                                        icon="eos-icons:loading"
                                                        className="fs-1 rounded-circle "

                                                    ></Icon></div> : "Sign In"}</button>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Mainwrapper>
        </div>
    )
}

export default Adminlogin