import InventoryIcon from '@mui/icons-material/Inventory';
import ReceiptIcon from '@mui/icons-material/Receipt';
import { createTheme } from '@mui/material/styles';
import { AppProvider } from '@toolpad/core/AppProvider';
import { DashboardLayout } from '@toolpad/core/DashboardLayout';
import { useDemoRouter } from '@toolpad/core/internal';
import PropTypes from 'prop-types';
import * as React from 'react';
import Logo from "../../assets/images/logo.png";

const NAVIGATION = [
  {
    segment: 'products',
    title: 'Products',
    icon: <InventoryIcon />,
  },
  {
    segment: 'invoices',
    title: 'Invoices',
    icon: <ReceiptIcon />,
  },
  {
    segment: 'performa',
    title: 'Performa',
    icon: <ReceiptIcon />,
  },
  {
    segment: 'packing-list',
    title: 'Packing List',
    icon: <ReceiptIcon />,
  },
 
];

const demoTheme = createTheme({
  cssVariables: {
    colorSchemeSelector: 'data-toolpad-color-scheme',
  },
  colorSchemes: { light: true, dark: false },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 600,
      lg: 1200,
      xl: 1536,
    },
  },
});

function DashboardLayoutBasic(props) {
  const { window,children } = props;

  const router = useDemoRouter('/');

  // Remove this const when copying and pasting into your project.
  const demoWindow = window !== undefined ? window() : undefined;

  return (
    // preview-start
    <AppProvider
      navigation={NAVIGATION}
      router={router}
      theme={demoTheme}
      window={demoWindow}
      branding={{
        logo: <img src={Logo} alt="MUI logo" />,
        title: '',
      }}
      
    >
      <DashboardLayout disableCollapsibleSidebar>
        {children}
      </DashboardLayout>
    </AppProvider>

  );
}

DashboardLayoutBasic.propTypes = {
  window: PropTypes.func,
};

export default DashboardLayoutBasic;
