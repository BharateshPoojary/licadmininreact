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
        setTimeout(async () => {//Tobe removed
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
        }, 2000);//To be removed
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