/* eslint-disable react/jsx-key */
import React, { useEffect, useState } from "react";
import Layout from "../components/Layout";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import emptyOrder from "../public/No ordersno-order.png";
import {
	getAllOrderAction,
	getMyOrdersAction,
} from "../store/actions/orderAction";
import { CircularProgress } from "@mui/material";
import {
	Button,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
} from "@material-ui/core";
import { useRouter } from "next/router";
import dynamic from "next/dynamic";
import {
	appearOnlyAnimation,
	justHoverAnimation,
	slideInLeftAnimation,
	slideInRightAnimation,
	tableContentAnimation,
} from "../utils/animation";
const { motion } = require("framer-motion");

function MyOrder() {
	const dispatch = useDispatch();
	const router = useRouter();
	const { userInfo } = useSelector((state) => state.userLogin);
	const { loading, error, orders } = useSelector((state) => state.getMyOrder);

	useEffect(() => {
		dispatch(getMyOrdersAction());
	}, [dispatch]);

	return (
		<Layout title="Shopping Cart">
			<div className="flex flex-col w-full px-3 md:px-10">
				<motion.h1
					variants={slideInLeftAnimation}
					initial="initial"
					animate="animate"
					className="mt-5 mb-5 text-xl">
					My Orders
					{loading ? <CircularProgress size={"20px"} /> : <></>}
				</motion.h1>
				{error ? (
					<motion.h1
						variants={appearOnlyAnimation}
						initial="initial"
						animate="animate"
						className="mt-1 text-red-500">
						{error}
					</motion.h1>
				) : (
					<></>
				)}
				<motion.hr
					variants={slideInRightAnimation}
					initial="initial"
					animate="animate"
					className="w-full mb-2"
				/>

				<div className="flex flex-row justify-center w-full ">
					{orders?.length === 0 ? (
						<div className="items-center justify-center w-full ">
							<div className="flex flex-col items-center justify-center w-full p-10 bg-white rounded-lg ">
								<Image
									height={"150px"}
									alt="emptyCart"
									width={"150px"}
									src={emptyOrder}
									lazyloading
								/>

								<h2 className="mt-10 mb-10 text-xl font-extralight">
									Your cart is empty
								</h2>

								<p>Shop for products to be added to your cart</p>

								<hr className="w-full mt-5 mb-5" />

								<button
									onClick={() => router.push("/")}
									className="px-3 py-2 font-extrabold text-white rounded-lg shadow-md primary-blue-bg">
									Explore products
								</button>
							</div>
						</div>
					) : (
						<motion.div
							variants={tableContentAnimation}
							initial="initial"
							animate="animate"
							className="w-full px-3 m-0 md:px-10 md:ml-5">
							<TableContainer>
								<Table>
									<TableHead>
										<TableRow>
											<TableCell>ID</TableCell>
											<TableCell>Product</TableCell>
											<TableCell align="center">Quantity</TableCell>
											<TableCell>Price</TableCell>
											<TableCell>PAID</TableCell>
											<TableCell>DELIVERED</TableCell>
											<TableCell>ACTION</TableCell>
										</TableRow>
									</TableHead>
									<TableBody>
										{orders?.map((order) =>
											order?.orderItems?.map(({ item, count }) => {
												return (
													<TableRow key={order?._id}>
														<TableCell>
															{order?._id.substring(20, 24)}
														</TableCell>
														<TableCell>
															<Image
																height={"50px"}
																width={"50px"}
																alt=""
																src={item?.image}
															/>
														</TableCell>
														<TableCell align="center">{count}</TableCell>
														<TableCell>&#8358; {item?.price}</TableCell>
														<TableCell>
															{order?.isPaid ? `Paid` : "not paid"}
														</TableCell>
														<TableCell>
															{order?.isDelivered
																? `delivered`
																: "not delivered"}
														</TableCell>
														<TableCell>
															<Button
																variant="contained"
																onClick={() => {
																	dispatch(getAllOrderAction(order?._id));
																	router.push(`/order/${order?._id}`);
																}}>
																<motion.div
																	variants={justHoverAnimation}
																	initial="initial"
																	whileHover="hover">
																	Details
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
					)}
				</div>
			</div>
		</Layout>
	);
}

export default dynamic(() => Promise.resolve(MyOrder), { ssr: false });
