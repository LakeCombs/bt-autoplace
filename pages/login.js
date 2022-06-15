import {
  Button,
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
import Cookie from "js-cookie";
import { Controller, useForm } from "react-hook-form";
import { useSnackbar } from "notistack";

import Layout from "../components/Layout";
import useStyles from "../utils/styles";
import { Store } from "../utils/store";
import { getError } from '../utils/util';

function Login() {
  const router = useRouter();
  const { redirect } = router.query;

  const style = useStyles();

  const { state, dispatch } = useContext(Store);
  const { userInfo } = state;

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();

  const {enqueueSnackbar, closeSnackbar} = useSnackbar();

  useEffect(() => {
    if (userInfo) {
      router.push(redirect || "/");
    }
  }, [redirect, router, userInfo]);

  const submitHandler = async ({ email, password }) => {
    closeSnackbar();
    try {
      const { data } = await axios.post("/api/users/login", {
        email,
        password,
      });
      dispatch({ type: "USER_LOGIN", payload: data });
      Cookie.set("userInfo", JSON.stringify(data));
      router.push(redirect || "/");
    } catch (error) {
      enqueueSnackbar(getError(error), { variant: 'error' });
    }
  };
  return (
    <Layout title="Login">
      <form onSubmit={handleSubmit(submitHandler)} className={style.form}>
        <Typography component="h1" variant="h1">
          Login
        </Typography>
        <List>
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
            <Button variant="contained" type="submit" fullWidth color="primary">
              Log in
            </Button>
          </ListItem>
          <ListItem>
            Don&apos;t have an account?{" "}
            <NextLink href={`/register?redirect=${redirect || "/"}`} passHref>
              <Link>&nbsp; Register</Link>
            </NextLink>
          </ListItem>
        </List>
      </form>
    </Layout>
  );
}

export default dynamic(() => Promise.resolve(Login), { ssr: false });
