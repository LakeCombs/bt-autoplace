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
	Typography,
	Card,
	Button,
	ListItemText,
	TableContainer,
	Table,
	TableHead,
	TableRow,
	TableCell,
	TableBody,
	Menu,
	MenuItem,
} from "@material-ui/core";
import Layout from "../../components/Layout";
import useStyles from "../../utils/styles";
import { useSelector, useDispatch } from "react-redux";
import {
	adminUpdateDeliveredAction,
	fetchOrderByIdAction,
	getAllOrderAction,
} from "../../store/actions/orderAction";
import { useSnackbar } from "notistack";
import AdminPanelOptions from "../../components/adminPanelOptions";
import {
	justHoverAnimation,
	slideInLeftAnimation,
	tableContentAnimation,
} from "../../utils/animation";
import { formatter } from "../../utils/currency-converter";
const { motion } = require("framer-motion");

function Orders() {
	const dispatch = useDispatch();
	const { userInfo } = useSelector((state) => state.userLogin);
	const router = useRouter();
	const style = useStyles();
	const { enqueueSnackbar } = useSnackbar();
	const { orders, loading, error } = useSelector((state) => state.allOrder);
	const {
		order,
		loading: deliveredLoading,
		error: deliveredError,
	} = useSelector((state) => state?.adminUpdateDelivered);

	const [anchorEl, setAnchorEl] = React.useState(null);
	const open = Boolean(anchorEl);

	const handleClick = (event) => {
		setAnchorEl(event.currentTarget);
	};
	const handleClose = () => {
		setAnchorEl(null);
	};

	useEffect(() => {
		if (!userInfo?.isAdmin) {
			return router.push("/");
		}

		dispatch(getAllOrderAction());
	}, [dispatch, router, userInfo]);

	useEffect(() => {
		if (order?.order?._id) {
			enqueueSnackbar(`Updated order to delivered`);
			dispatch(getAllOrderAction());
		}
	}, [dispatch, enqueueSnackbar, order]);

	return (
		<Layout title="Orders">
			<div className="px-2">
				<Grid container spacing={1}>
					<Grid item md={3} xs={12}>
						<Card className={style.section}>
							<AdminPanelOptions />
						</Card>
					</Grid>
					<Grid item md={9} xs={12}>
						<Card className={style.section}>
							<List>
								<ListItem>
									<motion.h1
										variants={slideInLeftAnimation}
										initial="initial"
										animate="animate">
										Orders
										<span className="ml-3">
											{loading || deliveredLoading ? (
												<CircularProgress size={"20px"} />
											) : (
												<></>
											)}
										</span>{" "}
									</motion.h1>
								</ListItem>

								<ListItem>
									{error ? (
										<Typography className={style.error}>{error}</Typography>
									) : (
										<motion.div
											variants={tableContentAnimation}
											initial="initial"
											animate="animate"
											className="w-full md:text-[15px] text-[12px]">
											<TableContainer>
												<Table>
													<TableHead>
														<TableRow>
															<TableCell>
																<p className=" md:text-[15px] text-[12px]">
																	ID
																</p>
															</TableCell>
															<TableCell>
																<p className=" md:text-[15px] text-[12px]">
																	USER
																</p>
															</TableCell>
															<TableCell>
																<p className=" md:text-[15px] text-[12px]">
																	DATE
																</p>
															</TableCell>
															<TableCell>
																<p className=" md:text-[15px] text-[12px]">
																	TOTAL
																</p>
															</TableCell>
															<TableCell>
																<p className=" md:text-[15px] text-[12px]">
																	PAID AT
																</p>
															</TableCell>
															<TableCell>
																<p className=" md:text-[15px] text-[12px]">
																	DELIVERED AT
																</p>
															</TableCell>
															<TableCell>
																<p className=" md:text-[15px] text-[12px]">
																	ACTION
																</p>
															</TableCell>
														</TableRow>
													</TableHead>
													<TableBody>
														{orders?.map((order) => (
															<TableRow key={order?._id}>
																<TableCell>
																	<p className=" md:text-[15px] text-[12px]">
																		{order?._id.substring(20, 24)}
																	</p>
																</TableCell>
																<TableCell>
																	<p className=" md:text-[15px] text-[12px]">
																		{order?.user
																			? order.user.first_name
																			: "DELETED USER"}
																	</p>
																</TableCell>
																<TableCell>
																	<p className=" md:text-[15px] text-[12px]">
																		{order?.createdAt.substring(0, 10)}
																	</p>
																</TableCell>
																<TableCell>
																	<p className=" md:text-[15px] text-[12px]">
																		{formatter.format(order?.totalPrice)}
																	</p>
																</TableCell>
																<TableCell>
																	<p className=" md:text-[15px] text-[12px]">
																		{order?.isPaid ? (
																			<span className="text-green-600">
																				Paid
																			</span>
																		) : (
																			<span className="text-blue-600">
																				Not Paid
																			</span>
																		)}
																	</p>
																</TableCell>
																<TableCell>
																	<p className=" md:text-[15px] text-[12px]">
																		{order?.isDelivered ? (
																			<span className="text-green-600">
																				Delivered
																			</span>
																		) : (
																			<span className="text-blue-600">
																				not delivered
																			</span>
																		)}
																	</p>
																</TableCell>
																<TableCell>
																	<motion.button
																		variants={justHoverAnimation}
																		initial="initial"
																		whileHover="hover"
																		className="w-auto px-3 py-2 font-semibold text-white border rounded-md primary-blue-bg outline-black md:text-[15px] text-[12px]"
																		id="demo-positioned-button"
																		aria-controls={
																			open ? "demo-positioned-menu" : undefined
																		}
																		aria-haspopup="true"
																		aria-expanded={open ? "true" : undefined}
																		onClick={handleClick}>
																		Actions
																	</motion.button>

																	<Menu
																		id="demo-positioned-menu"
																		aria-labelledby="demo-positioned-button"
																		anchorEl={anchorEl}
																		open={open}
																		onClose={handleClose}
																		anchorOrigin={{
																			vertical: "top",
																			horizontal: "left",
																		}}
																		transformOrigin={{
																			vertical: "top",
																			horizontal: "left",
																		}}>
																		<MenuItem
																			onClick={() => {
																				dispatch(
																					adminUpdateDeliveredAction(order?._id)
																				);
																				router.push(`/admin/order/${id}`);
																			}}>
																			<p className=" md:text-[15px] text-[12px]">
																				Delivered
																			</p>
																		</MenuItem>
																		<MenuItem
																			onClick={() => {
																				dispatch(
																					fetchOrderByIdAction(order?._id)
																				);
																				router.push(
																					`/admin/order/${order?._id}`
																				);
																			}}>
																			<p className=" md:text-[15px] text-[12px]">
																				View Order
																			</p>
																		</MenuItem>
																	</Menu>
																</TableCell>
															</TableRow>
														))}
													</TableBody>
												</Table>
											</TableContainer>
										</motion.div>
									)}
								</ListItem>
							</List>
						</Card>
					</Grid>
				</Grid>
			</div>
		</Layout>
	);
}

export default dynamic(() => Promise.resolve(Orders), { ssr: false });
