import React from "react";
import { useSelector } from "react-redux";
const Mainwrapper = ({ children }) => {
    const { status } = useSelector(state => state.sidebarSlice);

    return (
        //body wrapper starts
        <div
            className={`page-wrapper ${status === "show" ? "show-sidebar" : "mini-sidebar"}`}
            id="main-wrapper"
            data-layout="vertical"
            data-navbarbg="skin6"
            data-sidebartype={`${status === "show" ? "full" : "mini-sidebar"}`}
            data-sidebar-position="fixed"
            data-header-position="fixed"

        >
            {children}
            {/* All wrapped components are passed as props to these components */}
        </div>
        //body wrapper ends
    );
};
export default Mainwrapper;