import React from 'react'
import { useSelector } from 'react-redux'
import InitialLoader from './InitialLoader';

const SubCatCard = ({ tempName, tempImg, emptysubcatmessage }) => {
    const { loading } = useSelector(state => state.loadingSlice);
    return (
        <>

            {loading ? <InitialLoader /> :
                emptysubcatmessage ? (<h3>{emptysubcatmessage}</h3>) :
                    (
                        <div className="card rounded shadow-lg border-left mb-4 p-3  h-100">
                            <div className="d-flex flex-column align-items-center justify-content-between my-5">
                                <div>
                                    <img src={tempImg} alt={`${tempName}image`} />
                                </div>
                                <div className="card-body " >
                                    <h4 className="card-text text-primary fs-4">{tempName}</h4>
                                </div>
                            </div>
                        </div>
                    )}
        </>
    )
}

export default SubCatCard