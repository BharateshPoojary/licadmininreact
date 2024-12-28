import React from 'react'
import { Icon } from '@iconify/react/dist/iconify.js'
import { NavLink } from 'react-router-dom';
import liclogo from '../assets/images/LIC-Logo.png';
import { useDispatch } from 'react-redux';
import { toggleSidebar } from '@/slice/sidebarslice';
const Sidebar = () => {
    const dispatch = useDispatch();
    const hideSidebar = () => {
        dispatch(toggleSidebar("hide"))
    }
    return (
        <div>
            {/* Sidebar Start */}
            <aside className="left-sidebar" >
                {/* Sidebar scroll */}
                <div>
                    <div className="brand-logo d-flex align-items-center justify-content-between">
                        <NavLink to="/" className="text-nowrap logo-img" >
                            <img src={liclogo} alt="lic-logo" className='img-fluid' />
                        </NavLink>
                        <div
                            className="close-btn d-xl-none d-block  cursor-pointer"
                            onClick={hideSidebar}

                        >
                            <i className="ti ti-x fs-8" ></i>
                        </div>
                    </div>
                    {/* Sidebar navigation */}
                    <nav className="sidebar-nav scroll-sidebar" data-simplebar="">
                        <ul id="sidebarnav">
                            <li className="nav-small-cap">
                                <Icon
                                    icon="solar:menu-dots-linear"
                                    className="nav-small-cap-icon fs-4"
                                ></Icon>
                                <span className="hide-menu" >Home</span>
                            </li>
                            <li className="sidebar-item" >
                                <NavLink className="sidebar-link" to="/" aria-expanded="false" >
                                    <Icon icon="solar:widget-add-line-duotone" ></Icon>
                                    <span className="hide-menu" >Dashboard</span>
                                </NavLink>
                            </li>
                            <li>
                                <span className="sidebar-divider lg"></span>
                            </li>
                        </ul>
                    </nav>
                    {/* Sidebar navigation ends*/}
                </div>
                {/* End Sidebar scroll */}
            </aside>
            {/* Sidebar Ends */}

        </div>
    );
}
export default Sidebar