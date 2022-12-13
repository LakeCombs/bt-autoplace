/* eslint-disable @next/next/no-img-element */

import { useRouter } from 'next/router';
import { useSnackbar } from 'notistack';
import Layout from '../components/Layout';
import ProductItem from '../components/ProductItem';
import Product from '../models/Product';
import db from '../utils/db';
import * as React from 'react';
import DirectionsCarFilledOutlinedIcon from '@mui/icons-material/DirectionsCarFilledOutlined';
import Battery3BarOutlinedIcon from '@mui/icons-material/Battery3BarOutlined';
import BatteryChargingFullOutlinedIcon from '@mui/icons-material/BatteryChargingFullOutlined';
import TripOriginOutlinedIcon from '@mui/icons-material/TripOriginOutlined';
import Image from 'next/image';
import NextLink from 'next/link';
import aboutusphoto from '../public/aboutusphoto.png';
import { useDispatch } from 'react-redux';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { Carousel } from 'react-responsive-carousel';
import { useState } from 'react';
import { useInView } from 'react-intersection-observer';
import {
  animateSVG,
  animateSVGPath,
  scaleohHover,
  ScaleOnHoverAnimation,
  slideInRight,
  zoomOutAnimation,
} from '../utils/animation';
import { addToCartAction } from '../store/actions/cartAction';
const { motion, useAnimation } = require('framer-motion');

export const categoryList = [
  {
    name: 'Car Battery',
    icon: <DirectionsCarFilledOutlinedIcon />,
  },
  {
    name: 'Car Tire',
    icon: <DirectionsCarFilledOutlinedIcon />,
  },
  {
    name: 'Van Battery',
    icon: <Battery3BarOutlinedIcon />,
  },

  {
    name: 'Solar Battery',
    icon: <BatteryChargingFullOutlinedIcon />,
  },

  {
    name: 'Truck Tire',
    icon: <TripOriginOutlinedIcon />,
  },
];

const squareVariants = {
  visible: { opacity: 1, scale: 4, transition: { duration: 1 } },
  hidden: { opacity: 0, scale: 0 },
};

