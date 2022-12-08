import axios from "axios";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import NextLink from "next/link";
import React, { useEffect, useContext, useReducer, useState } from "react";
import {
	Grid,
	List,
	ListItem,
	Typography,
	Card,
	Button,
	ListItemText,
	TextField,
	CircularProgress,
	FormControl,
	InputLabel,
	Select,
	MenuItem,
} from "@material-ui/core";
import { useSnackbar } from "notistack";
import { Controller, useForm } from "react-hook-form";
import Layout from "../../../components/Layout";
import useStyles from "../../../utils/styles";
import { useDispatch, useSelector } from "react-redux";
import {
	getProductbyId,
	updateProductAction,
} from "../../../store/actions/productAction";
import { uploadImageAction } from "../../../store/actions/uploadImageAction";
import db from "../../../utils/db";
import Product from "../../../models/Product";
import Textarea from "@mui/joy/Textarea";
import { height } from "@mui/system";
import Image from "next/image";
import AdminPanelOptions from "../../../components/adminPanelOptions";
import {
	appearOnlyAnimation,
	justHoverAnimation,
	scaleohHover,
	ScaleOnHoverAnimation,
	slideInLeftAnimation,
	tableContentAnimation,
	zoomOutAnimation,
} from "../../../utils/animation";
const { motion } = require("framer-motion");

