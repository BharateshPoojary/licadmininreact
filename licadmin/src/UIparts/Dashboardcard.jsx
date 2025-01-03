import React from 'react'
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import InitialLoader from './InitialLoader';
const Dashboardcard = ({ catId, catName, catIcon, emptyCategoryMessage }) => {
    const { userId } = useParams();
    const { loading } = useSelector(state => state.loadingSlice);
    const navigate = useNavigate();
    const handleIndex = () => {
        navigate(`/subcat/${catId}/${catName}/${userId}`);
    }
    return (//do not use div or else it will add one more node to dom 
        //use <></> jsx fragments it will not add div to dom 
        //e.g here if I used div instead of jsx my loader not came properly as the react treated div  as column element and the entire skelton came in one col so when I used <></> jsx fargment it is not considered as column and my initialloader.jsx css worked properly which includes multiple column
        <>
            {loading ? (<InitialLoader />) :
                emptyCategoryMessage ? (<h2>{emptyCategoryMessage}</h2>) :
                    (
                        <div className="card">
                            <div className="domo-contect position-relative">
                                <div className="demos-view mt-3 pt-lg-3">
                                    <div className="row justify-content-center p-3">
                                        <div className=" d-block rounded-1 mb-2 position-relative lp-demos-box overflow-hidden">
                                            <img src={catIcon} alt="matdash-img" className="img-fluid" />
                                            <a className="btn btn-primary lp-demos-btn position-absolute top-50 start-50 translate-middle" onClick={handleIndex}>{catName}</a>
                                        </div>
                                        <h5 className="mb-0 text-center fs-5">{catName}</h5>
                                    </div>
                                </div>
                            </div>
                        </div>

                    )
            }
        </>
    )
}

export default Dashboardcard