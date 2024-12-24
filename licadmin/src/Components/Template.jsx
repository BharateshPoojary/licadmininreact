import React from 'react'
import { useSelector } from 'react-redux'

const Template = () => {
    const { tempId, tempName, tempImg } = useSelector(state => state.tempSlice);
    console.log(tempId, tempName, tempImg)
    return (
        <div>
            <div className="img-fluid">
                <img width="100%" src={`http://lic.swiftmore.in/LicAdmin/${tempImg}`} alt={tempName} />
            </div>
        </div>
    )
}

export default Template