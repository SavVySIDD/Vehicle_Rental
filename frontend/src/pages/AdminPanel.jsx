import { useState, useEffect } from "react";
import axios from "axios";

const AdminPanel = () => {
  const [vehicles, setVehicles] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/vehicles")
      .then(response => setVehicles(response.data))
      .catch(error => console.error("Error fetching vehicles:", error));
  }, []);

  return (
    <div className="p-5">
      <h1 className="text-2xl font-bold">Admin Panel</h1>
      <h2 className="text-xl mt-4">Manage Vehicles</h2>
      <ul>
        {vehicles.map(vehicle => (
          <li key={vehicle.vehicle_id} className="border p-3 mt-2">
            {vehicle.name} - {vehicle.is_rented ? "Rented" : "Available"}
            <button className="ml-3 bg-red-500 text-white p-2 rounded" onClick={() => axios.delete(`http://localhost:5000/vehicles/${vehicle.vehicle_id}`)}>
              Remove
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdminPanel;
