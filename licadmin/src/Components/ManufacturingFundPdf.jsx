import axios from 'axios';
import React, { useEffect } from 'react'
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom'

const ManufacturingFundPdf = () => {
    const { id } = useParams();
    const { tempImg, tempName } = useSelector(state => state.tempSlice);
    const getUserData = async (id) => {
        try {
            const getresponse = await axios.get(`http://lic.swiftmore.in/LicAdmin/ManufacturingFundPdfApi.php?Id=${id}`);
            console.log(getresponse);
        } catch (error) {
            console.log(error.response?.data || error.message);
        }
    }
    useEffect(() => {
        getUserData(id);
    }, [id])
    return (
        <div>
            <div className="card">
                <div className="card-body">
                    <div className="img-fluid">
                        <img width="100%" src={`http://lic.swiftmore.in/LicAdmin/${tempImg}`} alt={tempName} />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ManufacturingFundPdf