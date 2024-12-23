import React from "react";
const Mainwrapper = ({ children }) => {
    return (
        //body wrapper starts
        <div
            className="page-wrapper"
            id="main-wrapper"
            data-layout="vertical"
            data-navbarbg="skin6"
            data-sidebartype="full"
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