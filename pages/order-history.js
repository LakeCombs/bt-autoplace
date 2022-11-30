import axios from "axios";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import NextLink from "next/link";
import React, { useEffect, useContext, useReducer } from "react";
import {
	CircularProgress,
	Grid,
	List,
	ListItem,
	TableContainer,
	Typography,
	Card,
	Table,
	TableHead,
	TableRow,
	TableCell,
	TableBody,
	Button,
	ListItemText,
} from "@material-ui/core";
import Layout from "../components/Layout";
import useStyles from "../utils/styles";
import { getError } from "../utils/util";
import {
	fetchOrderByIdAction,
	getMyOrdersAction,
} from "../store/actions/orderAction";
import { useDispatch, useSelector } from "react-redux";
import Link from "next/link";
import Image from "next/image";
import {
	justHoverAnimation,
	slideInLeftAnimation,
	slideInRightAnimation,
	tableContentAnimation,
} from "../utils/animation";
const { motion } = require("framer-motion");

function OrderHistory() {
	const router = useRouter();
	const style = useStyles();
	const dispatch = useDispatch();
	const { loading, error, orders } = useSelector((state) => state.getMyOrder);
	const { userInfo } = useSelector((state) => state.userLogin);

	useEffect(() => {
		if (!userInfo) {
			router.push("/login");
		}

		dispatch(getMyOrdersAction());
	}, [dispatch, router, userInfo]);
	return (
		<Layout title="Order History">
			<div className="px-5">
				<Grid container spacing={1}>
					<motion.div
						variants={slideInLeftAnimation}
						initial="inital"
						animate="animate"
						className="mt-10 mb-2 font-semibold text-blue-500">
						<NextLink href={"/"} passHref>
							<Link>Back to Shopping</Link>
						</NextLink>
					</motion.div>
					<Grid item xs={12}>
						<Card className={style.section}>
							<List>
								<ListItem>
									<h1>
										Order History
										<span className="ml-3">
											{loading ? <CircularProgress size={"20px"} /> : <></>}
										</span>
									</h1>
								</ListItem>
								<ListItem>
									{error ? (
										<Typography className={style.error}>{error}</Typography>
									) : (
										<></>
									)}
								</ListItem>
								<ListItem>
									<motion.div
										variants={tableContentAnimation}
										initial="initial"
										animate="animate">
										<TableContainer>
											<Table>
												<TableHead>
													<TableRow>
														<TableCell>ID</TableCell>
														<TableCell>Product</TableCell>
														<TableCell>DATE</TableCell>
														<TableCell>PRICE</TableCell>
														<TableCell>Qty</TableCell>
														<TableCell>PAID AT</TableCell>
														<TableCell>DELIVERED AT</TableCell>
														<TableCell>ACTION</TableCell>
													</TableRow>
												</TableHead>
												<TableBody>
													{orders?.map((order) =>
														order?.orderItems?.map((item, count) => {
															return (
																<TableRow key={item?._id}>
																	<TableCell>
																		{order?._id.substring(20, 24)}
																	</TableCell>
																	<TableCell>
																		<Image
																			height={"30px"}
																			width={"30px"}
																			alt={item?.item?.name}
																			src={item?.item?.image}
																		/>
																	</TableCell>
																	<TableCell>
																		{new Date(order?.createdAt).toLocaleString(
																			"en-GB"
																		)}
																	</TableCell>
																	<TableCell>
																		&#8358;{item?.item?.price}
																	</TableCell>
																	<TableCell>{item?.count}</TableCell>
																	<TableCell>
																		{order?.isPaid
																			? `${new Date(
																					order?.paidAt
																			  ).toLocaleString("en-GB")}`
																			: "Not paid"}
																	</TableCell>
																	<TableCell>
																		{order?.isDelivered
																			? `${new Date(
																					order?.deliveredAt
																			  ).toLocaleString("en-GB")}`
																			: "In transit"}
																	</TableCell>
																	<TableCell>
																		<Button
																			variant="contained"
																			onClick={() => {
																				dispatch(
																					fetchOrderByIdAction(order?._id)
																				);
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
								</ListItem>
							</List>
						</Card>
					</Grid>
				</Grid>
			</div>
		</Layout>
	);
}

export default dynamic(() => Promise.resolve(OrderHistory), { ssr: false });
