import { Icon } from '@iconify/react/dist/iconify.js';
import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react'
import { useParams } from 'react-router-dom'
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import Loader from './Loader.jsx';
import { setLoading } from '@/slice/loading.js';
import { useDispatch, useSelector } from 'react-redux';
import arnicon from "../assets/images/text-document-line-icon.png"
import phoneicon from "../assets/images/phone-line-icon.png"
import locationicon from "../assets/images/maps-pin-line-icon.png";
import mailicon from "../assets/images/envelope-line-icon.png"
const ManufacturingFundPdf = () => {
    const dispatch = useDispatch();
    const arnimageDiv = useRef();
    const arncontentDiv = useRef();
    const phonecontentDiv = useRef();
    const phoneimageDiv = useRef();
    const locationcontentDiv = useRef();
    const locationimageDiv = useRef();
    const mailcontentDiv = useRef();
    const mailimageDiv = useRef();
    const hrlineref = useRef();
    const { loading } = useSelector(state => state.loadingSlice);
    const cardbody = useRef();
    const { id, tempname } = useParams();
    const { tempImg } = JSON.parse(localStorage.getItem("Image"));
    const [getName, setGetName] = useState('');
    const [getAddress, setGetAddress] = useState('');
    const [getEmail, setGetEmail] = useState('');
    const [isHovered, setIsHovered] = useState(false);
    const [getContact_No, setContact_No] = useState('');
    const [getARN_No, setARN_NO] = useState('');
    const [getAttachment, setAttachment] = useState('http://lic.swiftmore.in/LicAdmin/images/Profile%20Photo.png');
    const [BGImage, setBGImage] = useState('');
    const [tempImage, setTempImage] = useState('');
    const [attachmentImage, setAttachmentImage] = useState('');
    const [buttonDisabled, setButtonDisabled] = useState(false);
    const getUserData = async (id) => {
        try {
            const getresponse = await axios.get(`http://lic.swiftmore.in/LicAdmin/ManufacturingFundPdfApi.php?Id=${id}`);
            // console.log(getresponse.data);
            return getresponse.data;
        } catch (error) {
            console.log(error.response?.data || error.message);
        }
    }

    const convertImageToBase64 = async (url) => {
        try {
            const ImageUrlResponse = await axios.get(url, { responseType: "blob" });
            // console.log(ImageUrlResponse.data);
            const base64url = await convertblobToBase64(ImageUrlResponse.data);
            // console.log("URL CONVERTED TO BLOB", base64url);
            return base64url;
        } catch (error) {
            console.log(error.response?.data || error.message);
        }
    }

    const convertblobToBase64 = (blob) => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onloadend = () => {
                resolve(reader.result)
            }
            reader.onerror = (error) => {
                reject(error)
            }
            reader.readAsDataURL(blob)//It will trigger the onload end event if the blob is converted to base64 else error will be onerror will be triggered
        })
    }
    useEffect(() => {
        const fetchImage = async () => {
            dispatch(setLoading(true))
            const corsissueresolveurl = 'https://cors-anywhere.herokuapp.com/';
            const attachmentImage = await convertImageToBase64(corsissueresolveurl + getAttachment);
            setAttachmentImage(attachmentImage);
            const tempImage = await convertImageToBase64(`${corsissueresolveurl}http://lic.swiftmore.in/LicAdmin/${tempImg}`)
            setTempImage(tempImage)
            const attachmentBGImage = await convertImageToBase64(`${corsissueresolveurl}http://lic.swiftmore.in/LicAdmin/images/Co-Brand-NFO-LIC-MF-Manufacturing-fund-A4-03.png`)
            setBGImage(attachmentBGImage)
            dispatch(setLoading(false))
        }
        fetchImage();
    }, [getAttachment])

    useEffect(() => {
        const fetchData = async () => {
            const { Name, Address, Email, Contact_No, ARN_No, Attachment } = await getUserData(id);
            setAttachment(`http://lic.swiftmore.in/LicAdmin/${Attachment}`);
            setARN_NO(ARN_No);
            setContact_No(Contact_No);
            setGetEmail(Email);
            setGetAddress(Address);
            setGetName(Name);
        }
        fetchData();
    }, [id])
    const DownloadPDF = async () => {
        setButtonDisabled(true);
        const element = cardbody.current; // You can specify a specific element instead of the whole body.
        // Capture the content as a canvas
        arnimageDiv.current.style.alignItems = "end";
        arncontentDiv.current.style.alignItems = "start";
        phoneimageDiv.current.style.alignItems = "end";
        phonecontentDiv.current.style.alignItems = "start";
        locationimageDiv.current.style.alignItems = "end";
        locationcontentDiv.current.style.alignItems = "start";
        mailimageDiv.current.style.alignItems = "end";
        mailcontentDiv.current.style.alignItems = "start"
        hrlineref.current.style.marginTop = "10px";
        const canvas = await html2canvas(element, {
            useCORS: true, allowTaint: true, scale: 2, // Increase the scale for better quality
            width: element.offsetWidth,
            height: element.offsetHeight,
        });
        arnimageDiv.current.style.alignItems = "center";
        arncontentDiv.current.style.alignItems = "center";
        phoneimageDiv.current.style.alignItems = "center";
        phonecontentDiv.current.style.alignItems = "center";
        locationimageDiv.current.style.alignItems = "center";
        locationcontentDiv.current.style.alignItems = "center";
        mailimageDiv.current.style.alignItems = "center";
        mailcontentDiv.current.style.alignItems = "center";
        hrlineref.current.style.marginTop = "0";
        // document.body.appendChild(canvas); // Appends the canvas to the DOM
        // console.log("Original Dimensions:", element.offsetWidth, element.offsetHeight);
        // console.log("Canvas Dimensions:", canvas.width, canvas.height);

        // console.log("Canvas", canvas);

        // Convert the canvas to an image
        const imgData = canvas.toDataURL("image/png");
        // Create a PDF document
        const pdf = new jsPDF("p", "mm", "a4");
        const pdfWidth = 210; // A4 width in mm
        const pdfHeight = 297; // A4 height in mm
        const imgWidth = 190; // A4 width in mm
        const imgHeight = 270;
        // const pageHeight = 297; // A4 height in mm
        const xOffset = (pdfWidth - imgWidth) / 2; // Center horizontally
        const yOffset = (pdfHeight - imgHeight) / 2; // Center vertically on the first page
        // Add the image to the PDF
        // let heightLeft = imgHeight;
        let position = yOffset;
        pdf.addImage(imgData, "PNG", xOffset, position, imgWidth, imgHeight);
        // heightLeft -= pdfHeight;
        // while (heightLeft > 0) {
        //     position = -heightLeft + yOffset;
        //     pdf.addPage();
        //     pdf.addImage(imgData, "PNG", xOffset, position, imgWidth, imgHeight);
        //     heightLeft -= pdfHeight;
        // }
        // Download the PDF
        pdf.save("page.pdf");
        setButtonDisabled(false);
    }
    return (
        <div>
            {loading ?
                <div style={{
                    display: "flex",
                    justifyContent: "center", // camelCase property names
                    alignItems: "center",
                    marginTop: "1rem" // String for non-numeric values
                }}>  <Loader /></div>
                :
                <div className="card ">
                    {buttonDisabled ?
                        <div style={{
                            display: "flex",
                            justifyContent: "center", // camelCase property names
                            alignItems: "center",
                        }}>
                            <Icon
                                icon="line-md:downloading-loop"
                                className="nav-small-cap-icon fs-1 "
                            ></Icon></div> :
                        <div className='d-flex justify-content-end p-3 align-items-center '
                            style={{
                                cursor: "pointer",
                                backgroundColor: isHovered ? "#B48A22" : "#EEA227",
                                transition: "background-color 0.3s ease",
                            }}
                            onMouseEnter={() => setIsHovered(true)}
                            onMouseLeave={() => setIsHovered(false)}
                            onClick={DownloadPDF} >
                            <p className='fs-5'>Download PDF</p>
                            <Icon
                                icon="material-symbols:download"
                                className="nav-small-cap-icon fs-1   rounded-circle no-print "

                            ></Icon>
                        </div>}
                    <div className="card-body p-4" ref={cardbody}>
                        <div >
                            <img width="100%" src={tempImage} alt={tempname} className="img-fluid" />
                        </div>
                        <div className='row mt-2 rounded bgprint' style={{
                            backgroundImage: `url(${BGImage})`,
                            backgroundSize: "cover",
                            backgroundRepeat: "no-repeat",
                            padding: "3vw",

                        }} >
                            <div className="col-md-3">
                                <div className='d-flex align-items-center justify-content-center'>
                                    <img className="img-fluid" src={attachmentImage} alt="image" />
                                </div>
                            </div>
                            <div className="col-md-9">
                                <div className="col-md-12" >
                                    <div className='text-center h4'>To Know More Please Contact</div>

                                </div>
                                <div className="col-md-12">
                                    <div className='text-center h4 text-primary'>Distributer Partner:{getName}</div>
                                </div>
                                <div ref={hrlineref}>
                                    <hr className="border border-primary border-3 opacity-75" >
                                    </hr>
                                </div>
                                <div className='d-flex'>
                                    <div style={{
                                        display: 'flex',
                                        alignItems: 'center'
                                    }} ref={arnimageDiv}>
                                        <img src={arnicon} alt="ARN no" width="20px" height="20px" />
                                    </div>
                                    <div
                                        style={{
                                            display: 'flex',
                                            alignItems: 'center'
                                        }} ref={arncontentDiv}>
                                        <p className='fs-3 bold text-wrap text-break'>{getARN_No}</p>
                                    </div>
                                </div>


                                <div className='d-flex' >
                                    <div style={{
                                        display: 'flex',
                                        alignItems: 'center'
                                    }} ref={phoneimageDiv}>
                                        <img src={phoneicon} alt="phone no" width="20px" height="20px" />
                                    </div>
                                    <div
                                        style={{
                                            display: 'flex',
                                            alignItems: 'center'
                                        }} ref={phonecontentDiv}>
                                        <p className='fs-4 bold text-wrap text-wrap text-break'>{getContact_No}</p>
                                    </div>
                                </div>
                                <div className='d-flex'>
                                    <div style={{
                                        display: 'flex',
                                        alignItems: 'center'
                                    }} ref={locationimageDiv} >
                                        <img src={locationicon} alt="location" width="20px" height="20px" />
                                    </div>
                                    <div
                                        style={{
                                            display: 'flex',
                                            alignItems: 'center'
                                        }} ref={locationcontentDiv}>
                                        <p className='fs-4 bold text-wrap text-break'>{getAddress}</p>
                                    </div>
                                </div>
                                <div className='d-flex'>
                                    <div style={{
                                        display: 'flex',
                                        alignItems: 'center'
                                    }} ref={mailimageDiv}>
                                        <img src={mailicon} alt="mail" width="20px" height="20px" />
                                    </div>
                                    <div
                                        style={{
                                            display: 'flex',
                                            alignItems: 'center'
                                        }} ref={mailcontentDiv} >
                                        <p className='fs-5 bold text-wrap text-break'>{getEmail}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>}
        </div>
    )
}

export default ManufacturingFundPdf