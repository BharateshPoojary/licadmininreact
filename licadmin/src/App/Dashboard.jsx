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
            {categories.map((category) =>
            (
                <Dashboardcard
                    key={category.catId}
                    catName={category.catName}
                    catIcon={`http://lic.swiftmore.in/LicAdmin/${category.catIcon}`}
                />
            ))}
        </div>
    )
}

export default Dashboard