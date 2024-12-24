import React from 'react'
import { useSelector } from 'react-redux'

const Template = () => {
    const { tempId, tempName, tempImg } = useSelector(state => state.tempSlice);
    console.log(tempId, tempName, tempImg)
    return (
        <div>
            <div className="card">
                <div className="card-body">
                    <div className="img-fluid">
                        <img width="100%" src={`http://lic.swiftmore.in/LicAdmin/${tempImg}`} alt={tempName} />
                    </div>
                    <form className='mt-2 rounded' style={{
                        backgroundImage: "url('http://lic.swiftmore.in/LicAdmin/images/Co-Brand-NFO-LIC-MF-Manufacturing-fund-A4-03.png')",
                        backgroundSize: "cover",
                        backgroundRepeat: "no-repeat",
                        padding: "3vw",

                    }}>

                        <div className="col-md-12">
                            <div className='text-center h2' style={{ fontWeight: "bold", color: "blue" }}>To Know More, Please Contact Our Distributor Partner:</div>
                        </div>
                        <div className="row">
                            <div class="col-md-3 text-center">
                                <label style={{ cursor: "pointer" }} className='position-relative'>
                                    <img src={`http://lic.swiftmore.in/LicAdmin/images/Profile%20Photo.png`} className="img-fluid" style={{ filter: "blur(2px)" }} id="item-img-output" />
                                    <div className="position-absolute top-50 start-50 bottom-50 fw-bold fs-5 text-dark">Upload Profile</div>
                                    <input type="file" className="position-absolute top-50 start-50 bottom-50 " name="Attachment" id="web-img-input" />
                                </label>
                            </div>
                            <div className="col-md-9">
                                <div className="row">
                                    <div className="col-md-12">
                                        <div className="mb-3">
                                            <label htmlFor="Name" className="form-label" >Name:</label>
                                            <input type="text" className="form-control bg-light " id="Name" />
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="mb-3">
                                            <label htmlFor="ARN" className="form-label" >ARN:</label>
                                            <input type="text" className="form-control bg-light" id="ARN" />
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="mb-3">
                                            <label htmlFor="Contact No" className="form-label" >Contact No:</label>
                                            <input type="text" className="form-control bg-light" id="Contact No" />
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="mb-3">
                                            <label htmlFor="City" className="form-label" >City:</label>
                                            <input type="text" className="form-control bg-light" id="City" />
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="mb-3">
                                            <label htmlFor="Email" className="form-label" >Email:</label>
                                            <input type="email" className="form-control bg-light" id="Email" />
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
                </div>
            </div>
        </div>
    )
}

export default Template