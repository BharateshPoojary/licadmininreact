import React from 'react'
import user from "../assets/images/profile/user-1.jpg";
import { useDispatch } from 'react-redux';
import { toggleSidebar } from '@/slice/sidebarslice';
const Header = () => {
    const dispatch = useDispatch();
    const showSidebar = () => {
        dispatch(toggleSidebar("show"));
    }
    return (
        <div>
            <header className="app-header" >
                <nav className="navbar navbar-expand-lg  navbar-light ">
                    <ul className="navbar-nav  ">
                        {/* sidebaricon starts */}
                        <li className="nav-item d-block d-xl-none cursor-pointer" onClick={showSidebar}>
                            <a className="nav-link " id="headerCollapse" >
                                <i className="ti ti-menu-2" ></i>
                            </a>
                        </li>
                    </ul>
                    <ul className="navbar-nav ms-auto">
                        <li className="nav-item dropdown">
                            <a
                                className="nav-link"
                                id="drop2"
                                data-bs-toggle="dropdown"
                                aria-expanded="false"
                            >
                                <img
                                    src={user}
                                    alt="usericon"
                                    width="35"
                                    height="35"
                                    className="rounded-circle"
                                />
                            </a>
                            <div
                                className="dropdown-menu dropdown-menu-end dropdown-menu-animate-up"
                                aria-labelledby="drop2"

                            >
                                <div className="message-body" >
                                    <a
                                        href='#'
                                        className="btn btn-outline-primary mx-3 mt-2 d-block"
                                    >
                                        Logout
                                    </a>
                                </div>
                            </div>
                        </li>
                    </ul>
                </nav>
            </header>
        </div>
    )
}

export default Header