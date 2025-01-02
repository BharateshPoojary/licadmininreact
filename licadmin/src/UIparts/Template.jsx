import React, { useRef, useState, useTransition } from 'react'
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
    const [Address, setAddress] = useState('');
    const [Attachment, setAttachment] = useState({});
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
        /**File:{lastModified: 1731923509621
            lastModifiedDate: Mon Nov 18 2024 15:21:49 GMT+0530 (India Standard Time) 
            name: "commitment.png"
            size: 21448
            type: "image/png"
            webkitRelativePath: ""
            [[Prototype]]: File} */
        if (file) {
            const reader = new FileReader();//Asynchronous Operation: Reads files without blocking the main thread.
            // Supports Various File Formats: Text, binary data, and data URLs.
            reader.readAsDataURL(file);//Reads the file and encodes it as a base64 data URL
            reader.onload = (e) => {//Triggered when the file is successfully read.
                setIsUploadedPhoto(true)//user uploaded the image
                setShowModal(true); // Show the modal
                setImgUrl(e.target.result);//we are  setting the  base64 url to the modal state setImgUrl here we are showing this to user so that they can further crop the image  
                // console.log("Data", e.target.result);
            }
        } else {
            setIsUploadedPhoto(false)//user not uploaded the image
        }
    };
    const base64ToFile = (base64String, fileName) => {
        const [metadata, base64Data] = base64String.split(',');
        //base64String.split(','): Splits the Base64 string into two parts:
        // metadata: The first part of the string before the comma, which contains information like MIME type (e.g., "data:image/jpeg;base64").
        // base64Data: The actual Base64-encoded data after the comma, which represents the image content.
        const contentType = metadata.match(/:(.*?);/)[1]; // Extract MIME type (e.g., "image/jpeg")
        // Convert Base64 to binary data
        //The .match() method is a string method that matches a string against a regular expression (regex).
        //"data:image/jpeg;base64" this is our metadata we are matching using match method against a regex pattern 
        //: : Matches a literal colon (:) in the string.
        //(.*?): Parentheses ( ... ) Define a capturing group, which means the part of the match inside will be saved for later use.
        //.: Matches any character (except a newline).
        //*: Any no. of times the previous character comes it will consider that character.
        //?: Makes the match lazy, meaning it will stop at the first occurrence of the following token (;).
        //;:Matches a literal semicolon (;).
        //[0]:  includes the entire match  The entire match (":image/jpeg;").
        //[1]: The content of the first capturing group ("image/jpeg") It is the string that matched the regex pattern and it not includes : and ; in between and that is what the MIME/content type 
        const byteCharacters = atob(base64Data);//Decodes the Base64 string into raw binary string data.
        // console.log("Byte characters", byteCharacters);

        const byteNumbers = new Array(byteCharacters.length).fill(0).map((_, i) => byteCharacters.charCodeAt(i));
        //Creates a new array with a length equal to byteCharacters.length.
        //Fills the array with the value 0, initializing all elements to 0.
        //_ (underscore): Represents the current array element (ignored in this case because we only care about the index).
        //i: Represents the index of the current element.
        //byteCharacters is a string where each character represents a byte of binary data.i.e( 0 or 1 )
        //const byteCharacters = "ABC";
        //Each character has a corresponding Unicode value (e.g., A = 65, B = 66, C = 67).
        //Retrieves the Unicode value (or byte code) of the character at index i in the string byteCharacters.
        //.map((_, i) => byteCharacters.charCodeAt(i)) replaces each 0 in the array with the Unicode value of the corresponding character in byteCharacters.
        //The map will return  unicode value for each bytecaharcters which will be replaced by 0 in the newly formed array  
        // console.log("Byte Numbers", byteNumbers);
        const byteArray = new Uint8Array(byteNumbers);//This is one of the typed array not a normal js array 
        //typed arrays are designed to hold elements of a specific data type (like integers, floats, etc.), and these elements are stored in a contiguous block of memory. This allows for efficient manipulation of large datasets, especially binary data such as images, audio, and video.
        //An 8-bit unsigned integer is a type of integer that is represented using 8 bits (1 byte) of memory. 
        // e.g. 1111111 is 1 byte and  255 is 8-bit unsigned integer , Unsigned means that the integer cannot represent negative numbers.
        //8-bit Unsigned Integer: A number that is stored in 8 bits of memory, with a range from 0 to 255.
        // console.log("Byte Array", byteArray)
        // Create a File object

        return new File([byteArray], fileName, { type: contentType });
        //Creates a new File object, which is a representation of a file in the browser.
        //[byteArray]: The binary data for the file. 
        //filename is the name we provided like cropped-image.jpg
        //type is the contentType like jpg,png etc 
    }

    const handleCrop = () => {
        if (croppieInstance) {//accessing the state which inclues the croppie instance and here if condition is used so that if present then only it will be used further
            croppieInstance.result({//This method generates the cropped image based on the user's interactions with the Croppie widget.
                type: 'base64',// Specifies that the cropped result should be returned as a Base64 string.
                format: 'jpeg',//Specifies the image format for the result (JPEG in this case).
                quality: 1,//Specifies the quality of the image (1 = highest quality).
                size: { width: 150, height: 200 },//Specifies the dimensions of the cropped result.
            }).then((base64Image) => {//Once the cropped result is generated, it is returned as a Base64 string, which can be directly used or converted.
                setImagePreview(base64Image);//setting the cropped image as form upload photo 
                // console.log("Base 64", base64Image);
                setShowModal(false); // Close the modal
                setIsUploadedImg(true);
                uploadphotomessage.current.textContent = "";
                const fileName = "cropped-image.jpg"; // Choose a suitable name which will be stored in db
                const file = base64ToFile(base64Image, fileName);//converting the base 64 to again file object 
                console.log("New Cropped file", file);
                setAttachment(file);//storing the cropped image file which will be stored in db once the form is submitted
            });
        }
    };
    const handleFormSubmit = (e) => {
        startTransition(async () => {

            // console.log("Ima submit")
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
                formData.append('tempId', tempid);
                formData.append('Email', Email);
                formData.append('Address', Address);
                formData.append('Attachment', Attachment);
                console.log(Attachment)
                const post_response = await axios.post("http://lic.swiftmore.in/LicAdmin/insertDataapi.php", formData);
                console.log(post_response.data);
                const { id } = post_response.data;
                navigate(`/manufacturingpdf/${id}/${tempname}`);
            } catch (error) {
                console.log(error.response?.data || error.message);
            }
        })
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
                        <div className='text-center h2' style={{ fontWeight: "bold", color: "blue" }}>To Know More, Please Contact Our Distributor Partner:</div>
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
    )
}

export default Template