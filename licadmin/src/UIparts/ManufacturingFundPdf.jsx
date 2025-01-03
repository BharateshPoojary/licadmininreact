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
const ManufacturingFundPdf = () => {
    const dispatch = useDispatch();
    const arnimageDiv = useRef();
    const arncontentDiv = useRef();
    const phonecontentDiv = useRef();
    const distributorInfo = useRef();
    const contactInfo = useRef();
    const phoneimageDiv = useRef();
    const locationcontentDiv = useRef();
    const locationimageDiv = useRef();
    const mailcontentDiv = useRef();
    const mailimageDiv = useRef();
    const hrlineref = useRef();
    const attachmentImageRef = useRef();
    const { loading } = useSelector(state => state.loadingSlice);
    const cardbody = useRef();
    const { userId } = useParams();
    const { tempImg } = JSON.parse(localStorage.getItem("Image"));
    const [getName, setGetName] = useState('');

    const [isHovered, setIsHovered] = useState(false);

    const [getRole, setRole] = useState('');
    const [tempImage, setTempImage] = useState('');

    const [buttonDisabled, setButtonDisabled] = useState(false);
    const getUserData = async (userId) => {
        try {
            const getresponse = await axios.get(`http://lic.swiftmore.in/LicAdmin/ManufacturingFundPdfApi.php?Id=${userId}`);
            return getresponse.data;
        } catch (error) {
            console.log(error.response?.data || error.message);
        }
    }


    const proxyFunction = async (proxyurl) => {
        try {
            const proxy_response = await axios.get(proxyurl);
            return proxy_response.data;
        } catch (error) {
            console.log(error.response?.data || error.message);
        }
    }
    const fetchImage = async () => {
        dispatch(setLoading(true))
        const templateImage = await proxyFunction(`http://lic.swiftmore.in/LicAdmin/proxy.php?url=${tempImg}`);
        setTempImage(`data:${templateImage.MimeType};base64,${templateImage.Content}`);
        dispatch(setLoading(false))
    }
    useEffect(() => {
        const fetchData = async () => {
            try {
                const { Name, Role } = await getUserData(userId);
                setGetName(Name);
                setRole(Role);
                fetchImage();
            } catch (error) {
                console.log(error.response?.data || error.message);
            }
        }
        fetchData();
    }, [userId])
    const DownloadPDF = async () => {
        setButtonDisabled(true);
        const element = cardbody.current;

        arnimageDiv.current.style.alignItems = "end";
        arncontentDiv.current.style.alignItems = "start";
        arncontentDiv.current.style.letterSpacing = "3px";

        phoneimageDiv.current.style.alignItems = "end";
        phonecontentDiv.current.style.alignItems = "start";
        phonecontentDiv.current.style.letterSpacing = "3px";

        locationimageDiv.current.style.alignItems = "end";
        locationcontentDiv.current.style.alignItems = "start";
        locationcontentDiv.current.style.letterSpacing = "3px";

        mailimageDiv.current.style.alignItems = "end";
        mailcontentDiv.current.style.alignItems = "start"
        mailimageDiv.current.style.marginTop = "10px";




        attachmentImageRef.current.style.width = "200px";
        attachmentImageRef.current.style.height = "230px";

        const canvas = await html2canvas(element, {
            useCORS: true, allowTaint: true, scale: 2,
            width: element.offsetWidth,
            height: element.offsetHeight,
        });
        arnimageDiv.current.style.alignItems = "center";
        arncontentDiv.current.style.alignItems = "center";
        arncontentDiv.current.style.letterSpacing = "0";

        phoneimageDiv.current.style.alignItems = "center";
        phonecontentDiv.current.style.alignItems = "center";
        phonecontentDiv.current.style.letterSpacing = "0";

        locationimageDiv.current.style.alignItems = "center";
        locationcontentDiv.current.style.alignItems = "center";
        locationcontentDiv.current.style.letterSpacing = "0";

        mailimageDiv.current.style.alignItems = "center";
        mailimageDiv.current.style.marginTop = "0";
        mailcontentDiv.current.style.alignItems = "center";


        distributorInfo.current.style.letterSpacing = "0";
        contactInfo.current.style.letterSpacing = "0";


        attachmentImageRef.current.style.height = "200px";


        const imgData = canvas.toDataURL("image/png");

        const pdf = new jsPDF("p", "mm", "a4");

        const pdfWidth = 210;
        const pdfHeight = 297;

        const imgWidth = 200;
        const imgHeight = 270;

        const xOffset = (pdfWidth - imgWidth) / 2;
        const yOffset = (pdfHeight - imgHeight) / 2;


        pdf.addImage(imgData, "PNG", xOffset, yOffset, imgWidth, imgHeight);

        pdf.save("page.pdf");
        setButtonDisabled(false);
    }
    return (
        <div className='container-fluid' >
            {loading ?
                <div style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    marginTop: "1rem"
                }}>  <Loader /></div>
                :
                <div >
                    {buttonDisabled ?
                        <div style={{
                            display: "flex",
                            justifyContent: "center",
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
                                className="nav-small-cap-icon fs-1 rounded-circle no-print "

                            ></Icon>
                        </div>}
                    <div className='position-relative'>
                        <img className="img-fluid" src={tempImage} alt="Image" width="100%" />
                        <div className='position-absolute bg-warning ' style={{
                            top: "50%",
                            left: "50%",
                            transform: "translate(-50%,30%)"

                        }} >
                            <div>
                                <div className='text-center ' ref={contactInfo}>With Warm regards</div>
                            </div>
                            <div >
                                <div className='text-center  text-primary' ref={distributorInfo}>{getName}</div>
                            </div>
                            <div ref={hrlineref}>
                                <hr className="border border-primary border-3 opacity-75" >
                                </hr>
                            </div>
                            <div className='d-flex align-items-center justify-content-center' ref={arncontentDiv}>
                                <p className=' bold '>{getRole}</p>
                            </div>
                        </div>
                    </div>
                </div>}
        </div>
    )
}

export default ManufacturingFundPdf