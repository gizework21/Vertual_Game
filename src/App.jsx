
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Routes, Route, Navigate } from "react-router-dom";
import { initializeUser, selectUser } from "./redux/slice/userSlice";
import Login from "./pages/Login";
import Sidebar from "./layout/Sidebar";
import Topbar from "./layout/Topbar";
import OrderStatusCountDetail from "./pages/TryFectaTicketHistroy";
import ErrorPage  from "./pages/404";
import Main from './components/MainComponent';
import Animation from "./components/animation";
import Master2 from './components/master2';
import PostResultTry from "./components/PostResultTry";
import PostResultAnime from "./components/PostResultAnime";
import TryFectaTicketHistroy from "./pages/TryFectaTicketHistroy";
import TryFectaResults from "./pages/tryfectaResult";
import Dashboard from "./components/Dashboard";
import AnimationResultHistory from "./pages/animeDogResult"
import Pay from "./components/Pay";
import TryAnimation from "./components/TtyFectaAnimation";
import Spin from './components/spinComponent';
import KenoTicketHistroy from "./pages/KenoTicketHistroy";
import DogAnimeTicketHistroy from "./pages/DogAnimeTicketHistroy";
import HourseAnimeTicketHistroy from "./pages/HourseAnimeTicketHistroy";
import PayAnime from "./components/PayAnime";
import PayKeno from "./components/PayKeno";
import PayAnimeDog from "./components/PayAnimeDog";
import TicketInvoice from "./pages/TicketInvoice";
import DogAnime from "./components/animeDogComponent";
import  ParentComponent from './components/mach'
import  TryParentComponent from './components/machTryfectaResulat'
import UserForm  from './components/UserForm'
import Animepay  from './components/animePay'
import AnimeInvoice from './pages/animetioninvoice'

const App = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const user = useSelector(selectUser);
const vare=import.meta.env.VITE_REACT_APP_VITE_API_URL
   console.log("user----",vare)


  useEffect(() => {
    const fetchUser = async () => {
      await dispatch(initializeUser());
      setLoading(false);
    };

    fetchUser();
  }, [dispatch]);

  if (loading) {
    return null; // Or a loading spinner
  }

  return (
    <div>
      {user && user.jwt && <Topbar userRole={user.role} />}
      <div style={{ padding: "0px" }}>
        {user && user.jwt && <Sidebar userRole={user.role} />}
        <div style={{ marginLeft: user && user.jwt ? 200 : 0 }}>
          <Routes>
            {user && user.jwt ? (
              user.role === "cashier" ? (
                <>
                  <Route path="/" element={<Navigate to="/dashboard" />} />
                  <Route path="/dashboard" element={<Dashboard userRole={user.role} />} />

                  <Route path="/tryfecta/Home" element={<TryAnimation />} />
                  <Route path="/tryfecta/TicketResult" element={<PostResultTry />} />
                  <Route path="/tryfecta/TicketHistroy" element={<TryFectaTicketHistroy />} />
                  <Route path="/tryfecta/Results" element={<TryFectaResults />} />
                  <Route path="/animation/Home" element={<Animation />} />
                  <Route path="/OrderStatusCounDetail" element={<OrderStatusCountDetail />} />
                  <Route path="/Keno/Home" element={<Master2 />} />
                  <Route path="/Keno/pay" element={<PayKeno />} />
                  <Route path="/Keno/TicketHistroy" element={<KenoTicketHistroy />} />
                  <Route path="/animation/TicketResult" element={<PostResultAnime />} />
                  <Route path="/animation/TicketHistroyHourse" element={<HourseAnimeTicketHistroy />} />
                  <Route path="/animation/payHourse" element={<PayAnime />} />
                  <Route path="/animation/payDog" element={<PayAnimeDog />} />
                  <Route path="/animation/TicketHistroyDog" element={<DogAnimeTicketHistroy />} />
                  <Route path="/animation/ResultHistory" element={<AnimationResultHistory />} />
                  <Route path="/tryfecta/Dashboard" element={<Dashboard />} />
                  <Route path="/tryfecta/Pay" element={<Pay />} />
                  <Route path="/spin" element={<Spin />} />
                  <Route path="/tryfecta/Pay" element={<Pay />} />
                  <Route path="/ticketInvoice" element={<TicketInvoice />} />
                  <Route path="/mache" element={<ParentComponent />} />
                  <Route path="/tryfectamache" element={<TryParentComponent />} />
                  <Route path="/Animepay" element={<Animepay />} />
                  <Route path = "/animeInvoice" element= {<AnimeInvoice/>} />

                </>
              ) : user.role === "Manager" ? (
                <>
                  <Route path="/" element={<Navigate to="/dashboard" />} />
                  <Route path="/dashboard" element={<Dashboard userRole={user.role} />} />
                </>
              ) : null
            ) : (
              <Route path="/" element={<Login />} />
            )}
            <Route path="signup" element={<UserForm />} />
            <Route path="/*" element={<ErrorPage />} />
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default App;
