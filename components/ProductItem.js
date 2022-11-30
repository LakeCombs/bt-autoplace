/* eslint-disable @next/next/no-img-element */

import React from "react";
import NextLink from "next/link";
import Rating from "@material-ui/lab/Rating";
import useStyles from "../utils/styles";
import Image from "next/image";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import {
	Star,
	StarBorder,
	StarBorderSharp,
	StarTwoTone,
} from "@material-ui/icons";
import { useDispatch, useSelector } from "react-redux";
import {
	addToCartAction,
	addToWishListAction,
	removeFromWishListAction,
} from "../store/actions/cartAction";
const { motion } = require("framer-motion");

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
				type: "spring",
				stiffness: "100",
			}}
			whileHover={{
				scale: 1.08,
				transition: { duration: 0.3 },
			}}
			className="m-3 rounded-md shadow-md hover:shadow-lg shadow-gray-300 hover:cursor-pointer"
			key={product?._id}>
			<div className="bg-white ">
				{!remove ? (
					<motion.span
						whileTap={{ scale: 0.9 }}
						className="flex justify-end w-full text-orange-300 hover:cursor-pointer"
						onClick={() => addToWishList(product)}>
						<StarTwoTone />
					</motion.span>
				) : (
					<motion.span
						whileTap={{ scale: 0.9 }}
						className="flex justify-end w-full text-orange-300 hover:cursor-pointer"
						onClick={() => removeFromWishList(product)}>
						<HighlightOffIcon />
					</motion.span>
				)}

				<NextLink
					whileTap={{ scale: 0.9 }}
					href={`/product/${product.slug}`}
					passHref>
					<motion.div className="flex items-center justify-center w-full px-2">
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
				<h3 className="font-extrabold">{product.name}</h3>
				<p className="w-full text-sm font-light">
					{product.description.substring(1, 62)}...
				</p>

				<div className="flex flex-row items-end justify-between mt-1">
					<h1 className="mt-2 text-sm font-extrabold">N{product.price}</h1>
					<motion.button
						whileHover={{
							shadow: "gray",
							scale: "1.1",
							transition: 1.5,
						}}
						transition={{
							type: "spring",
							stiffness: "100",
						}}
						onClick={addToCart}
						className="px-2 py-1 text-sm font-light text-white rounded-md primary-blue-bg hover:cursor-pointer">
						Add to Cart
					</motion.button>
				</div>
			</div>
		</motion.div>
	);
}
