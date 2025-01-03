import { Icon } from '@iconify/react/dist/iconify.js';
import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react'
import { useParams } from 'react-router-dom'
import html2canvas from "html2canvas";
import { saveAs } from 'file-saver';
import Loader from './Loader.jsx';
import { setLoading } from '@/slice/loading.js';
import { useDispatch, useSelector } from 'react-redux';
import "./content.css"
const ManufacturingFundPdf = () => {

    const dispatch = useDispatch();
    const Image = useRef();
    const { loading } = useSelector(state => state.loadingSlice);
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
        const img = Image.current;
        const canvas = await html2canvas(img, {
            useCORS: true, allowTaint: true, scale: 2,
            width: img.offsetWidth,
            height: img.offsetHeight,
        });

        canvas.toBlob((blob) => {
            // console.log("Blob", blob)//It includes a blob file
            saveAs(blob, "licmf.png"); // Use file-saver to save the blob as an image
            // A method provided by the file-saver library, used to trigger a download of the Blob as a file.
            setButtonDisabled(false);
        }, "image/png");
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
                        <div className='d-flex justify-content-end p-3 align-items-center  my-3 rounded'
                            style={{
                                cursor: "pointer",
                                backgroundColor: isHovered ? "#B48A22" : "#EEA227",
                                transition: "background-color 0.3s ease",
                            }}
                            onMouseEnter={() => setIsHovered(true)}
                            onMouseLeave={() => setIsHovered(false)}
                            onClick={DownloadPDF} >
                            <p className='fs-5'>Download Image</p>
                            <Icon
                                icon="material-symbols:download"
                                className="nav-small-cap-icon fs-1 rounded-circle no-print "

                            ></Icon>
                        </div>}
                    <div ref={Image}>
                        <div style={{ position: 'relative', width: '100%', maxWidth: '600px', margin: 'auto' }}>
                            <img src={tempImage}
                                alt="Background"
                                style={{ width: '100%', height: 'auto' }} />
                            <div className=' content'
                                style={{
                                    position: 'absolute',
                                    top: '73%', // Adjust to position over the red-bordered content
                                    left: '50%',
                                    transform: 'translate(-50%, -50%)',
                                    textAlign: 'center',
                                    paddingLeft: '26px',
                                    paddingRight: "26px",
                                    zIndex: 2,
                                    whiteSpace: 'nowrap', // Prevents text wrapping,
                                    background: "linear-gradient(#FDF5D6,#F9E79E)"
                                }} >
                                <div>
                                    <div className='text-center ' >With Warm regards,</div>
                                </div>
                                <div >
                                    <div className='text-center  text-primary' >{getName},</div>
                                </div>
                                <div className='d-flex align-items-center justify-content-center' >
                                    <p className=' bold '>{getRole}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>}
        </div>
    )
}

export default ManufacturingFundPdf