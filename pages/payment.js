import React, { useContext, useEffect, useState } from "react";
import { useRouter } from "next/router";
import Cookie from "js-cookie";
import {
	Button,
	FormControl,
	FormControlLabel,
	List,
	ListItem,
	Radio,
	RadioGroup,
	Typography,
} from "@material-ui/core";
import dynamic from "next/dynamic";
import { useSnackbar } from "notistack";

import Layout from "../components/Layout";
import CheckoutWizard from "../components/CheckoutWizard";
import useStyles from "../utils/styles";
import { useDispatch, useSelector } from "react-redux";
import { savePaymentMethodAction } from "../store/actions/cartAction";

function Payment() {
	const router = useRouter();
	const dispatch = useDispatch();
	const style = useStyles();
	const { enqueueSnackbar, closeSnackbar } = useSnackbar();
	const { userInfo } = useSelector((state) => state.userLogin);
	const { shippingAddress } = useSelector((state) => state.cart);

	const [paymentMethod, setPaymentMethod] = useState("");

	useEffect(() => {
		if (!userInfo) {
			router.push("/login?redirect=/payment");
			return;
		}
		if (!shippingAddress?.address) {
			router.push("/shipping");
		} else {
			setPaymentMethod(Cookie.get("paymentMethod") || "");
		}
	}, [router, shippingAddress?.address, userInfo]);

	const submitHandler = (e) => {
		closeSnackbar();
		e.preventDefault();
		if (!paymentMethod) {
			enqueueSnackbar("Payment method is required", { variant: "error" });
		} else {
			router.push("/placeorder");
		}
	};

	const goBack = () => router.push("/shipping");

	return (
		<Layout title="Payment Method">
			<CheckoutWizard activeStep={1} />
			<form className={style.form} onSubmit={submitHandler}>
				<Typography component="h1" variant="h1">
					Payment Method
				</Typography>
				<List>
					<ListItem>
						<FormControl component="fieldset">
							<RadioGroup
								aria-label="paymentMethod"
								value={paymentMethod}
								onChange={(e) => setPaymentMethod(e.target.value)}>
								<FormControlLabel
									label="Paystack"
									value="Paystack"
									control={<Radio />}
								/>
								<FormControlLabel
									label="Cash on Delivery"
									value="Cash on Delivery"
									control={<Radio />}
								/>
							</RadioGroup>
						</FormControl>
					</ListItem>
					<ListItem>
						<Button variant="contained" type="submit" fullWidth color="primary">
							Continue
						</Button>
					</ListItem>
					<ListItem>
						<Button
							variant="contained"
							type="button"
							fullWidth
							color="secondary"
							onClick={goBack}>
							Back
						</Button>
					</ListItem>
				</List>
			</form>
		</Layout>
	);
}

export default dynamic(() => Promise.resolve(Payment), { ssr: false });
