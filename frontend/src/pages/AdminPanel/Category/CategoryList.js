import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component"; // Import DataTable from react-data-table-component
import { fetchUtils, TextField } from "react-admin"; // If you need to fetch data using the admin dataProvider

const OrderList = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch order data (you can use your own data fetching logic here)
  useEffect(() => {
    // Example fetch function
    const fetchOrders = async () => {
      try {
        const response = await fetchUtils.fetchJson(
          "http://localhost:8080/api/orders"
        ); // Replace with your API endpoint
        setData(response.json); // Assuming the response data is in response.json
        setLoading(false);
      } catch (error) {
        console.error("Error fetching orders:", error);
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  console.log("data", data);

  // Define columns for the React Data Table
  const columns = [
    {
      name: "ID",
      selector: "id",
      sortable: true,
      cell: (row) => <TextField record={row} source="id" />,
    },
    {
      name: "date",
      selector: "date",
      cell: (row) => <TextField record={row} source="date" />,
    },
    {
      name: "Price",
      selector: "price",
      sortable: true,
      cell: (row) => <TextField record={row} source="price" />,
    },
    {
      name: "users",
      selector: "users",
      sortable: true,
      cell: (row) => <TextField record={row} source="users" />,
    },
    {
      name: "Product",
      selector: "Product",
      sortable: true,
      cell: (row) => <TextField record={row} source="product" />,
    },
  ];

  return (
    <div>
      <h2> Order List</h2>
      <DataTable
        title="Product List"
        columns={columns}
        data={data?.data}
        pagination
        selectableRows
        highlightOnHover
      />
    </div>
  );
};

export default OrderList;
