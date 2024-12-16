import { styled, Box, CircularProgress } from "@mui/material";
import { colors } from "../../utils/theme";

export const ContainerTable = styled(Box)({
  width: "100%",
  height: "100%",
});

export const TableWrapper = styled(Box)({
  height: "100%",
  cursor: "pointer",

  [".rdt_TableHeadRow"]: {
    minHeight: "52px",
    backgroundColor:colors.background,
    color: "#8F9094",
    textTransform: "capitalize",
    fontSize: 14,
    fontWeight: 700,
    letterSpacing: "1px",
    lineHeight: "20px",
    border: "none",
  },
  [".rdt_TableRow"]: {
    borderBottom: "none",
    height:64,
    transition: "background-color 0.2s ease", // Smooth transition for hover effect
    "&:hover": {
      backgroundColor: "#f5f5f5", // Change to desired hover color
    },
  },
  [".rdt_TableCol"]: {
    padding: "4px 8px",
    width: "120px",
  },
  [".rdt_TableCol_Sortable"]: {
    justifyContent: "space-between",

    "& > div": {
      whiteSpace: "normal",
      overflow: "visible",
    },
  },

  [".rdt_TableCell"]: {
    flexWrap: "wrap",
    rowGap: "4px",
    lineHeight: "20px",
    padding: "4px 8px",
  },
});

export const Loader = styled(CircularProgress)(({ theme }) => ({
  marginTop: "16px",
  width: "32px !important",
  height: "32px !important",
  color: "blue",
}));

export const LoaderWrapper = styled(Box)({
  paddingTop: "40px",
  width: "100%",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
});
