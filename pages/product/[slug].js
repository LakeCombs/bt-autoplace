/* eslint-disable react/jsx-key */
/* eslint-disable @next/next/no-img-element */
import React from 'react';
import Image from 'next/image';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import { useSnackbar } from 'notistack';
import Layout from '../../components/Layout';
import Product from '../../models/Product';
import useStyles from '../../utils/styles';
import RemoveCircleOutlineOutlinedIcon from '@mui/icons-material/RemoveCircleOutlineOutlined';
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import ProductItem from '../../components/ProductItem';
import { StarBorderSharp } from '@material-ui/icons';
import { useDispatch, useSelector } from 'react-redux';
import db from '../../utils/db';
import {
  addToCartAction,
  removedFromCartAction,
} from '../../store/actions/cartAction';
import emptyCart from '../../public/Empty cartempty-cart.png';
import {
  appearOnlyAnimation,
  justHoverAnimation,
  parent1,
  pulseAnimation,
  tableContentAnimation,
} from '../../utils/animation';
import { formatter } from '../../utils/currency-converter';
import Link from 'next/link';
const { motion } = require('framer-motion');

export default function SingleProduct({ product, productCategory, products }) {
  const style = useStyles();
  const router = useRouter();
  const dispatch = useDispatch();

  const { closeSnackbar } = useSnackbar();
  const { items } = useSelector((state) => state.cart);

  const addToCart = async () => {
    closeSnackbar();
    dispatch(addToCartAction(product));
  };

  const removedFromCart = () => {
    dispatch(removedFromCartAction(product));
  };

  if (!product) {
    return (
      <Layout>
        <motion.div
          variants={parent1}
          initial="initial"
          animate="animate"
          className="flex items-center justify-center w-full h-auto pt-20 pb-44"
        >
          <div className="flex flex-col items-center justify-center w-full p-10 bg-white rounded-lg md:w-3/4 ">
            <Image
              height={'150px'}
              alt="emptyCart"
              width={'150px'}
              src={emptyCart}
            />

            <h2 className="mt-10 mb-10 text-xl font-extralight">
              Product not found
            </h2>

            <p>Check for another product </p>

            <hr className="w-full mt-5 mb-5" />

            <motion.button
              variants={pulseAnimation}
              initial="initial"
              animate="animate"
              onClick={() => router.back()}
              className="px-3 py-2 font-extrabold text-white rounded-lg shadow-md primary-blue-bg"
            >
              Go back
            </motion.button>
          </div>
        </motion.div>
      </Layout>
    );
  }

  return (
    <Layout title={product.name} description={product.description}>
      <div className="md:px-10 md:py-10 px-5 py-5">
        <div className={style.section}>
          <NextLink href="/" passHref>
            <Link>
              <h1 className="text-normal">back to products</h1>
            </Link>
          </NextLink>
        </div>
        {/* the product detail session  */}
        <div className="flex flex-col justify-around w-full md:flex-row md:text-normal  p">
          {/* the product image sessin  */}
          <motion.div
            variants={appearOnlyAnimation}
            initial="initial"
            animate="animate"
            className="w-full md:w-1/2 md:mr-4"
          >
            <div className="flex items-center justify-center w-auto h-full p-2 bg-white">
              <img
                alt={product?.name}
                src={product?.image}
                className="object-center w-full h-full"
              />
            </div>
          </motion.div>

          {/* the product details session  */}
          <motion.div
            variants={tableContentAnimation}
            initial="initial"
            animate="animate"
            className="flex flex-col justify-start w-full md:w-1/2"
          >
            <h1 className="flex flex-row justify-between w-full mt-6 p md:w-3/4 md:text-lg">
              <span className="font-semibold">{product?.name}</span>
              <span className="font-semibold">
                {formatter.format(product?.price)}
              </span>
            </h1>

            <h2 className="flex flex-row justify-between w-full mt-6 md:w-3/4 md:text-lg">
              <span className="font-normal">Available:</span>{' '}
              <span className="font-normal">
                {product?.countInStock > 0 ? (
                  <span className="text-[#13E19B]">In stock</span>
                ) : (
                  'Unavailable'
                )}
              </span>
            </h2>
            <h2 className="flex flex-row justify-between w-full mt-6 md:w-3/4 md:text-lg">
              <span className="font-normal">Brand: </span>
              <span className="font-normal">Anything</span>
            </h2>
            <h2 className="flex flex-row justify-between w-full mt-6 md:w-3/4 md:text-lg">
              <span className="font-normal">Category: </span>
              <span className="font-normal">{product?.category}</span>
            </h2>

            <h2 className="flex flex-row justify-between w-full mt-6 md:w-3/4 md:text-lg">
              <span className="font-normal">Weight: </span>
              <span className="font-normal">{product?.weight}</span>
            </h2>

            <h2 className="flex flex-row justify-between w-full mt-6 md:w-3/4 md:text-lg">
              <span className="font-normal">Color: </span>
              <span className="font-normal">{product?.color}</span>
            </h2>

            <div className="flex flex-row items-center mt-3 mb-3 md:text-lg">
              <p className="font-normal">DESCRIPTION</p>
              <span className="w-full">
                <hr />
              </span>
            </div>
            <p className="w-full  md:text-base">{product?.description}</p>
            {/* the quantifty part */}
            <div className="flex flex-row items-center w-auto mt-8 ">
              <motion.span
                variants={justHoverAnimation}
                initial="initial"
                whileHover="hover"
                className="primary-blue-text active:primary-blue-bg border-[1px]"
                onClick={removedFromCart}
              >
                <RemoveCircleOutlineOutlinedIcon style={{ fontSize: '20px' }} />
              </motion.span>
              <span className="ml-3 mr-3 text-[18px] font-[400]">
                {items.find((item) => item?.item?._id === product._id)?.count ||
                  0}
              </span>
              <motion.span
                variants={justHoverAnimation}
                initial="initial"
                whileHover="hover"
                className="primary-blue-text active:primary-blue-bg   border-[1px]"
                onClick={addToCart}
              >
                <AddCircleOutlineOutlinedIcon style={{ fontSize: '20px' }} />
              </motion.span>
            </div>

            <div className="flex flex-row items-center mt-5">
              <motion.button
                variants={pulseAnimation}
                initial="initial"
                animate="animate"
                className="p-2 mr-2 text-white rounded-lg primary-blue-bg font-[16px]"
                onClick={() => {
                  addToCart();
                  router.push('/cart');
                }}
              >
                Add to Cart
              </motion.button>
              <h2>
                <motion.span
                  variants={justHoverAnimation}
                  initial="initial"
                  whileHover="hover"
                  className="mr-1 font-normal text-orange-400 w-[25px] h-[30px] rounded-[100%]"
                >
                  <StarBorderSharp size={'10px'} />
                </motion.span>

                <span className="hover:to-blue-900 hover:cursor-pointer">
                  Add to Wishlist
                </span>
              </h2>
            </div>
          </motion.div>
        </div>
        {/* related product session  */}
        <div className="flex flex-row items-center justify-start w-full mt-5">
          <h1 className="text-sm w-60 md:text-lg">RELATED PRODUCTS</h1>
          <hr className="w-full text-blue-600" />
        </div>
        <div className="flex md:flex-start justify-start ">
          {productCategory?.map((product) => {
            return <ProductItem product={product} addToCart={addToCart} />;
          })}

          {productCategory?.length === 0 ? (
            <div>
              <span>There are no Other product in this category</span>
              {products?.map((product) => {
                return <ProductItem product={product} addToCart={addToCart} />;
              })}
            </div>
          ) : (
            <></>
          )}
        </div>
      </div>
    </Layout>
  );
}

export async function getServerSideProps(context) {
  const {
    params: { slug },
  } = context;
  await db.connect();
  const product = await Product.findOne({ slug }, '-reviews').lean();
  const productCategory = await Product.find({
    category: product?.category,
  }).lean();
  const products = await Product.find({});
  await db.disconnect();

  return {
    props: {
      product: JSON.parse(JSON.stringify(product)),
      productCategory: JSON.parse(JSON.stringify(productCategory)),
      products: JSON.parse(JSON.stringify(products)),
    },
  };
}
