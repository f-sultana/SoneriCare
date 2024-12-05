import Box from "@mui/material/Box";
import { colors } from "../../utils/theme";
import Text from "../../components/Text";

export function DashboardContent({ children, rightContent, heading, sx }) {
  return (
    <Box
      sx={{ padding: 4, background: colors.background, height: "100%" }}
    >
      <Box
        display="flex"
        alignItems="center"
        justifyContent={"space-between"}
        mb={5}
      >
        <Text variant="largeTitle">{heading}</Text>
        {rightContent}
      </Box>
      <Box
        sx={{
          background: "white",
          boxShadow:
            "0 0 2px 0 rgba(145 158 171 / 0.2),0 12px 24px -4px rgba(145 158 171 / 0.12)",
          borderRadius: 3,
          overflow: "hidden",
          ...sx
        }}
      >
        {children}
      </Box>
    </Box>
  );
}
