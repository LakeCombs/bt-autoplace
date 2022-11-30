/* eslint-disable @next/next/no-img-element */
import {
	Button,
	Card,
	Grid,
	Link,
	List,
	ListItem,
	MenuItem,
	Select,
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
import { useSnackbar } from "notistack";
import { useSelector, useDispatch } from "react-redux";
import Layout from "../components/Layout";
import useStyles from "../utils/styles";
import RemoveCircleOutlineOutlinedIcon from "@mui/icons-material/RemoveCircleOutlineOutlined";
import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";
import {
	addToCartAction,
	removedFromCartAction,
	removedItemFromCartAction,
} from "../store/actions/cartAction";
import emptyCart from "../public/Empty cartempty-cart.png";
import {
	justHoverAnimation,
	parent1,
	pulseAnimation,
	slideInRightAnimation,
	tableContentAnimation,
} from "../utils/animation";
const { motion } = require("framer-motion");

function Cart() {
	const dispatch = useDispatch();
	const { userInfo } = useSelector((state) => state.userLogin);
	const router = useRouter();
	const { items } = useSelector((state) => state.cart);
	const { enqueueSnackbar, closeSnackbar } = useSnackbar();

	const onChangeHandler = async (item, quantity) => {
		closeSnackbar();
		const { data } = await axios.get(`/api/products/${item._id}`);
		if (data.countInStock < 1) {
			enqueueSnackbar("Sorry, Product not in stock", { variant: "info" });
			return;
		}
		dispatch({ type: "ADD_TO_CART", payload: { ...item, quantity } });
	};

	const removedFromCart = (product) => {
		return dispatch(removedFromCartAction(product));
	};

	const removeItem = (product) => {
		dispatch(removedItemFromCartAction(product));
	};

	const addToCart = async (product) => {
		closeSnackbar();
		dispatch(addToCartAction(product));
	};

	const checkoutHandler = () => {
		if (userInfo) {
			router.push("/shipping");
		} else {
			router.push("/login?redirect=/shipping");
		}
	};

	return (
		<Layout title="Shopping Cart">
			<div className="flex flex-col w-full px-3 md:px-10">
				<motion.h1
					variants={slideInRightAnimation}
					initial="inital"
					animate="animate"
					className="mt-5 mb-5 text-xl">
					My Cart
				</motion.h1>
				<motion.hr
					initial={{
						x: "100vw",
					}}
					animate={{
						x: "0",
					}}
					transition={{
						duration: 1.2,
					}}
					className="w-full mb-2"
				/>

				<div className="flex flex-row justify-between w-full">
					{items?.length === 0 ? (
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
									Your cart is empty
								</h2>

								<p>Shop for products to be added to your cart</p>

								<hr className="w-full mt-5 mb-5" />

								<motion.button
									variants={pulseAnimation}
									initial="initial"
									animate="animate"
									onClick={() => router.push("/")}
									className="px-3 py-2 font-extrabold text-white rounded-lg shadow-md primary-blue-bg">
									Explore products
								</motion.button>
							</div>
						</div>
					) : (
						<div className="flex flex-col w-full md:flex-row">
							<motion.div
								variant={parent1}
								initial="initial"
								animate="animate"
								className="w-full m-0 md:w-5/6 md:ml-5">
								<TableContainer>
									<Table>
										<TableHead>
											<TableRow>
												<TableCell>Product Details</TableCell>
												<TableCell align="center">Quantity</TableCell>
												<TableCell align="center">Price</TableCell>
											</TableRow>
										</TableHead>
										<TableBody>
											{items?.map(({ item, count }) => (
												<TableRow key={item?._id}>
													<TableCell>
														<motion.div
															variants={tableContentAnimation}
															initial="initial"
															animate="animate"
															className="flex flex-row">
															<NextLink
																href={`/product/${item?.slug}`}
																passHref>
																<Link>
																	<img
																		src={item?.image}
																		alt={item?.name}
																		width={50}
																		className="w-20 h-20 md:w-32 md:h-32"
																		height={50}
																	/>
																</Link>
															</NextLink>
															<div className="flex flex-col ml-3">
																<h3 className="mt-2 mb-2 font-light">
																	{item?.name}
																</h3>
																<h3 className="mt-2 mb-2 font-light">Weight</h3>
																<h3 className="mt-2 mb-2 font-semibold">
																	In Stock
																</h3>
															</div>
														</motion.div>
													</TableCell>

													<TableCell align="left">
														<motion.div
															variants={tableContentAnimation}
															initial="initial"
															animate="animate"
															className="flex flex-col items-center justify-center h-full">
															<div className="flex flex-row items-center justify-between mb-4">
																<motion.span
																	variants={justHoverAnimation}
																	initial="intial"
																	whileHover="hover"
																	// initial={{ scale: 1 }}
																	// whileHover={{ scale: 1.2 }}
																	className="primary-blue-text active:primary-blue-bg"
																	onClick={() => removedFromCart(item)}>
																	<RemoveCircleOutlineOutlinedIcon />
																</motion.span>

																<h1 className="ml-3 mr-3 text-lg primary-blue-text">
																	{count}
																</h1>
																<motion.span
																	variants={justHoverAnimation}
																	initial="intial"
																	whileHover="hover"
																	className="primary-blue-text active:primary-blue-bg"
																	onClick={() => addToCart(item)}>
																	<AddCircleOutlineOutlinedIcon />
																</motion.span>
															</div>
															<motion.button
																variants={justHoverAnimation}
																initial="intial"
																whileHover="hover"
																className="px-2 py-1 text-white rounded-lg shadow-sm hover:shadow:lg primary-blue-bg"
																onClick={() => removeItem(item)}>
																Remove
															</motion.button>
														</motion.div>
													</TableCell>

													<TableCell align="right">
														<motion.div
															variants={tableContentAnimation}
															initial="initial"
															animate="animate"
															className="items-start h-full">
															<NextLink
																href={`/product/${item?.slug}`}
																passHref>
																<Link>
																	<h2 className="text-base font-semibold md:text-lg">
																		&#8358;{item?.price}
																	</h2>
																</Link>
															</NextLink>
														</motion.div>
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
								<h1 className="w-full px-5 ">ORDER SUMMARY</h1>
								<hr className="w-full mt-8 mb-8" />
								<div className="flex items-center justify-between w-full px-5 row">
									<h4>Sub Total</h4>
									<h4 className="font-extrabold">
										&#8358;
										{items?.reduce(
											(prev, curr) => prev + curr?.count * curr?.item?.price,
											0
										)}
									</h4>
								</div>
								<div className="flex items-center justify-between w-full px-5 mt-5 mb-5 row">
									<h4>Standard delivery fee</h4>
									<h4 className="font-extrabold">&#8358;2000</h4>
								</div>
								<hr className="w-full " />
								<div className="flex items-center justify-center w-full py-5 md:py-10">
									<motion.button
										variants={pulseAnimation}
										initial="initial"
										animate="animate"
										// onHoverStart="hover"
										// onHoverEnd="animate"
										className="px-3 py-1 text-white rounded-lg shadow-sm hover:shadow:lg primary-blue-bg"
										onClick={checkoutHandler}>
										Check out
									</motion.button>
								</div>
							</motion.div>
						</div>
					)}
				</div>
			</div>
			{/* <Typography component="h1" variant="h1">
				Shopping Cart
			</Typography>
			{items.length === 0 ? (
				<div>
					Cart is empty.{" "}
					<NextLink href={"/"} passHref>
						<Link>Go to shopping</Link>
					</NextLink>
				</div>
			) : (
				<Grid container spacing={3}>
					<Grid item md={9} xs={12}>
						<TableContainer>
							<Table>
								<TableHead>
									<TableRow>
										<TableCell>Image</TableCell>
										<TableCell>Name</TableCell>
										<TableCell align="right">Quantity</TableCell>
										<TableCell align="right">Price</TableCell>
										<TableCell align="right">Remove</TableCell>
									</TableRow>
								</TableHead>
								<TableBody>
									{items.map((item) => (
										<TableRow key={item._id}>
											<TableCell>
												<NextLink href={`/product/${item.slug}`} passHref>
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
												<NextLink href={`/product/${item.slug}`} passHref>
													<Link>
														<Typography>{item.name}</Typography>
													</Link>
												</NextLink>
											</TableCell>

											<TableCell align="right">
												<Select
													value={item.quantity}
													onChange={(e) =>
														onChangeHandler(item, e.target.value)
													}>
													{[...Array(item.countInStock).keys()].map((x) => (
														<MenuItem key={x + 1} value={x + 1}>
															{x + 1}
														</MenuItem>
													))}
												</Select>
											</TableCell>

											<TableCell align="right">
												<NextLink href={`/product/${item.slug}`} passHref>
													<Link>
														<Typography>&#8358;{item.price}</Typography>
													</Link>
												</NextLink>
											</TableCell>
											<TableCell align="right">
												<Button
													variant="contained"
													className={style.deleteBtn}
													onClick={() => removeItem(item)}>
													<svg
														className="white-icon"
														xmlns="http://www.w3.org/2000/svg"
														height="24"
														viewBox="0 0 24 24"
														width="24">
														<path d="M0 0h24v24H0V0z" fill="none" />
														<path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM8 9h8v10H8V9zm7.5-5l-1-1h-5l-1 1H5v2h14V4z" />
													</svg>
												</Button>
											</TableCell>
										</TableRow>
									))}
								</TableBody>
							</Table>
						</TableContainer>
					</Grid>
					<Grid item md={3} xs={12}>
						<Card>
							<List>
								<ListItem>
									<Typography variant="h2">
										Subtotal (
										{items.reduce((prev, curr) => prev + curr.quantity, 0)}{" "}
										items) : &#8358;{" "}
										{items.reduce(
											(prev, curr) => prev + curr.quantity * curr.price,
											0
										)}
									</Typography>
								</ListItem>
								<ListItem>
									<Button
										type="button"
										variant="contained"
										color="primary"
										fullWidth
										onClick={checkoutHandler}>
										Checkout
									</Button>
								</ListItem>
							</List>
						</Card>
					</Grid>
				</Grid>
			)} */}
		</Layout>
	);
}

export default dynamic(() => Promise.resolve(Cart), { ssr: false });
