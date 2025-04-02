import { useState, useEffect, useContext } from "react";
import axios from "axios";
import UserContext from "../context/UserContext";
import { Link } from "react-router-dom";

const RentalHistory = () => {
  const { user } = useContext(UserContext);
  const [rentals, setRentals] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user && user.CustomerID) {
      axios
        .get(`http://localhost:3306/rentals/${user.CustomerID}`)
        .then((response) => {
          setRentals(response.data);
          setLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching rental history:", error);
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  }, [user]);

  return (
    <div className="p-5">
      <h1 className="text-2xl font-bold mb-4">Your Rental History</h1>

      {loading ? (
        <p>Loading...</p>
      ) : !user ? (
        <p>Please log in to view your rental history.</p>
      ) : rentals.length === 0 ? (
        <p>No rentals found</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="table w-full border-collapse border font-extrabold  border-gray-300 shadow-lg">
            <thead>
              <tr className="bg-black-100 text-pink-500">
                <th className="borde text-pink-500 p-2">#</th>
                <th className="border text-pink-500 p-2">Model</th>
                <th className="border text-pink-500 p-2">Rental Date</th>
                <th className="border text-pink-500 p-2">Total Cost ($)</th>
                <th className="border text-pink-500 p-2">Branch</th>
              </tr>
            </thead>
            <tbody>
              {rentals.map((rental, index) => (
                <tr key={rental.RentalID} className="hover:bg-gray-50">
                  <td className="border p-2 text-center">{index + 1}</td>
                  <td className="border p-2">{rental.Model}</td>
                  <td className="border p-2">{new Date(rental.RentalDate).toLocaleDateString()}</td>
                  <td className="border p-2 text-center">{Number(rental.TotalCost).toFixed(2)}</td>
                  <td className="border p-2">{rental.BranchName}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}


      <Link to='/addreview'> 
        <button className="btn btn-warning flex justify-center mt-5">
          Write A Review 
        </button>
      </Link>
    </div>
  );
};

export default RentalHistory;