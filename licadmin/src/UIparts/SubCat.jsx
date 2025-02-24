import React, { useEffect, useState } from 'react'
import SubCatCard from './SubCatCard';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toggleSidebar } from '@/slice/sidebarslice';
import { useDispatch } from 'react-redux';
import { setLoading } from '@/slice/loading';
const SubCat = () => {

    // const { catid, catname, userId } = useParams();
    const { catid, catname } = JSON.parse(localStorage.getItem("catDetails"));
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [subCategories, setSubCategories] = useState([]);

    const fetchSubCatData = async () => {
        dispatch(setLoading(true))
        try {
            const response = await axios.get(`http://lic.swiftmore.in/LicAdmin/viewallapi.php?catId=${catid}`);
            console.log(response.data);
            const { Details } = response.data;
            setSubCategories(Details || []);
        } catch (error) {
            console.log(error.response?.data || error.message);
        } finally {
            dispatch(setLoading(false))
        }
    }
    useEffect(() => {
        fetchSubCatData();
    }, [])
    const handleTemplate = (tempName, tempImg) => {
        localStorage.setItem("tempCreds", JSON.stringify({ tempName, tempImg }));
        navigate(`/manufacturingpdf`);
        dispatch(toggleSidebar(""))
    }
    return (
        <div>
            <div className="body-wrapper-inner overflow-hidden" >
                <div className="container-fluid">
                    <div className="card ">
                        <div className="card-body ">
                            <h2 className=" fs-5  card-title fw-semibold mb-4" >{catname} Templates</h2>
                            <div className=" row row-cols-1 row-cols-md-3 g-3">
                                {subCategories.length > 0 ?
                                    subCategories.map((subcat) => (
                                        <div className='col'
                                            key={subcat.tempId} style={{ cursor: "pointer", }} onClick={() => handleTemplate(subcat.tempName, subcat.tempImg)}>
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