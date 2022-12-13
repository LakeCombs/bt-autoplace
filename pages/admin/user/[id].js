import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { useSnackbar } from 'notistack';
import {
  Grid,
  Typography,
  Card,
  Button,
  TextField,
  CircularProgress,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@material-ui/core';
import Layout from '../../../components/Layout';
import useStyles from '../../../utils/styles';
import { useDispatch, useSelector } from 'react-redux';
import {
  adminUpdateUserAction,
  getUserByIdAction,
} from '../../../store/actions/userAction';
import AdminPanelOptions from '../../../components/adminPanelOptions';
import {
  slideInLeftAnimation,
  tableContentAnimation,
  zoomOutAnimation,
} from '../../../utils/animation';
const { motion } = require('framer-motion');

function UserEdit({ params }) {
  const userId = params.id;

  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.userLogin);
  const { loading, error, user } = useSelector((state) => state.userById);
  const { loading: loadingUpdate, user: updateUser } = useSelector(
    (state) => state.adminUpdateUser
  );

  const [first_name, setFirst_name] = useState(user?.first_name || ' ');
  const [last_name, setLast_name] = useState(user?.last_name || '');
  const [phone, setPhone] = useState(user?.phone || '');
  const [email, setEmail] = useState(user?.email || '');
  const [address, setAddress] = useState(user?.address || '');
  const [country, setCountry] = useState(user?.country || '');
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
      return router.push('/login');
    }

    dispatch(getUserByIdAction(userId));
  }, [dispatch, router, userId, userInfo]);

  useEffect(() => {
    if (updateUser?.message) {
      enqueueSnackbar('User Profile have been updated', { variant: 'success' });
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
            <motion.form
              variants={tableContentAnimation}
              initial="initial"
              animate="animate"
              onSubmit={submitHandler}
            >
              <motion.h1
                variants={slideInLeftAnimation}
                initial="initial"
                animate="animate"
                className="mt-5 mb-2 font-semibold"
              >
                {' '}
                Edit User {userId}
                {loading || loadingUpdate ? (
                  <span className="ml-2">
                    <CircularProgress size={'20px'} />{' '}
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
                    inputProps={{ type: 'text' }}
                  ></TextField>
                </span>
                <span className="w-full mt-5 mb-5 ml-0 md:ml-2">
                  <TextField
                    variant="outlined"
                    fullWidth
                    id="last name"
                    label="Last name"
                    value={last_name}
                    onChange={(e) => setLast_name(e.target.value)}
                    inputProps={{ type: 'text' }}
                  ></TextField>
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
                    inputProps={{ type: 'Number' }}
                  ></TextField>
                </span>
                <span className="w-full mt-5 mb-5 ml-0 md:ml-2">
                  <TextField
                    variant="outlined"
                    fullWidth
                    id="email"
                    label="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    inputProps={{ type: 'text' }}
                  ></TextField>
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
                    inputProps={{ type: 'text' }}
                  ></TextField>
                </span>
                <span className="w-full mt-5 mb-5 ml-0 md:ml-2">
                  <TextField
                    variant="outlined"
                    fullWidth
                    id="address"
                    label="Address"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    inputProps={{ type: 'text' }}
                  ></TextField>
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
                    }}
                  >
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
                className="w-full mt-10"
              >
                <Button
                  variant="contained"
                  type="submit"
                  fullWidth
                  color="primary"
                  onClick={submitHandler}
                >
                  Update
                  {loading || loadingUpdate ? (
                    <span className="ml-2">
                      <CircularProgress size={'20px'} />{' '}
                    </span>
                  ) : (
                    <></>
                  )}
                </Button>
              </motion.div>
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

export default UserEdit;
