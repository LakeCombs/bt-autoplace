import {
  Button,
  FormControl,
  InputLabel,
  List,
  ListItem,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@material-ui/core";
import { useRouter } from "next/router";
import dynamic from "next/dynamic";
import React, { useContext, useEffect } from "react";
import Cookie from "js-cookie";
import { Controller } from "react-hook-form";
import { useForm } from "react-hook-form";

import Layout from "../components/Layout";
import useStyles from "../utils/styles";
import { Store } from "../utils/store";
import CheckoutWizard from "../components/CheckoutWizard";

// import { states } from "../utils/data";

const states = [
  "Abia",
  "Adamawa",
  "Akwa Ibom",
  "Anambra",
  "Bauchi",
  "Bayelsa",
  "Benue",
  "Borno",
  "Cross River",
  "Delta",
  "Ebonyi",
  "Edo",
  "Ekiti",
  "Enugu",
  "FCT - Abuja",
  "Gombe",
  "Imo",
  "Jigawa",
  "Kaduna",
  "Kano",
  "Katsina",
  "Kebbi",
  "Kogi",
  "Kwara",
  "Lagos",
  "Nasarawa",
  "Niger",
  "Ogun",
  "Ondo",
  "Osun",
  "Oyo",
  "Plateau",
  "Rivers",
  "Sokoto",
  "Taraba",
  "Yobe",
  "Zamfara",
];

function Shipping() {
  const router = useRouter();
  const style = useStyles();
  const { dispatch, state: {userInfo, cart: {shippingAddress}} } = useContext(Store);

  const {
    handleSubmit,
    control,
    formState: { errors },
    setValue
  } = useForm();

  useEffect(() => {
    if(!userInfo) {
      router.push('/login?redirect=/shipping')
    }

    setValue('name', shippingAddress?.name);
    setValue('address', shippingAddress?.address);
    setValue('city', shippingAddress?.city);
    setValue('state', shippingAddress?.state);
    setValue('phone', shippingAddress?.phone);


  }, [router, setValue, shippingAddress, userInfo])

  const submitHandler = ({ name, address, city, state, phone }) => {
    dispatch({
      type: "SAVE_SHIPPING_ADDRESS",
      payload: { name, address, city, state, phone },
    });
    Cookie.set(
      "shippingAddress",
      JSON.stringify({ name, address, city, state, phone })
    );
    router.push("/payment");
  };

  return (
    <Layout title="Shipping Address">
      <CheckoutWizard />
      <form onSubmit={handleSubmit(submitHandler)} className={style.form}>
        <Typography component="h1" variant="h1">
          Shipping Address
        </Typography>
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
                  label="Full Name"
                  inputProps={{ type: "text" }}
                  error={!!errors.name}
                  helperText={errors.name ? "Full name can't be empty" : ""}
                  {...field}
                />
              )}
            />
          </ListItem>
          <ListItem>
            <Controller
              name="address"
              control={control}
              defaultValue=""
              rules={{
                required: true,
              }}
              render={({ field }) => (
                <TextField
                  multiline
                  variant="outlined"
                  fullWidth
                  id="address"
                  label="Address"
                  inputProps={{ type: "text" }}
                  error={!!errors.address}
                  helperText={errors.address ? "Address is required" : ""}
                  {...field}
                />
              )}
            />
          </ListItem>
          <ListItem>
            <Controller
              name="city"
              control={control}
              defaultValue=""
              rules={{
                required: true,
              }}
              render={({ field }) => (
                <TextField
                  variant="outlined"
                  fullWidth
                  id="city"
                  label="City"
                  inputProps={{ type: "text" }}
                  error={!!errors.city}
                  helperText={errors.city ? "City is required" : ""}
                  {...field}
                />
              )}
            />
          </ListItem>
          <ListItem>
            <Controller
              name="state"
              control={control}
              defaultValue=""
              rules={{
                required: true,
              }}
              render={({ field }) => (
                <TextField
                  label="State of residence"
                  fullWidth
                  select
                  defaultValue=""
                  id="stateOfResidence"
                  rules={{
                    required: true,
                  }}
                  helperText={
                    errors.state ? "State of residence is required" : ""
                  }
                  variant="outlined"
                  error={!!errors.state}
                  {...field}
                >
                  {states.map((state) => (
                    <MenuItem key={state} value={state}>
                      {state}
                    </MenuItem>
                  ))}
                </TextField>
              )}
            />
          </ListItem>
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
                  label="Phone number"
                  error={!!errors.city}
                  helperText={errors.city ? "Phone number is required" : ""}
                  {...field}
                />
              )}
            />
          </ListItem>
          <ListItem>
            <Button variant="contained" type="submit" fullWidth color="primary">
              Continue
            </Button>
          </ListItem>
        </List>
      </form>
    </Layout>
  );
}

export default dynamic(() => Promise.resolve(Shipping), { ssr: false });
