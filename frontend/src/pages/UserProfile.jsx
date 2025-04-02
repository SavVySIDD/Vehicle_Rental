import { useContext } from "react";
import UserContext from "../context/UserContext";
import { useNavigate } from "react-router-dom";

const UserProfile = () => {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();

  if (!user) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-200 p-6">
        <div className="bg-white shadow-lg rounded-lg p-6 text-center">
          <p className="text-red-500 text-lg font-semibold">No user logged in.</p>
          <button
            className="mt-4 bg-blue-600 hover:bg-blue-700 transition duration-300 text-white font-semibold py-2 px-4 rounded-lg"
            onClick={() => navigate("/login")}
          >
            Go to Login
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
      <div className="bg-white shadow-xl rounded-2xl p-8 max-w-md w-full text-center">
        <h2 className="text-3xl font-bold text-gray-800 mb-4">Welcome, {user.FirstName} {user.LastName}!</h2>
        <div className="bg-gray-50 p-4 rounded-lg shadow-sm">
          <p className="text-gray-700 text-lg"><strong>Email:</strong> {user.Email}</p>
          <p className="text-gray-700 text-lg"><strong>Phone:</strong> {user.PhoneNumber}</p>
          <p className="text-gray-700 text-lg"><strong>Address:</strong> {user.Address}</p>
          <p className="text-gray-700 text-lg"><strong>Date of Birth:</strong> {new Date(user.DateOfBirth).toLocaleDateString()}</p>
        </div>
        <button
          className="mt-6 bg-red-500 hover:bg-red-600 transition duration-300 text-white font-semibold py-2 px-6 rounded-lg w-full"
          onClick={() => {
            localStorage.removeItem("user");
            navigate("/login");
          }}
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default UserProfile;