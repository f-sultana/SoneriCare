import {
  Box,
  Button,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { Field, Form, Formik } from "formik";
import React from "react";
import * as Yup from "yup";
import Text from "../../components/Text";
import { DashboardContent } from "../../layouts/DashboardContent";

const validationSchema = Yup.object().shape({
  item_code: Yup.string().required("Item code is required"),
  short_name: Yup.string(),
  name: Yup.string().required("Name is required"),
  details: Yup.string(),
  catalog_code: Yup.string(),
  unit: Yup.string(),
  min_stock_qty: Yup.number()
    .integer()
    .min(0, "Minimum stock quantity must be at least 0"),
  gross_weight: Yup.number().positive("Gross weight must be a positive number"),
  net_weight_per_box: Yup.number().positive(
    "Net weight per box must be a positive number"
  ),
  no_of_pcs_per_ctn: Yup.number()
    .integer()
    .min(0, "Number of pieces per carton must be at least 0"),
  net_weight: Yup.number().positive("Net weight must be a positive number"),
  selling_price: Yup.number().positive(
    "Selling price must be a positive number"
  ),
  buying_price: Yup.number().positive("Buying price must be a positive number"),
  category: Yup.string().required("Category is required"),
  sub_category: Yup.string(),
  brand: Yup.string(),
  type: Yup.string(),
  length: Yup.number().positive("Length must be a positive number"),
  width: Yup.number().positive("Width must be a positive number"),
  height: Yup.number().positive("Height must be a positive number"),
  cbm: Yup.number().positive("CBM must be a positive number"),
  actual_cbm: Yup.number().positive("Actual CBM must be a positive number"),
});

const AddProduct = () => (
  <>
    <DashboardContent heading={"Add Product"} sx={{ padding: 4 }}>
      <Formik
        initialValues={{
          item_code: "",
          short_name: "",
          name: "",
          details: "",
          catalog_code: "",
          unit: "",
          min_stock_qty: 0,
          gross_weight: 0,
          net_weight_per_box: 0,
          no_of_pcs_per_ctn: 0,
          net_weight: 0,
          selling_price: 0,
          buying_price: 0,
          category: "",
          sub_category: "",
          brand: "",
          type: "",
          length: 0,
          width: 0,
          height: 0,
          cbm: 0,
          actual_cbm: 0,
        }}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          // Handle form submission
          console.log(values);
        }}
      >
        {({ handleChange, values, errors }) => (
          <Form>
            <Box mb={4}>
              <Text variant="title">Item Name and Details</Text>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={4}>
                  <Field
                    as={TextField}
                    name="item_code"
                    label="Item Code"
                    fullWidth
                    error={Boolean(errors.item_code)}
                    helperText={errors.item_code}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <Field
                    as={TextField}
                    name="short_name"
                    label="Short Name"
                    fullWidth
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <Field
                    as={TextField}
                    name="catalog_code"
                    label="Catalog Code"
                    fullWidth
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Field
                    as={TextField}
                    name="name"
                    label="Name"
                    fullWidth
                    error={Boolean(errors.name)}
                    helperText={errors.name}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Field
                    as={TextField}
                    name="details"
                    label="Details"
                    fullWidth
                    multiline
                    rows={4}
                    onChange={handleChange}
                  />
                </Grid>
              </Grid>
            </Box>
            <Box mb={4}>
              <Text variant="title">Weight and Quantity</Text>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth>
                    <InputLabel id="unit-label">Unit</InputLabel>
                    <Field
                      as={Select}
                      name="unit"
                      labelId="unit-label"
                      error={Boolean(errors.unit)}
                      onChange={handleChange}
                    >
                      <MenuItem value="pcs">Pieces</MenuItem>
                      <MenuItem value="kg">Kilograms</MenuItem>
                      <MenuItem value="m">Meters</MenuItem>
                      <MenuItem value="l">Liters</MenuItem>
                    </Field>
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Field
                    as={TextField}
                    name="min_stock_qty"
                    label="Minimum Stock Quantity"
                    type="number"
                    fullWidth
                    error={Boolean(errors.min_stock_qty)}
                    helperText={errors.min_stock_qty}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Field
                    as={TextField}
                    name="gross_weight"
                    label="Gross Weight"
                    type="number"
                    fullWidth
                    error={Boolean(errors.gross_weight)}
                    helperText={errors.gross_weight}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Field
                    as={TextField}
                    name="net_weight_per_box"
                    label="Net Weight per Box"
                    type="number"
                    fullWidth
                    error={Boolean(errors.net_weight_per_box)}
                    helperText={errors.net_weight_per_box}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Field
                    as={TextField}
                    name="no_of_pcs_per_ctn"
                    label="Number of Pieces per Carton"
                    type="number"
                    fullWidth
                    error={Boolean(errors.no_of_pcs_per_ctn)}
                    helperText={errors.no_of_pcs_per_ctn}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Field
                    as={TextField}
                    name="net_weight"
                    label="Net Weight"
                    type="number"
                    fullWidth
                    error={Boolean(errors.net_weight)}
                    helperText={errors.net_weight}
                    onChange={handleChange}
                  />
                </Grid>
              </Grid>
            </Box>
            <Box mb={4}>
              <Text variant="title">Price</Text>

              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <Field
                    as={TextField}
                    name="selling_price"
                    label="Selling Price"
                    type="number"
                    fullWidth
                    error={Boolean(errors.selling_price)}
                    helperText={errors.selling_price}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Field
                    as={TextField}
                    name="buying_price"
                    label="Buying Price"
                    type="number"
                    fullWidth
                    error={Boolean(errors.buying_price)}
                    helperText={errors.buying_price}
                    onChange={handleChange}
                  />
                </Grid>
              </Grid>
            </Box>
            <Box mb={4}>
              <Text variant="title">Category</Text>

              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <Field
                    as={TextField}
                    name="category"
                    label="Category"
                    fullWidth
                    error={Boolean(errors.category)}
                    helperText={errors.category}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Field
                    as={TextField}
                    name="sub_category"
                    label="Sub Category"
                    fullWidth
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Field
                    as={TextField}
                    name="brand"
                    label="Brand"
                    fullWidth
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Field
                    as={TextField}
                    name="type"
                    label="Type"
                    fullWidth
                    onChange={handleChange}
                  />
                </Grid>
              </Grid>
            </Box>
            <Box mb={4}>
              <Text variant="title">CBM Calculation</Text>

              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <Field
                    as={TextField}
                    name="length"
                    label="Length"
                    type="number"
                    fullWidth
                    error={Boolean(errors.length)}
                    helperText={errors.length}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Field
                    as={TextField}
                    name="width"
                    label="Width"
                    type="number"
                    fullWidth
                    error={Boolean(errors.width)}
                    helperText={errors.width}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Field
                    as={TextField}
                    name="height"
                    label="Height"
                    type="number"
                    fullWidth
                    error={Boolean(errors.height)}
                    helperText={errors.height}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Field
                    as={TextField}
                    name="cbm"
                    label="CBM"
                    type="number"
                    fullWidth
                    error={Boolean(errors.cbm)}
                    helperText={errors.cbm}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Field
                    as={TextField}
                    name="actual_cbm"
                    label="Actual CBM"
                    type="number"
                    fullWidth
                    error={Boolean(errors.actual_cbm)}
                    helperText={errors.actual_cbm}
                    onChange={handleChange}
                  />
                </Grid>
              </Grid>
            </Box>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              sx={{ mt: 3 }}
            >
              Save
            </Button>
          </Form>
        )}
      </Formik>
    </DashboardContent>
  </>
);

export default AddProduct;
