import React, { useRef, useState, useTransition } from 'react'
import Croppie from 'croppie';
import './croppie.css';
import "./croppie.js";
import { Modal, Button } from 'react-bootstrap';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
const Register = () => {
    const navigate = useNavigate();
    const [Name, setName] = useState('');
    const [ARN_NO, setARN_NO] = useState('');
    const [Contact_No, setContact_No] = useState('');
    const [Email, setEmail] = useState('');
    const [Address, setAddress] = useState('');
    const [Attachment, setAttachment] = useState({});
    const [role, setRole] = useState('');
    const croppieRef = useRef(null);
    const [isUploadedImg, setIsUploadedImg] = useState(false);
    const [ImgUrl, setImgUrl] = useState('');
    const [croppieInstance, setCroppieInstance] = useState(null);
    const [imagePreview, setImagePreview] = useState('http://lic.swiftmore.in/LicAdmin/images/Profile%20Photo.png');
    const [showModal, setShowModal] = useState(false);
    const [isUploadedPhoto, setIsUploadedPhoto] = useState(false);
    const mobilenovalidationmessage = useRef();
    const uploadphotomessage = useRef();
    const [isPending, startTransition] = useTransition();
    const handleFileChange = (event) => {
        const file = event.target.files[0];
        console.log("File", file);
        if (file) {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = (e) => {
                setIsUploadedPhoto(true)
                setShowModal(true);
                setImgUrl(e.target.result);
            }
        } else {
            setIsUploadedPhoto(false)
        }
    };
    const base64ToFile = (base64String, fileName) => {
        const [metadata, base64Data] = base64String.split(',');
        const contentType = metadata.match(/:(.*?);/)[1];
        const byteCharacters = atob(base64Data);
        const byteNumbers = new Array(byteCharacters.length).fill(0).map((_, i) => byteCharacters.charCodeAt(i));
        const byteArray = new Uint8Array(byteNumbers);
        return new File([byteArray], fileName, { type: contentType });
    }
    const handleCrop = () => {
        if (croppieInstance) {
            croppieInstance.result({
                type: 'base64',
                format: 'jpeg',
                quality: 1,
                size: { width: 150, height: 200 },
            }).then((base64Image) => {
                setImagePreview(base64Image);
                setShowModal(false);
                setIsUploadedImg(true);
                uploadphotomessage.current.textContent = "";
                const fileName = "cropped-image.jpg";
                const file = base64ToFile(base64Image, fileName);
                console.log("New Cropped file", file);
                setAttachment(file);
            });
        }
    };
    const handleFormSubmit = (e) => {
        startTransition(async () => {
            e.preventDefault();
            if (!isUploadedPhoto) {
                console.log("not uploaded");
                uploadphotomessage.current.textContent = "please upload the photo";
                uploadphotomessage.current.style.color = "red";
                return;
            } else {
                uploadphotomessage.current.textContent = "";
            }
            mobilenovalidationmessage.current.style.color = "red";
            const convertedtonumData = Number(Contact_No);
            if (isNaN(convertedtonumData)) {
                mobilenovalidationmessage.current.textContent = "Please enter a valid number";
                console.log("Please enter a valid number");
                return;
            } else if (Contact_No.length > 10 || Contact_No.length < 10) {
                mobilenovalidationmessage.current.textContent = "Mobile number must be of  10 digit";
                console.log("Mobile number must be of  10 digit");
                return;
            }
            else {
                mobilenovalidationmessage.current.textContent = "";
            }
            try {
                const formData = new FormData();
                formData.append('Name', Name);
                formData.append('ARN_No', ARN_NO);
                formData.append('Contact_No', Contact_No);
                formData.append('Email', Email);
                formData.append('Address', Address);
                formData.append('Attachment', Attachment);
                formData.append('Role', role);
                console.log(Attachment)
                const post_response = await axios.post("http://lic.swiftmore.in/LicAdmin/insertDataapi.php", formData);
                console.log(post_response.data);
                const { id } = post_response.data;
                navigate(`/dashboard/${id}`);
            } catch (error) {
                console.log(error.response?.data || error.message);
            }
        })
    }
    return (
        <div>
            <div className="body-wrapper-inner overflow-hidden" >
                <div className="container-fluid">
                    <div className="card">
                        <div className="card-body">
                            <form className='mt-2 rounded' style={{
                                backgroundImage: "url('http://lic.swiftmore.in/LicAdmin/images/Co-Brand-NFO-LIC-MF-Manufacturing-fund-A4-03.png')",
                                backgroundSize: "cover",
                                backgroundRepeat: "no-repeat",
                                padding: "3vw",
                            }} onSubmit={handleFormSubmit}>
                                <div className='text-center h2' style={{ fontWeight: "bold", color: "blue" }}>Registration Form</div>
                                <div className="row">
                                    <div className="col-md-3 text-center">
                                        <label style={{ cursor: "pointer" }} className='position-relative'>
                                            <img src={imagePreview} className="img-fluid" style={isUploadedImg ? undefined : { filter: "blur(2px)" }} id="item-img-output" />

                                            <input type="file" className="position-absolute top-50 start-50 bottom-50 " name="Attachment" id="web-img-input" onChange={handleFileChange} />
                                        </label>
                                        <div className=" fw-bold fs-5 text-dark" style={isUploadedImg ? { display: 'none' } : { display: 'block' }}>Upload Profile</div>
                                        <p ref={uploadphotomessage}></p>
                                    </div>
                                    <div className="col-md-9">
                                        <div className="row">
                                            <div className="col-md-6">
                                                <div className="mb-3">
                                                    <label htmlFor="Name" className="form-label" >Name:</label>
                                                    <input type="text" className="form-control bg-light " id="Name" required onChange={(e) => setName(e.target.value)} />
                                                </div>
                                            </div>
                                            <div className="col-md-6">
                                                <div className="mb-3">
                                                    <label htmlFor="Role" className="form-label" >Role:</label>
                                                    <input type="text" className="form-control bg-light" id="role" required onChange={(e) => setRole(e.target.value)} />
                                                </div>
                                            </div>
                                            <div className="col-md-6">
                                                <div className="mb-3">
                                                    <label htmlFor="ARN" className="form-label" >ARN:</label>
                                                    <input type="text" className="form-control bg-light" id="ARN" required onChange={(e) => setARN_NO(e.target.value)} />
                                                </div>
                                            </div>
                                            <div className="col-md-6">
                                                <div className="mb-3">
                                                    <label htmlFor="Contact No" className="form-label" >Contact No:</label>
                                                    <input type="text" className="form-control bg-light" id="Contact No" required onChange={(e) => setContact_No(e.target.value)} />
                                                </div>
                                                <p id="mobilenovalidationmessage" ref={mobilenovalidationmessage}></p>
                                            </div>
                                            <div className="col-md-6">
                                                <div className="mb-3">
                                                    <label htmlFor="City" className="form-label" >City:</label>
                                                    <input type="text" className="form-control bg-light" id="City" required onChange={(e) => setAddress(e.target.value)} />
                                                </div>
                                            </div>
                                            <div className="col-md-6">
                                                <div className="mb-3">
                                                    <label htmlFor="Email" className="form-label" >Email:</label>
                                                    <input type="email" className="form-control bg-light" id="Email" onChange={(e) => setEmail(e.target.value)} required />
                                                </div>
                                            </div>
                                            <div className="col-md-12">
                                                <div className='text-center'>
                                                    <button type="submit" className="btn btn-primary px-lg-5" disabled={isPending}>Submit</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </form>
                            <Modal show={showModal} onHide={() => { setShowModal(false); setAttachment({}) }} onShow={() => {

                                const croppieElement = croppieRef.current;//Reference to the div of modal where we will display the image that needs to be cropped 
                                if (croppieElement) {
                                    // console.log("CroppieRef found:", croppieElement);
                                    // console.log("Image", ImgUrl);
                                    const instance = new Croppie(croppieElement, {// This is the constructor provided by the Croppie library to create a cropping widget.
                                        //croppieElement: This is a DOM element where the Croppie instance will be attached.
                                        viewport: {// Defines the cropping area
                                            width: 150,
                                            height: 200,
                                            type: 'square',
                                        },
                                        boundary: {//Defines the size of the outer container that holds the cropping area
                                            width: 300,
                                            height: 300,
                                        },

                                        enableOrientation: true,
                                    });
                                    setCroppieInstance(instance);//storing the created croppie instance to a state variable so that we can perform operations on cropped image later
                                    // console.log("Instance", instance)
                                    instance.bind({//This method attaches an image (ImgUrl) to the Croppie widget, which users will see and interact with.
                                        // url: The image source URL (e.g., a file path or an online image link) that will load into the cropping widget.
                                        url: ImgUrl,
                                    });

                                } else {
                                    console.log("no croppie found")
                                }

                            }
                            } centered>
                                <Modal.Header closeButton>
                                    <Modal.Title>Crop Image</Modal.Title>
                                </Modal.Header>
                                <Modal.Body>
                                    <div ref={croppieRef} ></div>
                                </Modal.Body>
                                <Modal.Footer>
                                    <Button variant="secondary" onClick={() => { setShowModal(false); setAttachment({}) }}>
                                        Close
                                    </Button>
                                    <Button variant="primary" onClick={handleCrop}>
                                        Crop
                                    </Button>
                                </Modal.Footer>
                            </Modal>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Register