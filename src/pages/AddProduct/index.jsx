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
import React, { useEffect, useState } from "react";
import * as Yup from "yup";
import Text from "../../components/Text";
import { DashboardContent } from "../../layouts/DashboardContent";
import { createItem, lookupMenu } from "../../services";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const validationSchema = Yup.object().shape({
  itemCode: Yup.string().required("Item code is required"),
  shortName: Yup.string(),
  name: Yup.string().required("Name is required"),
  details: Yup.string(),
  // catalogCode: Yup.string(),
  // unit: Yup.string(),
  // minStockQty: Yup.number()
  //   .integer()
  //   .min(0, "Minimum stock quantity must be at least 0"),
  // grossWeight: Yup.number().positive("Gross weight must be positive"),
  // netWeightPerBox: Yup.number().positive("Net weight per box must be positive"),
  // noOfPcsPerCtn: Yup.number()
  //   .integer()
  //   .min(0, "Number of pieces per carton must be at least 0"),
  // netWeight: Yup.number().positive("Net weight must be positive"),
  // sellingPrice: Yup.number(),
  // buyingPrice: Yup.number(),
  // category: Yup.string().required("Category is required"),
  // subCategory: Yup.string(),
  // brand: Yup.string(),
  // type: Yup.string(),
  // length: Yup.number().positive("Length must be positive"),
  // width: Yup.number().positive("Width must be positive"),
  // height: Yup.number().positive("Height must be positive"),
  // cbm: Yup.number().positive("CBM must be positive"),
  // actualCbm: Yup.number().positive("Actual CBM must be positive"),
});

