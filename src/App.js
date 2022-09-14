import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./components/Layout/Layout";
import LandingPage from "./components/LandingPage/LandingPage";
import HotelOwnerRegisterLogin from "./components/HotelOwnerRegisterLogin/HotelOwnerRegisterLogin";
import HotelOverview from "./components/HotelOverview/HotelOverview";
import DashboardLayout from "./components/DashboardLayout/DashboardLayout";
import Bookings from "./components/Bookings/Bookings";
import Hotels from "./components/Hotels/Hotels";
import MyReservations from "./components/MyReservations/MyReservations";

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route exact path="/" element={<LandingPage />}></Route>
          <Route
            path="/hotel-owner-register-login"
            element={<HotelOwnerRegisterLogin />}
          ></Route>
          <Route path="/dashboard" element={<DashboardLayout />}>
            <Route path="hotel-overview" element={<HotelOverview />}></Route>
            <Route path="bookings" element={<Bookings />}></Route>
            <Route path="hotels" element={<Hotels />}></Route>
            <Route path="my-reservations" element={<MyReservations />}></Route>
          </Route>
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
