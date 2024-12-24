import React from 'react'

const Dashboardcard = ({ catName, catIcon }) => {
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
                                            <img src={catIcon} alt="matdash-img" className="img-fluid" />
                                            <a target="_blank" href="../main/index3.html" className="btn btn-primary lp-demos-btn position-absolute top-50 start-50 translate-middle">Post</a>
                                        </div>
                                        <h5 className="mb-0 text-center fs-5">{catName}</h5>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div></div>
    )
}

export default Dashboardcard