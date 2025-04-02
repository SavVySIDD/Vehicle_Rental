import { useEffect, useState } from "react";

const Customers = () => {
  const [customers, setCustomers] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3306/")
      .then((response) => response.json())
      .then((data) => setCustomers(data))
      .catch((error) => console.error("Error fetching customers:", error));
  }, []);

  return (
    <div>
      <h2>Customer List</h2>
      <ul>
    {customers.map((customer) => (
    <li key={customer.customer_id}>
      {customer.first_name} {customer.last_name} - {customer.email} <br />
      Phone: {customer.phone_number} <br />
      Address: {customer.address} <br />
      DOB: {new Date(customer.date_of_birth).toDateString()} {/* Formats date */}
    </li>
    ))}
    </ul>
    </div>
  );
};

export default Customers;
