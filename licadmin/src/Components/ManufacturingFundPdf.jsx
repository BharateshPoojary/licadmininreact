import { Icon } from '@iconify/react/dist/iconify.js';
import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react'
import { useParams } from 'react-router-dom'
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
const ManufacturingFundPdf = () => {
    const cardbody = useRef();
    const { id, tempname } = useParams();
    const { tempImg } = JSON.parse(localStorage.getItem("Image"));
    const [getName, setGetName] = useState('');
    const [getAddress, setGetAddress] = useState('');
    const [getEmail, setGetEmail] = useState('');
    const [getContact_No, setContact_No] = useState('');
    const [getARN_No, setARN_NO] = useState('');
    const [getAttachment, setAttachment] = useState('http://lic.swiftmore.in/LicAdmin/images/Profile%20Photo.png');
    const getUserData = async (id) => {
        try {
            const getresponse = await axios.get(`http://lic.swiftmore.in/LicAdmin/ManufacturingFundPdfApi.php?Id=${id}`);
            console.log(getresponse.data);
            return getresponse.data;
        } catch (error) {
            console.log(error.response?.data || error.message);
        }
    }
    useEffect(() => {
        const fetchData = async () => {
            const { Name, Address, Email, Contact_No, ARN_No, Attachment } = await getUserData(id);
            setAttachment(Attachment);
            setARN_NO(ARN_No);
            setContact_No(Contact_No);
            setGetEmail(Email);
            setGetAddress(Address);
            setGetName(Name);
        }
        fetchData();
    }, [id])
    const DownloadPDF = async () => {
        const element = cardbody.current; // You can specify a specific element instead of the whole body.
        // Capture the content as a canvas
        const canvas = await html2canvas(element, { useCORS: true });
        // Convert the canvas to an image
        const imgData = canvas.toDataURL("image/png");
        // Create a PDF document
        const pdf = new jsPDF("p", "mm", "a4");
        const imgWidth = 210; // A4 width in mm
        const pageHeight = 297; // A4 height in mm
        const imgHeight = (canvas.height * imgWidth) / canvas.width;
        // Add the image to the PDF
        let heightLeft = imgHeight;
        let position = 0;
        pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
        while (heightLeft > 0) {
            position -= pageHeight;
            pdf.addPage();
            pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
            heightLeft -= pageHeight;
        }
        // Download the PDF
        pdf.save("page.pdf");

    }
    return (
        <div>
            <div className="card ">
                <div className='d-flex justify-content-end p-3 '>
                    <Icon
                        icon="material-symbols:download"
                        className="nav-small-cap-icon fs-1 bg-warning  rounded-circle"
                        style={{ cursor: "pointer" }} onClick={DownloadPDF}
                    ></Icon>
                </div>
                <div className="card-body p-4" ref={cardbody}>
                    <div >
                        <img width="100%" src={`http://lic.swiftmore.in/LicAdmin/${tempImg}`} alt={tempname} className="img-fluid" />
                    </div>
                    <div className='row mt-2 rounded' style={{
                        backgroundImage: "url('http://lic.swiftmore.in/LicAdmin/images/Co-Brand-NFO-LIC-MF-Manufacturing-fund-A4-03.png')",
                        backgroundSize: "cover",
                        backgroundRepeat: "no-repeat",
                        padding: "3vw",

                    }} >
                        <div className="col-md-3">
                            <div className='d-flex align-items-center justify-content-center'>

                                <img className="img-fluid" src={`http://lic.swiftmore.in/LicAdmin/${getAttachment}`} alt="image" />
                            </div>

                        </div>
                        <div className="col-md-9">
                            <div className="col-md-12" >
                                <div className='text-center h4'>To Know More Please Contact</div>

                            </div>
                            <div className="col-md-12">
                                <div className='text-center h4 text-primary'>Distributer Partner:{getName}</div>
                            </div>
                            <hr className="border border-primary border-3 opacity-75">
                            </hr>
                            <div className="col-md-12">
                                <div className="d-flex align-items-center">
                                    <Icon
                                        icon="solar:document-text-broken"
                                        className="nav-small-cap-icon fs-4"
                                    ></Icon>
                                    <p className='fs-4 bold'>{getARN_No}</p>
                                </div>
                            </div>
                            <div className="col-md-12">
                                <div className="d-flex align-items-center">
                                    <Icon
                                        icon="mynaui:telephone"
                                        className="nav-small-cap-icon fs-4"
                                    ></Icon>
                                    <p className='fs-4 bold'>{getContact_No}</p>
                                </div>
                            </div>
                            <div className="col-md-12">
                                <div className="d-flex align-items-center">
                                    <Icon
                                        icon="basil:location-solid"
                                        className="nav-small-cap-icon fs-4"
                                    ></Icon>
                                    <p className='fs-4 bold'>{getAddress}</p>
                                </div>
                            </div>
                            <div className="col-md-12">
                                <div className="d-flex align-items-center">
                                    <Icon
                                        icon="ic:round-email"
                                        className="nav-small-cap-icon fs-4"
                                    ></Icon>
                                    <p className='fs-4 bold'>{getEmail}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ManufacturingFundPdf