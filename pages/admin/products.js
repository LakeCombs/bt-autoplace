import axios from "axios";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import NextLink from "next/link";
import React, { useEffect, useContext, useReducer, useState } from "react";
import { useSnackbar } from "notistack";
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
} from "@material-ui/core";
import Layout from "../../components/Layout";
import useStyles from "../../utils/styles";
import { useSelector, useDispatch } from "react-redux";
import {
	createProductAction,
	deleteProductAction,
	getAllProduct,
} from "../../store/actions/productAction";
import db from "../../utils/db";
import Image from "next/image";
import AdminPanelOptions from "../../components/adminPanelOptions";
import {
	justHoverAnimation,
	slideInLeftAnimation,
	tableContentAnimation,
} from "../../utils/animation";
import { formatter } from "../../utils/currency-converter";
const { motion } = require("framer-motion");

function Products({ Products }) {
	const { userInfo } = useSelector((state) => state.userLogin);
	const {
		loading: loadingCreate,
		error: createProductError,
		product: createdProduct,
	} = useSelector((state) => state.createProduct);
	const {
		loading: loadingDelete,
		product: deletedProduct,
		error: deleteError,
	} = useSelector((state) => state.deleteProduct);
	const {
		loading: allProductLoading,
		error: allProductError,
		products,
	} = useSelector((state) => state.allProduct);

	const router = useRouter();
	const dispatch = useDispatch();
	const style = useStyles();
	const { enqueueSnackbar } = useSnackbar();

	useEffect(() => {
		if (!userInfo) {
			router.push("/login");
		}

		dispatch(getAllProduct());
	}, [dispatch, router, userInfo]);

	const deleteHandler = async (productId) => {
		if (!window.confirm("Are you sure?")) {
			return;
		}
		dispatch(deleteProductAction(productId));
	};

	useEffect(() => {
		if (deletedProduct?.message) {
			enqueueSnackbar("Product deleted successfully", { variant: "success" });
		}

		if (deleteError) {
			enqueueSnackbar(deleteError, { variant: "error" });
		}

		if (createdProduct?._id) {
			enqueueSnackbar("Product created successfully", { variant: "success" });
		}

		if (createProductError) {
			enqueueSnackbar(createProductError, { variant: "error" });
		}
	}, [
		enqueueSnackbar,
		deletedProduct,
		deleteError,
		createdProduct,
		createProductError,
	]);

	return (
		<Layout title="Products">
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
									<Grid container alignItems="center">
										<Grid item xs={6}>
											<motion.h1
												variants={slideInLeftAnimation}
												initial="initial"
												animate="animate"
												className="mt-5 mb-5 text-xl">
												Products
												<span className="ml-2">
													{allProductLoading ? (
														<CircularProgress size={"20px"} />
													) : (
														<></>
													)}
												</span>
											</motion.h1>
											{loadingDelete && <CircularProgress />}
										</Grid>
										<Grid align="right" item xs={6}>
											<Button
												onClick={() => router.push("/admin/createproduct")}
												color="primary"
												variant="contained">
												<motion.div
													variants={justHoverAnimation}
													initial="initial"
													whileHover="hover"
													className="p">
													Create
												</motion.div>
											</Button>
										</Grid>
									</Grid>
								</ListItem>

								<ListItem>
									{allProductError ? (
										<Typography className={style.error}>
											{allProductError}
										</Typography>
									) : (
										<></>
									)}
									{products ? (
										<motion.div
											variants={tableContentAnimation}
											initial="initial"
											animate="animate"
											className="w-full">
											<TableContainer>
												<Table>
													<TableHead>
														<TableRow>
															<TableCell>
																<p className=" p">ID</p>
															</TableCell>
															<TableCell>
																<p className=" p">IMAGE</p>
															</TableCell>
															<TableCell>
																<p className=" p">NAME</p>
															</TableCell>
															<TableCell>
																<p className="p">PRICE</p>
															</TableCell>
															<TableCell>
																<p className="p">CATEGORY</p>
															</TableCell>
															<TableCell>
																<p className="p">COUNT </p>
															</TableCell>
															<TableCell>
																<p className="p">RATING</p>
															</TableCell>
															<TableCell>
																<p className="p">ACTIONS</p>
															</TableCell>
														</TableRow>
													</TableHead>
													<TableBody>
														{products?.map((product) => (
															<TableRow key={product._id}>
																<TableCell>
																	<p className="p">
																		{product._id.substring(20, 24)}
																	</p>
																</TableCell>
																<TableCell>
																	<Image
																		src={product?.image}
																		width={"40px"}
																		height={"40px"}
																		alt={product?.name}
																	/>
																</TableCell>
																<TableCell>
																	<p className="p">{product.name}</p>
																</TableCell>
																<TableCell>
																	<p className="p">
																		{formatter.format(product.price)}
																	</p>
																</TableCell>
																<TableCell>
																	<p className="p">{product.category}</p>
																</TableCell>
																<TableCell>
																	<p className="p">{product.countInStock}</p>
																</TableCell>
																<TableCell>
																	<p className="p">{product.rating}</p>
																</TableCell>
																<TableCell>
																	<NextLink
																		href={`/admin/product/${product._id}`}
																		passHref>
																		<Button size="small" variant="contained">
																			<motion.div
																				variants={justHoverAnimation}
																				initial="initial"
																				whileHover="hover"
																				className="p">
																				Edit
																			</motion.div>
																		</Button>
																	</NextLink>{" "}
																	<Button
																		onClick={() => deleteHandler(product._id)}
																		size="small"
																		variant="contained">
																		<motion.div
																			variants={justHoverAnimation}
																			initial="initial"
																			whileHover="hover"
																			className="text-red-500 p">
																			Delete
																		</motion.div>
																	</Button>
																</TableCell>
															</TableRow>
														))}
													</TableBody>
												</Table>
											</TableContainer>
										</motion.div>
									) : (
										<></>
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

export default dynamic(() => Promise.resolve(Products), { ssr: false });

// export async function getServerSideProps() {
// 	await db.connect();
// 	const products = await Product.find({}).lean();
// 	await db.disconnect();

// 	return {
// 		props: {
// 			Product: JSON.parse(JSON.stringify(products)),
// 		},
// 	};
// }
