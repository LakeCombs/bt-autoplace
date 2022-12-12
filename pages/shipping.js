/* eslint-disable @next/next/no-img-element */
import {
	Button,
	FormHelperText,
	List,
	ListItem,
	MenuItem,
	NativeSelect,
	Radio,
	Select,
	TextareaAutosize,
	TextField,
	FormControlLabel,
	Typography,
	RadioGroup,
	FormControl,
	InputLabel,
} from "@material-ui/core";
import { useRouter } from "next/router";
import NextLink from "next/link";
import dynamic from "next/dynamic";
import React, { useContext, useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import Cookie from "js-cookie";
import Layout from "../components/Layout";
import useStyles from "../utils/styles";
import CheckoutWizard from "../components/CheckoutWizard";
import { useDispatch, useSelector } from "react-redux";
import { useSelect } from "@mui/base";
import Image from "next/image";
import Link from "next/link";
import {
	savePaymentMethodAction,
	saveShippingAddressAction,
} from "../store/actions/cartAction";
import { Satellite } from "@material-ui/icons";
import { useSnackbar } from "notistack";
import { states } from "../utils/data";
import ReactWhatsapp from "react-whatsapp";
import {
	appearOnlyAnimation,
	justHoverAnimation,
	parent1,
	pulseAnimation,
	slideInLeftAnimation,
	slideInRightAnimation,
} from "../utils/animation";
import { formatter } from "../utils/currency-converter";
const { motion } = require("framer-motion");

function Shipping() {
	const router = useRouter();
	const style = useStyles();
	const dispatch = useDispatch();
	const { userInfo } = useSelector((state) => state.userLogin);
	const {
		shippingAddress,
		paymentMethod: payStyle,
		items,
	} = useSelector((state) => state.cart);
	const [pickup, setPickup] = useState("");
	const [first_name, setFirst_name] = useState(userInfo?.first_name);
	const [last_name, setLast_name] = useState(userInfo?.last_name);
	const [email, setEmail] = useState(userInfo?.email);
	const [phone, setPhone] = useState(userInfo?.phone);
	const [city, setCity] = useState(userInfo?.city || " ");
	const [state, setState] = useState(shippingAddress?.state || "");
	const [address, setAddress] = useState(userInfo?.address || "");
	const [country, setCountry] = useState(userInfo?.country || "");
	const [zip, setZip] = useState(shippingAddress?.postal_code || "");

	const [paymentMethod, setPaymentMethod] = useState(payStyle || "Paystack");
	const { enqueueSnackbar, closeSnackbar } = useSnackbar();

	useEffect(() => {
		if (!userInfo) {
			router.push("/login?redirect=/shipping");
			return;
		}
	}, [router, userInfo]);

	const submitHandler = (e) => {
		e.preventDefault();
		dispatch(savePaymentMethodAction(paymentMethod));

		if (!paymentMethod) {
			enqueueSnackbar("Payment method is required", { variant: "error" });
			return;
		}

		if (
			!city ||
			!state ||
			!country ||
			!address ||
			!first_name ||
			!last_name ||
			!zip
		) {
			enqueueSnackbar("All the field are required ", { variant: "error" });
			return;
		}

		dispatch(
			saveShippingAddressAction({
				first_name,
				last_name,
				address,
				city,
				state,
				country,
				postal_code: zip,
			})
		);

		router.push("/placeorder");
	};

	return (
		<Layout title="Shipping Address">
			<div className="flex flex-row justify-between w-full px-5 pt-10 md:px-10">
				<div className="w-full mr-1 md:w-4/5 ">
					<div className="flex flex-col justify-between w-full pr-12 md:flex-row p">
						<motion.h1
							variants={slideInLeftAnimation}
							initial="initial"
							animate="animate">
							{" "}
							CHECK OUT
						</motion.h1>
						<div>
							<motion.div
								variants={appearOnlyAnimation}
								initial="initial"
								animate="animate"
								className="items-center p">
								<FormControl component="fieldset">
									<RadioGroup
										row
										aria-label="paymentMethod"
										value={paymentMethod}
										onChange={(e) => {
											setPaymentMethod(e.target.value);
											dispatch(savePaymentMethodAction(e.target.value));
										}}>
										<FormControlLabel
											label="Paystack"
											value="Paystack"
											control={<Radio />}
										/>
										<FormControlLabel
											disabled
											label="Cash on Delivery"
											value="Cash on Delivery"
											control={<Radio />}
										/>
									</RadioGroup>
								</FormControl>
							</motion.div>
						</div>
					</div>

					<motion.div
						variants={parent1}
						initial="initial"
						animate="animate"
						className="mt-10 p">
						<form onSubmit={submitHandler}>
							<div className="flex flex-col justify-between mb-4 md:flex-row">
								<div className="w-full mb-2 md:w-1/2 md:mr-1 ">
									<TextField
										variant="outlined"
										fullWidth
										id="first_name"
										label="First name"
										inputProps={{ type: "name" }}
										value={first_name}
										onChange={(e) => setFirst_name(e.target.value)}
									/>
								</div>
								<div className="w-full mb-4 md:w-1/2 md:ml-1">
									<TextField
										variant="outlined"
										fullWidth
										id="last_name"
										label="Last name"
										value={last_name}
										onChange={(e) => setLast_name(e.target.value)}></TextField>
								</div>
							</div>

							<div className="flex flex-col justify-between mb-4 md:flex-row">
								<div className="w-full mb-2 md:w-1/2 md:mr-1 ">
									<TextField
										variant="outlined"
										fullWidth
										id="phone"
										value={phone}
										onChange={(e) => setPhone(e.target.value)}
										label="phone"></TextField>
								</div>
								<div className="w-full mb-4 md:w-1/2 md:ml-1">
									<TextField
										variant="outlined"
										fullWidth
										id="email"
										label="email"
										value={email}
										onChange={(e) => setEmail(e.target.value)}></TextField>
								</div>
							</div>

							<div className="flex flex-col justify-between mb-4 md:flex-row">
								<div className="w-full mb-2 md:w-1/2 md:mr-1 ">
									<TextField
										variant="outlined"
										fullWidth
										id="city"
										label="city"
										value={city}
										onChange={(e) => setCity(e.target.value)}></TextField>
								</div>
								<div className="w-full mb-4 md:w-1/2 md:ml-1">
									<FormControl fullWidth>
										<InputLabel id="demo-simple-select-helper-label">
											State
										</InputLabel>
										<Select
											imputProps={{ type: "text" }}
											variant="outlined"
											fullWidth
											label="State"
											id="state"
											value={state}
											onChange={(e) => setState(e.target.value)}>
											{states?.map((s) => {
												return (
													<MenuItem value={s} key={s}>
														{s}
													</MenuItem>
												);
											})}
										</Select>
									</FormControl>
								</div>
							</div>

							<div className="flex flex-col justify-between mb-4 md:flex-row">
								<div className="w-full mb-2 md:w-1/2 md:mr-1 ">
									<TextField
										variant="outlined"
										fullWidth
										id="country"
										value={country}
										onChange={(e) => setCountry(e.target.value)}
										label="Country"></TextField>
								</div>
								<div className="w-full mb-4 md:w-1/2 md:ml-1">
									<TextField
										variant="outlined"
										fullWidth
										id="zip"
										value={zip}
										onChange={(e) => setZip(e.target.value)}
										label="Zip/Postal Code"></TextField>
								</div>
							</div>

							<div className="mb-5">
								<TextField
									variant="outlined"
									fullWidth
									id="address"
									value={address}
									onChange={(e) => setAddress(e.target.value)}
									label="address"></TextField>
							</div>

							<motion.button
								variants={justHoverAnimation}
								initial="initial"
								whileHover="hover"
								className="px-3 py-2 text-white rounded-md primary-blue-bg"
								onClick={submitHandler}>
								CONTINUE
							</motion.button>
						</form>
					</motion.div>
				</div>

				<motion.div
					variants={slideInRightAnimation}
					initial="initial"
					animate="animate"
					className="flex-col hidden md:w-2/5 md:flex jusify-between">
					<div className="flex-col items-start p-3 ml-1 bg-blue-100 rounded-md ">
						{items?.map((item) => {
							return (
								<div
									className="flex flex-row items-center w-auto"
									key={item?.item?._id}>
									<img
										className="w-20 h-20"
										alt={item?.item?.name}
										src={item?.item?.image}
									/>
									<div className="ml-2">
										<h3 className="mb-2 font-light">{item?.item?.name}</h3>
										<h3 className="mb-2 font-bold">
											{formatter.format(item?.item?.price)}
										</h3>
										<h3 className="mb-2 font-light">Qty: {item?.count}</h3>
									</div>
								</div>
							);
						})}
					</div>
					<div className="flex flex-col items-start p-3 mt-1 ml-1 bg-blue-100 rounded-md ">
						<h1 className="flex justify-between w-full font-normal ">
							<span>Total</span>
							<span>
								{formatter.format(
									items.reduce(
										(prev, curr) => prev + curr?.count * curr?.item?.price,
										0
									)
								)}
							</span>
						</h1>
						<hr className="w-full mt-3 mb-3 border" />
						<div className="flex items-center justify-center w-full py-2">
							<NextLink href={"/cart"} passHref>
								<h1 className="hover:text-blue-900 hover:cursor-pointer">
									EDIT CART
								</h1>
							</NextLink>
						</div>
					</div>
					<div className="flex flex-col items-start p-3 mt-1 ml-1 bg-blue-100 rounded-md ">
						<h1 className="flex justify-between w-full font-normal ">
							Need Support?{" "}
						</h1>
						<hr className="w-full mt-3 mb-3 border " />
						<div className="flex flex-col items-center justify-between w-full">
							<h4>Call support to guide you.</h4>

							<motion.button
								variants={pulseAnimation}
								initial="initial"
								animate="animate"
								className="px-3 py-2 mt-5 text-sm text-white rounded-md primary-blue-bg">
								<ReactWhatsapp
									number={
										process.env.NEXT_PUBLIC_WHATAPP_NUMBER || "	+2348065280371"
									}>
									CHAT SUPPORT
								</ReactWhatsapp>
							</motion.button>
						</div>
					</div>
				</motion.div>
			</div>
		</Layout>
	);
}

export default dynamic(() => Promise.resolve(Shipping), { ssr: false });
