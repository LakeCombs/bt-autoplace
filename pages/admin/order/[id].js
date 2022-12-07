/* eslint-disable @next/next/no-img-element */
import {
	CircularProgress,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
} from "@material-ui/core";
import Image from "next/image";
import { useSnackbar } from "notistack";
import NextLink from "next/link";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Layout from "../../../components/Layout";
import {
	adminUpdateDeliveredAction,
	fetchOrderByIdAction,
} from "../../../store/actions/orderAction";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import useStyles from "../../../utils/styles";
import Link from "next/link";
import {
	parent1,
	pulseAnimation,
	slideInRightAnimation,
	tableContentAnimation,
} from "../../../utils/animation";
import { formatter } from "../../../utils/currency-converter";
const { motion } = require("framer-motion");

const OrderById = ({ params }) => {
	const dispatch = useDispatch();
	const router = useRouter();
	const { userInfo } = useSelector((state) => state.userLogin);
	const { order, loading, error } = useSelector((state) => state.orderById);
	const { id } = params;
	const { enqueueSnackbar } = useSnackbar();
	const style = useStyles();
	const {
		order: deliveredOrder,
		loading: deliveredLoading,
		error: deliveredError,
	} = useSelector((state) => state?.adminUpdateDelivered);

	console.log("the order is ", order);

	useEffect(() => {
		if (!order?._id || deliveredOrder?.order?._id) {
			dispatch(fetchOrderByIdAction(id));
		}
	}, [deliveredOrder, dispatch, id, order]);

	return (
		<Layout>
			<div className="flex flex-col w-full px-3 md:px-10">
				<motion.h1
					variants={slideInRightAnimation}
					initial="inital"
					animate="animate"
					className="mt-5 mb-5 text-[20px]">
					Order id: {id}
					{loading || deliveredLoading ? (
						<CircularProgress size={"20px"} />
					) : (
						<></>
					)}
				</motion.h1>
				<p className="text-base text-blue-500" onClick={() => router.back()}>
					Back to Orders
				</p>
				<motion.hr
					variants={slideInRightAnimation}
					initial="initial"
					animate="animate"
					className="w-full mb-2"
				/>

				{error ? <h1 className="mt-3 mb-3 text-red-500">{error}</h1> : <></>}
				{deliveredError ? (
					<h1 className="mt-3 mb-3 text-red-500">{deliveredError}</h1>
				) : (
					<></>
				)}

				<div className="md:text-[15px] text-[12px]">
					<p>
						Ordered By: {order?.user?.first_name} {order?.user?.last_name}
					</p>
					<p>Phone: {order?.user?.phone}</p>
					<p>User Address: {order?.user?.address}</p>
					<p>Email: {order?.user?.email}</p>
					<p>
						Delivery Address : {order?.shippingAddress?.address},
						{order?.shippingAddress?.city}, {order?.shippingAddress?.state}
					</p>
					<p>Paymanet Method : {order?.paymentMethod}</p>
				</div>

				<div className="flex flex-col w-full md:flex-row">
					<motion.div
						variant={parent1}
						initial="initial"
						animate="animate"
						className="w-full m-0 md:w-5/6 md:ml-5 ">
						<TableContainer>
							<Table>
								<TableHead>
									<TableRow>
										<TableCell>Product Details</TableCell>
										<TableCell align="center">Quantity</TableCell>
										<TableCell align="center">Price</TableCell>
										<TableCell align="center">Delivered</TableCell>
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
													className="flex flex-row">
													<NextLink href={`/product/${item?.slug}`} passHref>
														<Link>
															<img
																src={item?.image}
																alt={item?.name}
																// width={"100px"}
																className="w-[128px] h-[128px] md:w-32 md:h-32"
																// height={"100px"}
															/>
														</Link>
													</NextLink>
													<div className="flex flex-col ml-3 md:text-[15px] text-[12px]">
														<h3 className="mt-1 mb-1 ">Name: {item?.name}</h3>
														<h3 className="mt-1 mb-1 ">
															Category: {item?.category}
														</h3>
														<h3 className="mt-1 mb-1 ">
															Rating: {item?.rating}
														</h3>
														<h3>Brand: {item?.brand}</h3>
													</div>
												</motion.div>
											</TableCell>

											<TableCell align="center">
												<motion.div
													variants={tableContentAnimation}
													initial="initial"
													animate="animate"
													className="flex flex-col items-center justify-center h-full md:text-[15px] text-[12px]">
													<div className="flex flex-row items-center justify-between mb-4">
														<h1 className="ml-3 mr-3 primary-blue-text">
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
													className="flex flex-col items-center justify-center h-full md:text-[15px] text-[12px]">
													<div className="flex flex-row items-center justify-between mb-4">
														<h1 className="ml-3 mr-3 primary-blue-text">
															{formatter.format(item?.price)}
														</h1>
													</div>
												</motion.div>
											</TableCell>

											<TableCell align="center">
												<div className="flex flex-col items-center justify-center h-full">
													<div className="flex flex-row items-center justify-between mb-4 md:text-[15px] text-[12px]">
														<motion.h1
															variants={tableContentAnimation}
															initial="initial"
															animate="animate"
															className="ml-3 mr-3 primary-blue-text">
															{order?.isDelivered ? (
																<span className="text-green-500">
																	Delivered
																</span>
															) : (
																<span> Pending Delivery</span>
															)}
														</motion.h1>
													</div>
												</div>
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
						className="flex-col w-full py-5 bg-white shadow-md md:ml-2 md:w-1/4 md:flex">
						<h1 className="w-full px-5 md:text-[15px] text-[12px]">
							ORDER SUMMARY
						</h1>
						<hr className="w-full mt-8 mb-8" />
						<div className="flex items-center justify-between w-full px-5 mb-3 row md:text-[15px] text-[12px]">
							<h4>Paid status</h4>
							<h4 className="font-extrabold md:text-[15px] text-[12px]">
								{order?.isPaid ? (
									<span className="text-green-500"> Paid</span>
								) : (
									<span className="text-red-500">Not Paid</span>
								)}
							</h4>
						</div>
						<div className="flex items-center justify-between w-full px-5 row md:text-[15px] text-[12px]">
							<h4 className="md:text-[15px] text-[12px]">Total Amount paid</h4>
							<h4 className="font-semibold  md:text-[15px] text-[12px]">
								{formatter.format(order?.totalPrice)}
							</h4>
						</div>
						<div className="flex items-center justify-between w-full px-5 mt-5 mb-5 row md:text-[15px] text-[12px]">
							<h4>Standard delivery fee</h4>
							<h4 className="font-extrabold">
								{formatter.format(order?.shippingCost)}
							</h4>
						</div>
						<div className="flex items-center justify-between w-full px-5 mb-5 row md:text-[15px] text-[12px]">
							<h4>Paid at</h4>
							<h4 className="font-extrabold">
								{order?.paidAt?.substring(0, 10)}
							</h4>
						</div>
						<div className="flex items-center justify-between w-full px-5 mb-5 row md:text-[15px] text-[12px]">
							<h4>Delivered status</h4>
							<h4 className="">
								{order?.isDelivered ? (
									<span className="text-green-600">Delivered</span>
								) : (
									<span className="text-blue-400">Pending Delivery</span>
								)}
							</h4>
						</div>

						<hr className="w-full " />
						<div className="flex items-center justify-center w-full py-5 md:py-10">
							<motion.button
								variants={pulseAnimation}
								initial="initial"
								animate="animate"
								className="px-3 py-2 text-white rounded-md primary-blue-bg hover:shadow-md md:text-[15px] text-[12px]"
								onClick={() => {
									dispatch(adminUpdateDeliveredAction(order?._id));
								}}>
								Set to Delivered
								{deliveredLoading ? (
									<span className="text-blue-500">
										<CircularProgress size={"20px"} />{" "}
									</span>
								) : (
									<></>
								)}
							</motion.button>
						</div>
					</motion.div>
				</div>
			</div>
		</Layout>
	);
};

export async function getServerSideProps({ params }) {
	return { props: { params } };
}

export default dynamic(() => Promise.resolve(OrderById), { ssr: false });
