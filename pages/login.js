import {
  Button,
  Link,
  List,
  ListItem,
  TextField,
  Typography,
} from "@material-ui/core";
import NextLink from "next/link";
import dynamic from "next/dynamic";
import React, { useState } from "react";
import Layout from "../components/Layout";
import useStyles from "../utils/styles";
import axios from "axios";

function Login() {
  const style = useStyles();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
    const { data } = await axios.post("/api/users/login", { email, password });
        alert('success')
    } catch (error) {
        alert(error.message)
    }
  };
  return (
    <Layout title="Login">
      <form onSubmit={submitHandler} className={style.form}>
        <Typography component="h1" variant="h1">
          Login
        </Typography>
        <List>
          <ListItem>
            <TextField
              variant="outlined"
              fullWidth
              id="email"
              label="Email"
              inputProps={{ type: "email" }}
              onChange={(e) => setEmail(e.target.value)}
            />
          </ListItem>
          <ListItem>
            <TextField
              variant="outlined"
              fullWidth
              id="password"
              label="Password"
              inputProps={{ type: "password" }}
              onChange={(e) => setPassword(e.target.value)}
            />
          </ListItem>
          <ListItem>
            <Button variant="contained" type="submit" fullWidth color="primary">
              Log in
            </Button>
          </ListItem>
          <ListItem>
            Don&apos;t have an account?{" "}
            <NextLink href={"/register"} passHref>
              <Link>&nbsp; Register</Link>
            </NextLink>
          </ListItem>
        </List>
      </form>
    </Layout>
  );
}

export default dynamic(() => Promise.resolve(Login), { ssr: false });
