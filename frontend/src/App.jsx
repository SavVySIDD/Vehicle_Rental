import { useContext } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import AdminLogin from "./pages/AdminLogin";
import Dashboard from "./pages/Dashboard";
import RentalHistory from "./pages/RentalHistory";
import AdminPanel from "./pages/AdminPanel";
import Navbar from "./components/Navbar";
import UserContext from "./context/UserContext";
import UserProfile from "./pages/UserProfile";
import Hero from "./pages/Hero";
import ReviewForm from "./pages/ReviewForm";
import Review from "./pages/Review";
import RentedVehicles from "./pages/RentedVehicles";

function App() {
  const { user, setUser, admin, setAdmin } = useContext(UserContext);

  return (
    <Router>
      <div className="min-h-screen bg-gray-900 text-white flex flex-col">
        <Navbar user={user} admin={admin} setUser={setUser} setAdmin={setAdmin} />
        <main className="flex-grow flex items-center justify-center p-4">
          <div className="w-full max-w-8xl bg-gray-800 shadow-lg rounded-lg p-6 border border-gray-700">
            <Routes>
              <Route path="/" element={<Hero />} />
              <Route path="/dashboard" element={<Dashboard/>}/>
              <Route path="/login" element={<LoginPage setUser={setUser} />} />
              <Route path="/admin/login" element={<AdminLogin setAdmin={setAdmin} />} />
              <Route path="/addreview" element={<ReviewForm/>}/>
              <Route path="/review" element={<Review/>}/>
              <Route 
                path="/rental-history" 
                element={user ? <RentalHistory user={user} /> : <Navigate to="/login" />} 
              />
              <Route 
                path="/admin-panel" 
                element={admin ? <AdminPanel /> : <Navigate to="/admin/login" />} 
              />
              <Route path="/rented" element={<RentedVehicles/>}/>
              <Route path="/profile" element={<UserProfile />} />
            </Routes>
          </div>
        </main>
      </div>
    </Router>
  );
}

export default App;
