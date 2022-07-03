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
import React, { useContext, useEffect, useReducer } from "react";
import { usePaystackPayment } from "react-paystack";
import { useSnackbar } from "notistack";

import Layout from "../../components/Layout";
import { Store } from "../../utils/store";
import useStyles from "../../utils/styles";
import CheckoutWizard from "../../components/CheckoutWizard";
import { getError } from "../../utils/util";

function reducer(state, action) {
  switch (action.type) {
    case "FETCH_ORDER":
      return { ...state, loading: true, error: "" };
    case "FETCH_SUCCESS":
      return { ...state, loading: false, order: action.payload, error: "" };
    case "FETCH_FAILURE":
      return { ...state, loading: false, error: action.payload };

    case "PAY_REQUEST":
      return { ...state, loading: true, successPay: false };
    case "PAY_SUCCESS":
      return {
        ...state,
        loading: false,
        order: action.payload,
        successPay: true,
      };
    case "PAY_FAILURE":
      return {
        ...state,
        loading: false,
        successPay: false,
        error: action.payload,
      };
    case "RESET_PAY":
      return { ...state, loading: false, successPay: false, error: "" };
    case "DELIVER_REQUEST":
      return { ...state, loadingDeliver: true };
    case "DELIVER_SUCCESS":
      return { ...state, loadingDeliver: false, successDeliver: true };
    case "DELIVER_FAIL":
      return { ...state, loadingDeliver: false, error: action.payload };
    case "DELIVER_RESET":
      return {
        ...state,
        loadingDeliver: false,
        successDeliver: false,
        error: "",
      };

    default:
      return state;
  }
}

function Order({ params }) {
  const { id } = params;
  const router = useRouter();
  const { enqueueSnackbar } = useSnackbar();
  const {
    state: { userInfo },
  } = useContext(Store);
  const style = useStyles();

  const [{ loading, error, order, successPay, successDeliver, loadingDeliver }, dispatch] =
    useReducer(reducer, {
      loading: true,
      error: "",
      order: {},
      successPay: false,
    });

  const {
    shippingAddress,
    paymentMethod,
    orderItems,
    itemsPrice,
    totalPrice,
    shippingCost,
    isDelivered,
    deliveredAt,
    isPaid,
    paidAt,
  } = order;

  const config = {
    reference: new Date().getTime().toString(),
    email: userInfo.email,
    amount: totalPrice * 100,
    publicKey: process.env.NEXT_PUBLIC_PAYSTACK_ID,
  };
  const initializePayment = usePaystackPayment(config);

  useEffect(() => {
    if (!userInfo) {
      return router.push("/login");
    }
    const fetchOrder = async () => {
      try {
        dispatch({ type: "FETCH_ORDER" });
        const { data } = await axios.get(`/api/orders/${id}`, {
          headers: { authorization: `Bearer ${userInfo.token}` },
        });
        dispatch({ type: "FETCH_SUCCESS", payload: data });
      } catch (error) {
        dispatch({ type: "FETCH_FAILURE", payload: getError(error) });
      }
    };

    if (!order._id || successPay || successDeliver || order?._id !== id) {
      fetchOrder();
      if (successPay) {
        dispatch({ type: "RESET_PAY" });
      }
      if (successDeliver) {
        dispatch({ type: "DELIVER_RESET" });
      }
    }
  }, [dispatch, id, order, router, successDeliver, successPay, userInfo]);

  const onSuccess = async (reference) => {
    try {
      dispatch({ type: "PAY_REQUEST" });
      const { data } = await axios.put(`/api/orders/${id}/pay`, reference, {
        headers: { authorization: `Bearer ${userInfo.token}` },
      });
      dispatch({ type: "PAY_SUCCESS", payload: data });
      enqueueSnackbar("Order is successfully paid", { variant: "success" });
    } catch (error) {
      dispatch({ type: "PAY_FAILURE", payload: getError(error) });
      enqueueSnackbar(getError(error), { variant: "error" });
    }
  };

  async function deliverOrderHandler() {
    try {
      dispatch({ type: "DELIVER_REQUEST" });
      const { data } = await axios.put(
        `/api/orders/${order._id}/deliver`,
        {},
        {
          headers: { authorization: `Bearer ${userInfo.token}` },
        }
      );
      dispatch({ type: "DELIVER_SUCCESS", payload: data });
      enqueueSnackbar("Order is delivered", { variant: "success" });
    } catch (error) {
      dispatch({ type: "DELIVER_FAIL", payload: getError(error) });
      enqueueSnackbar(getError(error), { variant: "error" });
    }
  }

  const onClose = () => {
    enqueueSnackbar("Order payment discontinued", { variant: "info" });
  };

  return (
    <Layout title={`Order Details ${id}`}>
      <CheckoutWizard activeStep={2} />
      <Typography component="h1" variant="h1">
        Order {id}
      </Typography>
      {loading ? (
        <CircularProgress />
      ) : error ? (
        <Typography className={style.error}>{error}</Typography>
      ) : (
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
                  {shippingAddress?.name}, {shippingAddress?.address} ,
                  {shippingAddress?.city}, {shippingAddress?.state}.
                </ListItem>
                <ListItem>
                  Status:{" "}
                  {isDelivered
                    ? `delivered at ${new Date(deliveredAt).toLocaleString("en-GB")}`
                    : "not delivered"}
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
                <ListItem>
                  Status:{" "}
                  {isPaid
                    ? `paid at ${new Date(paidAt).toLocaleString("en-GB")}`
                    : "not paid"}
                </ListItem>
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
                        {orderItems?.map((item) => (
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
                      <Typography align="right">
                        &#8358;{shippingCost}
                      </Typography>
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
                {!isPaid && paymentMethod === "paystack" && (
                  <ListItem>
                    {loading ? (
                      <CircularProgress />
                    ) : (
                      <Button
                        onClick={() => {
                          initializePayment(onSuccess, onClose);
                        }}
                        variant="contained"
                        type="submit"
                        fullWidth
                        color="primary"
                      >
                        Pay with Paystack
                      </Button>
                    )}
                  </ListItem>
                )}

                {userInfo.isAdmin && order.isPaid && !order.isDelivered && (
                  <ListItem>
                    {loadingDeliver && <CircularProgress />}
                    <Button
                      fullWidth
                      variant="contained"
                      color="primary"
                      onClick={deliverOrderHandler}
                    >
                      Deliver Order
                    </Button>
                  </ListItem>
                )}
              </List>
            </Card>
          </Grid>
        </Grid>
      )}
    </Layout>
  );
}

export async function getServerSideProps({ params }) {
  return { props: { params } };
}

export default dynamic(() => Promise.resolve(Order), { ssr: false });
