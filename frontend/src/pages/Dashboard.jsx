import { useState, useEffect, useContext } from "react";
import axios from "axios";
import VehicleCard from "./VehicleCard";
import UserContext from "../context/UserContext";

const Dashboard = () => {
  const { user } = useContext(UserContext);
  const [vehicles, setVehicles] = useState([]);
  const [branches, setBranches] = useState([]); // Store branches
  const [selectedBranch, setSelectedBranch] = useState(""); // Track selected branch

  // Fetch branches on component mount
  useEffect(() => {
    axios.get("http://localhost:3306/branches")
      .then(response => setBranches(response.data))
      .catch(error => console.error("Error fetching branches:", error));
  }, []);

  // Fetch vehicles based on selected branch
  useEffect(() => {
    const url = selectedBranch
      ? `http://localhost:3306/vehicles?branch=${selectedBranch}` // Fetch filtered vehicles
      : "http://localhost:3306/vehicles"; // Fetch all vehicles

    axios.get(url)
      .then(response => setVehicles(response.data))
      .catch(error => console.error("Error fetching vehicles:", error));
  }, [selectedBranch]); // Runs when selectedBranch changes

  return (
    <div className="p-5">
      <h1 className="text-3xl font-bold mb-4">Available Vehicles</h1>

      {/* Branch Filter Dropdown */}
      <div className="mb-4">
        <label className="font-semibold mr-2">Filter by Branch:</label>
        <select
          value={selectedBranch}
          onChange={(e) => setSelectedBranch(e.target.value)}
          className="border p-2 rounded"
        >
          <option value="">All Branches</option>
          {branches.map(branch => (
            <option key={branch.BranchID} value={branch.BranchID}>
              {branch.BranchName}
            </option>
          ))}
        </select>
      </div>

      {/* Vehicle List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {vehicles.map(vehicle => (
          <VehicleCard key={vehicle.VehicleID} vehicle={vehicle} user={user} />
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
