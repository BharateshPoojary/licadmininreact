import React from 'react'
import user from "../assets/images/profile/user-1.jpg";
import "./cards.css";
import post from "../assets/images/man-with-megaphone-icon.png"
import leaflet from "../assets/images/leaflet-color-icon.png"
import gif from "../assets/images/file-gif-color-red-icon.png"
import video from "../assets/images/play-round-icon.png"
import flash from "../assets/images/stars-color-icon.png"
import mail from "../assets/images/envelope-line-icon.png"
const Dashboard = () => {
    return (
        <div>
            <div className="body-wrapper-inner overflow-hidden" >
                <div className="container-fluid">
                    <div className="row gx-5">
                        <div className='col-md-6 col-lg-3 mb-3'>
                            <div className="domo-contect position-relative">
                                <div className="demos-view mt-3 pt-lg-3">
                                    <div className="row justify-content-center">
                                        <div className="border d-block rounded-1 mb-2 position-relative lp-demos-box overflow-hidden">
                                            <img src={post} alt="matdash-img" className="img-fluid" />
                                            <a target="_blank" href="../main/index3.html" className="btn btn-primary lp-demos-btn position-absolute top-50 start-50 translate-middle">Post</a>
                                        </div>
                                        <h5 className="mb-0 text-center fs-5">Post</h5>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='col-md-6 col-lg-3 mb-3'>
                            <div className="row">
                                <div className="domo-contect position-relative">
                                    <div className="demos-view mt-3 pt-lg-3">
                                        <div className="row justify-content-center">

                                            <div className="border d-block rounded-1 mb-2 position-relative lp-demos-box overflow-hidden">
                                                <img src={leaflet} alt="matdash-img" className="img-fluid" />
                                                <a target="_blank" href="../main/index3.html" className="btn btn-primary lp-demos-btn position-absolute top-50 start-50 translate-middle">Leaflet</a>
                                            </div>
                                            <h6 className="mb-0 text-center fs-5">Leaflet</h6>

                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='col-md-6 col-lg-3 mb-3'>
                            <div className="row">
                                <div className="domo-contect position-relative">
                                    <div className="demos-view mt-3 pt-lg-3">
                                        <div className="row justify-content-center">

                                            <div className="border d-block rounded-1 mb-2 position-relative lp-demos-box overflow-hidden">
                                                <img src={gif} alt="matdash-img" className="img-fluid" />
                                                <a target="_blank" href="../main/index3.html" className="btn btn-primary lp-demos-btn position-absolute top-50 start-50 translate-middle">Gif</a>
                                            </div>
                                            <h6 className="mb-0 text-center fs-5">Gif</h6>

                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='col-md-6 col-lg-3 mb-3'>
                            <div className="row">
                                <div className="domo-contect position-relative">
                                    <div className="demos-view mt-3 pt-lg-3">
                                        <div className="row justify-content-center">

                                            <div className="border d-block rounded-1 mb-2 position-relative lp-demos-box overflow-hidden">
                                                <img src={video} alt="matdash-img" className="img-fluid" />
                                                <a target="_blank" href="../main/index3.html" className="btn btn-primary lp-demos-btn position-absolute top-50 start-50 translate-middle">Video</a>
                                            </div>
                                            <h6 className="mb-0 text-center fs-3">Video</h6>

                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='col-md-6 col-lg-3 mb-3'>
                            <div className="row">
                                <div className="domo-contect position-relative">
                                    <div className="demos-view mt-3 pt-lg-3">
                                        <div className="row justify-content-center">

                                            <div className="border d-block rounded-1 mb-2 position-relative lp-demos-box overflow-hidden">
                                                <img src={flash} alt="matdash-img" className="img-fluid" />
                                                <a target="_blank" href="../main/index3.html" className="btn btn-primary lp-demos-btn position-absolute top-50 start-50 translate-middle">Flash</a>
                                            </div>
                                            <h6 className="mb-0 text-center fs-3">Flash</h6>

                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='col-md-6 col-lg-3 mb-3'>
                            <div className="row">
                                <div className="domo-contect position-relative">
                                    <div className="demos-view mt-3 pt-lg-3">
                                        <div className="row justify-content-center">

                                            <div className="border d-block rounded-1 mb-2 position-relative lp-demos-box overflow-hidden">
                                                <img src={mail} alt="matdash-img" className="img-fluid" />
                                                <a target="_blank" href="../main/index3.html" className="btn btn-primary lp-demos-btn position-absolute top-50 start-50 translate-middle">Mailer</a>
                                            </div>
                                            <h6 className="mb-0 text-center fs-3">Mailer</h6>

                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </div >
    )
}

export default Dashboard