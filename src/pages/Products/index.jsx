import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import SearchIcon from "@mui/icons-material/Search";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import {
  Box,
  Button,
  IconButton,
  InputAdornment,
  List,
  ListItem,
  ListItemIcon,
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
import { toast } from "react-toastify";
import NoProduct from "../../assets/images/product-placeholder.png";
import EditIcon from "@mui/icons-material/Edit";

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
        console.log({ PRODUCTS: response.data });
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
    if (selectedRows.length === 0 && !selectedRow) {
      toast.error("No items selected for deletion!");
      return;
    }
    try {
      const confirmDelete = window.confirm(
        selectedRow
          ? "Are you sure you want to delete this item?"
          : `Are you sure you want to delete ${selectedRows.length} items?`
      );
      if (!confirmDelete) return;
      if (selectedRow) {
        const result = await deleteItem(selectedRow?.itemId);
        setData((prevData) =>
          prevData.filter((item) => item.itemId !== selectedRow?.itemId)
        );
      } else {
        for (let row of selectedRows) {
          const result = await deleteItem(row.itemId);
          setData((prevData) =>
            prevData.filter((item) => item.itemId !== row.itemId)
          );
        }
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
    nav(`/add-product/${selectedRow.itemId}`);
  };

  const handleDeleteProduct = () => {
    console.log("Delete product:", selectedRow);
    handlePopoverClose();
    handleDeleteSelectedItems();
  };

  const handleChange = ({ selectedRows }) => {
    setSelectedRows(selectedRows);
  };

  const isPopoverOpen = Boolean(anchorEl);

  const PRODUCTS_COLUMNS = [
    {
      name: "Name",
      selector: (row) => (
        <div
          style={{ display: "flex", alignItems: "center", gap: 10 }}
          data-tag="allowRowEvents" // Allow row click event propagation
        >
          <img
            src={NoProduct}
            style={{
              width: 40,
              height: 40,
              objectFit: "cover",
              borderRadius: 5,
            }}
          />
          <Text>{row.name}</Text>
        </div>
      ),
      sortable: true,
    },
    {
      name: "Code",
      selector: (row) => (
        <div data-tag="allowRowEvents">
          {" "}
          {/* Allow row click event propagation */}
          <Text>{row.itemCode}</Text>
        </div>
      ),
      sortable: true,
    },
    {
      name: "Short Name",
      selector: (row) => (
        <div data-tag="allowRowEvents">
          {" "}
          {/* Allow row click event propagation */}
          <Text>{row.shortName}</Text>
        </div>
      ),
      sortable: true,
    },
    {
      name: "Selling Price",
      selector: (row) => (
        <div data-tag="allowRowEvents">
          {" "}
          {/* Allow row click event propagation */}
          <Text>{`$${row.sellingPrice}`}</Text>
        </div>
      ),
      sortable: true,
    },
    {
      name: "Status",
      selector: (row) => (
        <div
          style={{
            background: !row.status ? "#e1f6e6" : "#f5bbbb",
            borderRadius: 6,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: "max-content",
            padding: "5px 10px",
            color: !row.status ? "#118d57" : "#c10303",
            fontSize: 12,
            fontWeight: "700",
          }}
          data-tag="allowRowEvents" // Allow row click event propagation
        >
          {"Active"}
        </div>
      ),
      sortable: true,
    },
    {
      name: "Action",
      cell: (row) => (
        <Box data-tag="allowRowEvents">
          <IconButton onClick={(e) => handlePopoverOpen(e, row)}>
            <MoreVertIcon />
          </IconButton>
        </Box>
      ),
    },
  ];

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
        onRowClicked={(row) => nav(`/product/${row.itemId}`)}
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
        <Box sx={{}}>
          <ListItem
            button
            onClick={handleEditProduct}
            style={{ gap: 5, cursor: "pointer" }}
          >
            <EditIcon style={{ color: colors.secondary }} />
            <Text color={colors.secondary}>Edit</Text>
          </ListItem>
          <ListItem
            button
            onClick={handleDeleteProduct}
            style={{ gap: 5, cursor: "pointer" }}
          >
            <DeleteIcon style={{ color: colors.error }} />
            <Text color={colors.error}>Delete</Text>
          </ListItem>
        </Box>
      </Popover>
    </DashboardContent>
  );
};

export default Products;
