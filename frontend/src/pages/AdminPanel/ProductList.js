import React, { useEffect, useState } from "react";
import { List, TextField, ImageField } from "react-admin";
import DataTable from "react-data-table-component";

// Function to fetch data from API
const fetchData = async () => {
  try {
    const response = await fetch("http://localhost:8080/api/shopping");
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching data: ", error);
    return [];
  }
};

const ProductList = () => {
  const [data, setData] = useState([]); // State to store the fetched data

  // Fetch data on component mount
  useEffect(() => {
    const getData = async () => {
      const fetchedData = await fetchData();
      setData(fetchedData); // Set the fetched data in the state
    };
    getData();
  }, []); // Empty dependency array ensures it only runs once after the initial render

  // Define the columns for the DataTable

  const columns = [
    {
      name: "ID",
      selector: "id",
      sortable: true,
      cell: (row) => <TextField record={row} source="id" />,
    },
    {
      name: "Category",
      selector: "category",
      cell: (row) => (
        <img
          src={row.image}
          alt="Category"
          style={{ width: "50px", height: "50px", objectFit: "cover" }} // Adjust size as needed
        />
      ),
    },
    {
      name: "Cost",
      selector: "cost",
      sortable: true,
      cell: (row) => <TextField record={row} source="cost" />,
    },
    {
      name: "Description",
      selector: "description",
      cell: (row) => <TextField record={row} source="description" />,
    },
    {
      name: "Product",
      selector: "product",
      cell: (row) => <TextField record={row} source="product" />,
    },
  ];

  return (
    <List>
      <DataTable
        title="Product List"
        columns={columns}
        data={data?.data}
        pagination
        selectableRows
        highlightOnHover
      />
    </List>
  );
};

export default ProductList;
