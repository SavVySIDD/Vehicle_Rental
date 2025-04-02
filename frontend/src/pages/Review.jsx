import { useState, useEffect } from "react";
import axios from "axios";

const Review = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("http://localhost:3306/reviews") // Fetch all reviews
      .then((response) => {
        setReviews(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching reviews:", error);
        setLoading(false);
      });
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Customer Reviews</h1>

      {loading ? (
        <p className="text-gray-500">Loading reviews...</p>
      ) : reviews.length === 0 ? (
        <p>No reviews available.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="table w-full border-collapse border font-bold text-gray-700 border-gray-300 shadow-lg">
            <thead>
              <tr className="bg-orange-200">
                <th className="border px-4 text-pink-500 py-2">#</th>
                <th className="border px-4 text-pink-500 py-2">Customer</th>
                <th className="border px-4 text-pink-500 py-2">Vehicle</th>
                <th className="border px-4 text-pink-500 py-2">Review</th>
                <th className="border px-4 text-pink-500 py-2">Rating</th>
                <th className="border px-4 text-pink-500 py-2">Date</th>
              </tr>
            </thead>
            <tbody>
              {reviews.map((review, index) => (
                <tr key={review.ReviewID} className="bg-white">
                  <td className="border px-4 py-2">{index + 1}</td>
                  <td className="border px-4 py-2">{review.FirstName} {review.LastName}</td>
                  <td className="border px-4 py-2">{review.Model}</td>
                  <td className="border px-4 py-2">{review.ReviewText || "No review text"}</td>
                  <td className="border px-4 py-2 text-center">{review.Rating}⭐</td>
                  <td className="border px-4 py-2">{new Date(review.ReviewDate).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Review;
