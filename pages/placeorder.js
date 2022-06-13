import {
  Button,
  Card,
  CircularProgress,
  Grid,
  Link,
  List,
  ListItem,
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
import React,{ useContext, useEffect, useState } from "react";
import { useSnackbar } from 'notistack';
import Cookie from "js-cookie";

import Layout from "../components/Layout";
import { Store } from "../utils/store";
import useStyles from "../utils/styles";
import CheckoutWizard from '../components/CheckoutWizard';
import { getError, roundToTwoSig } from "../utils/util";
function PlaceOrder() {
  const router = useRouter();
  const {closeSnackbar, enqueueSnackbar} = useSnackbar();
  const {
    state: { cart, userInfo },
    dispatch,
  } = useContext(Store);
  const { items, shippingAddress, paymentMethod } = cart;
  const style = useStyles();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if(!paymentMethod) {
      router.push('/payment')
    }
    if(items.length === 0) {
      router.push('/cart')

    }

  }, [router, paymentMethod, items.length])

  const itemsPrice = roundToTwoSig(
    items.reduce((prev, curr) => prev + curr.quantity * curr.price, 0)
  );
  const shippingCost = 2000;
  const totalPrice = roundToTwoSig(itemsPrice + shippingCost);

  const placeOrderHandler = async () => {
    closeSnackbar();
    setLoading(true);
    try {
      const {data} = await axios.post('/api/orders', {
        orderItems: items,
        shippingAddress,
        paymentMethod,
        itemsPrice,
        shippingCost,
        totalPrice
      }, {
        headers: {
          authorization: `Bearer ${userInfo.token}`
        }
      })
      dispatch({type: 'CLEAR_CART'});
      Cookie.remove('cartItems');
      setLoading(false);
      router.push(`/order/${data._id}`)
    } catch (error) {
      enqueueSnackbar(getError(error), {variant: 'error'});
      setLoading(false);
    }
  }

  return (
    <Layout title="Place Order">
      <CheckoutWizard activeStep={2} />
      <Typography component="h1" variant="h1">
        Place Order
      </Typography>
      <Grid container spacing={3}>
        <Grid item md={9} xs={12}>
          <Card className={style.section}>
            <List>
              <ListItem>
                <Typography component="h2" variant="h2">
                  Shipping Address
                </Typography>
              </ListItem>
              <ListItem>
                {shippingAddress.name}, {shippingAddress.address} ,
                {shippingAddress.city}, {shippingAddress.state}.
              </ListItem>
            </List>
          </Card>
          <Card className={style.section}>
            <List>
              <ListItem>
                <Typography component="h2" variant="h2">
                  Payment Method
                </Typography>
              </ListItem>
              <ListItem>{paymentMethod}</ListItem>
            </List>
          </Card>
          <Card className={style.section}>
            <List>
              <ListItem>
                <Typography component="h2" variant="h2">
                  Order Items
                </Typography>
              </ListItem>
              <ListItem>
                <TableContainer>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell>Image</TableCell>
                        <TableCell>Name</TableCell>
                        <TableCell align="right">Quantity</TableCell>
                        <TableCell align="right">Price</TableCell>
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
                            <Typography>{item.quantity}</Typography>
                          </TableCell>

                          <TableCell align="right">
                            <NextLink href={`/product/${item.slug}`} passHref>
                              <Link>
                                <Typography>&#8358;{item.price}</Typography>
                              </Link>
                            </NextLink>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </ListItem>
            </List>
          </Card>
        </Grid>
        <Grid item md={3} xs={12}>
          <Card className={style.section}>
            <List>
              <ListItem>
                <Typography variant="h2">Order Summary</Typography>
              </ListItem>
              <ListItem>
                <Grid container>
                  <Grid item xs={6}>
                    <Typography>Items cost:</Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography align="right">&#8358;{itemsPrice}</Typography>
                  </Grid>
                </Grid>
              </ListItem>
              <ListItem>
                <Grid container>
                  <Grid item xs={6}>
                    <Typography>Shipping cost:</Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography align="right">&#8358;{shippingCost}</Typography>
                  </Grid>
                </Grid>
              </ListItem>
              <ListItem>
                <Grid container>
                  <Grid item xs={6}>
                    <Typography>
                      <strong>Total cost</strong>:
                    </Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography align="right">
                      <strong>&#8358;{totalPrice}</strong>
                    </Typography>
                  </Grid>
                </Grid>
              </ListItem>
              <ListItem>
                <Button
                  type="button"
                  variant="contained"
                  color="primary"
                  fullWidth
                  onClick={placeOrderHandler}
                  disabled={loading}
                >
                  Place Order
                </Button>
              </ListItem>
              <ListItem>
                {loading && <CircularProgress />}
              </ListItem>
            </List>
          </Card>
        </Grid>
      </Grid>
    </Layout>
  );
}

export default dynamic(() => Promise.resolve(PlaceOrder), { ssr: false });
