import {
    Button,
    Link,
    List,
    ListItem,
    TextField,
    Typography,
  } from "@material-ui/core";
  import { useRouter } from 'next/router';
  import NextLink from "next/link";
  import dynamic from "next/dynamic";
  import React, { useContext, useEffect } from "react";
  import axios from "axios";
  import Cookie from "js-cookie";
  
  import Layout from "../components/Layout";
  import useStyles from "../utils/styles";
  import { Store } from "../utils/store";
  import { Controller } from 'react-hook-form';
import { useSnackbar } from 'notistack';
import { useForm } from 'react-hook-form';

  function Register() {
    const router = useRouter();
    const {redirect} = router.query;
    const style = useStyles();
    const {state, dispatch} = useContext(Store);
    const {userInfo} = state;

    const {
        handleSubmit,
        control,
        formState: { errors },
      } = useForm();
    
      const {enqueueSnackbar, closeSnackbar} = useSnackbar();
  
  
    useEffect(() => {
      if(userInfo) {
        router.push(redirect || '/');
      }
    }, [redirect, router, userInfo])
  
    const submitHandler = async ({name, email, password, confirmPassword}) => {
        closeSnackbar();
      if(password !== confirmPassword) {
          enqueueSnackbar("passwords don't match", {variant: 'error'});
          return;
      }
      try {
      const { data } = await axios.post("/api/users/register", {name, email, password });
          dispatch({type: 'USER_LOGIN', payload: data});
          Cookie.set('userInfo', JSON.stringify(data));
          router.push(redirect || '/');
      } catch (error) {
        enqueueSnackbar(error.response.data ? error.response.data.message : error.message, {variant: 'error'})
      }
    };
    return (
      <Layout title="Register">
        <form onSubmit={handleSubmit(submitHandler)} className={style.form}>
          <Typography component="h1" variant="h1">
            Register
          </Typography>
          <List>
            <ListItem>
            <Controller
              name="name"
              control={control}
              defaultValue=""
              rules={{
                required: true,
                minLength: 2
              }}
              render={({ field }) => (
                <TextField
                variant="outlined"
                fullWidth
                id="name"
                label="Name"
                inputProps={{ type: "text" }}
                  error={!!errors.name}
                  helperText={
                    errors.name
                    ?
                    errors.name.type === "minLength"
                    : "Name must be at least 2 characters"
                        ? "Name can't be empty"
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
              <Button variant="contained" type="submit" fullWidth color="primary">
                Register
              </Button>
            </ListItem>
            <ListItem>
              Already have an account?{" "}
              <NextLink href={`/login?redirect=${redirect || '/'}`} passHref>
                <Link>&nbsp; Log in</Link>
              </NextLink>
            </ListItem>
          </List>
        </form>
      </Layout>
    );
  }
  
  export default dynamic(() => Promise.resolve(Register), { ssr: false });
  