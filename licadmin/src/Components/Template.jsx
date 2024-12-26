import React, { useRef, useState } from 'react'
import Croppie from 'croppie';
import './croppie.css';
import "./croppie.js";
import { Modal, Button } from 'react-bootstrap';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
const Template = () => {
    const navigate = useNavigate();
    const { tempid, tempname } = useParams();
    const { tempImg } = JSON.parse(localStorage.getItem("Image"));
    const [Name, setName] = useState('');
    const [ARN_NO, setARN_NO] = useState('');
    const [Contact_No, setContact_No] = useState('');
    const [Email, setEmail] = useState('');
    const [City, setCity] = useState('');
    const [Attachment, setAttachment] = useState({});
    const croppieRef = useRef(null);
    const [isUploadedImg, setIsUploadedImg] = useState(false);
    const [ImgUrl, setImgUrl] = useState('');
    const [croppieInstance, setCroppieInstance] = useState(null);
    const [imagePreview, setImagePreview] = useState('http://lic.swiftmore.in/LicAdmin/images/Profile%20Photo.png');
    const [showModal, setShowModal] = useState(false);
    const handleFileChange = (event) => {
        const file = event.target.files[0];

        console.log(file);
        if (file) {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = (e) => {
                setShowModal(true); // Show the modal
                setImgUrl(e.target.result);
            }
        }
    };
    const base64ToFile = (base64String, fileName) => {
        const [metadata, base64Data] = base64String.split(',');
        const contentType = metadata.match(/:(.*?);/)[1]; // Extract MIME type (e.g., "image/jpeg")

        // Convert Base64 to binary data
        const byteCharacters = atob(base64Data);
        const byteNumbers = new Array(byteCharacters.length).fill(0).map((_, i) => byteCharacters.charCodeAt(i));
        const byteArray = new Uint8Array(byteNumbers);

        // Create a File object
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
                console.log(base64Image);
                setShowModal(false); // Close the modal
                setIsUploadedImg(true);
                const fileName = "cropped-image.jpg"; // Choose a suitable name
                const file = base64ToFile(base64Image, fileName);//converting the base 64 to again file object 
                console.log("New Cropped file", file);
                setAttachment(file);//storing the cropped image file
            });
        }
    };
    const handleFormSubmit = async (e) => {
        console.log("Ima submit")
        e.preventDefault();
        try {
            const formData = new FormData();
            formData.append('Name', Name);
            formData.append('ARN_NO', ARN_NO);
            formData.append('Contact_No', Contact_No);
            formData.append('tempId', tempid);
            formData.append('Email', Email);
            formData.append('Address', City);
            formData.append('Attachment', Attachment);
            console.log(Attachment)
            const post_response = await axios.post("http://lic.swiftmore.in/LicAdmin/insertDataapi.php", formData);
            console.log(post_response.data);
            const { id } = post_response.data;
            navigate(`/manufacturingpdf/${id}`);
        } catch (error) {
            console.log(error.response?.data || error.message);
        }
    }
    return (
        <div>
            <div className="card">
                <div className="card-body">
                    <div className="img-fluid">
                        <img width="100%" src={`http://lic.swiftmore.in/LicAdmin/${tempImg}`} alt={tempname} />
                    </div>
                    <form className='mt-2 rounded' style={{
                        backgroundImage: "url('http://lic.swiftmore.in/LicAdmin/images/Co-Brand-NFO-LIC-MF-Manufacturing-fund-A4-03.png')",
                        backgroundSize: "cover",
                        backgroundRepeat: "no-repeat",
                        padding: "3vw",

                    }} onSubmit={handleFormSubmit}>

                        <div className="col-md-12">
                            <div className='text-center h2' style={{ fontWeight: "bold", color: "blue" }}>To Know More, Please Contact Our Distributor Partner:</div>
                        </div>
                        <div className="row">
                            <div className="col-md-3 text-center">
                                <label style={{ cursor: "pointer" }} className='position-relative'>
                                    <img src={imagePreview} className="img-fluid" style={isUploadedImg ? undefined : { filter: "blur(2px)" }} id="item-img-output" />
                                    <div className="position-absolute top-50 start-50 bottom-50 fw-bold fs-5 text-dark" style={isUploadedImg ? { display: 'none' } : { display: 'block' }}>Upload Profile</div>
                                    <input type="file" className="position-absolute top-50 start-50 bottom-50 " name="Attachment" id="web-img-input" onChange={handleFileChange} required />
                                </label>
                            </div>
                            <div className="col-md-9">
                                <div className="row">
                                    <div className="col-md-12">
                                        <div className="mb-3">
                                            <label htmlFor="Name" className="form-label" >Name:</label>
                                            <input type="text" className="form-control bg-light " id="Name" required onChange={(e) => setName(e.target.value)} />
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
                                    </div>
                                    <div className="col-md-6">
                                        <div className="mb-3">
                                            <label htmlFor="City" className="form-label" >City:</label>
                                            <input type="text" className="form-control bg-light" id="City" required onChange={(e) => setCity(e.target.value)} />
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="mb-3">
                                            <label htmlFor="Email" className="form-label" >Email:</label>
                                            <input type="email" className="form-control bg-light" id="Email" required onChange={(e) => setEmail(e.target.value)} />
                                        </div>
                                    </div>
                                    <div className="col-md-12">
                                        <div className='text-center'>
                                            <button type="submit" className="btn btn-primary px-lg-5">Submit</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </form>
                    <Modal show={showModal} onHide={() => { setShowModal(false); setAttachment({}) }} onShow={() => {

                        const croppieElement = croppieRef.current;
                        if (croppieElement) {
                            console.log("CroppieRef found:", croppieElement);
                            console.log("Image", ImgUrl);
                            const instance = new Croppie(croppieElement, {
                                viewport: {
                                    width: 150,
                                    height: 200,
                                    type: 'square',
                                },
                                boundary: {
                                    width: 300,
                                    height: 300,
                                },
                                enableExif: true,
                                enableOrientation: true,
                            });
                            setCroppieInstance(instance);
                            console.log("Instance", instance)
                            instance.bind({
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
    )
}

export default Template