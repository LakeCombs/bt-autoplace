import axios from "axios";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import NextLink from "next/link";
import React, { useEffect, useContext, useReducer, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useSnackbar } from "notistack";
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
	Checkbox,
	FormControlLabel,
	FormControl,
	InputLabel,
	Select,
	MenuItem,
} from "@material-ui/core";
import { getError } from "../../../utils/util";
import Layout from "../../../components/Layout";
import useStyles from "../../../utils/styles";
import { useDispatch, useSelector } from "react-redux";
import {
	adminUpdateUserAction,
	getUserByIdAction,
} from "../../../store/actions/userAction";
import { TextareaAutosize } from "@mui/material";
import Textarea from "@mui/joy/Textarea";
import AdminPanelOptions from "../../../components/adminPanelOptions";
import {
	slideInLeftAnimation,
	tableContentAnimation,
	zoomOutAnimation,
} from "../../../utils/animation";
const { motion } = require("framer-motion");

function UserEdit({ params }) {
	const userId = params.id;

	const dispatch = useDispatch();
	const { userInfo } = useSelector((state) => state.userLogin);
	const { loading, error, user } = useSelector((state) => state.userById);
	const {
		loading: loadingUpdate,
		error: updateError,
		user: updateUser,
	} = useSelector((state) => state.adminUpdateUser);

	const [first_name, setFirst_name] = useState(user?.first_name || " ");
	const [last_name, setLast_name] = useState(user?.last_name || "");
	const [phone, setPhone] = useState(user?.phone || "");
	const [email, setEmail] = useState(user?.email || "");
	const [address, setAddress] = useState(user?.address || "");
	const [country, setCountry] = useState(user?.country || "");
	const [isAdmin, setIsAdmin] = useState(user?.isAdmin || false);

	const { enqueueSnackbar, closeSnackbar } = useSnackbar();
	const router = useRouter();
	const classes = useStyles();

	const submitHandler = (e) => {
		e.preventDefault();
		closeSnackbar();
		dispatch(
			adminUpdateUserAction({
				userId,
				input: {
					first_name,
					last_name,
					phone,
					address,
					country,
					isAdmin,
				},
			})
		);
	};

	useEffect(() => {
		if (!userInfo) {
			return router.push("/login");
		}

		dispatch(getUserByIdAction(userId));
	}, [dispatch, router, userId, userInfo]);

	useEffect(() => {
		if (updateUser?.message) {
			enqueueSnackbar("User Profile have been updated", { variant: "success" });
			dispatch(getUserByIdAction(userId));
		}

		if (user?._id) {
			setFirst_name(user?.first_name);
			setLast_name(user?.last_name);
			setPhone(user?.phone);
			setAddress(user?.address);
			setCountry(user?.country);
			setIsAdmin(user?.isAdmin);
			setEmail(user?.email);
		}
	}, [country, dispatch, enqueueSnackbar, updateUser, user, userId]);

	return (
		<Layout title={`Edit User ${userId}`}>
			<div className="px-5">
				<Grid container spacing={1}>
					<Grid item md={3} xs={12}>
						<Card className={classes.section}>
							<AdminPanelOptions />
						</Card>
					</Grid>
					<Grid item md={9} xs={12}>
						{/* <Card className={classes.section}>
							<List>
								<ListItem>
									<h1>Edit User {userId}</h1>
								</ListItem>
								<ListItem>
									{loading && <CircularProgress></CircularProgress>}
									{error && (
										<Typography className={classes.error}>{error}</Typography>
									)}
								</ListItem>
								<ListItem>
									<form
										onSubmit={handleSubmit(submitHandler)}
										className={classes.form}>
										<List>
											<ListItem>
												<Controller
													name="name"
													control={control}
													defaultValue=""
													rules={{
														required: true,
													}}
													render={({ field }) => (
														<TextField
															variant="outlined"
															fullWidth
															id="name"
															label="Name"
															error={Boolean(errors.name)}
															helperText={errors.name ? "Name is required" : ""}
															{...field}></TextField>
													)}></Controller>
											</ListItem>
											<ListItem>
												<FormControlLabel
													label="Is Admin"
													control={
														<Checkbox
															onClick={(e) => setIsAdmin(e.target.checked)}
															checked={isAdmin}
															name="isAdmin"
														/>
													}></FormControlLabel>
											</ListItem>
											<ListItem>
												<Button
													variant="contained"
													type="submit"
													fullWidth
													color="primary">
													Update
												</Button>
												{loadingUpdate && <CircularProgress />}
											</ListItem>
										</List>
									</form>
								</ListItem>
							</List>
						</Card> */}

						<motion.form
							variants={tableContentAnimation}
							initial="initial"
							animate="animate"
							onSubmit={submitHandler}>
							<motion.h1
								variants={slideInLeftAnimation}
								initial="initial"
								animate="animate"
								className="mt-5 mb-2 font-semibold">
								{" "}
								Edit User {userId}
								{loading || loadingUpdate ? (
									<span className="ml-2">
										<CircularProgress size={"20px"} />{" "}
									</span>
								) : (
									<></>
								)}
							</motion.h1>

							{error && (
								<Typography className={classes.error}>{error}</Typography>
							)}
							<div className="flex flex-col items-center md:flex-row">
								<span className="w-full mt-5 mb-5 mr-0 md:mr-2">
									<TextField
										variant="outlined"
										fullWidth
										id="first name"
										label="First name"
										value={first_name}
										onChange={(e) => setFirst_name(e.target.value)}
										inputProps={{ type: "text" }}></TextField>
								</span>
								<span className="w-full mt-5 mb-5 ml-0 md:ml-2">
									{/* <FormControl fullWidth>
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
											{Categories?.map((cat) => {
												return (
													<MenuItem value={cat} id={cat} key={cat}>
														{cat}
													</MenuItem>
												);
											})}
										</Select>
									</FormControl> */}

									<TextField
										variant="outlined"
										fullWidth
										id="last name"
										label="Last name"
										value={last_name}
										onChange={(e) => setLast_name(e.target.value)}
										inputProps={{ type: "text" }}></TextField>
								</span>
							</div>
							<div className="flex flex-col items-center md:flex-row">
								<span className="w-full mt-5 mb-5 mr-0 md:mr-2">
									<TextField
										variant="outlined"
										fullWidth
										id="phone"
										label="phone"
										value={phone}
										onChange={(e) => setPhone(e.target.value)}
										inputProps={{ type: "Number" }}></TextField>
								</span>
								<span className="w-full mt-5 mb-5 ml-0 md:ml-2">
									<TextField
										variant="outlined"
										fullWidth
										id="email"
										label="Email"
										value={email}
										onChange={(e) => setEmail(e.target.value)}
										inputProps={{ type: "text" }}></TextField>
								</span>
							</div>

							<div className="flex flex-col items-center md:flex-row">
								<span className="w-full mt-5 mb-5 mr-0 md:mr-2">
									<TextField
										variant="outlined"
										fullWidth
										id="country"
										label="Country"
										value={country}
										onChange={(e) => setCountry(e.target.value)}
										inputProps={{ type: "text" }}></TextField>
								</span>
								<span className="w-full mt-5 mb-5 ml-0 md:ml-2">
									<TextField
										variant="outlined"
										fullWidth
										id="address"
										label="Address"
										value={address}
										onChange={(e) => setAddress(e.target.value)}
										inputProps={{ type: "text" }}></TextField>
								</span>
							</div>
							<div className="flex flex-col items-center mb-10 md:flex-row">
								<FormControl fullWidth>
									<InputLabel id="demo-simple-select-helper-label">
										Is Admin
									</InputLabel>
									<Select
										value={isAdmin}
										variant="outlined"
										fullWidth
										id="Category"
										onChange={(event) => {
											setIsAdmin(event.target.value);
										}}>
										<MenuItem value={true} key={true}>
											True
										</MenuItem>
										<MenuItem value={false} key={false}>
											False
										</MenuItem>
									</Select>
								</FormControl>
							</div>
							<motion.div
								variants={zoomOutAnimation}
								initial="initial"
								whileHover="hover"
								className="w-full mt-10">
								<Button
									variant="contained"
									type="submit"
									fullWidth
									color="primary"
									onClick={submitHandler}>
									Update
									{loading || loadingUpdate ? (
										<span className="ml-2">
											<CircularProgress size={"20px"} />{" "}
										</span>
									) : (
										<></>
									)}
								</Button>
							</motion.div>
							{/* 
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

							<label className="mt-10">Upload product image</label>
							<div className="flex items-center justify-center w-full py-5 mb-5 ml-0 border rounded md:ml-2">
								<input
									type="file"
									placeholder="Upload product image"
									ref={inputRef}
									accept="image/*"
									onChange={(e) => {
										setFile(e.target.files[0]);
									}}
								/>
							</div> */}
						</motion.form>
					</Grid>
				</Grid>
			</div>
		</Layout>
	);
}

export async function getServerSideProps({ params }) {
	return {
		props: { params },
	};
}

export default dynamic(() => Promise.resolve(UserEdit), { ssr: false });
