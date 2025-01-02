import React, { useEffect, useState } from 'react'
import "./cards.css";
import axios from "axios"
import Dashboardcard from './Dashboardcard.jsx';
import { useDispatch } from 'react-redux';
import { setLoading } from '@/slice/loading';
const Dashboard = () => {
    const dispatch = useDispatch();

    const [categories, setCategories] = useState([]);
    const fetchIndexData = async () => {
        dispatch(setLoading(true));


        try {
            const response = await axios.get("http://lic.swiftmore.in/LicAdmin/indexapi.php");
            const { Cat } = response.data;
            console.log(response.data);
            setCategories(Cat || []);
        } catch (error) {
            console.log(error.response?.data || error.message);
        } finally {
            dispatch(setLoading(false))
        }

    }
    useEffect(() => {
        fetchIndexData();
    }, [])
    return (
        <div>
            <div className="body-wrapper-inner overflow-hidden" >
                <div className="container-fluid">

                    <div className="row row-cols-1 row-cols-md-3 g-3" >
                        {
                            categories.length > 0 ?
                                categories.map((category) =>
                                (
                                    <div className='col ' key={category.catId}>
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