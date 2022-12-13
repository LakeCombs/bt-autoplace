import {
  Button,
  CircularProgress,
  Link,
  List,
  ListItem,
  TextField,
} from '@material-ui/core';
import { useRouter } from 'next/router';
import NextLink from 'next/link';
import React, { useEffect, useState } from 'react';

import { useSnackbar } from 'notistack';
import Layout from '../components/Layout';

import { loginUser } from '../store/actions/userAction';
import { useSelector, useDispatch } from 'react-redux';

const Login = () => {
  const router = useRouter();
  const { redirect } = router.query;
  const dispatch = useDispatch();
  const { userInfo, loading, error } = useSelector((state) => state.userLogin);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const submitHandler = (e) => {
    e.preventDefault();
    closeSnackbar();
    dispatch(
      loginUser({
        email,
        password,
      })
    );
  };

  useEffect(() => {
    if (userInfo) {
      return router.push(redirect || '/');
    }
    if (error) {
      return enqueueSnackbar(error, { variant: 'error' });
    }
  }, [enqueueSnackbar, error, redirect, router, userInfo]);

  return (
    <Layout title="Login">
      <div className="flex items-center justify-center w-full px-10 md:px-1">
        <form
          onSubmit={submitHandler}
          className="flex flex-col w-full mt-10 mb-10 md:w-3/4 "
        >
          <h1 className="text-2xl font-extrabold primary-blue-text">
            Login{' '}
            <span className="ml-5">
              {loading ? <CircularProgress variant="solid" size={15} /> : <></>}{' '}
            </span>
          </h1>
          <List>
            <ListItem>
              <TextField
                variant="outlined"
                fullWidth
                id="email"
                label="Email"
                rules={{
                  required: true,
                  pattern: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/,
                }}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              ></TextField>
            </ListItem>
            <ListItem>
              <TextField
                variant="outlined"
                fullWidth
                id="password"
                label="Password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              ></TextField>
            </ListItem>
            <ListItem>
              <Button
                className="p"
                variant="contained"
                type="submit"
                fullWidth
                color="primary"
                onClick={submitHandler}
              >
                Log in
              </Button>
            </ListItem>
            <ListItem className="p">
              Don&apos;t have an account?{' '}
              <NextLink href={`/register?redirect=${redirect || '/'}`} passHref>
                <Link>&nbsp; Register</Link>
              </NextLink>
            </ListItem>
          </List>
        </form>
      </div>
    </Layout>
  );
};

export default Login;
