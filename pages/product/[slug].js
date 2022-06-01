import {
  Button,
  Card,
  Grid,
  Link,
  List,
  ListItem,
  Typography,
} from "@material-ui/core";
import axios from "axios";
import Image from "next/image";
import NextLink from "next/link";
import React, { useContext } from "react";
import Layout from "../../components/Layout";
import Product from "../../models/Product";
import db from "../../utils/db";
import { Store } from "../../utils/store";
import useStyles from "../../utils/styles";
import { useRouter } from 'next/router';

export default function SingleProduct({ product }) {
  const { state, dispatch } = useContext(Store);
  const style = useStyles();
  const router = useRouter();

  const addToCart = async () => {
    const existItem = state.cart.items.find(item => item._id === product._id);
    const quantity = existItem ? existItem.quantity + 1 : 1;
    const {data} = await axios.get(`/api/products/${product._id}`);

    if(data.countInStock < quantity) {
      alert("Sorry, Product not in stock")
      return;
  }
    dispatch({ type: "ADD_TO_CART", payload: { ...product, quantity } });
    router.push('/cart');
  };

  if (!product) {
    return (
      <Layout>
        <Typography>Product Not Found</Typography>
      </Layout>
    );
  }
  return (
    <Layout title={product.name} description={product.description}>
      <div className={style.section}>
        <NextLink href="/" passHref>
          <Link>
            <Typography>back to products</Typography>
          </Link>
        </NextLink>
      </div>

      <Grid container spacing={1}>
        <Grid item md={6} xs={12}>
          <Image
            src={product.image}
            alt={product.name}
            width={640}
            height={640}
            layout="responsive"
            objectFit="cover"
            priority
          />
        </Grid>
        <Grid item md={6} xs={12}>
          <Card>
            <List>
              <ListItem>
                <Typography component={"h1"} variant="h1">
                  {product.name}
                </Typography>
              </ListItem>
              <ListItem>
                <Typography>Category: {product.category}</Typography>
              </ListItem>
              <ListItem>
                <Typography component="h2" variant="h2">Brand: {product.brand}</Typography>
              </ListItem>
              <ListItem>
                <Typography>
                  Rating: {product.rating} stars ({product.numReviews} reviews)
                </Typography>
              </ListItem>
              <ListItem>
                <Typography>{product.description}</Typography>
              </ListItem>
              <ListItem>
                <Grid container alignItems="center">
                  <Grid item xs={6}>
                    <Typography>Price</Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography variant="h2">&#8358;{product.price}</Typography>
                  </Grid>
                </Grid>
              </ListItem>
              <ListItem>
                <Grid container>
                  <Grid item xs={6}>
                    <Typography>Status</Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography>
                      {product.countInStock > 0 ? "In stock" : "Unavailable"}
                    </Typography>
                  </Grid>
                </Grid>
              </ListItem>
              <ListItem>
                <Button
                  onClick={addToCart}
                  fullWidth
                  variant="contained"
                  color="primary"
                >
                  Add to cart
                </Button>
              </ListItem>
            </List>
          </Card>
        </Grid>
      </Grid>
    </Layout>
  );
}

export async function getServerSideProps(context) {
  const {
    params: { slug },
  } = context;
  await db.connect();
  const product = await Product.findOne({ slug }).lean();
  await db.disconnect();
  return {
    props: {
      product: JSON.parse(JSON.stringify(product)),
    },
  };
}
