import { useEffect, useState } from "react";
import axios from "axios";

const RentedVehicles = () => {
  const [vehicles, setVehicles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRentedVehicles = async () => {
      try {
        const response = await axios.get("http://localhost:3306/vehicles/rented");
        setVehicles(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching rented vehicles:", error);
        setLoading(false);
      }
    };

    fetchRentedVehicles();
  }, []);

  if (loading) return <p>Loading rented vehicles...</p>;

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Currently Rented Vehicles</h2>
      {vehicles.length === 0 ? (
        <p>No vehicles are currently rented.</p>
      ) : (
        <ul className="space-y-4">
          {vehicles.map((vehicle) => (
            <li key={vehicle.VehicleID} className="p-4 border rounded shadow">
              <p><strong>Vehicle ID:</strong> {vehicle.VehicleID}</p>
              <p><strong>Make:</strong> {vehicle.Make}</p>
              <p><strong>Model:</strong> {vehicle.Model}</p>
              <p><strong>Year:</strong> {vehicle.Year}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default RentedVehicles;
