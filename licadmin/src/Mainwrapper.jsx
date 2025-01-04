import React from "react";
import { Toaster } from "react-hot-toast";
import { useSelector } from "react-redux";
const Mainwrapper = ({ children }) => {
    const { status } = useSelector(state => state.sidebarSlice);
    return (
        //body wrapper starts
        <div
            className={`page-wrapper  ${status === "show" ? "show-sidebar" : status === "hide" ? "mini-sidebar" : undefined}`}
            id="main-wrapper"
            data-layout="vertical"
            data-navbarbg="skin6"
            data-sidebartype={`${status === "show" ? "full" : status === "hide" ? "mini-sidebar" : "full"}`}
            data-sidebar-position="fixed"
            data-header-position="fixed"

        > <div><Toaster /></div>
            {children}
            {/* All wrapped components are passed as props to these components */}
        </div>
        //body wrapper ends
    );
};
export default Mainwrapper;