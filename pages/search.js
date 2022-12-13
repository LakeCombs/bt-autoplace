/* eslint-disable react/jsx-key */
import { Button, Grid, MenuItem, Select } from '@material-ui/core';
import CancelIcon from '@material-ui/icons/Cancel';
import { Pagination } from '@material-ui/lab';
import { useRouter } from 'next/router';
import { useSnackbar } from 'notistack';
import { useDispatch } from 'react-redux';
import Layout from '../components/Layout';
import ProductItem from '../components/ProductItem';
import Product from '../models/Product';
import { addToCartAction } from '../store/actions/cartAction';
import db from '../utils/db';
import useStyles from '../utils/styles';

const PAGE_SIZE = 5;

// const prices = [
//   {
//     name: '₦1 to ₦50',
//     value: '1-50',
//   },
//   {
//     name: '₦51 to ₦200',
//     value: '51-200',
//   },
//   {
//     name: '₦201 to ₦1000',
//     value: '201-1000',
//   },
// ];

// const ratings = [1, 2, 3, 4, 5];

export default function Search(props) {
  const style = useStyles();
  const router = useRouter();
  const dispatch = useDispatch();
  const { closeSnackbar } = useSnackbar();
  const {
    query = 'all',
    category = 'all',
    brand = 'all',
    price = 'all',
    rating = 'all',
    sort = 'featured',
  } = router.query;
  const { products, countProducts, categories, pages } = props;

  const filterSearch = ({
    page,
    category,
    brand,
    sort,
    min,
    max,
    searchQuery,
    price,
    rating,
  }) => {
    const path = router.pathname;
    const { query } = router;
    if (page) query.page = page;
    if (searchQuery) query.searchQuery = searchQuery;
    if (sort) query.sort = sort;
    if (category) query.category = category;
    if (brand) query.brand = brand;
    if (price) query.price = price;
    if (rating) query.rating = rating;
    if (min) query.min ? query.min : query.min === 0 ? 0 : min;
    if (max) query.max ? query.max : query.max === 0 ? 0 : max;

    router.push({
      pathname: path,
      query: query,
    });
  };
  const categoryHandler = (e) => {
    filterSearch({ category: e.target.value });
  };
  const pageHandler = (e, page) => {
    filterSearch({ page });
  };
  //   const brandHandler = (e) => {
  //     filterSearch({ brand: e.target.value });
  //   };
  const sortHandler = (e) => {
    filterSearch({ sort: e.target.value });
  };
  //   const priceHandler = (e) => {
  //     filterSearch({ price: e.target.value });
  //   };
  //   const ratingHandler = (e) => {
  //     filterSearch({ rating: e.target.value });
  //   };

  const addToCartHandler = async (product) => {
    closeSnackbar();
    dispatch(addToCartAction(product));
    router.push('/cart');
  };

  return (
    <Layout title="Search">
      <div className="px-5 pt-5">
        <div className="">
          <div className="flex flex-wrap justify-around w-full">
            <div>
              {/* <Typography>Categories</Typography> */}
              <Select fullWidth value={category} onChange={categoryHandler}>
                <MenuItem value="all">All</MenuItem>
                {categories &&
                  categories.map((category) => (
                    <MenuItem key={category} value={category}>
                      {category}
                    </MenuItem>
                  ))}
              </Select>
            </div>

            <div>
              <Select value={sort} label="Sort By" onChange={sortHandler}>
                <MenuItem value="featured">Featured</MenuItem>
                <MenuItem value="lowest">Price: Low to High</MenuItem>
                <MenuItem value="highest">Price: High to Low</MenuItem>
                <MenuItem value="toprated">Top Rated</MenuItem>
                <MenuItem value="newest">Newest Arrivals</MenuItem>
              </Select>
            </div>
          </div>

          <Grid container justifyContent="space-between" alignItems="center">
            <Grid item>
              {products.length === 0 ? 'No' : countProducts} Results
              {query !== 'all' && query !== '' && ' : ' + query}
              {category !== 'all' && ' : ' + category}
              {brand !== 'all' && ' : ' + brand}
              {price !== 'all' && ' : Price ' + price}
              {rating !== 'all' && ' : Rating ' + rating + ' & up'}
              {(query !== 'all' && query !== '') ||
              category !== 'all' ||
              brand !== 'all' ||
              rating !== 'all' ||
              price !== 'all' ? (
                <Button onClick={() => router.push('/search')}>
                  <CancelIcon />
                </Button>
              ) : null}
            </Grid>
          </Grid>
          <div className="flex flex-wrap justify-around md:justify-start ">
            {products?.map((product) => (
              <ProductItem product={product} addToCart={addToCartHandler} />
            ))}
          </div>
        </div>
        {products.length > 0 && (
          <Pagination
            className={style.mt1}
            defaultPage={parseInt(query.page || '1')}
            count={pages}
            onChange={pageHandler}
          />
        )}
      </div>
    </Layout>
  );
}

export async function getServerSideProps({ query }) {
  await db.connect();
  const pageSize = query.pageSize || PAGE_SIZE;
  const page = query.page || 1;
  const category = query.category || '';
  const brand = query.brand || '';
  const price = query.price || '';
  const rating = query.rating || '';
  const sort = query.sort || '';
  const searchQuery = query.query || '';

  const queryFilter =
    searchQuery && searchQuery !== 'all'
      ? {
          name: {
            $regex: searchQuery,
            $options: 'i',
          },
        }
      : {};
  const categoryFilter = category && category !== 'all' ? { category } : {};
  const brandFilter = brand && brand !== 'all' ? { brand } : {};
  const ratingFilter =
    rating && rating !== 'all'
      ? {
          rating: {
            $gte: Number(rating),
          },
        }
      : {};
  const priceFilter =
    price && price !== 'all'
      ? {
          price: {
            $gte: Number(price.split('-')[0]),
            $lte: Number(price.split('-')[1]),
          },
        }
      : {};

  const order =
    sort === 'featured'
      ? { featured: -1 }
      : sort === 'lowest'
      ? { price: 1 }
      : sort === 'highest'
      ? { price: -1 }
      : sort === 'toprated'
      ? { rating: -1 }
      : sort === 'newest'
      ? { createdAt: -1 }
      : { _id: -1 };

  const categories = await Product.find().distinct('category');
  const brands = await Product.find().distinct('brand');
  const productDocs = await Product.find(
    {
      ...queryFilter,
      ...categoryFilter,
      ...priceFilter,
      ...brandFilter,
      ...ratingFilter,
    },
    '-reviews'
  )
    .sort(order)
    .skip(pageSize * (page - 1))
    .limit(pageSize)
    .lean();

  const countProducts = await Product.countDocuments({
    ...queryFilter,
    ...categoryFilter,
    ...priceFilter,
    ...brandFilter,
    ...ratingFilter,
  });
  await db.disconnect();

  const products = JSON.parse(JSON.stringify(productDocs));

  return {
    props: {
      products,
      countProducts,
      page,
      pages: Math.ceil(countProducts / pageSize),
      categories,
      brands,
    },
  };
}
