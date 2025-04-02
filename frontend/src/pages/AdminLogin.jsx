import { useState } from "react";
import axios from "axios";

// AdminLogin component
const AdminLogin = ({ setAdmin }) => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [admin, setAdminDetails] = useState(null);  // Store admin details
  const [vehicleFormVisible, setVehicleFormVisible] = useState(false); // Toggle for vehicle form

  const handleLogin = async () => {
    try {
      const response = await axios.post("http://localhost:3306/admin/login", { PhoneNumber: phoneNumber, password });
      setAdminDetails(response.data.user);  // Store admin details
      setVehicleFormVisible(true);  // Show the form after login
    } catch (error) {
      console.error("Admin login failed:", error);
    }
  };

  const handleAddVehicle = async (vehicleDetails) => {
    try {
      const response = await axios.post("http://localhost:3306/admin/addVehicle", vehicleDetails);  // Assuming add vehicle endpoint
      console.log("Vehicle added:", response.data);
    } catch (error) {
      console.error("Error adding vehicle:", error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-base-100 p-6">
      <div className="bg-white shadow-xl rounded-2xl p-8 max-w-md w-full text-center">
        {!admin ? (
          <>
            <h1 className="text-3xl font-bold text-gray-800 mb-6">Admin Login</h1>
            <input
              type="text"
              placeholder="PhoneNumber"
              className="input input-bordered w-full mb-4"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
            />
            <input
              type="password"
              placeholder="Password"
              className="input input-bordered w-full mb-6"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button
              className="btn btn-primary w-full py-2 text-white"
              onClick={handleLogin}
            >
              Login
            </button>
          </>
        ) : (
          <>
          <div className="bg-amber-300">
            <h2 className="text-2xl font-bold from-neutral-950 mb-4 ">Welcome, {admin.FirstName}</h2>
            <p className="mb-4">Phone Number: {admin.PhoneNumber}</p>
            <p className="mb-4">Email: {admin.Email}</p>
            </div>
            {vehicleFormVisible && (
              <div className="mt-6">
                <h3 className="text-xl font-bold mb-4">Add Vehicle</h3>
                <VehicleForm handleAddVehicle={handleAddVehicle} />
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

// VehicleForm component to handle adding vehicles
const VehicleForm = ({ handleAddVehicle }) => {
  const [vehicleName, setVehicleName] = useState("");
  const [vehicleType, setVehicleType] = useState("");
  const [price, setPrice] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const vehicleDetails = {
      name: vehicleName,
      type: vehicleType,
      price: price,
    };
    handleAddVehicle(vehicleDetails);  // Send data to backend
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        type="text"
        placeholder="Vehicle Name"
        className="input input-bordered w-full"
        value={vehicleName}
        onChange={(e) => setVehicleName(e.target.value)}
      />
      <input
        type="text"
        placeholder="Vehicle Type"
        className="input input-bordered w-full"
        value={vehicleType}
        onChange={(e) => setVehicleType(e.target.value)}
      />
      <input
        type="number"
        placeholder="Price"
        className="input input-bordered w-full"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
      />
      <button type="submit" className="btn btn-primary w-full py-2 text-white">
        Add Vehicle
      </button>
    </form>
  );
};

export default AdminLogin;
