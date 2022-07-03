import {
  Button,
  Card,
  Grid,
  Link,
  List,
  ListItem,
  Typography,
  TextField,
  CircularProgress,
} from "@material-ui/core";
import axios from "axios";
import Image from "next/image";
import NextLink from "next/link";
import Rating from "@material-ui/lab/Rating";
import { useSnackbar } from "notistack";
import React, { useCallback, useContext, useEffect, useState } from "react";
import Layout from "../../components/Layout";
import Product from "../../models/Product";
import db from "../../utils/db";
import { Store } from "../../utils/store";
import useStyles from "../../utils/styles";
import { useRouter } from "next/router";
import { getError } from "../../utils/util";

export default function SingleProduct({ product }) {
  const { state: {userInfo}, dispatch } = useContext(Store);
  const style = useStyles();
  const router = useRouter();

  const { enqueueSnackbar } = useSnackbar();

  const [reviews, setReviews] = useState([]);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(false);

  const addToCart = async () => {
    const existItem = state.cart.items.find((item) => item._id === product._id);
    const quantity = existItem ? existItem.quantity + 1 : 1;
    const { data } = await axios.get(`/api/products/${product._id}`);

    if (data.countInStock < quantity) {
      alert("Sorry, Product not in stock");
      return;
    }
    dispatch({ type: "ADD_TO_CART", payload: { ...product, quantity } });
    router.push("/cart");
  };

  const fetchReviews = useCallback(async () => {
    try {
      const { data } = await axios.get(
        `/api/products/${product._id}/reviews`
      );
      setReviews(data);
    } catch (err) {
      enqueueSnackbar(getError(err), { variant: "error" });
    }
  }, [enqueueSnackbar, product._id]);

  const submitHandler = async (e) => {
    e.preventDefault();
    if(comment && rating) {
      setLoading(true);
      try {
        await axios.post(
          `/api/products/${product._id}/reviews`,
          {
            rating,
            comment,
          },
          {
            headers: { authorization: `Bearer ${userInfo.token}` },
          }
        );
        setLoading(false);
        enqueueSnackbar("Review submitted successfully", { variant: "success" });
        setRating(0);
        setComment("");
        fetchReviews();
      } catch (err) {
        setLoading(false);
        enqueueSnackbar(getError(err), { variant: "error" });
      }
    }
  };

  useEffect(() => {
    fetchReviews();
  }, [fetchReviews]);

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
                <Typography component="h2" variant="h2">
                  Brand: {product.brand}
                </Typography>
              </ListItem>
              <ListItem>
                <Rating value={product.rating} readOnly></Rating>
                <Link href="#reviews">
                  <Typography>({product.numReviews} reviews)</Typography>
                </Link>
              </ListItem>
              <ListItem>
                <Typography variant="body2">{product.description}</Typography>
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

      <List>
        <ListItem>
          <Typography name="reviews" id="reviews" variant="h2">
            Customer Reviews
          </Typography>
        </ListItem>
        {reviews.length === 0 && <ListItem>No review</ListItem>}
        {reviews.map((review) => (
          <ListItem key={review._id}>
            <Grid container>
              <Grid item className={style.reviewItem}>
                <Typography>
                  <strong>{review.name}</strong>
                </Typography>
                <Typography>{review.createdAt.substring(0, 10)}</Typography>
              </Grid>
              <Grid item>
                <Rating value={review.rating} readOnly></Rating>
                <Typography>{review.comment}</Typography>
              </Grid>
            </Grid>
          </ListItem>
        ))}
        <ListItem>
          {userInfo ? (
            <form onSubmit={submitHandler} className={style.reviewForm}>
              <List>
                <ListItem>
                  <Typography variant="h2">Leave your review</Typography>
                </ListItem>
                <ListItem>
                  <TextField
                    multiline
                    variant="outlined"
                    fullWidth
                    name="review"
                    label="Enter comment"
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                  />
                </ListItem>
                <ListItem>
                  <Rating
                    name="simple-controlled"
                    value={rating}
                    onChange={(e) => setRating(e.target.value)}
                  />
                </ListItem>
                <ListItem>
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                  >
                    Submit
                  </Button>

                  {loading && <CircularProgress></CircularProgress>}
                </ListItem>
              </List>
            </form>
          ) : (
            <Typography variant="h2">
              Please{" "}
              <Link href={`/login?redirect=/product/${product.slug}`}>
                login
              </Link>{" "}
              to write a review
            </Typography>
          )}
        </ListItem>
      </List>
    </Layout>
  );
}

export async function getServerSideProps(context) {
  const {
    params: { slug },
  } = context;
  await db.connect();
  const product = await Product.findOne({ slug },  '-reviews').lean();
  await db.disconnect();
  return {
    props: {
      product: JSON.parse(JSON.stringify(product)),
    },
  };
}
