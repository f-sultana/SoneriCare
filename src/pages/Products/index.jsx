import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import SearchIcon from "@mui/icons-material/Search";
import {
  Box,
  Button,
  IconButton,
  InputAdornment,
  List,
  ListItem,
  ListItemText,
  Popover,
  Tooltip,
} from "@mui/material";
import OutlinedInput from "@mui/material/OutlinedInput";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Table from "../../components/Table";
import Text from "../../components/Text";
import { DashboardContent } from "../../layouts/DashboardContent";
import { deleteItem, getItems } from "../../services";
import { colors } from "../../utils/theme";
import { PRODUCTS_COLUMNS } from "./columns";
import { toast } from "react-toastify";

const Products = () => {
  const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedRow, setSelectedRow] = useState(null);
  const [selectedRows, setSelectedRows] = React.useState(false);
  const [toggledClearRows, setToggleClearRows] = React.useState(false);
  const [filteredData, setFilteredData] = useState(data);
  const nav = useNavigate();

  React.useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await getItems();
        console.log({ PRODUCTS : response.data });
        if (response.data.statusCode == 200) setData(response.data.data);
      } catch (err) {}
    };
    fetchItems();
  }, []);

  const handleSearch = (event) => {
    const value = event.target.value.toLowerCase();
    setSearchTerm(value);

    const filtered = data.filter(
      (product) =>
        product.name.toLowerCase().includes(value) ||
        product.shortName.toLowerCase().includes(value) ||
        product.itemCode.toLowerCase().includes(value)
    );
    setFilteredData(filtered);
  };


  const handleDeleteSelectedItems = async () => {
    if (selectedRows.length === 0) {
      toast.error("No items selected for deletion!");
      return;
    }
    try {
      const confirmDelete = window.confirm(
        `Are you sure you want to delete ${selectedRows.length} items?`
      );
      if (!confirmDelete) return;
      for (let row of selectedRows) {
        const result = await deleteItem(row.itemId);
        setData((prevData) => prevData.filter((item) => item.itemId !== row.itemId));
      }
      toast.success("Items deleted successfully!");
      setSelectedRows([]); 
      setToggleClearRows(!toggledClearRows); 

    } catch (error) {
      console.error("Error deleting items:", error);
      toast.error("An error occurred while deleting items.");
    }
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

  const handleChange = ({ selectedRows }) => {
    setSelectedRows(selectedRows);
  };

  const isPopoverOpen = Boolean(anchorEl);

  function ProductsTableToolbar({ selectedRows }) {
    const numSelected = selectedRows.length;
    return (
      <Box
        sx={[
          {
            bgcolor: numSelected > 0 ? "#d0ecfe" : "white",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            p: numSelected ? 2 : 0,
            mb: numSelected ? 0 : 2,
          },
        ]}
        style={{
          borderTopLeftRadius: 10,
          borderTopRightRadius: 10,
        }}
      >
        {numSelected > 0 ? (
          <Text color={colors.secondary} variant="title">
            {numSelected} selected
          </Text>
        ) : (
          <OutlinedInput
            value={searchTerm}
            onChange={handleSearch}
            fullWidth
            placeholder="Search product..."
            startAdornment={
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            }
            sx={{ maxWidth: 320 }}
          />
        )}
        {numSelected > 0 ? (
          <Tooltip title="Delete">
            <IconButton onClick={handleDeleteSelectedItems}>
              <DeleteIcon />
            </IconButton>
          </Tooltip>
        ) : null}
      </Box>
    );
  }

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
      <ProductsTableToolbar selectedRows={selectedRows} />
      <Table
        columns={PRODUCTS_COLUMNS}
        data={searchTerm.length ? filteredData : data}
        selectableRows
        onSelectedRowsChange={handleChange}
        clearSelectedRows={toggledClearRows}
        onRowClicked={(row)=>nav(`/product/${row.itemId}`)}
      />

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
