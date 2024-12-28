import React from 'react'
import { useSelector } from 'react-redux'
import InitialLoader from './InitialLoader';

const SubCatCard = ({ tempName, tempImg, emptysubcatmessage }) => {
    const { loading } = useSelector(state => state.loadingSlice);
    return (
        <div>
            {loading ? <InitialLoader /> :
                emptysubcatmessage ? (<h3>{emptysubcatmessage}</h3>) :
                    (<div className="card p-4 rounded shadow-lg border-left mb-4">
                        {/* onclick="viewTemp(<?= $temp['tempId'] ?>, '<?= $temp['tempName'] ?>')" */}
                        <div >
                            <img src={tempImg} className="card-img-top" alt={`${tempName}image`} />
                            <div className="card-body">
                                <h4 className="card-text text-primary fs-4">{tempName}</h4>
                            </div>
                        </div>
                    </div>)}
        </div>
    )
}

export default SubCatCard