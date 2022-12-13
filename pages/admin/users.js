/* eslint-disable no-undef */
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import {
  CircularProgress,
  Grid,
  List,
  ListItem,
  Card,
  Button,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from '@material-ui/core';
import Layout from '../../components/Layout';
import useStyles from '../../utils/styles';
import { useSnackbar } from 'notistack';
import {
  deleteUserAction,
  getAllUserAction,
  getUserByIdAction,
} from '../../store/actions/userAction';
import { useDispatch, useSelector } from 'react-redux';
import AdminPanelOptions from '../../components/adminPanelOptions';
import {
  justHoverAnimation,
  slideInLeftAnimation,
  tableContentAnimation,
} from '../../utils/animation';
const { motion } = require('framer-motion');

function AdminUsers() {
  const router = useRouter();
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.userLogin);
  const { loading, error, users } = useSelector((state) => state.allUser);
  const {
    loading: loadingDelete,
    user: successDelete,
    error: errorDelete,
  } = useSelector((state) => state.deleteUser);
  const classes = useStyles();

  useEffect(() => {
    if (!userInfo) {
      router.push('/login');
    }

    dispatch(getAllUserAction());
  }, [dispatch, router, userInfo]);

  const { enqueueSnackbar } = useSnackbar();

  const deleteHandler = async (userId) => {
    if (!window.confirm('Are you sure?')) {
      return;
    }
    dispatch(deleteUserAction(userId));
  };

  useEffect(() => {
    if (successDelete?._id) {
      enqueueSnackbar('User deleted successfully', { variant: 'success' });
    }
    if (errorDelete) {
      enqueueSnackbar(errorDelete, { variant: 'error' });
    }

    if (error) {
      enqueueSnackbar(error, { variant: 'error' });
    }
  }, [enqueueSnackbar, error, errorDelete, successDelete]);

  return (
    <Layout title="Users">
      <div className="px-3">
        <Grid container spacing={1}>
          <Grid item md={3} xs={12}>
            <Card className={classes.section}>
              <AdminPanelOptions />
            </Card>
          </Grid>
          <Grid item md={9} xs={12}>
            <Card className={classes.section}>
              <List>
                <ListItem>
                  <motion.h1
                    variants={slideInLeftAnimation}
                    initial="initial"
                    animate="animate"
                  >
                    Users
                    <span className="ml-1">
                      {loading || loadingDelete ? (
                        <CircularProgress size={'20px'} />
                      ) : (
                        <></>
                      )}{' '}
                    </span>
                  </motion.h1>
                </ListItem>

                <ListItem>
                  {error ? <h1 className="text-red-500">{error}</h1> : <></>}
                  <motion.div
                    variants={tableContentAnimation}
                    initial="initial"
                    animate="animate"
                    className="w-full"
                  >
                    <TableContainer>
                      <Table>
                        <TableHead>
                          <TableRow>
                            <TableCell>ID</TableCell>
                            <TableCell>NAME</TableCell>
                            <TableCell>EMAIL</TableCell>
                            <TableCell>ISADMIN</TableCell>
                            <TableCell>ACTIONS</TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {users?.map((user) => (
                            <TableRow key={user?._id}>
                              <TableCell>
                                {user?._id.substring(20, 24)}
                              </TableCell>
                              <TableCell>
                                {user?.first_name} {user?.last_name}
                              </TableCell>
                              <TableCell>{user?.email}</TableCell>
                              <TableCell>
                                {user?.isAdmin ? 'YES' : 'NO'}
                              </TableCell>
                              <TableCell>
                                <Button
                                  size="small"
                                  variant="contained"
                                  onClick={() => {
                                    dispatch(getUserByIdAction(user?._id));
                                    router.push(`/admin/user/${user?._id}`);
                                  }}
                                >
                                  <motion.div
                                    variants={justHoverAnimation}
                                    initial="initial"
                                    whileHover="hover"
                                  >
                                    Edit
                                  </motion.div>
                                </Button>
                                <Button
                                  onClick={() => deleteHandler(user?._id)}
                                  size="small"
                                  variant="contained"
                                >
                                  <motion.div
                                    variants={justHoverAnimation}
                                    initial="initial"
                                    whileHover="hover"
                                    className="text-red-500"
                                  >
                                    Delete
                                  </motion.div>
                                </Button>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </TableContainer>
                  </motion.div>
                </ListItem>
              </List>
            </Card>
          </Grid>
        </Grid>
      </div>
    </Layout>
  );
}

export default AdminUsers;
