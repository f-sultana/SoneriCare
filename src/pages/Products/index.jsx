import React, { useState } from "react";
import {
  Box,
  Button,
  Card,
  TextField,
  Typography,
  Popover,
  IconButton,
  List,
  ListItem,
  ListItemText,
  InputAdornment,
} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import AddIcon from "@mui/icons-material/Add";
import { DashboardContent } from "../../layouts/DashboardContent";
import Text from "../../components/Text";
import DataTable from "react-data-table-component";
import { colors } from "../../utils/theme";
import OutlinedInput from "@mui/material/OutlinedInput";
import SearchIcon from "@mui/icons-material/Search";
import { useNavigate } from "react-router-dom";
import ProductsTable from "./Table";

const Products = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedRow, setSelectedRow] = useState(null);

  const nav = useNavigate();

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleAddProduct = () => {
    console.log("Add Product clicked");
  };

  const handlePopoverOpen = (event, row) => {
    setAnchorEl(event.currentTarget);
    setSelectedRow(row);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
    setSelectedRow(null);
  };

  const handleEditProduct = () => {
    console.log("Edit product:", selectedRow);
    handlePopoverClose();
  };

  const handleDeleteProduct = () => {
    console.log("Delete product:", selectedRow);
    handlePopoverClose();
  };

  const isPopoverOpen = Boolean(anchorEl);

  // Sample data
  const products = [
    {
      id: 1,
      code: "P001",
      shortName: "Prod1",
      name: "Product One",
      sellingPrice: 100.0,
      status: "Available",
    },
    {
      id: 2,
      code: "P002",
      shortName: "Prod2",
      name: "Product Two",
      sellingPrice: 150.0,
      status: "Out of Stock",
    },
    {
      id: 3,
      code: "P003",
      shortName: "Prod3",
      name: "Product Three",
      sellingPrice: 200.0,
      status: "Available",
    },
    // Add more products as needed
  ];

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const columns = [
    {
      name: "Code",
      selector: (row) => row.code,
      sortable: true,
    },
    {
      name: "Short Name",
      selector: (row) => row.shortName,
      sortable: true,
    },
    {
      name: "Name",
      selector: (row) => row.name,
      sortable: true,
    },
    {
      name: "Selling Price",
      selector: (row) => `$${row.sellingPrice}`,
      sortable: true,
      right: true,
    },
    {
      name: "Status",
      selector: (row) => row.status,
      sortable: true,
      center: true,
    },
    {
      name: "Action",
      cell: (row) => (
        <Box>
          <IconButton onClick={(event) => handlePopoverOpen(event, row)}>
            <MoreVertIcon />
          </IconButton>
        </Box>
      ),
      center: true,
    },
  ];

  return (
    <DashboardContent
      heading={"Products"}
      rightContent={
        <Button
          onClick={() => nav("/add-product")}
          disableElevation
          variant="contained"
          startIcon={<AddIcon />}
        >
          New product
        </Button>
      }
    >
      <ProductsTable />

      {/* <DataTable
            columns={columns}
            data={filteredProducts}
            pagination
            highlightOnHover
            selectableRows
            defaultSortFieldId={1}
          /> */}

      <Popover
        open={isPopoverOpen}
        anchorEl={anchorEl}
        onClose={handlePopoverClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
      >
        <List>
          <ListItem button onClick={handleEditProduct}>
            <ListItemText primary="Edit" />
          </ListItem>
          <ListItem button onClick={handleDeleteProduct}>
            <ListItemText primary="Delete" />
          </ListItem>
        </List>
      </Popover>
    </DashboardContent>
  );
};

export default Products;
