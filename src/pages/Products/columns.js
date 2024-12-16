import { Box, IconButton } from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Text from "../../components/Text";
import NoProduct from "../../assets/images/product-placeholder.png";

export const PRODUCTS_COLUMNS = [
  {
    name: "Name",
    selector: (row) => (
      <div
        style={{ display: "flex", alignItems: "center", gap: 10 }}
        data-tag="allowRowEvents"  // Allow row click event propagation
      >
        <img
          src={NoProduct}
          style={{ width: 40, height: 40, objectFit: "cover", borderRadius: 5 }}
        />
        <Text>{row.name}</Text>
      </div>
    ),
    sortable: true,
  },
  {
    name: "Code",
    selector: (row) => (
      <div data-tag="allowRowEvents">  {/* Allow row click event propagation */}
        <Text>{row.itemCode}</Text>
      </div>
    ),
    sortable: true,
  },
  {
    name: "Short Name",
    selector: (row) => (
      <div data-tag="allowRowEvents">  {/* Allow row click event propagation */}
        <Text>{row.shortName}</Text>
      </div>
    ),
    sortable: true,
  },
  {
    name: "Selling Price",
    selector: (row) => (
      <div data-tag="allowRowEvents">  {/* Allow row click event propagation */}
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
        data-tag="allowRowEvents"  // Allow row click event propagation
      >
        {"Active"}
      </div>
    ),
    sortable: true,
  },
  {
    name: "Action",
    cell: (row) => (
      <Box data-tag="allowRowEvents">  {/* Allow row click event propagation */}
        <IconButton>
          <MoreVertIcon />
        </IconButton>
      </Box>
    ),
  },
];