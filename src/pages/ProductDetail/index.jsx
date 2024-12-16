import { Grid } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Text from "../../components/Text";
import { DashboardContent } from "../../layouts/DashboardContent";
import { getItemDetail } from "../../services";

const ProductDetail = () => {
  const { id } = useParams(); 
  const [product, setProduct] = useState(null); 
  const [loading, setLoading] = useState(true); 
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await getItemDetail(id);
        if (response.data.statusCode == 200) setProduct(response.data?.data);
      } catch (error) {
        console.error("Error fetching product details:", error);
        setError("Failed to fetch product details.");
      } finally {
        setLoading(false);
      }
    };

    fetchProductDetails();
  }, [id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (!product) {
    return <div>Product not found</div>;
  }

  return (
    <DashboardContent heading={product.name}>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <Text variant="subtitle" style={{ fontWeight: 700 }}>
            Item Code:
          </Text>
          <Text>{product.itemCode}</Text>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Text variant="subtitle" style={{ fontWeight: 700 }}>
            Short Name:
          </Text>
          <Text>{product.shortName}</Text>
        </Grid>

        <Grid item xs={12}>
          <Text variant="subtitle" style={{ fontWeight: 700 }}>
            Details:
          </Text>
          <Text>{product.details}</Text>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Text variant="subtitle" style={{ fontWeight: 700 }}>
            Catalog Code:
          </Text>
          <Text>{product.catalogCode}</Text>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Text variant="subtitle" style={{ fontWeight: 700 }}>
            Unit:
          </Text>
          <Text>{product.unit}</Text>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Text variant="subtitle" style={{ fontWeight: 700 }}>
            Minimum Stock Quantity:
          </Text>
          <Text>{product.minStockQty}</Text>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Text variant="subtitle" style={{ fontWeight: 700 }}>
            Gross Weight:
          </Text>
          <Text>{product.grossWeight} kg</Text>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Text variant="subtitle" style={{ fontWeight: 700 }}>
            Net Weight per Box:
          </Text>
          <Text>{product.netWeightPerBox} kg</Text>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Text variant="subtitle" style={{ fontWeight: 700 }}>
            Number of Pieces per Carton:
          </Text>
          <Text>{product.noOfPcsPerCtn}</Text>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Text variant="subtitle" style={{ fontWeight: 700 }}>
            Net Weight:
          </Text>
          <Text>{product.netWeight} kg</Text>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Text variant="subtitle" style={{ fontWeight: 700 }}>
            Selling Price:
          </Text>
          <Text>${product.sellingPrice}</Text>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Text variant="subtitle" style={{ fontWeight: 700 }}>
            Buying Price:
          </Text>
          <Text>${product.buyingPrice}</Text>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Text variant="subtitle" style={{ fontWeight: 700 }}>
            Category:
          </Text>
          <Text>{product.category}</Text>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Text variant="subtitle" style={{ fontWeight: 700 }}>
            Sub Category:
          </Text>
          <Text>{product.subCategory}</Text>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Text variant="subtitle" style={{ fontWeight: 700 }}>
            Brand:
          </Text>
          <Text>{product.brand}</Text>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Text variant="subtitle" style={{ fontWeight: 700 }}>
            Type:
          </Text>
          <Text>{product.type}</Text>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Text variant="subtitle" style={{ fontWeight: 700 }}>
            Length:
          </Text>
          <Text>{product.length} cm</Text>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Text variant="subtitle" style={{ fontWeight: 700 }}>
            Width:
          </Text>
          <Text>{product.width} cm</Text>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Text variant="subtitle" style={{ fontWeight: 700 }}>
            Height:
          </Text>
          <Text>{product.height} cm</Text>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Text variant="subtitle" style={{ fontWeight: 700 }}>
            CBM:
          </Text>
          <Text>{product.cbm}</Text>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Text variant="subtitle" style={{ fontWeight: 700 }}>
            Actual CBM:
          </Text>
          <Text>{product.actualCbm}</Text>
        </Grid>
      </Grid>
    </DashboardContent>
  );
};

export default ProductDetail;
