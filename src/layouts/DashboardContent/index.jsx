import Box from "@mui/material/Box";
import { colors } from "../../utils/theme";
import Text from "../../components/Text";

export function DashboardContent({ children, rightContent, heading, sx }) {
  return (
    <Box
      sx={{
        padding: { xs: 2, sm: 4 }, // Adjust padding for small screens
        background: colors.background,
        minHeight: "100vh", // Ensure it spans the viewport height
      }}
    >
      <Box
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        flexDirection={{ xs: "column", sm: "row" }} // Stack items on small screens
        mb={5}
        gap={{ xs: 2, sm: 0 }} // Add spacing between stacked items
      >
        <Text variant="largeTitle">{heading}</Text>
        <Box
          sx={{
            textAlign: { xs: "center", sm: "right" }, // Center right content on small screens
          }}
        >
          {rightContent}
        </Box>
      </Box>
      <Box
        sx={{
          background: "white",
          boxShadow:
            "0 0 2px 0 rgba(145, 158, 171, 0.2), 0 12px 24px -4px rgba(145, 158, 171, 0.12)",
          borderRadius: 3,
          overflow: "hidden",
          padding: { xs: 2, sm: 3, md: 4 }, // Adjust padding for content
          ...sx,
        }}
      >
        {children}
      </Box>
    </Box>
  );
}
