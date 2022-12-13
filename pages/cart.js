/* eslint-disable @next/next/no-img-element */
import {
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
import { useSnackbar } from 'notistack';
import { useSelector, useDispatch } from 'react-redux';
import Layout from '../components/Layout';
import RemoveCircleOutlineOutlinedIcon from '@mui/icons-material/RemoveCircleOutlineOutlined';
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import {
  addToCartAction,
  removedFromCartAction,
  removedItemFromCartAction,
} from '../store/actions/cartAction';
import emptyCart from '../public/Empty cartempty-cart.png';
import {
  justHoverAnimation,
  parent1,
  pulseAnimation,
  slideInRightAnimation,
  tableContentAnimation,
} from '../utils/animation';
import { formatter } from '../utils/currency-converter';
import Link from 'next/link';
const { motion } = require('framer-motion');

function Cart() {
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.userLogin);
  const router = useRouter();
  const { items } = useSelector((state) => state.cart);
  const { closeSnackbar } = useSnackbar();

  const removedFromCart = (product) => {
    return dispatch(removedFromCartAction(product));
  };

  const removeItem = (product) => {
    dispatch(removedItemFromCartAction(product));
  };

  const addToCart = async (product) => {
    closeSnackbar();
    dispatch(addToCartAction(product));
  };

  const checkoutHandler = () => {
    if (userInfo) {
      router.push('/shipping');
    } else {
      router.push('/login?redirect=/shipping');
    }
  };

  return (
    <Layout title="Shopping Cart">
      <div className="flex flex-col w-full px-3 md:px-10 p">
        <motion.h1
          variants={slideInRightAnimation}
          initial="inital"
          animate="animate"
          className="mt-5 mb-5 font-semibold p "
        >
          My Cart
        </motion.h1>
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

        <div className="flex flex-row justify-between w-full p">
          {items?.length === 0 ? (
            <div className="items-center justify-center w-full ">
              <div className="flex flex-col items-center justify-center w-full p-10 bg-white rounded-lg ">
                <Image
                  height={'150px'}
                  alt="emptyCart"
                  width={'150px'}
                  src={emptyCart}
                  lazyloading
                />

                <h2 className="mt-10 mb-10 text-xl font-extralight">
                  Your cart is empty
                </h2>

                <p>Shop for products to be added to your cart</p>

                <hr className="w-full mt-5 mb-5" />

                <motion.button
                  variants={pulseAnimation}
                  initial="initial"
                  animate="animate"
                  onClick={() => router.push('/')}
                  className="px-3 py-2 font-extrabold text-white rounded-lg shadow-md primary-blue-bg"
                >
                  Explore products
                </motion.button>
              </div>
            </div>
          ) : (
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
                      <TableRow className="p">
                        <TableCell>Product Details</TableCell>
                        <TableCell align="center">Quantity</TableCell>
                        <TableCell align="center">Price</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {items?.map(({ item, count }) => (
                        <TableRow key={item?._id}>
                          <TableCell>
                            <motion.div
                              variants={tableContentAnimation}
                              initial="initial"
                              animate="animate"
                              className="flex flex-col items-start justify-start sm:flex-row "
                            >
                              <NextLink
                                href={`/product/${item?.slug}`}
                                passHref
                              >
                                <Link>
                                  <Image
                                    src={item?.image}
                                    alt={item?.name}
                                    width={80}
                                    height={80}
                                  />
                                </Link>
                              </NextLink>
                              <div className="flex flex-col sm:ml-3  sm:text-[14px] text-[12px] w-full ">
                                <h3 className="font-light ">{item?.name}</h3>
                                <h3 className="mt-1 font-light">
                                  {item?.brand}
                                </h3>
                                <h3 className="font-normal ">
                                  {item?.countInStock ? (
                                    <span className="text-green-600">
                                      In Stock
                                    </span>
                                  ) : (
                                    <span className="text-blue-500">
                                      out of Stock{' '}
                                    </span>
                                  )}
                                </h3>
                              </div>
                            </motion.div>
                          </TableCell>

                          <TableCell align="left">
                            <motion.div
                              variants={tableContentAnimation}
                              initial="initial"
                              animate="animate"
                              className="flex flex-col items-center justify-center h-full"
                            >
                              <div className="flex flex-row items-center justify-between mb-4 p">
                                <motion.span
                                  variants={justHoverAnimation}
                                  initial="intial"
                                  whileHover="hover"
                                  className="primary-blue-text active:primary-blue-bg"
                                  onClick={() => removedFromCart(item)}
                                >
                                  <RemoveCircleOutlineOutlinedIcon
                                    style={{ fontSize: '20px' }}
                                  />
                                </motion.span>

                                <h1 className="ml-2 mr-2 text-lg primary-blue-text p">
                                  {count}
                                </h1>
                                <motion.span
                                  variants={justHoverAnimation}
                                  initial="intial"
                                  whileHover="hover"
                                  className="primary-blue-text active:primary-blue-bg p"
                                  onClick={() => addToCart(item)}
                                >
                                  <AddCircleOutlineOutlinedIcon
                                    style={{ fontSize: '20px' }}
                                  />
                                </motion.span>
                              </div>
                              <motion.button
                                variants={justHoverAnimation}
                                initial="intial"
                                whileHover="hover"
                                className="px-2 py-1 text-white rounded-lg shadow-sm hover:shadow:lg primary-blue-bg p"
                                onClick={() => removeItem(item)}
                              >
                                Remove
                              </motion.button>
                            </motion.div>
                          </TableCell>

                          <TableCell align="right">
                            <motion.div
                              variants={tableContentAnimation}
                              initial="initial"
                              animate="animate"
                              className="items-start h-full"
                            >
                              <NextLink
                                href={`/product/${item?.slug}`}
                                passHref
                              >
                                <Link>
                                  <h2 className="font-semibold p">
                                    {formatter.format(item?.price)}
                                  </h2>
                                </Link>
                              </NextLink>
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
                  <h4>Sub Total</h4>
                  <h4 className="font-extrabold">
                    {formatter.format(
                      items?.reduce(
                        (prev, curr) => prev + curr?.count * curr?.item?.price,
                        0
                      )
                    )}
                  </h4>
                </div>
                <div className="flex items-center justify-between w-full px-5 mt-5 mb-5 row">
                  <h4>Standard delivery fee</h4>
                  <h4 className="font-extrabold">
                    {formatter.format(
                      Number(process.env.NEXT_PUBLIC_SHIPPING_FEE || 0)
                    )}
                  </h4>
                </div>
                <hr className="w-full " />
                <div className="flex items-center justify-center w-full py-5 md:py-10">
                  <motion.button
                    variants={pulseAnimation}
                    initial="initial"
                    animate="animate"
                    className="px-3 py-1 text-white rounded-lg shadow-sm hover:shadow:lg primary-blue-bg"
                    onClick={checkoutHandler}
                  >
                    Check out
                  </motion.button>
                </div>
              </motion.div>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}

export default Cart;
