import {
  CircularProgress,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@material-ui/core';
import React, { useRef, useEffect, useState } from 'react';
import Textarea from '@mui/joy/Textarea';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { createProductAction } from '../../store/actions/productAction';
import { useSnackbar } from 'notistack';
import { useRouter } from 'next/router';
import Layout from '../../components/Layout';
import { Categories } from '../../utils/data';
import {
  justHoverAnimation,
  parent1,
  slideInLeftAnimation,
} from '../../utils/animation';
const { motion } = require('framer-motion');

const CreateProduct = () => {
  const dispatch = useDispatch();
  const [name, setName] = useState('');
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [rating, setRating] = useState('');
  const [countInStock, setCountInStock] = useState('');
  const [brand, setBrand] = useState('');
  const [file, setFile] = useState();
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const [loaded, setLoaded] = useState(false);
  const inputRef = useRef(null);
  const router = useRouter();
  const [uploadError, setUploadError] = useState('');

  const { product, loading, error } = useSelector(
    (state) => state.createProduct
  );

  const { userInfo } = useSelector((state) => state.userLogin);

  const createNewProduct = async () => {
    closeSnackbar();
    setUploadError('');

    if (
      !file ||
      !category ||
      !price ||
      !rating ||
      !name ||
      !brand ||
      !countInStock ||
      !description
    ) {
      return enqueueSnackbar('All field are required', { variant: 'error' });
    }

    let formData = new FormData();
    formData.append('file', file);
    setLoaded(true);

    await axios
      .post('/api/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          authorization: `Bearer ${userInfo.token}`,
        },
      })
      .then((res) => {
        dispatch(
          createProductAction({
            name,
            category,
            brand,
            countInStock,
            description,
            image: res?.data?.secure_url,
            price,
            slug: name,
            rating,
          })
        );
      })
      .catch((error) => {
        setUploadError(error?.message);
      });

    setLoaded(false);
  };

  useEffect(() => {
    if (product?._id) {
      enqueueSnackbar('Product created successfully', { variant: 'success' });
      router.push(`/admin/product/${product?._id}`);
    }

    if (error) {
      enqueueSnackbar(error, { variant: 'error' });
    }
  }, [enqueueSnackbar, error, product, router]);

  return (
    <Layout title="Create Product">
      <div className="flex flex-col w-full px-5 mt-10 md:px-10">
        <motion.h1
          variants={slideInLeftAnimation}
          initial="initial"
          animate="animate"
          className="mt-5 mb-5 text-xl"
        >
          Create Product
        </motion.h1>
        <hr className="w-full mb-5" />
        <div className="flex justify-center w-full">
          {uploadError ? (
            <h1 className="text-red-500 ">{uploadError}</h1>
          ) : (
            <></>
          )}
        </div>
        <h1>
          Add Details
          {loading || loaded ? (
            <CircularProgress size={'20px'} color={'blue'} />
          ) : (
            ''
          )}
        </h1>
        <motion.div variants={parent1} initial="initial" animate="animate">
          <div className="flex flex-col items-center md:flex-row">
            <span className="w-full mt-5 mb-5 mr-0 md:mr-2">
              <TextField
                variant="outlined"
                fullWidth
                id="product name"
                label="Product name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                inputProps={{ type: 'text' }}
              ></TextField>
            </span>
            <span className="w-full mt-5 mb-5 ml-0 md:ml-2">
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-helper-label">
                  Category
                </InputLabel>
                <Select
                  value={category}
                  variant="outlined"
                  fullWidth
                  id="Category"
                  onChange={(event) => {
                    setCategory(event.target.value);
                  }}
                >
                  {Categories?.map((cat) => {
                    return (
                      <MenuItem value={cat} id={cat} key={cat}>
                        {cat}
                      </MenuItem>
                    );
                  })}
                </Select>
              </FormControl>
            </span>
          </div>
          <div className="flex flex-col items-center md:flex-row">
            <span className="w-full mt-5 mb-5 mr-0 md:mr-2">
              <TextField
                variant="outlined"
                fullWidth
                id="price"
                label="Price"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                inputProps={{ type: 'Number' }}
              ></TextField>
            </span>
            <span className="w-full mt-5 mb-5 ml-0 md:ml-2">
              <TextField
                variant="outlined"
                fullWidth
                id="brand"
                label="Brand"
                value={brand}
                onChange={(e) => setBrand(e.target.value)}
                inputProps={{ type: 'text' }}
              ></TextField>
            </span>
          </div>

          <div className="flex flex-col items-center md:flex-row">
            <span className="w-full mt-5 mb-5 mr-0 md:mr-2">
              <TextField
                variant="outlined"
                fullWidth
                id="count in stock"
                label="Count in stock"
                value={countInStock}
                onChange={(e) => setCountInStock(e.target.value)}
                inputProps={{ type: 'Number' }}
              ></TextField>
            </span>
            <span className="w-full mt-5 mb-5 ml-0 md:ml-2">
              <TextField
                variant="outlined"
                fullWidth
                id="rating"
                label="Rating"
                value={rating}
                onChange={(e) => setRating(e.target.value)}
                inputProps={{ type: 'Number' }}
              ></TextField>
            </span>
          </div>

          <div className="w-full mt-5 mb-5 ml-0 md:ml-2">
            <label>Description</label>
            <Textarea
              value={description}
              variant="outlined"
              label="Description"
              minRows={3}
              maxRows={5}
              fullWidth
              vale={description}
              onChange={(e) => setDescription(e.target.value)}
            >
              {' '}
            </Textarea>
          </div>

          <label className="mt-10">Upload product image</label>
          <div className="flex items-center justify-center w-full py-5 mb-5 ml-0 border rounded md:ml-2">
            <input
              type="file"
              placeholder="Upload product image"
              ref={inputRef}
              accept="image/*"
              onChange={(e) => {
                setFile(e.target.files[0]);
              }}
            />
          </div>
        </motion.div>

        <motion.button
          variants={justHoverAnimation}
          initial="initial"
          whileHover="hover"
          className="flex flex-row items-center w-40 px-10 py-2 font-bold text-white rounded-lg primary-blue-bg hover:shadow-xl"
          onClick={createNewProduct}
        >
          Post
          {loading || loaded ? (
            <CircularProgress size={'20px'} color={'white'} />
          ) : (
            ''
          )}
        </motion.button>
        <div className="flex justify-center w-full">
          {uploadError ? (
            <h1 className="text-red-500 ">{uploadError}</h1>
          ) : (
            <></>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default CreateProduct;
