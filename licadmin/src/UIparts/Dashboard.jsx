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
            setCategories(Cat || []);//this [] is important in || case so that if no data is returned the state will contain an empty array and map function will not return error 
        } catch (error) {
            console.log(error.response?.data || error.message);
        } finally {//finally block will be executed always irrespective of any one try or catch executed
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
                                        {/* This key attribute is important as it helps react to understand which content is changed */}
                                        <Dashboardcard
                                            catId={category.catId}
                                            catName={category.catName}
                                            catIcon={`http://lic.swiftmore.in/LicAdmin/${category.catIcon}`}
                                        />
                                    </div>
                                ))
                                : (<Dashboardcard emptyCategoryMessage={"No categories added"} />)}
                        {/* If map function will return empty array this component will be exceuted */}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Dashboard