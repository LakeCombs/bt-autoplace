/* eslint-disable @next/next/no-img-element */

import React from 'react';
import NextLink from 'next/link';
import Image from 'next/image';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import { FavoriteBorderRounded, StarTwoTone } from '@material-ui/icons';
import { useDispatch, useSelector } from 'react-redux';
import {
  addToCartAction,
  addToWishListAction,
  removeFromWishListAction,
} from '../store/actions/cartAction';
import { formatter } from '../utils/currency-converter';

const { motion } = require('framer-motion');

export default function ProductItem({ product, remove }) {
  const dispatch = useDispatch();
  const { wishList } = useSelector((state) => state.cart);

  const addToCart = () => {
    if (remove) {
      dispatch(addToCartAction(product));
      dispatch(removeFromWishList(product));
    } else {
      dispatch(addToCartAction(product));
    }
  };

  const addToWishList = () => {
    dispatch(addToWishListAction(product));
  };

  const removeFromWishList = () => {
    dispatch(removeFromWishListAction(product));
  };

  return (
    <motion.div
      initial={{}}
      transition={{
        type: 'spring',
        stiffness: '100',
      }}
      whileHover={{
        scale: 1.08,
        transition: { duration: 0.3 },
      }}
      className="m-3 rounded-md shadow-md hover:shadow-lg  hover:cursor-pointer  w-[210px]"
      key={product?._id}
    >
      <div className="bg-white ">
        <div className="flex justify-end w-full px-2 py-1">
          <div className="flex justify-end w-full px-2 py-1">
            {!remove ? (
              <>
                {wishList?.find((item) => item?._id === product?._id) ? (
                  <motion.span
                    whileTap={{ scale: 0.9 }}
                    className="flex items-center justify-center w-5 h-5 p-3 text-orange-300 rounded-full hover:cursor-pointer drop-shadow-2xl shadow-gray-700"
                    onClick={() => addToWishList(product)}
                  >
                    <FavoriteBorderRounded />
                  </motion.span>
                ) : (
                  <motion.span
                    whileTap={{ scale: 0.9 }}
                    className="flex items-center justify-center w-5 h-5 p-3 text-orange-300 rounded-full hover:cursor-pointer drop-shadow-2xl shadow-gray-700"
                    onClick={() => removeFromWishList(product)}
                  >
                    <StarTwoTone />
                  </motion.span>
                )}
              </>
            ) : (
              <motion.span
                whileTap={{ scale: 0.9 }}
                className="flex items-center justify-center w-5 h-5 p-3 text-orange-300 rounded-full hover:cursor-pointer drop-shadow-2xl shadow-gray-700"
                onClick={() => removeFromWishList(product)}
              >
                <HighlightOffIcon />
              </motion.span>
            )}
          </div>
        </div>
        <NextLink
          whileTap={{ scale: 0.9 }}
          href={`/product/${product.slug}`}
          passHref
        >
          <motion.div className="flex items-center text-[24px] justify-center w-full px-2">
            <Image
              src={product.image}
              height={150}
              width={180}
              alt={product.name}
              lazyloading
            />
          </motion.div>
        </NextLink>
      </div>

      <div className="w-full px-2 py-2 mt-2 faint-blue-bg">
        <h3 className="font-[400] md:mt-2 md:text-[16px] leading-[22px] text-[14px] ">
          {product.name}
        </h3>
        <p className="w-full md:text-[12px] text-[9px]  md:mt-3 font-[300]">
          {product.description.substring(1, 62)}...
        </p>

        <div className="flex flex-col justify-between md:flex-row md:items-end">
          <h1 className="mt-2 md:text-[16px] md:font-[500] leading-[20px] font-[400] text-[13px]">
            {formatter.format(product.price)}
          </h1>
          <motion.button
            whileHover={{
              shadow: 'gray',
              scale: '1.1',
              transition: 1.5,
            }}
            transition={{
              type: 'spring',
              stiffness: '100',
            }}
            onClick={addToCart}
            className="px-2 py-1 text-sm font-light text-white rounded-md primary-blue-bg hover:cursor-pointer"
          >
            Add to Cart
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}