const AddProduct = () => {
  const [categoryData, setCategoryData] = useState([]);
  const [subCategoryData, setSubCategoryData] = useState([]);
  const [brandData, setBrandData] = useState([]);
  const [typeData, setTypeData] = useState([]);

  const nav = useNavigate();

  const onSubmit = async (values, { setSubmitting, resetForm }) => {
    console.log({ values });
    try {
      setSubmitting(true);
      const result = await createItem(values);
      console.log("Item created successfully:", result);
      toast.success("Product added successfully!");
      nav("/");
      resetForm();
    } catch (error) {
      console.error("Error creating item:", error.message);
    } finally {
      setSubmitting(false);
    }
  };

  useEffect(() => {
    getDropdownData("CATEGORY");
    getDropdownData("SUB_CATEGORY");
    getDropdownData("BRAND");
    getDropdownData("TYPE");
  }, []);

  const getDropdownData = async (value) => {
    try {
      const res = await lookupMenu(value);
      if (res.data.statusCode == 200) {
        switch (value) {
          case "CATEGORY":
            setCategoryData(res.data.data); // Update category state
            break;
          case "SUB_CATEGORY":
            setSubCategoryData(res.data.data); // Update sub-category state
            break;
          case "BRAND":
            setBrandData(res.data.data); // Update brand state
            break;
          case "TYPE":
            setTypeData(res.data.data); // Update type state
            break;
          default:
            break;
        }
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return (
    <>
      <DashboardContent heading={"Add Product"} sx={{ padding: 4 }}>
        <Formik
          initialValues={{
            itemCode: "",
            shortName: "",
            name: "",
            details: "",
            catalogCode: "",
            unit: "",
            minStockQty: 0,
            grossWeight: 0,
            netWeightPerBox: 0,
            noOfPcsPerCtn: 0,
            netWeight: 0,
            sellingPrice: 0,
            buyingPrice: 0,
            category: "",
            subCategory: "",
            brand: "",
            type: "",
            length: 0,
            width: 0,
            height: 0,
            cbm: 0,
            actualCbm: 0,
          }}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
        >
          {({ handleChange, values, errors, setFieldValue }) => {
            const { length, width, height } = values;

            return (
              <Form>
                <Box mb={4}>
                  <Text variant="title" style={{ marginBottom: 20 }}>
                    Item Name and Details
                  </Text>
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={4}>
                      <Field
                        as={TextField}
                        name="itemCode"
                        label="Item Code"
                        fullWidth
                        error={Boolean(errors.itemCode)}
                        helperText={errors.itemCode}
                        onChange={handleChange}
                      />
                    </Grid>
                    <Grid item xs={12} sm={4}>
                      <Field
                        as={TextField}
                        name="shortName"
                        label="Short Name"
                        fullWidth
                        onChange={handleChange}
                      />
                    </Grid>
                    <Grid item xs={12} sm={4}>
                      <Field
                        as={TextField}
                        name="catalogCode"
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
                  <Text variant="title" style={{ marginBottom: 20 }}>
                    Weight and Quantity
                  </Text>
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                      <FormControl fullWidth>
                        <InputLabel id="unit">Unit</InputLabel>
                        <Field
                          as={Select}
                          name="unit"
                          labelId="unit"
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
                        name="minStockQty"
                        label="Minimum Stock Quantity"
                        type="number"
                        fullWidth
                        error={Boolean(errors.minStockQty)}
                        helperText={errors.minStockQty}
                        onChange={handleChange}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <Field
                        as={TextField}
                        name="grossWeight"
                        label="Gross Weight"
                        type="number"
                        fullWidth
                        error={Boolean(errors.grossWeight)}
                        helperText={errors.grossWeight}
                        onChange={handleChange}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <Field
                        as={TextField}
                        name="netWeightPerBox"
                        label="Net Weight per Box"
                        type="number"
                        fullWidth
                        error={Boolean(errors.netWeightPerBox)}
                        helperText={errors.netWeightPerBox}
                        onChange={handleChange}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <Field
                        as={TextField}
                        name="noOfPcsPerCtn"
                        label="Number of Pieces per Carton"
                        type="number"
                        fullWidth
                        error={Boolean(errors.noOfPcsPerCtn)}
                        helperText={errors.noOfPcsPerCtn}
                        onChange={handleChange}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <Field
                        as={TextField}
                        name="netWeight"
                        label="Net Weight"
                        type="number"
                        fullWidth
                        error={Boolean(errors.netWeight)}
                        helperText={errors.netWeight}
                        onChange={handleChange}
                      />
                    </Grid>
                  </Grid>
                </Box>
                <Box mb={4}>
                  <Text variant="title" style={{ marginBottom: 20 }}>
                    Price
                  </Text>

                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                      <Field
                        as={TextField}
                        name="sellingPrice"
                        label="Selling Price"
                        type="number"
                        fullWidth
                        error={Boolean(errors.sellingPrice)}
                        helperText={errors.sellingPrice}
                        onChange={handleChange}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <Field
                        as={TextField}
                        name="buyingPrice"
                        label="Buying Price"
                        type="number"
                        fullWidth
                        error={Boolean(errors.buyingPrice)}
                        helperText={errors.buyingPrice}
                        onChange={handleChange}
                      />
                    </Grid>
                  </Grid>
                </Box>
                <Box mb={4}>
                  <Text variant="title" style={{ marginBottom: 20 }}>
                    Category
                  </Text>

                  <Grid container spacing={2}>
                    {/* Category Dropdown */}
                    <Grid item xs={12} sm={6}>
                      <FormControl fullWidth error={Boolean(errors.category)}>
                        <InputLabel>Category</InputLabel>
                        <Field
                          as={Select}
                          name="category"
                          label="Category"
                          onChange={handleChange}
                          value={values.category || ""}
                        >
                          {categoryData.map((option) => (
                            <MenuItem key={option.id} value={option.id}>
                              {option.value}{" "}
                              {/* Adjust this based on the actual structure of your data */}
                            </MenuItem>
                          ))}
                        </Field>
                        {errors.category && (
                          <span style={{ color: "red", fontSize: "12px" }}>
                            {errors.category}
                          </span>
                        )}
                      </FormControl>
                    </Grid>

                    {/* Sub-category Dropdown */}
                    <Grid item xs={12} sm={6}>
                      <FormControl
                        fullWidth
                        error={Boolean(errors.subCategory)}
                      >
                        <InputLabel>Sub Category</InputLabel>
                        <Field
                          as={Select}
                          name="subCategory"
                          label="Sub Category"
                          onChange={handleChange}
                          value={values.subCategory || ""}
                        >
                          {subCategoryData.map((option) => (
                            <MenuItem key={option.id} value={option.id}>
                              {option.value}{" "}
                              {/* Adjust this based on the actual structure of your data */}
                            </MenuItem>
                          ))}
                        </Field>
                        {errors.subCategory && (
                          <span style={{ color: "red", fontSize: "12px" }}>
                            {errors.subCategory}
                          </span>
                        )}
                      </FormControl>
                    </Grid>

                    {/* Brand Dropdown */}
                    <Grid item xs={12} sm={6}>
                      <FormControl fullWidth error={Boolean(errors.brand)}>
                        <InputLabel>Brand</InputLabel>
                        <Field
                          as={Select}
                          name="brand"
                          label="Brand"
                          onChange={handleChange}
                          value={values.brand || ""}
                        >
                          {brandData.map((option) => (
                            <MenuItem key={option.id} value={option.id}>
                              {option.value}{" "}
                              {/* Adjust this based on the actual structure of your data */}
                            </MenuItem>
                          ))}
                        </Field>
                        {errors.brand && (
                          <span style={{ color: "red", fontSize: "12px" }}>
                            {errors.brand}
                          </span>
                        )}
                      </FormControl>
                    </Grid>

                    {/* Type Dropdown */}
                    <Grid item xs={12} sm={6}>
                      <FormControl fullWidth error={Boolean(errors.type)}>
                        <InputLabel>Type</InputLabel>
                        <Field
                          as={Select}
                          name="type"
                          label="Type"
                          onChange={handleChange}
                          value={values.type || ""}
                        >
                          {typeData.map((option) => (
                            <MenuItem key={option.id} value={option.id}>
                              {option.value}{" "}
                              {/* Adjust this based on the actual structure of your data */}
                            </MenuItem>
                          ))}
                        </Field>
                        {errors.type && (
                          <span style={{ color: "red", fontSize: "12px" }}>
                            {errors.type}
                          </span>
                        )}
                      </FormControl>
                    </Grid>
                  </Grid>
                </Box>
                <Box mb={4}>
                  <Text variant="title" style={{ marginBottom: 20 }}>
                    CBM Calculation
                  </Text>

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
                        name="actualCbm"
                        label="Actual CBM"
                        type="number"
                        fullWidth
                        value={length * width * height}
                        disabled
                      />
                    </Grid>
                  </Grid>
                </Box>
                <Box sx={{ display: "flex", gap: 2 }}>
                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    sx={{ width: 120 }}
                  >
                    Save
                  </Button>
                  <Button
                    onClick={() => nav("/")}
                    color="primary"
                    sx={{ width: 120 }}
                  >
                    Cancel
                  </Button>
                </Box>
              </Form>
            );
          }}
        </Formik>
      </DashboardContent>
    </>
  );
};

export default AddProduct;