export default function ProductEdit({ product }) {
	const productId = product?._id;
	const categoryList = [
		"Car Battery",
		"Car Tire",
		"Van Battery",
		"Solar Battery",
		"Truck Tire",
	];

	const dispatch = useDispatch();
	const { userInfo } = useSelector((state) => state.userLogin);
	const { loading: loadingUpload } = useSelector((state) => state.uploadImage);
	const {
		product: updatedProduct,
		loading: updateProductLoading,
		error: updateProductError,
	} = useSelector((state) => state.updateProduct);

	const [name, setName] = useState(product?.name || "");
	const [category, setCategory] = useState(product?.category || "");
	const [description, setDescription] = useState(product?.description || "");
	const [image, setImage] = useState(product?.image || "");
	const [price, setPrice] = useState(product?.price || "");
	const [rating, setRating] = useState(product?.rating || 0);
	const [countInStock, setCountInStock] = useState(product?.countInStock || 0);
	const [brand, setBrand] = useState(product?.brand || "");
	const [slug, setSlug] = useState(product?.slug || "");

	const { enqueueSnackbar, closeSnackbar } = useSnackbar();
	const router = useRouter();
	const classes = useStyles();

	const submitHandler = async (e) => {
		e.preventDefault();
		closeSnackbar();

		closeSnackbar();
		if (
			!category ||
			!price ||
			!rating ||
			!name ||
			!brand ||
			!countInStock ||
			!description
		) {
			return enqueueSnackbar("All field are required", { variant: "error" });
		}
		dispatch(
			updateProductAction({
				id: productId,
				product: {
					name,
					slug,
					price,
					category,
					image,
					brand,
					countInStock,
					description,
				},
			})
		);
		router.push("/admin/products");
	};

	const uploadHandler = async (e) => {
		const file = e.target.files[0];
		const bodyFormData = new FormData();
		bodyFormData.append("file", file);

		dispatch(uploadImageAction(bodyFormData));
	};

	useEffect(() => {
		if (updateProductError?._id) {
			enqueueSnackbar(getError(err), { variant: "error" });
		}

		if (updatedProduct?._id) {
			enqueueSnackbar("Product updated successfully", { variant: "success" });
		}
	}, [enqueueSnackbar, updateProductError, updatedProduct]);

	return (
		<Layout title={`Edit Product ${productId}`}>
			<div className="px-2">
				<Grid container spacing={1}>
					<Grid item md={3} xs={12}>
						<Card className={classes.section}>
							<AdminPanelOptions />
						</Card>
					</Grid>
					<Grid item md={9} xs={12}>
						<Card className={classes.section}>
							<List>
								<ListItem>
									<div className="flex flex-row flex-wrap items-center justify-start">
										<motion.h1
											variants={slideInLeftAnimation}
											initial="initial"
											animate="animate"
											className="mr-1 p font-semibold">
											Edit Product {productId}
										</motion.h1>
										<motion.div
											variants={appearOnlyAnimation}
											initial="initial"
											animate="animate">
											<Image
												height={"100px"}
												lazyloading
												width={"100px"}
												alt={product?.name}
												src={product?.image || ""}
											/>
										</motion.div>
									</div>
								</ListItem>
								<ListItem>
									{updateProductLoading && (
										<CircularProgress></CircularProgress>
									)}
									{updateProductError && (
										<Typography className={classes.error}>
											{updateProductLoading}
										</Typography>
									)}
								</ListItem>
								<ListItem>
									<motion.form
										variants={tableContentAnimation}
										initial="initial"
										animate="animate"
										onSubmit={submitHandler}
										className="p">
										<List>
											<ListItem>
												<TextField
													variant="outlined"
													fullWidth
													id="product name"
													label="Product name"
													value={name}
													onChange={(e) => setName(e.target.value)}
													inputProps={{ type: "text" }}></TextField>
											</ListItem>
											<ListItem>
												<TextField
													variant="outlined"
													fullWidth
													id="slug"
													label="Slug"
													value={slug}
													onChange={(e) => setSlug(e.target.value)}
													inputProps={{ type: "text" }}></TextField>
											</ListItem>
											<ListItem>
												<TextField
													variant="outlined"
													fullWidth
													id="price"
													label="Price"
													value={price}
													onChange={(e) => setPrice(e.target.value)}
													inputProps={{ type: "Number" }}></TextField>
											</ListItem>
											<ListItem>
												<TextField
													variant="outlined"
													fullWidth
													id="brand"
													label="Brand"
													value={brand}
													onChange={(e) => setBrand(e.target.value)}
													inputProps={{ type: "text" }}></TextField>
											</ListItem>
											<ListItem>
												<TextField
													variant="outlined"
													fullWidth
													id="count in stock"
													label="Count in stock"
													value={countInStock}
													onChange={(e) => setCountInStock(e.target.value)}
													inputProps={{ type: "Number" }}></TextField>
											</ListItem>
											<ListItem>
												<TextField
													variant="outlined"
													fullWidth
													id="rating"
													label="Rating"
													value={rating}
													onChange={(e) => setRating(e.target.value)}
													inputProps={{ type: "Number" }}></TextField>
											</ListItem>

											<ListItem>
												<FormControl fullWidth>
													<InputLabel id="demo-simple-select-helper-label">
														Category
													</InputLabel>
													<Select
														value={category}
														variant="outlined"
														fullWidth
														id="Category"
														onChange={(event) => {
															setCategory(event.target.value);
														}}>
														{categoryList?.map((cat) => {
															return (
																<MenuItem value={cat} id={cat} key={cat}>
																	{cat}
																</MenuItem>
															);
														})}
													</Select>
												</FormControl>
											</ListItem>

											<ListItem>
												<div className="w-full mt-5 mb-5 ml-0 md:ml-2">
													<label>Description</label>
													<Textarea
														value={description}
														variant="outlined"
														label="Description"
														minRows={3}
														maxRows={5}
														fullWidth
														vale={description}
														onChange={(e) => setDescription(e.target.value)}>
														{" "}
													</Textarea>
												</div>
											</ListItem>

											<ListItem>
												<Button variant="contained" component="label">
													<motion.div
														variants={ScaleOnHoverAnimation}
														initial="initial"
														whileHover="hover"
														className="p">
														Upload File
													</motion.div>
													<input type="file" onChange={uploadHandler} hidden />
												</Button>
												{loadingUpload && <CircularProgress />}
											</ListItem>

											<ListItem>
												<motion.div
													variants={zoomOutAnimation}
													initial="initial"
													whileHover="hover"
													className="w-full mt-10">
													<Button
														variant="contained"
														type="submit"
														fullWidth
														color="primary">
														Update
													</Button>
												</motion.div>
												{updateProductLoading && <CircularProgress />}
											</ListItem>
										</List>
									</motion.form>
								</ListItem>
							</List>
						</Card>
					</Grid>
				</Grid>
			</div>
		</Layout>
	);
}

export async function getServerSideProps(context) {
	const {
		params: { id },
	} = context;
	await db.connect();
	const product = await Product.findOne({ _id: id }).lean();

	await db.disconnect();
	return {
		props: { product: JSON.parse(JSON.stringify(product)) },
	};
}

// export default dynamic(() => Promise.resolve(ProductEdit), { ssr: false });
