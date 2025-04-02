import { useState, useContext } from "react";
import axios from "axios";
import UserContext from "../context/UserContext";

const ReviewForm = ({ vehicleId }) => {
  const { user } = useContext(UserContext);
  const [reviewText, setReviewText] = useState("");
  const [rating, setRating] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!reviewText || !rating) {
      setMessage("Please provide both a review and a rating.");
      return;
    }

    if (!user || !user.CustomerID) {
      setMessage("You must be logged in to submit a review.");
      return;
    }

    try {
      const response = await axios.post("http://localhost:3306/reviews/add", {
        CustomerID: user.CustomerID, // ✅ Correct key assignment
        VehicleID: vehicleId,
        ReviewText: reviewText,
        Rating: rating,
      });

      setMessage(response.data.message);
      setReviewText("");
      setRating("");
    } catch (error) {
      setMessage("Error submitting review.");
      console.error("Review submission error:", error);
    }
  };

  return (
    <div className="p-6 bg-base-200 shadow-lg rounded-lg max-w-md mx-auto">
      <h2 className="text-xl font-bold mb-4">Leave a Review</h2>
      {message && <p className="text-green-600 mb-3">{message}</p>}

      <form onSubmit={handleSubmit} className="space-y-4">
        <fieldset className="fieldset w-full bg-base-200 border border-base-300 p-4 rounded-box">
          <legend className="fieldset-legend font-bold text-lg">Review Details</legend>

          <label className="fieldset-label font-medium">Your Review</label>
          <textarea
            className="input w-full p-2 border rounded"
            placeholder="Write your review here..."
            value={reviewText}
            onChange={(e) => setReviewText(e.target.value)}
          ></textarea>

          <label className="fieldset-label font-medium">Rating (1-5)</label>
          <input
            type="number"
            className="input w-full p-2 border rounded"
            placeholder="Enter rating (1-5)"
            value={rating}
            min="1"
            max="5"
            onChange={(e) => setRating(e.target.value)}
          />
        </fieldset>

        <button type="submit" className="btn btn-primary w-full">Submit Review</button>
      </form>
    </div>
  );
};

export default ReviewForm;
