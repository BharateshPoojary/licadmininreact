import React, { useEffect, useState } from 'react'
import "./cards.css";
import axios from "axios"
import Dashboardcard from './Dashboardcard.jsx';
const Dashboard = () => {
    const [categories, setCategories] = useState([]);
    const fetchIndexData = async () => {
        try {
            const response = await axios.get("http://lic.swiftmore.in/LicAdmin/indexapi.php");
            const { Cat } = response.data;
            console.log(response.data);
            setCategories(Cat || []);
        } catch (error) {
            console.log(error.response?.data || error.message);
        }
    }
    useEffect(() => {
        fetchIndexData();
    }, [])
    return (
        <div>
            <div className="body-wrapper-inner overflow-hidden" >
                <div className="container-fluid">
                    <div className="row gx-5" >
                        {
                            categories.length > 0 ?
                                categories.map((category) =>
                                (
                                    <div className='col-md-6 col-lg-3 mb-3' key={category.catId}>
                                        <Dashboardcard
                                            catId={category.catId}
                                            catName={category.catName}
                                            catIcon={`http://lic.swiftmore.in/LicAdmin/${category.catIcon}`}
                                        />
                                    </div>
                                ))
                                : (<Dashboardcard emptyCategoryMessage={"No categories added"} />)}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Dashboard