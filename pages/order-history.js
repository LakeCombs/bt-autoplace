/* eslint-disable no-undef */
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import NextLink from 'next/link';
import React, { useEffect } from 'react';
import {
  CircularProgress,
  Grid,
  List,
  ListItem,
  TableContainer,
  Card,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Button,
} from '@material-ui/core';
import Layout from '../components/Layout';
import useStyles from '../utils/styles';
import {
  fetchOrderByIdAction,
  getMyOrdersAction,
} from '../store/actions/orderAction';
import { useDispatch, useSelector } from 'react-redux';
import Link from 'next/link';
import Image from 'next/image';
import {
  justHoverAnimation,
  slideInLeftAnimation,
  tableContentAnimation,
} from '../utils/animation';
import { formatter } from '../utils/currency-converter';
const { motion } = require('framer-motion');

function OrderHistory() {
  const router = useRouter();
  const style = useStyles();
  const dispatch = useDispatch();
  const { loading, error, orders } = useSelector((state) => state.getMyOrder);
  const { userInfo } = useSelector((state) => state.userLogin);

  useEffect(() => {
    if (!userInfo) {
      router.push('/login');
    }

    dispatch(getMyOrdersAction());
  }, [dispatch, router, userInfo]);
  return (
    <Layout title="Order History">
      <div className="px-5">
        <Grid container spacing={1}>
          <motion.div
            variants={slideInLeftAnimation}
            initial="inital"
            animate="animate"
            className="mt-10 mb-2 font-semibold text-blue-500"
          >
            <NextLink href={'/'} passHref>
              <Link>
                <p className="p">Back to Shopping</p>
              </Link>
            </NextLink>
          </motion.div>
          <Grid item xs={12}>
            <Card className={style.section}>
              <List>
                <ListItem>
                  <h1 className="p">
                    Order History
                    <span className="ml-3">
                      {loading ? <CircularProgress size={'20px'} /> : <></>}
                    </span>
                  </h1>
                </ListItem>
                <ListItem>
                  {error ? <p className="p text-red-600">{error}</p> : <></>}
                </ListItem>
                <ListItem>
                  <motion.div
                    variants={tableContentAnimation}
                    initial="initial"
                    animate="animate"
                    className="w-full p"
                  >
                    <TableContainer>
                      <Table>
                        <TableHead>
                          <TableRow>
                            <TableCell align="center">
                              <p className="p">ID</p>
                            </TableCell>
                            <TableCell>
                              <p className="p">Product</p>
                            </TableCell>
                            <TableCell>
                              <p className="p">DATE</p>
                            </TableCell>
                            <TableCell>
                              <p className="p">PRICE</p>
                            </TableCell>
                            <TableCell>
                              <p className="p">Qty</p>
                            </TableCell>
                            <TableCell>
                              <p className="p">PAID AT</p>
                            </TableCell>
                            <TableCell>
                              <p className="p">DELIVERED AT</p>
                            </TableCell>
                            <TableCell>
                              <p className="p">ACTION</p>
                            </TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {orders?.map((order) =>
                            order?.orderItems?.map((item, count) => {
                              return (
                                <TableRow key={item?._id}>
                                  <TableCell>
                                    <p className="p">
                                      {order?._id.substring(20, 24)}
                                    </p>
                                  </TableCell>
                                  <TableCell>
                                    <NextLink
                                      href={`/order/${order?._id}`}
                                      passHref
                                    >
                                      <Image
                                        height={'30px'}
                                        width={'30px'}
                                        alt={item?.item?.name}
                                        src={item?.item?.image}
                                      />
                                    </NextLink>
                                  </TableCell>
                                  <TableCell>
                                    <p className="p">
                                      {new Date(order?.createdAt)
                                        .toLocaleString('en-GB')
                                        .substring(0, 10)}
                                    </p>
                                  </TableCell>
                                  <TableCell>
                                    <p className="p">
                                      {formatter.format(item?.item?.price)}
                                    </p>
                                  </TableCell>
                                  <TableCell>
                                    <p className="p">{item?.count}</p>
                                  </TableCell>
                                  <TableCell>
                                    <p className="p">
                                      {order?.isPaid
                                        ? `${new Date(order?.paidAt)
                                            .toLocaleString('en-GB')
                                            .substring(0, 10)}`
                                        : 'Not paid'}
                                    </p>
                                  </TableCell>
                                  <TableCell>
                                    <p className="p">
                                      {order?.isDelivered
                                        ? `${new Date(order?.deliveredAt)
                                            .toLocaleString('en-GB')
                                            .substring(0, 10)}`
                                        : 'In transit'}
                                    </p>
                                  </TableCell>
                                  <TableCell>
                                    <Button
                                      variant="contained"
                                      onClick={() => {
                                        dispatch(
                                          fetchOrderByIdAction(order?._id)
                                        );
                                        router.push(`/order/${order?._id}`);
                                      }}
                                    >
                                      <motion.div
                                        variants={justHoverAnimation}
                                        initial="initial"
                                        whileHover="hover"
                                      >
                                        <p className="p">Details</p>
                                      </motion.div>
                                    </Button>
                                  </TableCell>
                                </TableRow>
                              );
                            })
                          )}
                        </TableBody>
                      </Table>
                    </TableContainer>
                  </motion.div>
                </ListItem>
              </List>
            </Card>
          </Grid>
        </Grid>
      </div>
    </Layout>
  );
}

export default dynamic(() => Promise.resolve(OrderHistory), { ssr: false });
