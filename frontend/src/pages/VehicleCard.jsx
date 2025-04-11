import axios from "axios";
import { useContext } from "react";
import { FaCar, FaPalette, FaHashtag, FaRupeeSign } from "react-icons/fa";
import UserContext from "../context/UserContext";

const VehicleCard = ({ vehicle, refreshVehicles }) => {
  const { user } = useContext(UserContext);

  const handleRent = async () => {
    if (!user || !user.CustomerID) {
      alert("Please log in to rent a vehicle.");
      return;
    }

    console.log("Renting vehicle:", { CustomerID: user.CustomerID, VehicleID: vehicle.VehicleID });
    try {
      const response = await axios.post("http://localhost:3306/rent", {
        CustomerID: user.CustomerID,
        VehicleID: vehicle.VehicleID,
      });
      console.log("Response received:", response);
      if (response.status === 200) {
        alert("Vehicle rented successfully!");
        if (refreshVehicles) refreshVehicles();
      }
    } catch (error) {
      if (error.response && error.response.status === 409) {
        alert("Vehicle is already rented!");
      } else {
        alert("Failed to rent vehicle. Please try again later.");
      }
    }
  };

  return (
    <div className="card bg-base-100 w-full sm:w-96 md:w-80 lg:w-96 shadow-md hover:shadow-lg transition-all">
  <figure>
    <img
      src={`images/car_images/icon${vehicle.VehicleID}.jpeg`}
      alt={vehicle.Model}
      className="rounded-lg shadow-lg h-[150px] w-full object-cover"
    />
  </figure>
  <div className="card-body p-4">
    {/* Car Model */}
    <h2 className="card-title flex items-center gap-2 text-xl font-semibold">
      <FaCar className="text-green-400" />
      {vehicle.Model}
    </h2>

    {/* Vehicle Details */}
    <p className="flex items-center gap-2 text-sm text-gray-600">
      <FaPalette className="text-blue-400" />
      Color: <span className="font-medium">{vehicle.Color}</span>
    </p>
    <p className="flex items-center gap-2 text-sm text-gray-600">
      <FaHashtag className="text-yellow-400" />
      License: <span className="font-medium">{vehicle.LicencePlate}</span>
    </p>
    <p>
      Branch: <span className="font-medium text-pink-700">{vehicle.BranchName}</span>
    </p>
    <p className="flex items-center gap-2 font-bold text-lg text-green-300">
      <FaRupeeSign />
      {vehicle.PricePerDay} per day
    </p>

    {/* Rent Button with Hover Effect */}
    <div className="card-actions justify-center mt-4">
      <button
        className={`btn btn-outline btn-secondary w-full transition-all duration-200 flex items-center justify-center gap-2 ${
          vehicle.is_rented
            ? "bg-gray-600 cursor-not-allowed text-gray-300"
            : ""
        }`}
        onClick={handleRent}
        disabled={vehicle.is_rented}
      >
        {vehicle.is_rented ? "Rented" : "Rent Now"}
      </button>
    </div>
  </div>
</div>

  );
};

export default VehicleCard;
