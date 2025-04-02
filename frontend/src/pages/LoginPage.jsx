import { useState, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import UserContext from "../context/UserContext";

const LoginPage = () => {
  const { setUser } = useContext(UserContext);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [userData, setUserData] = useState(null);
  const [isSignup, setIsSignup] = useState(false); // Toggle between login and signup
  const navigate = useNavigate();

  // Signup fields
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [DateOfBirth, setDateOfBirth] = useState("");

  const handleLogin = async () => {
    try {
      const response = await axios.post("http://localhost:3306/login", { PhoneNumber: phoneNumber, password });
      localStorage.setItem("user", JSON.stringify(response.data.user));
      setUser(response.data.user);
      navigate("/profile");
      setUserData(response.data.user);
    } catch (error) {
      console.error("Login failed:", error.response?.data?.error || error.message);
    }
  };

  const handleSignup = async () => {
    try {
      const response = await axios.post("http://localhost:3306/signup", {
      PhoneNumber: phoneNumber,
      FirstName: firstName,
      LastName: lastName,
      Address: address,
      Email: email,
      DateOfBirth: DateOfBirth,
      Password: password,
    });

      alert(response.data.message); // Show signup success message
      setIsSignup(false); // Switch to login after signup
    } catch (error) {
      console.error("Signup failed:", error.response?.data?.error || error.message);
      alert(error.response?.data?.error || "Signup failed. Please try again.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white">
      <h1 className="text-3xl font-bold mb-6">{isSignup ? "Sign Up" : "Login"}</h1>

      <div className="bg-gray-800 p-6 rounded-lg shadow-lg w-96">
        {isSignup && (
          <>
            <input
              type="text"
              placeholder="First Name"
              className="w-full p-3 bg-gray-700 border border-gray-500 rounded mb-3 text-white text-lg"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
            <input
              type="text"
              placeholder="Last Name"
              className="w-full p-3 bg-gray-700 border border-gray-500 rounded mb-3 text-white text-lg"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
            <input
              type="email"
              placeholder="Email"
              className="w-full p-3 bg-gray-700 border border-gray-500 rounded mb-3 text-white text-lg"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="text"
              placeholder="Address"
              className="w-full p-3 bg-gray-700 border border-gray-500 rounded mb-3 text-white text-lg"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
            <input
              type="date"
              className="w-full p-3 bg-gray-700 border border-gray-500 rounded mb-3 text-white text-lg"
              value={DateOfBirth}
              onChange={(e) => setDateOfBirth(e.target.value)}
            />
          </>
        )}

        <input
          type="text"
          placeholder="Phone Number"
          className="w-full p-3 bg-gray-700 border border-gray-500 rounded mb-3 text-white text-lg"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          className="w-full p-3 bg-gray-700 border border-gray-500 rounded mb-3 text-white text-lg"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        {isSignup ? (
          <button 
            className="w-full p-3 bg-green-500 text-white rounded hover:bg-green-600 transition-all text-lg font-semibold hover:scale-105"
            onClick={handleSignup}
          >
            Sign Up
          </button>
        ) : (
          <button 
            className="w-full p-3 bg-blue-500 text-white rounded hover:bg-blue-600 transition-all text-lg font-semibold hover:scale-105"
            onClick={handleLogin}
          >
            Login
          </button>
        )}

        <button 
          className="w-full mt-4 text-blue-400 hover:text-blue-300 text-lg"
          onClick={() => setIsSignup(!isSignup)}
        >
          {isSignup ? "Already have an account? Login" : "New user? Sign Up"}
        </button>
      </div>

      {/* Show user details after successful login */}
      {userData && (
        <div className="mt-6 p-6 bg-gray-800 shadow-lg rounded-lg w-96 text-lg">
          <h2 className="text-xl font-semibold mb-3">
            Welcome, {userData.first_name} {userData.last_name}!
          </h2>
          <p><strong>Email:</strong> {userData.email}</p>
          <p><strong>Phone:</strong> {userData.phone_number}</p>
          <p><strong>Address:</strong> {userData.address}</p>
          <p><strong>DOB:</strong> {new Date(userData.DateOfBirth).toLocaleDateString()}</p>
        </div>
      )}
    </div>
  );
};

export default LoginPage;