export default function Home(props) {
  const router = useRouter();
  const dispatch = useDispatch();
  const controls = useAnimation();
  const [ref, inView] = useInView();
  const [randomElement, setRandomElement] = useState();

  const { products } = props;
  const { closeSnackbar } = useSnackbar();
  const [query, setQuery] = useState('');

  const addToCart = async (product) => {
    closeSnackbar();
    dispatch(addToCartAction(product));

    router.push('/cart');
  };

  const queryChangeHandler = (e) => {
    setQuery(e.target.value);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    router.push(`/search?query=${query}`);
  };

  const searchCategory = (cat) => {
    router.push(`/search?query=${cat}`);
  };

  var getMeRandomElements = () => {
    var result = [];
    for (var i = 0; i < 5; i++) {
      result.push(products[Math.floor(Math.random() * products?.length)]);
    }
    return result;
  };

  React.useEffect(() => {
    var getMeRandomElements = () => {
      var result = [];
      for (var i = 0; i < 5; i++) {
        result.push(products[Math.floor(Math.random() * products?.length)]);
      }
      return result;
    };

    setRandomElement(getMeRandomElements());

    getMeRandomElements();
  }, [products]);

  React.useEffect(() => {
    if (inView) {
      controls.start('visible');
    }
  }, [controls, inView]);

  return (
    <div>
      <Layout>
        <div className="flex flex-col w-full h-full">
          <div className="h-80  w-full flex justify-center primary-text-blue item-center bg-[url('../public/pictbacjkg.png')] flex-col bg-cover bg-center px-12 md:items-start">
            <motion.div
              initial={{
                y: 5,
                opacity: 0.3,
              }}
              animate={{
                y: 0,
                opacity: 1,
              }}
              transition={{
                delay: 0.5,
                duration: 0.8,
                type: 'spring',
                stiffness: 100,
              }}
              className="justify-center w-full md:justify-start"
            >
              <h1 className="text-xl font-extrabold text-center text-white md:text-start">
                Find Your Next Best
              </h1>
              <h1 className="mt-2 text-xl font-extrabold text-center primary-blue-text md:text-start">
                Battery <span className="text-white">and</span> Tyre
              </h1>
            </motion.div>

            <form onSubmit={submitHandler}>
              <div className="flex flex-col items-center w-auto h-8 mt-4 md:flex-row">
                <motion.input
                  whileHover={{
                    scale: 1.1,
                    boxShadow: '0px 0px 8px rgb(225, 225, 225)',
                  }}
                  value={query}
                  className="h-[30px] md:h-full px-2 rounded-md outline-white "
                  onChange={queryChangeHandler}
                />
                <br className="flex md:hidden" />
                <motion.button
                  whileHover={{
                    scale: 1.1,
                    boxShadow: '0px 0px 8px rgb(225, 225, 225)',
                  }}
                  className="flex items-center justify-center h-full px-3 py-2 ml-2 font-light text-white rounded-sm outline-none primary-blue-bg hover:cursor-pointer "
                  onClick={submitHandler}
                >
                  Search
                </motion.button>
              </div>
            </form>
          </div>
          {/* The categories and carousel part */}
          <div className="flex justify-between w-full px-6 mt-6">
            <div className="flex-col hidden w-1/5 p-3 shadow-md shadow-gray-400 md:flex">
              <h1 className="text-black">Category</h1>
              <br />
              <hr />

              {categoryList.map((cat) => {
                return (
                  <motion.div
                    variants={ScaleOnHoverAnimation}
                    initial="initial"
                    whileHover="hover"
                    animate="animat"
                    key={cat?.name}
                    className="flex flex-row items-center mt-4 mb-4 hover:cursor-pointer hover:bg-blue-100 "
                    onClick={() => searchCategory(cat?.name)}
                  >
                    <span className="p-1 mr-1 border rounded-md outline-blue-500 primary-blue-text">
                      {' '}
                      {cat?.icon}
                    </span>
                    <h3 className="text-[16px]">{cat?.name}</h3>
                  </motion.div>
                );
              })}
            </div>

            <div className="flex flex-row items-center justify-center md:w-[70%] w-100% md:h-[400px] h-[350px] py-2 bg-white shadow-md overflow-hidden">
              <Carousel
                autoPlay
                infiniteLoop
                showIndicators={false}
                showStatus={false}
              >
                {getMeRandomElements()?.map((product) => {
                  return (
                    <motion.div
                      variants={zoomOutAnimation}
                      initial="initial"
                      whileHover="hover"
                      className="w-full h-full px-2 overflow-hidden bg-white "
                      key={product?._id}
                    >
                      <div
                        onClick={() => {
                          router.push(`/product/${product?.slug}`);
                        }}
                      >
                        <img
                          src={product?.image}
                          className="md:w-[300px] md:h-[300px] w-[180px] h-[180px] object-contain mb-2"
                          alt={product?.name}
                        />
                      </div>
                      <p className="mt-1 text-lg font-semibold p">
                        {product?.name}
                      </p>
                    </motion.div>
                  );
                })}
              </Carousel>
            </div>
          </div>
          {/* Top Products Sesson  */}
          <div className="flex flex-col items-center justify-center w-full h-auto px-10 md:mt-24 pt-[20px]">
            <h1 className="mb-6 text-2xl font-extrabold text-color-black">
              Top Product
            </h1>
            <motion.div className="flex flex-wrap justify-center ">
              {randomElement?.map((product) => {
                return (
                  <ProductItem
                    key={product?._id}
                    product={product}
                    addToCart={() => addToCart(product)}
                  />
                );
              })}
            </motion.div>
            <div className="flex justify-end w-full px-4 mt-3 mb-3">
              <NextLink href="/search" passHref>
                <motion.p
                  initial={{ scale: 1.0 }}
                  animate={{
                    scale: 1.1,
                    textShadow: '0px 0px 8px rgb(225, 225,225)',
                  }}
                  transition={{
                    yoyo: Infinity,
                    duration: 0.5,
                  }}
                  className="font-bold text-blue-500 hover:cursor-pointer p"
                >
                  View All
                </motion.p>
              </NextLink>
            </div>
          </div>

          {/* Premium Service Sessino */}
          <motion.div
            // ref={ref}
            variants={squareVariants}
            initial="initial"
            animate={controls}
            className="flex w-full flex-col items-center p-2 justify-center mt-2 bg-[url('../public/groudbg.png')]  bg-cover bg-center p"
          >
            <h1 className="py-6 text-3xl font-extrabold primary-blue-text">
              Premium Service
            </h1>
            <div className="flex flex-wrap items-center justify-center w-full h-auto py-10 lg:w-3/4 md:grid md:grid-cols-2">
              {/* first */}
              <motion.div
                variants={scaleohHover}
                initial="initial"
                animate="animate"
                whileHover="hover"
                className="flex flex-row p-2 m-3 md:w-96 w-80"
              >
                <span className="flex items-center justify-center p-2 border border-blue-800 rounded-md primary-text-blue">
                  <motion.svg
                    variants={animateSVG}
                    initial="initial"
                    animate="animate"
                    width="40"
                    height="40"
                    viewBox="0 0 100 96"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <motion.path
                      variants={animateSVGPath}
                      d="M34.7 95.25L26.15 80.85L9.95 77.25L11.525 60.6L0.5 48L11.525 35.4L9.95 18.75L26.15 15.15L34.7 0.75L50 7.275L65.3 0.75L73.85 15.15L90.05 18.75L88.475 35.4L99.5 48L88.475 60.6L90.05 77.25L73.85 80.85L65.3 95.25L50 88.725L34.7 95.25ZM38.525 83.775L50 78.825L61.7 83.775L68 72.975L80.375 70.05L79.25 57.45L87.575 48L79.25 38.325L80.375 25.725L68 23.025L61.475 12.225L50 17.175L38.3 12.225L32 23.025L19.625 25.725L20.75 38.325L12.425 48L20.75 57.45L19.625 70.275L32 72.975L38.525 83.775ZM45.275 63.975L70.7 38.55L64.4 32.025L45.275 51.15L35.6 41.7L29.3 48L45.275 63.975Z"
                      fill="#065DC2"
                    />
                  </motion.svg>
                </span>
                <div className="flex flex-col justify-start ml-5 primary-blue-text hover:text-white">
                  <h1 className="mb-1 font-bold">Quality Products</h1>
                  <h5 className="w-56 text-sm font-light">
                    Our products are high quality. Durability at its peak
                  </h5>
                </div>
              </motion.div>
              {/* second */}
              <motion.div
                variants={scaleohHover}
                initial="initial"
                animate="animate"
                whileHover="hover"
                className="flex flex-row p-2 m-3 md:w-96 w-80"
              >
                <span className="flex items-center justify-center p-2 border border-blue-800 rounded-md primary-text-blue">
                  <motion.svg
                    variants={animateSVGPath}
                    initial="initial"
                    animate="animate"
                    width="40"
                    height="40"
                    viewBox="0 0 72 95"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M9 95C6.525 95 4.407 94.1195 2.646 92.3585C0.881999 90.5945 0 88.475 0 86V41C0 38.525 0.881999 36.4055 2.646 34.6415C4.407 32.8805 6.525 32 9 32H13.5V23C13.5 16.775 15.6945 11.468 20.0835 7.079C24.4695 2.693 29.775 0.5 36 0.5C42.225 0.5 47.532 2.693 51.921 7.079C56.307 11.468 58.5 16.775 58.5 23V32H63C65.475 32 67.5945 32.8805 69.3585 34.6415C71.1195 36.4055 72 38.525 72 41V86C72 88.475 71.1195 90.5945 69.3585 92.3585C67.5945 94.1195 65.475 95 63 95H9ZM9 86H63V41H9V86ZM36 72.5C38.475 72.5 40.5945 71.6195 42.3585 69.8585C44.1195 68.0945 45 65.975 45 63.5C45 61.025 44.1195 58.9055 42.3585 57.1415C40.5945 55.3805 38.475 54.5 36 54.5C33.525 54.5 31.407 55.3805 29.646 57.1415C27.882 58.9055 27 61.025 27 63.5C27 65.975 27.882 68.0945 29.646 69.8585C31.407 71.6195 33.525 72.5 36 72.5ZM22.5 32H49.5V23C49.5 19.25 48.1875 16.0625 45.5625 13.4375C42.9375 10.8125 39.75 9.5 36 9.5C32.25 9.5 29.0625 10.8125 26.4375 13.4375C23.8125 16.0625 22.5 19.25 22.5 23V32Z"
                      fill="#065DC2"
                    />
                  </motion.svg>
                </span>
                <div className="flex flex-col justify-start ml-5 primary-blue-text hover:text-white">
                  <h1 className="mb-1 font-bold">Secured Payment</h1>
                  <h5 className="w-56 text-sm font-light">
                    Your payment is safe with us. Trust us. Our products are
                  </h5>
                </div>
              </motion.div>
              {/* third */}
              <motion.div
                variants={scaleohHover}
                initial="initial"
                animate="animate"
                whileHover="hover"
                className="flex flex-row p-2 m-3 md:w-96 w-80"
              >
                <span className="flex items-center justify-center p-2 border border-blue-800 rounded-md primary-text-blue">
                  <motion.svg
                    variants={animateSVGPath}
                    initial="initial"
                    animate="animate"
                    width="40"
                    height="40"
                    viewBox="0 0 90 91"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M22.5 63.5C18.75 63.5 15.5625 62.1875 12.9375 59.5625C10.3125 56.9375 9 53.75 9 50H0V36.5C0 31.55 1.7625 27.3125 5.2875 23.7875C8.8125 20.2625 13.05 18.5 18 18.5H36V41H51.75L67.5 21.425V9.5H54V0.5H67.5C69.975 0.5 72.0945 1.3805 73.8585 3.1415C75.6195 4.9055 76.5 7.025 76.5 9.5V24.575L56.25 50H36C36 53.75 34.6875 56.9375 32.0625 59.5625C29.4375 62.1875 26.25 63.5 22.5 63.5ZM22.5 54.5C23.775 54.5 24.8445 54.068 25.7085 53.204C26.5695 52.343 27 51.275 27 50H18C18 51.275 18.4305 52.343 19.2915 53.204C20.1555 54.068 21.225 54.5 22.5 54.5ZM13.5 14V5H36V14H13.5ZM76.5 63.5C72.75 63.5 69.5625 62.1875 66.9375 59.5625C64.3125 56.9375 63 53.75 63 50C63 46.25 64.3125 43.0625 66.9375 40.4375C69.5625 37.8125 72.75 36.5 76.5 36.5C80.25 36.5 83.4375 37.8125 86.0625 40.4375C88.6875 43.0625 90 46.25 90 50C90 53.75 88.6875 56.9375 86.0625 59.5625C83.4375 62.1875 80.25 63.5 76.5 63.5ZM76.5 54.5C77.775 54.5 78.843 54.068 79.704 53.204C80.568 52.343 81 51.275 81 50C81 48.725 80.568 47.6555 79.704 46.7915C78.843 45.9305 77.775 45.5 76.5 45.5C75.225 45.5 74.157 45.9305 73.296 46.7915C72.432 47.6555 72 48.725 72 50C72 51.275 72.432 52.343 73.296 53.204C74.157 54.068 75.225 54.5 76.5 54.5ZM49.5 90.5L22.5 77H40.5V68L67.5 81.5H49.5V90.5ZM9 41H27V27.5H18C15.525 27.5 13.407 28.3805 11.646 30.1415C9.882 31.9055 9 34.025 9 36.5V41Z"
                      fill="#065DC2"
                    />
                  </motion.svg>
                </span>
                <div className="flex flex-col justify-start ml-5 primary-blue-text hover:text-white">
                  <h1 className="mb-1 font-bold">Swift Delivery</h1>
                  <h5 className="w-56 text-sm font-light">
                    Experience the fastest delivery you can ever imagine. Our
                  </h5>
                </div>
              </motion.div>

              {/* fourth */}
              <motion.div
                variants={scaleohHover}
                initial="initial"
                animate="animate"
                whileHover="hover"
                className="flex flex-row p-2 m-3 md:w-96 w-80"
              >
                <span className="flex items-center justify-center p-2 border border-blue-800 rounded-md primary-text-blue">
                  <motion.svg
                    variants={animateSVGPath}
                    initial="initial"
                    animate="animate"
                    width="40"
                    height="40"
                    viewBox="0 0 82 82"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M41 68C42.575 68 43.9055 67.4555 44.9915 66.3665C46.0805 65.2805 46.625 63.95 46.625 62.375C46.625 60.8 46.0805 59.4695 44.9915 58.3835C43.9055 57.2945 42.575 56.75 41 56.75C39.425 56.75 38.0945 57.2945 37.0085 58.3835C35.9195 59.4695 35.375 60.8 35.375 62.375C35.375 63.95 35.9195 65.2805 37.0085 66.3665C38.0945 67.4555 39.425 68 41 68ZM36.95 50.675H45.275C45.275 47.975 45.575 45.9875 46.175 44.7125C46.775 43.4375 48.05 41.825 50 39.875C52.625 37.25 54.482 35.0555 55.571 33.2915C56.657 31.5305 57.2 29.525 57.2 27.275C57.2 23.3 55.85 20.093 53.15 17.654C50.45 15.218 46.8125 14 42.2375 14C38.1125 14 34.607 15.0125 31.721 17.0375C28.832 19.0625 26.825 21.875 25.7 25.475L33.125 28.4C33.65 26.375 34.7 24.743 36.275 23.504C37.85 22.268 39.6875 21.65 41.7875 21.65C43.8125 21.65 45.5 22.193 46.85 23.279C48.2 24.368 48.875 25.8125 48.875 27.6125C48.875 28.8875 48.4625 30.2375 47.6375 31.6625C46.8125 33.0875 45.425 34.6625 43.475 36.3875C41 38.5625 39.2945 40.643 38.3585 42.629C37.4195 44.618 36.95 47.3 36.95 50.675ZM9.5 81.5C7.025 81.5 4.9055 80.6195 3.1415 78.8585C1.3805 77.0945 0.5 74.975 0.5 72.5V9.5C0.5 7.025 1.3805 4.9055 3.1415 3.1415C4.9055 1.3805 7.025 0.5 9.5 0.5H72.5C74.975 0.5 77.0945 1.3805 78.8585 3.1415C80.6195 4.9055 81.5 7.025 81.5 9.5V72.5C81.5 74.975 80.6195 77.0945 78.8585 78.8585C77.0945 80.6195 74.975 81.5 72.5 81.5H9.5ZM9.5 72.5H72.5V9.5H9.5V72.5Z"
                      fill="#065DC2"
                    />
                  </motion.svg>
                </span>
                <div className="flex flex-col justify-start ml-5 primary-blue-text hover:text-white">
                  <h1 className="mb-1 font-bold">24/7 Support</h1>
                  <h5 className="w-56 text-sm font-light">
                    Get the necessary assistance you need.
                  </h5>
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* About us Session */}

          <motion.div className="flex flex-col items-center justify-center w-full px-10 mt-10 md:justify-around md:flex-row">
            <div className="flex flex-col items-center justify-center w-full md:w-1/2 p">
              <h1 className="mb-4 font-[500] text-[20px]">About Us</h1>
              <p className="md:w-3/4  w-full font-[28px] leading-10 md:text-start text-center">
                We are a major distributor of batteries and tyres in Nigeria,
                with offices located in Tradefair and Idumota. We also
                distribute to any part of the country subjected to customer
                request. Our aim is to render good products swiftly without any
                hassle.
              </p>
            </div>

            <motion.div
              variants={slideInRight}
              initial="initial"
              animate="animate"
              className="flex items-center justify-center w-full h-full mt-2 md:w-1/2 md:mt-0"
            >
              <Image
                alt=""
                height="300"
                width="320"
                src={aboutusphoto}
                lazyloading
              />
            </motion.div>
          </motion.div>
        </div>
      </Layout>
    </div>
  );
}

export async function getServerSideProps() {
  await db.connect();
  const products = await Product.find({}, '-reviews').lean();
  await db.disconnect();
  return {
    props: {
      products: JSON.parse(JSON.stringify(products)),
    },
  };
}
