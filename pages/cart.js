import {
  Button,
  Card,
  Grid,
  Link,
  List,
  ListItem,
  MenuItem,
  Select,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@material-ui/core";
import axios from "axios";
import dynamic from "next/dynamic";
import Image from "next/image";
import NextLink from "next/link";
import { useRouter } from "next/router";
import React, { useContext } from "react";
import Layout from "../components/Layout";
import { Store } from "../utils/store";
import useStyles from '../utils/styles';
function Cart() {
  const router = useRouter();
  const {
    state: { cart, userInfo },
    dispatch,
  } = useContext(Store);
  const { items } = cart;
  const style = useStyles();

  const onChangeHandler = async (item, quantity) => {
    const { data } = await axios.get(`/api/products/${item._id}`);
    if (data.countInStock < 1) {
      alert("Sorry, Product not in stock");
      return;
    }
    dispatch({ type: "ADD_TO_CART", payload: { ...item, quantity } });
  };

  const removeItem = (item) => {
    dispatch({ type: "REMOVE_CART_ITEM", payload: item });
  };

  const checkoutHandler = () => {
    if(userInfo) {
      router.push('/shipping');
    } else {
      router.push('/login?redirect=/shipping');
    }
  }
  return (
    <Layout title="Shopping Cart">
      <Typography component="h1" variant="h1">
        Shopping Cart
      </Typography>
      {items.length === 0 ? (
        <div>
          Cart is empty.{" "}
          <NextLink href={"/"} passHref>
            <Link>Go to shopping</Link>
          </NextLink>
        </div>
      ) : (
        <Grid container spacing={3}>
          <Grid item md={9} xs={12}>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Image</TableCell>
                    <TableCell>Name</TableCell>
                    <TableCell align="right">Quantity</TableCell>
                    <TableCell align="right">Price</TableCell>
                    <TableCell align="right">Remove</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {items.map((item) => (
                    <TableRow key={item._id}>
                      <TableCell>
                        <NextLink href={`/product/${item.slug}`} passHref>
                          <Link>
                            <Image
                              src={item.image}
                              alt={item.name}
                              width={50}
                              height={50}
                            />
                          </Link>
                        </NextLink>
                      </TableCell>

                      <TableCell>
                        <NextLink href={`/product/${item.slug}`} passHref>
                          <Link>
                            <Typography>{item.name}</Typography>
                          </Link>
                        </NextLink>
                      </TableCell>

                      <TableCell align="right">
                        <Select
                          value={item.quantity}
                          onChange={(e) =>
                            onChangeHandler(item, e.target.value)
                          }
                        >
                          {[...Array(item.countInStock).keys()].map((x) => (
                            <MenuItem key={x + 1} value={x + 1}>
                              {x + 1}
                            </MenuItem>
                          ))}
                        </Select>
                      </TableCell>

                      <TableCell align="right">
                        <NextLink href={`/product/${item.slug}`} passHref>
                          <Link>
                            <Typography>&#8358;{item.price}</Typography>
                          </Link>
                        </NextLink>
                      </TableCell>
                      <TableCell align="right">
                        <Button
                          variant="contained"
                          className={style.deleteBtn}
                          onClick={() => removeItem(item)}
                        >
                          <svg className="white-icon" xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM8 9h8v10H8V9zm7.5-5l-1-1h-5l-1 1H5v2h14V4z"/></svg>
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>
          <Grid item md={3} xs={12}>
            <Card>
              <List>
                <ListItem>
                  <Typography variant="h2">
                    Subtotal (
                    {items.reduce((prev, curr) => prev + curr.quantity, 0)}{" "}
                    items) : &#8358;{" "}
                    {items.reduce(
                      (prev, curr) => prev + curr.quantity * curr.price,
                      0
                    )}
                  </Typography>
                </ListItem>
                <ListItem>
                  <Button
                    type="button"
                    variant="contained"
                    color="primary"
                    fullWidth
                    onClick={checkoutHandler}
                  >
                    Checkout
                  </Button>
                </ListItem>
              </List>
            </Card>
          </Grid>
        </Grid>
      )}
    </Layout>
  );
}

export default dynamic(() => Promise.resolve(Cart), { ssr: false });
