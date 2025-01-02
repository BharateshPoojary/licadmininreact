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
                <nav >
                    <div className="d-flex justify-content-between">
                        <ul className="navbar-nav p-2">
                            {/* sidebaricon starts */}
                            <li className="nav-item d-block d-xl-none " onClick={showSidebar}>
                                <a className="nav-link " id="headerCollapse" >
                                    <i className="ti ti-menu-2 fs-3" ></i>
                                </a>
                            </li>
                        </ul>
                        <ul className="navbar-nav ms-auto ">

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
                                            Login
                                        </a>
                                    </div>
                                </div>
                            </li>
                        </ul>
                    </div>
                </nav>
            </header>
        </div>
    )
}

export default Header