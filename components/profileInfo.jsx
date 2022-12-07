import React, { useContext, useEffect } from "react";
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
} from "@material-ui/core";
import { Controller, useForm } from "react-hook-form";
import { useRouter } from "next/router";
import { useSnackbar } from "notistack";
import { getError } from "../utils/util";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { updateUserAction } from "../store/actions/userAction";
import { justHoverAnimation } from "../utils/animation";
const { motion } = require("framer-motion");

const ProfileInfo = () => {
	const dispatch = useDispatch();
	const { enqueueSnackbar, closeSnackbar } = useSnackbar();
	const { userInfo } = useSelector((state) => state.userLogin);
	const {
		userInfo: updateUserInfo,
		loading,
		error,
	} = useSelector((state) => state.updateUser);
	const router = useRouter();

	const {
		handleSubmit,
		control,
		formState: { errors },
		setValue,
	} = useForm();

	useEffect(() => {
		if (!userInfo) {
			return router.push("/login");
		}
		setValue("first_name", userInfo?.first_name);
		setValue("last_name", userInfo?.last_name);
		setValue("email", userInfo.email);
		setValue("phone", userInfo?.phone);
		setValue("city", userInfo?.city);
		setValue("country", userInfo?.country);
		setValue("postalcode", userInfo?.postal_code);
		setValue("address", userInfo?.address);
	}, [router, setValue, userInfo]);

	const submitHandler = async ({
		name,
		email,
		city,
		first_name,
		last_name,
		postal_code,
		country,
		password,
		address,
		// confirmPassword,
	}) => {
		closeSnackbar();
		dispatch(
			updateUserAction({
				name,
				email,
				city,
				first_name,
				last_name,
				postal_code,
				country,
				address,
			})
		);
	};

	return (
		<form onSubmit={handleSubmit(submitHandler)} className="p">
			<div className="flex flex-col justify-between mb-4 md:flex-row ">
				<div className="w-full mb-2 md:w-1/2 md:mr-1 ">
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
								label="First name"
								inputProps={{ type: "name" }}
								error={Boolean(errors.name)}
								helperText={
									errors.name
										? errors.name.type === "minLength"
											? "Name length is more than 1"
											: "Name is required"
										: ""
								}
								{...field}></TextField>
						)}></Controller>
				</div>
				<div className="w-full mb-4 md:w-1/2 md:ml-1">
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
								inputProps={{ type: "name" }}
								error={Boolean(errors.name)}
								helperText={
									errors.name
										? errors.name.type === "minLength"
											? "Last Name length is more than 1"
											: "Last Name is required"
										: ""
								}
								{...field}></TextField>
						)}></Controller>
				</div>
			</div>

			<div className="flex flex-col justify-between mb-4 md:flex-row">
				<div className="w-full mb-2 md:w-1/2 md:mr-1 ">
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
								error={Boolean(errors.email)}
								helperText={
									errors.email
										? errors.email.type === "pattern"
											? "Email is not valid"
											: "Email is required"
										: ""
								}
								{...field}></TextField>
						)}></Controller>
				</div>
				<div className="w-full mb-4 md:w-1/2 md:ml-1">
					<Controller
						name="phone"
						control={control}
						defaultValue=""
						rules={{
							required: true,
							minLength: 8,
						}}
						render={({ field }) => (
							<TextField
								variant="outlined"
								fullWidth
								id="phone"
								label="phone"
								inputProps={{ type: "phone" }}
								error={!!errors.phone}
								helperText={
									errors.phone
										? errors.phone.type === "minLength"
											? "phone must not be shorter than 6 characters"
											: "phone is required"
										: ""
								}
								{...field}
							/>
						)}
					/>
				</div>
			</div>

			<div className="flex flex-col justify-between mb-4 md:flex-row">
				<div className="w-full mb-2 md:w-1/2 md:mr-1 ">
					<Controller
						name="address"
						control={control}
						defaultValue=""
						rules={{
							required: true,
							minLength: 1,
						}}
						render={({ field }) => (
							<TextField
								variant="outlined"
								fullWidth
								id="address"
								label="address"
								inputProps={{ type: "address" }}
								error={Boolean(errors.address)}
								helperText={
									errors.address
										? errors.address.type === "minLength"
											? "Address length should be more than 1"
											: "Address is required"
										: ""
								}
								{...field}></TextField>
						)}></Controller>
				</div>
				<div className="w-full mb-4 md:w-1/2 md:ml-1">
					<Controller
						name="city"
						control={control}
						defaultValue=""
						rules={{
							required: true,
							minLength: 1,
						}}
						render={({ field }) => (
							<TextField
								variant="outlined"
								fullWidth
								id="city"
								label="city"
								inputProps={{ type: "city" }}
								error={!!errors.city}
								helperText={
									errors.city
										? errors.city.type === "minLength"
											? "city must be more than 1 character"
											: "city is required"
										: ""
								}
								{...field}
							/>
						)}
					/>
				</div>
			</div>

			<div className="flex flex-col justify-between mb-4 md:flex-row">
				<div className="w-full mb-2 md:w-1/2 md:mr-1 ">
					<Controller
						name="post code"
						control={control}
						defaultValue=""
						rules={{
							required: true,
							minLength: 1,
						}}
						render={({ field }) => (
							<TextField
								variant="outlined"
								fullWidth
								id="post code"
								label="Post code"
								inputProps={{ type: "postcode" }}
								error={Boolean(errors.postcode)}
								helperText={
									errors.address
										? errors.postcode.type === "minLength"
											? "Post code length should be more than 1"
											: "Post code is required"
										: ""
								}
								{...field}></TextField>
						)}></Controller>
				</div>
				<div className="w-full mb-4 md:w-1/2 md:ml-1">
					<Controller
						name="country"
						control={control}
						defaultValue=""
						rules={{
							required: true,
							minLength: 1,
						}}
						render={({ field }) => (
							<TextField
								variant="outlined"
								fullWidth
								id="country"
								label="country"
								inputProps={{ type: "country" }}
								error={!!errors.Country}
								helperText={
									errors.country
										? errors.country.type === "minLength"
											? "country must be more than 1 character"
											: "country is required"
										: ""
								}
								{...field}
							/>
						)}
					/>
				</div>
			</div>

			<div className="flex flex-row justify-end w-full">
				<motion.button
					variants={justHoverAnimation}
					initial="initial"
					whileHover="hover"
					className="px-4 py-3 text-white rounded-lg primary-blue-bg hover:shadow-lg">
					Update
					{loading ? <CircularProgress size={"20px"} color={"blue"} /> : <></>}
				</motion.button>
			</div>
		</form>
	);
};

export default ProfileInfo;
