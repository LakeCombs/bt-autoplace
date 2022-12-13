/* eslint-disable no-undef */
import {
  CircularProgress,
  Link,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@material-ui/core';
import Image from 'next/image';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import Layout from '../../components/Layout';
import { useSelector, useDispatch } from 'react-redux';
import { fetchOrderByIdAction } from '../../store/actions/orderAction';
import {
  appearOnlyAnimation,
  parent1,
  pulseAnimation,
  slideInRightAnimation,
  tableContentAnimation,
} from '../../utils/animation';
import ReactWhatsapp from 'react-whatsapp';
import { formatter } from '../../utils/currency-converter';
const { motion } = require('framer-motion');

function Order({ params }) {
  const dispatch = useDispatch();
  const router = useRouter();
  const { id } = params;

  const { order, loading, error } = useSelector((state) => state.orderById);

  useEffect(() => {
    if (!order?._id) {
      dispatch(fetchOrderByIdAction(id));
    }
  }, [dispatch, id, order]);

  return (
    <Layout title={`Order Details ${id}`}>
      <div className="flex flex-col w-full px-3 md:px-10 p">
        <motion.h1
          variants={slideInRightAnimation}
          initial="inital"
          animate="animate"
          className="mt-5 mb-5 font-semibold p "
        >
          Order id: {id} {loading ? <CircularProgress size={'20px'} /> : <></>}{' '}
        </motion.h1>
        <Link onClick={() => router.back()}>
          <p className="p">Back to Orders</p>
        </Link>
        <motion.hr
          initial={{
            x: '100vw',
          }}
          animate={{
            x: '0',
          }}
          transition={{
            duration: 1.2,
          }}
          className="w-full mb-2"
        />

        {error ? (
          <motion.h1
            variants={appearOnlyAnimation}
            initial="initial"
            animate="animate"
            className="mt-3 mb-3 text-red-500"
          >
            {error}
          </motion.h1>
        ) : (
          <></>
        )}

        <div className="flex flex-col w-full md:flex-row">
          <motion.div
            variant={parent1}
            initial="initial"
            animate="animate"
            className="w-full m-0 overflow-scroll md:w-5/6 md:ml-5 p"
          >
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>
                      <p className="p">Product</p>
                    </TableCell>
                    <TableCell align="center">
                      <p className="p">Quantity</p>
                    </TableCell>
                    <TableCell align="center">
                      <p className="p">Price</p>
                    </TableCell>
                    <TableCell align="center">
                      <p className="p">Delivered</p>
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {order?.orderItems?.map(({ item, count }) => (
                    <TableRow key={item?._id}>
                      <TableCell>
                        <motion.div
                          variants={tableContentAnimation}
                          initial="initial"
                          animate="animate"
                          className="flex md:flex-row flex-col text-[10px] justify-start items-start "
                        >
                          <NextLink href={`/product/${item?.slug}`} passHref>
                            <Link>
                              <Image
                                src={item?.image}
                                alt={item?.name}
                                width={80}
                                height={80}
                              />
                            </Link>
                          </NextLink>
                          <div className="flex flex-col md:ml-3  sm:w-full w-[100px] ">
                            <p className="font-light">Name: {item?.name}</p>
                            <p className="font-light ">
                              Category: {item?.category}
                            </p>
                            <p className="mt-1 font-light">
                              Rating: {item?.rating}
                            </p>
                            <p className="mt-1 font-light">
                              Brand: {item?.brand}
                            </p>
                          </div>
                        </motion.div>
                      </TableCell>

                      <TableCell align="center">
                        <motion.div
                          variants={tableContentAnimation}
                          initial="initial"
                          animate="animate"
                          className="flex flex-col items-center justify-center h-full"
                        >
                          <div className="flex flex-row items-center justify-between mb-4">
                            <h1 className="ml-3 mr-3 text-base primary-blue-text p">
                              {count}
                            </h1>
                          </div>
                        </motion.div>
                      </TableCell>

                      <TableCell align="center">
                        <motion.div
                          variants={tableContentAnimation}
                          initial="initial"
                          animate="animate"
                          className="flex flex-col items-center justify-center h-full"
                        >
                          <div className="flex flex-row items-center justify-between mb-4">
                            <h1 className="ml-3 mr-3 text-base primary-blue-text p">
                              {formatter.format(item?.price)}
                            </h1>
                          </div>
                        </motion.div>
                      </TableCell>

                      <TableCell align="center">
                        <motion.div
                          variants={tableContentAnimation}
                          initial="initial"
                          animate="animate"
                          className="flex flex-col items-center justify-center h-full"
                        >
                          <div className="flex flex-row items-center justify-between mb-4">
                            <h1 className="ml-3 mr-3 text-base primary-blue-text p">
                              {order?.isDelivered ? (
                                <span className="text-green-500">
                                  Delivered
                                </span>
                              ) : (
                                <span> Pending Delivery</span>
                              )}
                            </h1>
                          </div>
                        </motion.div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </motion.div>

          <motion.div
            variants={slideInRightAnimation}
            initial="initial"
            animate="animate"
            className="flex-col w-full py-5 bg-white shadow-md md:ml-2 md:w-1/4 md:flex"
          >
            <h1 className="w-full px-5 ">ORDER SUMMARY</h1>
            <hr className="w-full mt-8 mb-8" />
            <div className="flex items-center justify-between w-full px-5 row">
              <h4>Total Amount paid</h4>
              <h4 className="font-extrabold">
                {formatter.format(order?.totalPrice)}
              </h4>
            </div>
            <div className="flex items-center justify-between w-full px-5 mt-5 mb-5 row">
              <h4>Standard delivery fee</h4>
              <h4 className="font-extrabold">
                {formatter.format(order?.shippingCost)}
              </h4>
            </div>
            <div className="flex items-center justify-between w-full px-5 mt-5 mb-5 row">
              <h4>Delivered status</h4>
              <h4 className="">
                {order?.isDelivered ? 'Delivered' : 'Pending Delivery'}
              </h4>
            </div>
            <hr className="w-full " />
            <motion.div
              variants={pulseAnimation}
              initial="initial"
              animate="animate"
              className="flex items-center justify-center w-full py-5 md:py-10 hover:cursor-pointer"
            >
              <ReactWhatsapp
                number={
                  process.env.NEXT_PUBLIC_WHATAPP_NUMBER || '+2348065280371'
                }
              >
                Contact Help
              </ReactWhatsapp>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </Layout>
  );
}

export async function getServerSideProps({ params }) {
  return { props: { params } };
}

export default Order;
