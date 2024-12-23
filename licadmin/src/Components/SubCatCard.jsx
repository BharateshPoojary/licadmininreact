import React from 'react'

const SubCatCard = ({ tempName, tempImg, emptysubcatmessage }) => {

    return (
        <div>
            {emptysubcatmessage ? (<h3>{emptysubcatmessage}</h3>) :
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