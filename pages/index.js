import {
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Grid,
  Typography,
} from "@material-ui/core";
import axios from "axios";
import NextLink from "next/link";
import Layout from "../components/Layout";
import Product from "../models/Product";
import db from "../utils/db";
import { useContext } from 'react';
import { Store } from "../utils/store";
import { useRouter } from 'next/router';

export default function Home({products}) {
  const {state, dispatch} = useContext(Store);
  const router = useRouter();

  const addToCart = async (product) => {
    
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
  return (
    <Layout> 
      <div>
        <h1>Products</h1>
        <Grid container spacing={3}>
          {products.map((product) => (
            <Grid item md={4} key={product.name}>
              <Card>
                <NextLink href={`/product/${product.slug}`} passHref>
                  <CardActionArea>
                    <CardMedia
                      component={"img"}
                      image={product.image}
                      title={product.name}
                    />
                    <CardContent>
                      <Typography color="secondary" component="h2">{product.name}</Typography>
                    </CardContent>
                  </CardActionArea>
                </NextLink>
                <CardActions>
                  <Typography variant="h2" component="h2">&#8358;{`${product.price}`}</Typography>
                  <Button size="small" variant="contained" color="primary" onClick={() => addToCart(product)}>
                    Add to cart
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </div>
    </Layout>
  );
}

export async function getServerSideProps() {
  await db.connect();
  const products = await Product.find({}).lean();
  await db.disconnect();
  return {
    props: {
      products: JSON.parse(JSON.stringify(products))
    }
  }
}
