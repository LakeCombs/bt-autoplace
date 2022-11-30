/* eslint-disable react/jsx-key */
import ShoppingCartOutlined from "@mui/icons-material/ShoppingCartOutlined";
import Image from "next/image";
import { useRouter } from "next/router";
import dynamic from "next/dynamic";
import React, { useState, useContext, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Layout from "../components/Layout";
import ProductItem from "../components/ProductItem";
import {
	addToCartAction,
	removeFromWishListAction,
} from "../store/actions/cartAction";
import emptyCart from "../public/Empty cartempty-cart.png";
import { Categories } from "../utils/data";
import {
	justHoverAnimation,
	parent1,
	pulseAnimation,
} from "../utils/animation";
const { motion } = require("framer-motion");

const WishList = () => {
	const { wishList: myWishList } = useSelector((state) => state.cart);
	const [category, setcategory] = useState([]);
	const [wishList, setWishList] = useState([]);
	const [cat, setCat] = useState("");

	const dispatch = useDispatch();
	const router = useRouter();
	const removeFromWishList = () => {
		dispatch(removeFromWishListAction(product));
	};

	const addAllToCart = () => {
		for (let index = 0; index < myWishList?.length; index++) {
			dispatch(addToCartAction(myWishList[index]));
			dispatch(removeFromWishListAction(myWishList[index]));
		}
	};

	useEffect(() => {
		if (!cat) {
			return setWishList(myWishList);
		}

		if (cat) {
			const categoryList = [];
			for (let index = 0; index < myWishList.length; index++) {
				if (myWishList[index]?.category === cat) {
					categoryList.push(myWishList[index]);
				}
			}

			setWishList(categoryList);
		}
	}, [cat, myWishList]);

	useEffect(() => {
		for (let index = 0; index < myWishList.length; index++) {
			if (!category.includes(myWishList[index]?.category)) {
				setcategory([...category, myWishList[index]?.category]);
			}
		}
	}, [category, myWishList]);

	return (
		<Layout>
			<div className="flex flex-col w-full px-3 md:px-10">
				<h1 className="mt-5 mb-5 text-xl">My Cart</h1>
				<hr className="w-full mb-2" />

				<div className="flex flex-row justify-around w-3/4 mt-2 mb-2">
					<motion.button
						variants={justHoverAnimation}
						initial="initial"
						whileHover="hover"
						className="px-3 py-1 bg-transparent border border-blue-700 rounded-lg hover:shadow primary-blue-text"
						onClick={addAllToCart}>
						<span className="mr-1">
							<ShoppingCartOutlined />
						</span>
						Add all to Cart
					</motion.button>

					<motion.select
						variants={justHoverAnimation}
						initial="initial"
						whileHover="hover"
						name="byCategory"
						id="byCategory"
						value={cat}
						onChange={(e) => setCat(e.target.value)}
						className="px-3 py-1 ml-8 bg-transparent border border-blue-700 rounded-lg outline-none hover:shadow primary-blue-text">
						<option className="flex flex-row items-center">Category</option>

						{Categories?.map((cat) => {
							return (
								<option value={cat} className="py-2 " key={cat}>
									{cat}
								</option>
							);
						})}
					</motion.select>
				</div>

				<hr />

				<div className="mt-5">
					{wishList?.length === 0 ? (
						<div className="flex flex-col justify-center w-full">
							<div className="items-center justify-center w-full ">
								<div className="flex flex-col items-center justify-center w-full p-10 bg-white rounded-lg ">
									<Image
										height={"150px"}
										alt="emptyCart"
										width={"150px"}
										src={emptyCart}
										lazyloading
									/>

									<h2 className="mt-10 mb-10 text-xl font-extralight">
										Your Wish list is empty
									</h2>

									<p>Visit Store to add product to wishlist</p>

									<hr className="w-full mt-5 mb-5" />

									<motion.button
										variants={pulseAnimation}
										animate="animate"
										initial="initial"
										className="px-3 py-1 ml-8 bg-transparent border border-blue-700 rounded-lg hover:shadow primary-blue-text"
										onClick={() => router.push("/")}>
										<span className="mr-1">
											<ShoppingCartOutlined />
										</span>
										Visit Store and start shopping
									</motion.button>
								</div>
							</div>
						</div>
					) : (
						<> </>
					)}
					<motion.div
						variants={parent1}
						initial="initial"
						animate="animate"
						className="grid grid-cols-2 gap-4 lg:grid-cols-4 md:grid-cols-3">
						{wishList?.map((product) => {
							return <ProductItem product={product} remove={true} />;
						})}
					</motion.div>
				</div>
			</div>
		</Layout>
	);
};

export default dynamic(() => Promise.resolve(WishList), { ssr: false });
