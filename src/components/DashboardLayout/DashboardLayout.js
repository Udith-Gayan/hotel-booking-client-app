import React from "react";
import Footer from "../Footer/Footer";
//import Spinner from "../Spinner/Spinner";
import Navbar from "../Navbar/Navbar";
import { Outlet } from "react-router-dom";
function DashboardLayout() {
  return (
    <div>
      <Navbar />
      {/* <Suspense fallback={<Spinner />}>
        <h1>kasun</h1>
      </Suspense> */}
      <Outlet />
      <Footer />
    </div>
  );
}

export default DashboardLayout;
