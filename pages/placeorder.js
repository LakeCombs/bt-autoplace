import {
	Button,
	Card,
	CircularProgress,
	Grid,
	Link,
	List,
	ListItem,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	Typography,
} from "@material-ui/core";
import axios from "axios";
import dynamic from "next/dynamic";
import Image from "next/image";
import NextLink from "next/link";
import { useRouter } from "next/router";
import React, { useContext, useEffect, useState } from "react";
import { useSnackbar } from "notistack";
import Layout from "../components/Layout";
import useStyles from "../utils/styles";
import CheckoutWizard from "../components/CheckoutWizard";
import { getError, roundToTwoSig } from "../utils/util";
import { useDispatch, useSelector } from "react-redux";
import {
	createOrderAction,
	fetchOrderByIdAction,
} from "../store/actions/orderAction";
import { usePaystackPayment } from "react-paystack";
import { paymentAction } from "../store/actions/paymentAction";
import {
	parent1,
	pulseAnimation,
	slideInRightAnimation,
	tableContentAnimation,
} from "../utils/animation";
import { formatter } from "../utils/currency-converter";
const { motion } = require("framer-motion");

function PlaceOrder() {
	const router = useRouter();
	const dispatch = useDispatch();
	const { closeSnackbar, enqueueSnackbar } = useSnackbar();
	const { userInfo } = useSelector((state) => state.userLogin);
	const { items, shippingAddress, paymentMethod } = useSelector(
		(state) => state.cart
	);

	const {
		loading,
		error: deliverError,
		successPay,
		successDeliver,
		loadingDeliver,
	} = useSelector((state) => state.deliver);

	const {
		loading: createOrderLoading,
		error: createOrderError,
		order,
	} = useSelector((state) => state.createOrder);

	const style = useStyles();

	const itemsPrice = items.reduce(
		(prev, curr) => prev + curr.item.price * curr.count,
		0
	);
	roundToTwoSig();
	const shippingCost = 2000;
	const totalPrice = roundToTwoSig(itemsPrice + shippingCost);

	const config = {
		reference: new Date().getTime().toString(),
		email: userInfo?.email,
		amount: totalPrice * 100,
		publicKey: process.env.NEXT_PUBLIC_PAYSTACK_ID,
	};

	const initializePayment = usePaystackPayment(config);

	const placeOrderHandler = async () => {
		if (!paymentMethod) {
			router.push("/shipping");
			enqueueSnackbar("Please add a payment method", { variant: "error" });
			return;
		}
		initializePayment(onSuccess);
	};

	const onSuccess = async (reference) => {
		closeSnackbar();
		await dispatch(paymentAction(reference));

		const totalCost = items.reduce(
			(itemsCost, item) => itemsCost + item?.item?.price,
			0
		);

		dispatch(
			createOrderAction({
				items: items.map((item) => {
					return { item: item?.item?._id, count: item?.count };
				}),
				shippingAddress,
				paymentMethod,
				itemsPrice: totalCost,
				shippingCost: shippingCost,
				isPaid: true,
				totalPrice: totalCost + shippingCost,
				paidAt: Date.now(),
			})
		);
	};

	useEffect(() => {
		if (!userInfo) {
			return router.push("/login");
		}
	}, [router, userInfo]);

	useEffect(() => {
		if (items?.length === 0) {
			router.push("/cart");
		}
	}, [items, router]);

	useEffect(() => {
		if (order?._id) {
			dispatch(fetchOrderByIdAction(order?._id));
			enqueueSnackbar("Your order have been created", { variant: "success" });
			router.push(`/order-history`);
		}

		if (createOrderError) {
			enqueueSnackbar(createOrderError, { variant: "error" });
			return;
		}
	}, [createOrderError, dispatch, enqueueSnackbar, order, router]);

	return (
		<Layout title="Place Order">
			<div className="w-full px-5 md:px-10">
				<motion.h1
					variants={slideInRightAnimation}
					initial="inital"
					animate="animate"
					className="mt-10 text-xl w-bold">
					Check out
				</motion.h1>
			</div>
			<div className="flex flex-row justify-between w-full px-5 pt-5 md:px-10">
				<Grid container spacing={3}>
					<Grid item md={9} xs={12}>
						<motion.div
							variants={tableContentAnimation}
							initial="initial"
							animate="animate">
							<Card className={style.section}>
								<List>
									<ListItem>
										<h1 className="text-lg md:text-xl">Shipping Address</h1>
									</ListItem>
									<ListItem>
										{shippingAddress?.address} ,{shippingAddress?.city},{" "}
										{shippingAddress?.state}.
									</ListItem>
								</List>
							</Card>
							<Card className={style.section}>
								<List>
									<ListItem>
										<h1 className="text-lg md:text-xl">Payment Method</h1>
									</ListItem>
									<ListItem>{paymentMethod}</ListItem>
								</List>
							</Card>
							<Card className={style.section}>
								<List>
									<ListItem>
										<motion.h1 className="text-lg md:text-xl">
											Order Items
										</motion.h1>
									</ListItem>
									<ListItem>
										<TableContainer>
											<Table>
												<TableHead>
													<TableRow>
														<TableCell>Image</TableCell>
														<TableCell>Name</TableCell>
														<TableCell align="right">Quantity</TableCell>
														<TableCell align="right">Price</TableCell>
													</TableRow>
												</TableHead>
												<TableBody>
													{items?.map(({ item, count }) => (
														<TableRow key={item._id}>
															<TableCell>
																<NextLink
																	href={`/product/${item.slug}`}
																	passHref>
																	<Link>
																		<Image
																			src={item.image}
																			alt={item.name}
																			width={50}
																			height={50}
																		/>
																	</Link>
																</NextLink>
															</TableCell>

															<TableCell>
																<NextLink
																	href={`/product/${item.slug}`}
																	passHref>
																	<Link>
																		<Typography>{item.name}</Typography>
																	</Link>
																</NextLink>
															</TableCell>

															<TableCell align="right">
																<Typography>{count}</Typography>
															</TableCell>

															<TableCell align="right">
																<NextLink
																	href={`/product/${item?.slug}`}
																	passHref>
																	<Link>
																		<Typography>
																			{formatter.format(item?.price)}
																		</Typography>
																	</Link>
																</NextLink>
															</TableCell>
														</TableRow>
													))}
												</TableBody>
											</Table>
										</TableContainer>
									</ListItem>
								</List>
							</Card>
						</motion.div>
					</Grid>
					<Grid item md={3} xs={12}>
						<Card className={style.section}>
							<motion.div
								variants={slideInRightAnimation}
								initial="initial"
								animate="animate">
								<List>
									<ListItem>
										<h1 className="text-lg md:text-xl">Order Summary</h1>
									</ListItem>
									<ListItem>
										<Grid container>
											<Grid item xs={6}>
												<Typography>Items cost:</Typography>
											</Grid>
											<Grid item xs={6}>
												<Typography align="right">
													{formatter.format(itemsPrice)}
												</Typography>
											</Grid>
										</Grid>
									</ListItem>
									<ListItem>
										<Grid container>
											<Grid item xs={6}>
												<Typography>Shipping cost:</Typography>
											</Grid>
											<Grid item xs={6}>
												<Typography align="right">
													{formatter.format(shippingCost)}
												</Typography>
											</Grid>
										</Grid>
									</ListItem>
									<ListItem>
										<Grid container>
											<Grid item xs={6}>
												<Typography>
													<strong>Total cost</strong>:
												</Typography>
											</Grid>
											<Grid item xs={6}>
												<Typography align="right">
													<strong>{formatter.format(totalPrice)}</strong>
												</Typography>
											</Grid>
										</Grid>
									</ListItem>
									<ListItem>
										<motion.button
											className="flex justify-center w-full py-2 text-white rounded-md primary-blue-bg"
											variants={pulseAnimation}
											initial="initial"
											animate="animate"
											onClick={placeOrderHandler}
											disabled={loading}>
											Place Order
										</motion.button>
									</ListItem>
									<ListItem>{loading && <CircularProgress />}</ListItem>
								</List>
							</motion.div>
						</Card>
					</Grid>
				</Grid>
			</div>
		</Layout>
	);
}

export default dynamic(() => Promise.resolve(PlaceOrder), { ssr: false });
