/* eslint-disable no-undef */
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import {
  CircularProgress,
  Grid,
  List,
  ListItem,
  Typography,
  Card,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Menu,
  MenuItem,
} from '@material-ui/core';
import Layout from '../../components/Layout';
import useStyles from '../../utils/styles';
import { useSelector, useDispatch } from 'react-redux';
import {
  adminUpdateDeliveredAction,
  fetchOrderByIdAction,
  getAllOrderAction,
} from '../../store/actions/orderAction';
import { useSnackbar } from 'notistack';
import AdminPanelOptions from '../../components/adminPanelOptions';
import {
  justHoverAnimation,
  slideInLeftAnimation,
  tableContentAnimation,
} from '../../utils/animation';
import { formatter } from '../../utils/currency-converter';
const { motion } = require('framer-motion');

function Orders() {
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.userLogin);
  const router = useRouter();
  const style = useStyles();
  const { enqueueSnackbar } = useSnackbar();
  const { orders, loading, error } = useSelector((state) => state.allOrder);
  const { order: updatedOrder, loading: deliveredLoading } = useSelector(
    (state) => state?.adminUpdateDelivered
  );

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  useEffect(() => {
    if (!userInfo?.isAdmin) {
      return router.push('/');
    }

    dispatch(getAllOrderAction());
  }, [dispatch, router, userInfo]);

  useEffect(() => {
    if (updatedOrder?.order) {
      enqueueSnackbar(`Updated order to delivered`);
      dispatch(getAllOrderAction());
    }
  }, [dispatch, enqueueSnackbar, updatedOrder?.order]);

  return (
    <Layout title="Orders">
      <div className="px-2">
        <Grid container spacing={1}>
          <Grid item md={3} xs={12}>
            <Card className={style.section}>
              <AdminPanelOptions />
            </Card>
          </Grid>
          <Grid item md={9} xs={12}>
            <Card className={style.section}>
              <List>
                <ListItem>
                  <motion.h1
                    variants={slideInLeftAnimation}
                    initial="initial"
                    animate="animate"
                  >
                    Orders
                    <span className="ml-3">
                      {loading || deliveredLoading ? (
                        <CircularProgress size={'20px'} />
                      ) : (
                        <></>
                      )}
                    </span>{' '}
                  </motion.h1>
                </ListItem>

                <ListItem>
                  {error ? (
                    <Typography className={style.error}>{error}</Typography>
                  ) : (
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
                              <TableCell>
                                <p className="p">ID</p>
                              </TableCell>
                              <TableCell>
                                <p className=" p">USER</p>
                              </TableCell>
                              <TableCell>
                                <p className="p">DATE</p>
                              </TableCell>
                              <TableCell>
                                <p className=" p">TOTAL</p>
                              </TableCell>
                              <TableCell>
                                <p className="p">PAID STATUS</p>
                              </TableCell>
                              <TableCell>
                                <p className="p">DELIVERED STATUS</p>
                              </TableCell>
                              <TableCell>
                                <p className=" p">ACTION</p>
                              </TableCell>
                            </TableRow>
                          </TableHead>
                          <TableBody>
                            {orders?.map((order) => {
                              return (
                                <TableRow key={order?._id}>
                                  <TableCell>
                                    <p className=" p">
                                      {order?._id.substring(20, 24)}
                                    </p>
                                  </TableCell>
                                  <TableCell>
                                    <p className=" p">
                                      {order?.user
                                        ? order.user.first_name
                                        : 'DELETED USER'}
                                    </p>
                                  </TableCell>
                                  <TableCell>
                                    <p className=" p">
                                      {order?.createdAt.substring(0, 10)}
                                    </p>
                                  </TableCell>
                                  <TableCell>
                                    <p className=" p">
                                      {formatter.format(order?.totalPrice)}
                                    </p>
                                  </TableCell>
                                  <TableCell>
                                    <p className=" p">
                                      {order?.isPaid ? (
                                        <span className="text-green-600">
                                          Paid
                                        </span>
                                      ) : (
                                        <span className="text-blue-600">
                                          Not Paid
                                        </span>
                                      )}
                                    </p>
                                  </TableCell>
                                  <TableCell>
                                    <p className=" p">
                                      {order?.isDelivered ? (
                                        <span className="text-green-600">
                                          Delivered
                                        </span>
                                      ) : (
                                        <span className="text-blue-600">
                                          {' '}
                                          Not delivered
                                        </span>
                                      )}
                                    </p>
                                  </TableCell>
                                  <TableCell>
                                    <motion.button
                                      variants={justHoverAnimation}
                                      initial="initial"
                                      whileHover="hover"
                                      className="w-auto px-2 py-1  text-white border rounded-md primary-blue-bg outline-black p"
                                      onClick={() => {
                                        dispatch(
                                          fetchOrderByIdAction(order?._id)
                                        );
                                        router.push(
                                          `/admin/order/${order?._id}`
                                        );
                                        router.push(
                                          `/admin/order/${order?._id}`
                                        );
                                      }}
                                    >
                                      View Order
                                    </motion.button>
                                  </TableCell>
                                </TableRow>
                              );
                            })}
                          </TableBody>
                        </Table>
                      </TableContainer>
                    </motion.div>
                  )}
                </ListItem>
              </List>
            </Card>
          </Grid>
        </Grid>
      </div>
    </Layout>
  );
}

export default dynamic(() => Promise.resolve(Orders), { ssr: false });
