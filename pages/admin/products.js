/* eslint-disable no-undef */
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import { useSnackbar } from 'notistack';
import {
  CircularProgress,
  Grid,
  List,
  ListItem,
  Typography,
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
import { useSelector, useDispatch } from 'react-redux';
import {
  deleteProductAction,
  getAllProduct,
} from '../../store/actions/productAction';
import Image from 'next/image';
import AdminPanelOptions from '../../components/adminPanelOptions';
import {
  justHoverAnimation,
  slideInLeftAnimation,
  tableContentAnimation,
} from '../../utils/animation';
import { formatter } from '../../utils/currency-converter';
const { motion } = require('framer-motion');

function Products() {
  const { userInfo } = useSelector((state) => state.userLogin);
  const { error: createProductError, product: createdProduct } = useSelector(
    (state) => state.createProduct
  );

  const { product: updatedProduct, error: updateProductError } = useSelector(
    (state) => state.updateProduct
  );
  const {
    loading: loadingDelete,
    product: deletedProduct,
    error: deleteError,
  } = useSelector((state) => state.deleteProduct);
  const {
    loading: allProductLoading,
    error: allProductError,
    products,
  } = useSelector((state) => state.allProduct);

  const router = useRouter();
  const dispatch = useDispatch();
  const style = useStyles();
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    if (!userInfo) {
      router.push('/login');
    }

    dispatch(getAllProduct());
  }, [dispatch, router, userInfo]);

  const deleteHandler = async (productId) => {
    if (!window.confirm('Are you sure?')) {
      return;
    }
    dispatch(deleteProductAction(productId));
  };

  useEffect(() => {
    if (deletedProduct?.message) {
      enqueueSnackbar('Product deleted successfully', { variant: 'success' });
    }

    if (updatedProduct) {
      enqueueSnackbar('Product updated successfully ', { variant: 'success' });
    }

    if (updateProductError) {
      enqueueSnackbar(updateProductError, { variant: 'error' });
    }

    if (deleteError) {
      enqueueSnackbar(deleteError, { variant: 'error' });
    }

    if (createdProduct?.message) {
      enqueueSnackbar('Product created successfully', { variant: 'success' });
    }

    if (createProductError) {
      enqueueSnackbar(createProductError, { variant: 'error' });
    }
  }, [
    enqueueSnackbar,
    deletedProduct,
    deleteError,
    createdProduct,
    createProductError,
    updatedProduct,
    updateProductError,
  ]);

  return (
    <Layout title="Products">
      <div className="px-2">
        <Grid container spacing={1}>
          <Grid item md={3} xs={12}>
            <Card className={style.section}>
              <AdminPanelOptions />
            </Card>
          </Grid>
          <Grid item md={9} xs={12}>
            <Card className={style.section}>
              <List>
                <ListItem>
                  <Grid container alignItems="center">
                    <Grid item xs={6}>
                      <motion.h1
                        variants={slideInLeftAnimation}
                        initial="initial"
                        animate="animate"
                        className=""
                      >
                        Products
                        <span className="ml-2">
                          {allProductLoading ? (
                            <CircularProgress size={'20px'} />
                          ) : (
                            <></>
                          )}
                        </span>
                      </motion.h1>
                      {loadingDelete && <CircularProgress />}
                    </Grid>
                    <Grid align="right" item xs={6}>
                      <Button
                        onClick={() => router.push('/admin/createproduct')}
                        color="primary"
                        variant="contained"
                      >
                        <motion.div
                          variants={justHoverAnimation}
                          initial="initial"
                          whileHover="hover"
                          className="p"
                        >
                          Create
                        </motion.div>
                      </Button>
                    </Grid>
                  </Grid>
                </ListItem>

                <ListItem>
                  {allProductError ? (
                    <Typography className={style.error}>
                      {allProductError}
                    </Typography>
                  ) : (
                    <></>
                  )}
                  {products ? (
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
                              <TableCell>
                                <p className="p">ID</p>
                              </TableCell>
                              <TableCell>
                                <p className="p">IMAGE</p>
                              </TableCell>
                              <TableCell>
                                <p className="p">NAME</p>
                              </TableCell>
                              <TableCell>
                                <p className="p">PRICE</p>
                              </TableCell>
                              <TableCell>
                                <p className="p">CATEGORY</p>
                              </TableCell>
                              <TableCell>
                                <p className="p">COUNT </p>
                              </TableCell>
                              <TableCell>
                                <p className="p">RATING</p>
                              </TableCell>
                              <TableCell>
                                <p className="p">ACTIONS</p>
                              </TableCell>
                            </TableRow>
                          </TableHead>
                          <TableBody>
                            {products?.map((product) => (
                              <TableRow key={product._id}>
                                <TableCell>
                                  <p className="p">
                                    {product._id.substring(20, 24)}
                                  </p>
                                </TableCell>
                                <TableCell>
                                  <NextLink
                                    href={`/admin/product/${product?._id}`}
                                    passHref
                                  >
                                    <Image
                                      src={product?.image}
                                      width={'40px'}
                                      height={'40px'}
                                      alt={product?.name}
                                    />
                                  </NextLink>
                                </TableCell>
                                <TableCell>
                                  <p className="p">{product?.name}</p>
                                </TableCell>
                                <TableCell>
                                  <p className="p">
                                    {formatter.format(product?.price)}
                                  </p>
                                </TableCell>
                                <TableCell>
                                  <p className="p">{product?.category}</p>
                                </TableCell>
                                <TableCell>
                                  <p className="p">{product?.countInStock}</p>
                                </TableCell>
                                <TableCell>
                                  <p className="p">{product?.rating}</p>
                                </TableCell>
                                <TableCell>
                                  <motion.button
                                    variants={justHoverAnimation}
                                    initial="initial"
                                    whileHover="hover"
                                    onClick={() => {
                                      router.push(
                                        `/admin/product/${product?._id}`
                                      );
                                    }}
                                    className="bg-gray-200 w-[60px] p h-[25px] rounded-lg mb-1 mr-1"
                                  >
                                    Edit
                                  </motion.button>
                                  <motion.button
                                    onClick={() => deleteHandler(product?._id)}
                                    variants={justHoverAnimation}
                                    initial="initial"
                                    whileHover="hover"
                                    className="text-red-500	bg-gray-200 w-[60px] h-[25px] rounded-lg p"
                                  >
                                    Delete
                                  </motion.button>
                                </TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      </TableContainer>
                    </motion.div>
                  ) : (
                    <></>
                  )}
                </ListItem>
              </List>
            </Card>
          </Grid>
        </Grid>
      </div>
    </Layout>
  );
}

export default Products;
