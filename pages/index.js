import { Grid } from '@material-ui/core';
import axios from 'axios';
import { useRouter } from 'next/router';
import { useContext } from 'react';
import Layout from '../components/Layout';
import ProductItem from '../components/ProductItem';
import Product from "../models/Product";
import db from "../utils/db";
import { Store } from '../utils/store';

export default function Home(props) {
  const router = useRouter();
  const { state, dispatch } = useContext(Store);
  const { products } = props;
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
              <ProductItem
                product={product}
                addToCart={addToCart}
              />
            </Grid>
          ))}
        </Grid>
      </div>
    </Layout>
  );
}

export async function getServerSideProps() {
  await db.connect();
  const products = await Product.find({}, '-reviews').lean();
  await db.disconnect();
  return {
    props: {
      products: JSON.parse(JSON.stringify(products))
    }
  }
}
