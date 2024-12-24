import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { setStateCatId, setStateCatName } from '../slice/indexCatSlice';
import { useNavigate } from 'react-router-dom';

const Dashboardcard = ({ catId, catName, catIcon, emptyCategoryMessage }) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const handleIndex = () => {
        dispatch(setStateCatId(catId));
        dispatch(setStateCatName(catName));
        navigate('subcat');
    }
    return (
        <div>
            {emptyCategoryMessage ? (<h2>{emptyCategoryMessage}</h2>) :
                (<div className="domo-contect position-relative">
                    <div className="demos-view mt-3 pt-lg-3">
                        <div className="row justify-content-center">
                            <div className="border d-block rounded-1 mb-2 position-relative lp-demos-box overflow-hidden">
                                <img src={catIcon} alt="matdash-img" className="img-fluid" />
                                <a className="btn btn-primary lp-demos-btn position-absolute top-50 start-50 translate-middle" onClick={handleIndex}>{catName}</a>
                            </div>
                            <h5 className="mb-0 text-center fs-5">{catName}</h5>
                        </div>
                    </div>
                </div>
                )}
        </div>

    )
}

export default Dashboardcard