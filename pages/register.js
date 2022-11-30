import {
	Button,
	CircularProgress,
	Link,
	List,
	ListItem,
	TextField,
	Typography,
} from "@material-ui/core";
import { useRouter } from "next/router";
import NextLink from "next/link";
import dynamic from "next/dynamic";
import React, { useContext, useEffect } from "react";
import axios from "axios";
import Layout from "../components/Layout";
import useStyles from "../utils/styles";
import { Controller } from "react-hook-form";
import { useSnackbar } from "notistack";
import { useForm } from "react-hook-form";
import { useSelector, useDispatch } from "react-redux";
import { registerUser } from "../store/actions/userAction";

function Register() {
	const router = useRouter();
	const dispatch = useDispatch();
	const { redirect } = router.query;
	const { userInfo, error, loading } = useSelector((state) => state.userLogin);

	const {
		handleSubmit,
		control,
		formState: { errors },
	} = useForm();

	const { enqueueSnackbar, closeSnackbar } = useSnackbar();

	const submitHandler = async ({
		first_name,
		last_name,
		phone,
		email,
		password,
		confirmPassword,
	}) => {
		closeSnackbar();
		if (password !== confirmPassword) {
			enqueueSnackbar("passwords don't match", { variant: "error" });
			return;
		}

		dispatch(registerUser({ first_name, last_name, email, password, phone }));
	};

	useEffect(() => {
		if (error) {
			return enqueueSnackbar(error, { variant: "error" });
		}

		if (userInfo?._id) {
			return router.push(redirect || "/");
		}
	}, [enqueueSnackbar, error, redirect, router, userInfo]);

	return (
		<Layout title="Register">
			<div className="flex items-center justify-center w-full px-10 md:px-1">
				<form
					onSubmit={handleSubmit(submitHandler)}
					className="flex flex-col w-full mt-10 mb-10 md:w-3/4 ">
					<h1 className="text-2xl font-extrabold primary-blue-text">
						Register
						<span className="ml-5">
							{loading ? <CircularProgress variant="solid" size={15} /> : <></>}
						</span>
					</h1>
					<List>
						<div className="flex flex-col items-center md:flex-row">
							<ListItem>
								<Controller
									name="first_name"
									control={control}
									defaultValue=""
									rules={{
										required: true,
										minLength: 2,
									}}
									render={({ field }) => (
										<TextField
											variant="outlined"
											fullWidth
											id="first_name"
											label="First Name"
											inputProps={{ type: "text" }}
											error={!!errors.name}
											helperText={
												errors.name
													? errors.first_name.type === "minLength"
													: "First Name must be at least 2 characters"
													? "First Name can't be empty"
													: ""
											}
											{...field}
										/>
									)}
								/>
							</ListItem>

							<ListItem>
								<Controller
									name="last_name"
									control={control}
									defaultValue=""
									rules={{
										required: true,
										minLength: 2,
									}}
									render={({ field }) => (
										<TextField
											variant="outlined"
											fullWidth
											id="last_name"
											label="Last name"
											inputProps={{ type: "text" }}
											error={!!errors.name}
											helperText={
												errors.name
													? errors.name.type === "minLength"
													: "Last Name must be at least 2 characters"
													? "Last Name can't be empty"
													: ""
											}
											{...field}
										/>
									)}
								/>
							</ListItem>
						</div>

						<ListItem>
							<Controller
								name="phone"
								control={control}
								defaultValue=""
								rules={{
									required: true,
								}}
								render={({ field }) => (
									<TextField
										variant="outlined"
										fullWidth
										id="phone"
										label="phone"
										inputProps={{ type: "phone" }}
										error={!!errors.email}
										helperText={
											errors.email
												? errors.phone.type === "pattern"
													? "Phone is not valid"
													: "This Field is required is required"
												: ""
										}
										{...field}
									/>
								)}
							/>
						</ListItem>
						<ListItem>
							<Controller
								name="email"
								control={control}
								defaultValue=""
								rules={{
									required: true,
									pattern: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/,
								}}
								render={({ field }) => (
									<TextField
										variant="outlined"
										fullWidth
										id="email"
										label="Email"
										inputProps={{ type: "email" }}
										error={!!errors.email}
										helperText={
											errors.email
												? errors.email.type === "pattern"
													? "Email is not valid"
													: "Email is required"
												: ""
										}
										{...field}
									/>
								)}
							/>
						</ListItem>
						<ListItem>
							<Controller
								name="password"
								control={control}
								defaultValue=""
								rules={{
									required: true,
									minLength: 6,
								}}
								render={({ field }) => (
									<TextField
										variant="outlined"
										fullWidth
										id="password"
										label="Password"
										inputProps={{ type: "password" }}
										error={!!errors.password}
										helperText={
											errors.password
												? errors.password.type === "minLength"
													? "Password must not be shorter than 6 characters"
													: "Password is required"
												: ""
										}
										{...field}
									/>
								)}
							/>
						</ListItem>
						<ListItem>
							<Controller
								name="confirmPassword"
								control={control}
								defaultValue=""
								rules={{
									required: true,
								}}
								render={({ field }) => (
									<TextField
										variant="outlined"
										fullWidth
										id="confirmPassword"
										label="Confirm Password"
										inputProps={{ type: "password" }}
										error={!!errors.confirmPassword}
										helperText={
											errors.confirmPassword
												? "Confirm Password is required"
												: ""
										}
										{...field}
									/>
								)}
							/>
						</ListItem>
						<ListItem>
							<Button
								variant="contained"
								type="submit"
								fullWidth
								color="primary">
								Register
							</Button>
						</ListItem>
						<ListItem>
							Already have an account?{" "}
							<NextLink href={`/login?redirect=${redirect || "/"}`} passHref>
								<Link>&nbsp; Log in</Link>
							</NextLink>
						</ListItem>
					</List>
				</form>
			</div>
		</Layout>
	);
}

export default dynamic(() => Promise.resolve(Register), { ssr: false });
