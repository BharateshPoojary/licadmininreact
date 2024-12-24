import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import SubCatCard from './SubCatCard';
import axios from 'axios';
const SubCat = () => {
    const [subCategories, setSubCategories] = useState([]);
    const { stateCatId, stateCatName } = useSelector(state => state.indexCatSlice);
    console.log(stateCatId, stateCatName);
    const fetchSubCatData = async () => {
        try {
            const response = await axios.get(`http://lic.swiftmore.in/LicAdmin/viewallapi.php?catId=${stateCatId}`);
            console.log(response.data);
            const { Details } = response.data;
            setSubCategories(Details || []);
        } catch (error) {
            console.log(error.response?.data || error.message);
        }

    }
    useEffect(() => {
        fetchSubCatData();
    }, [])
    return (
        <div>
            <div className="body-wrapper-inner overflow-hidden" >
                <div className="container-fluid">
                    <div className="card ">
                        <div className="card-body">
                            <div className="row">
                                <h2 className=" fs-5 card-title fw-semibold mb-4" >{stateCatName} Templates</h2>
                                {subCategories.length > 0 ?
                                    subCategories.map((subcat) => (
                                        <div className="col-lg-4  col-sm-6 imageContainer" key={subcat.tempId} style={{ cursor: "pointer" }}>
                                            <SubCatCard
                                                tempName={subcat.tempName}
                                                tempImg={`http://lic.swiftmore.in/LicAdmin/${subcat.tempImg}`}
                                            />
                                        </div>
                                    )) :
                                    (<SubCatCard emptysubcatmessage={`No ${stateCatName} templates added `} />)}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SubCat