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
	CardContent,
	CardActions,
} from "@material-ui/core";
import {
	Chart as ChartJS,
	CategoryScale,
	LinearScale,
	BarElement,
	Title,
	Tooltip,
	Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

import { getError } from "../../utils/util";
import Layout from "../../components/Layout";
import useStyles from "../../utils/styles";
import { useDispatch, useSelector } from "react-redux";
import { getSummaryAction } from "../../store/actions/summaryAction";
import {
	appearOnlyAnimation,
	justHoverAnimation,
	parent1,
	scaleohHover,
	slideInLeftAnimation,
	slideInRightAnimation,
	tableContentAnimation,
	zoomOutAnimation,
} from "../../utils/animation";
import AdminPanelOptions from "../../components/adminPanelOptions";
import { formatter } from "../../utils/currency-converter";
const { motion } = require("framer-motion");

ChartJS.register(
	CategoryScale,
	LinearScale,
	BarElement,
	Title,
	Tooltip,
	Legend
);

function AdminDashboard() {
	const dispatch = useDispatch();
	const router = useRouter();
	const style = useStyles();
	const { userInfo } = useSelector((state) => state.userLogin);
	const { loading, summary, error } = useSelector((state) => state.summary);

	useEffect(() => {
		if (!userInfo) {
			router.push("/login");
		}
		dispatch(getSummaryAction());
	}, [dispatch, router, userInfo]);
	return (
		<Layout title="Admin Dashboard">
			<div className="px-2 md:text-[15px] text-[12px]">
				<Grid container spacing={1}>
					<Grid item md={3} xs={12}>
						<Card className={style.section}>
							<AdminPanelOptions />
						</Card>
					</Grid>
					<Grid item md={9} xs={12}>
						<motion.div
							variants={slideInRightAnimation}
							initial="initial"
							animate="animate">
							<Card className={style.section}>
								<List>
									<motion.div>
										<ListItem>
											{loading ? (
												<motion.span
													variants={appearOnlyAnimation}
													initial="initial"
													animate="animate">
													<CircularProgress size={"20px"} />
												</motion.span>
											) : (
												<></>
											)}
										</ListItem>
									</motion.div>

									<ListItem>
										{error ? (
											<Typography className={style.error}>{error}</Typography>
										) : (
											<></>
										)}
									</ListItem>

									<ListItem>
										<Grid container spacing={5}>
											<Grid item md={3}>
												<motion.div
													variants={justHoverAnimation}
													initial="initial"
													whileHover="hover">
													<Card raised>
														<CardContent>
															<h1 className="font-bold">
																{formatter.format(summary?.ordersPrice)}
															</h1>
															<h1 className="font-bold">Sales</h1>
														</CardContent>
														<CardActions>
															<NextLink href="/admin/orders" passHref>
																<Button size="small" color="primary">
																	View sales
																</Button>
															</NextLink>
														</CardActions>
													</Card>
												</motion.div>
											</Grid>
											<Grid item md={3}>
												<motion.div
													variants={justHoverAnimation}
													initial="initial"
													whileHover="hover">
													<Card raised>
														<CardContent>
															<h1 className="text-xl font-bold">
																{summary?.ordersCount}
															</h1>
															<Typography>Orders</Typography>
														</CardContent>
														<CardActions>
															<NextLink href="/admin/orders" passHref>
																<Button size="small" color="primary">
																	View orders
																</Button>
															</NextLink>
														</CardActions>
													</Card>
												</motion.div>
											</Grid>
											<Grid item md={3}>
												<motion.div
													variants={justHoverAnimation}
													initial="initial"
													whileHover="hover">
													<Card raised>
														<CardContent>
															<h1 className="text-xl font-bold">
																{summary?.productsCount}
															</h1>
															<Typography>Products</Typography>
														</CardContent>
														<CardActions>
															<NextLink href="/admin/products" passHref>
																<Button size="small" color="primary">
																	View products
																</Button>
															</NextLink>
														</CardActions>
													</Card>
												</motion.div>
											</Grid>
											<Grid item md={3}>
												<motion.div
													variants={justHoverAnimation}
													initial="initial"
													whileHover="hover">
													<Card raised>
														<CardContent>
															<h1 className="text-xl font-bold">
																{summary?.usersCount}
															</h1>
															<Typography>Users</Typography>
														</CardContent>
														<CardActions>
															<NextLink href="/admin/users" passHref>
																<Button size="small" color="primary">
																	View users
																</Button>
															</NextLink>
														</CardActions>
													</Card>
												</motion.div>
											</Grid>
										</Grid>
									</ListItem>
									<ListItem>
										<motion.h1
											variants={slideInLeftAnimation}
											initial="initial"
											animate="animate"
											className="mt-2 text-xl font-semibold">
											Sales Chart
										</motion.h1>
									</ListItem>
									<motion.div
										variants={tableContentAnimation}
										initial="initial"
										animate="animate">
										<ListItem>
											<Bar
												data={{
													labels: summary?.salesData?.map((x) => x._id),
													datasets: [
														{
															label: "Sales",
															backgroundColor: "rgba(162, 222, 208, 1)",
															data: summary?.salesData?.map(
																(x) => x?.totalSales
															),
														},
													],
												}}
												options={{
													legend: { display: true, position: "right" },
												}}></Bar>
										</ListItem>
									</motion.div>
								</List>
							</Card>
						</motion.div>
					</Grid>
				</Grid>
			</div>
		</Layout>
	);
}

export default dynamic(() => Promise.resolve(AdminDashboard), { ssr: false });
