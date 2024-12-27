import React, { useEffect, useState } from 'react'
import SubCatCard from './SubCatCard';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
const SubCat = () => {
    const { catid, catname } = useParams();
    const navigate = useNavigate();
    const [subCategories, setSubCategories] = useState([]);

    const fetchSubCatData = async () => {
        try {
            const response = await axios.get(`http://lic.swiftmore.in/LicAdmin/viewallapi.php?catId=${catid}`);
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
    const handleTemplate = (tempId, tempName, tempImg) => {
        localStorage.setItem("Image", JSON.stringify({ tempImg }));
        navigate(`/template/${tempId}/${tempName}`);

    }
    return (
        <div>
            <div className="body-wrapper-inner overflow-hidden" >
                <div className="container-fluid">
                    <div className="card ">
                        <div className="card-body">
                            <div className="row">
                                <h2 className=" fs-5 card-title fw-semibold mb-4" >{catname} Templates</h2>
                                {subCategories.length > 0 ?
                                    subCategories.map((subcat) => (
                                        <div className="col-lg-4  col-sm-6 imageContainer" key={subcat.tempId} style={{ cursor: "pointer" }} onClick={() => handleTemplate(subcat.tempId, subcat.tempName, subcat.tempImg)}>
                                            <SubCatCard
                                                tempId={subcat.tempId}
                                                tempName={subcat.tempName}
                                                tempImg={`http://lic.swiftmore.in/LicAdmin/${subcat.tempImg}`}
                                            />
                                        </div>
                                    )) :
                                    (<SubCatCard emptysubcatmessage={`No ${catname} templates added `} />)}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SubCat