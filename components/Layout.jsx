/* eslint-disable @next/next/no-page-custom-font */
import { createTheme } from '@material-ui/core';
import Head from 'next/head';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import useStyles from '../utils/styles';
import Header from './header';
import Footer from './footer';
import { logoutUser } from '../store/actions/userAction';
import { useDispatch, useSelector } from 'react-redux';
const { motion, AnimatePresence } = require('framer-motion');

const variants = {
  hidden: { opacity: 0, x: -200, y: 0 },
  enter: { opacity: 1, x: 0, y: 0 },
  exit: { opacity: 0, x: 0, y: -100 },
};

export default function Layout({ title, description, children }) {
  const theme = createTheme({
    typography: {
      h1: {
        fontSize: '1.6rem',
        fontWeight: 400,
        margin: '1rem 0',
      },
      h2: {
        fontSize: '1.4rem',
        fontWeight: 400,
        margin: '1rem 0',
      },
      body1: {
        fontWeight: 'normal',
      },
    },
    palette: {
      type: 'light',
      background: {
        default: '#fff',
      },
      primary: {
        main: '#093562',
      },
      secondary: {
        main: '#4682B4',
      },
      error: {
        main: '#F8585B',
      },
    },
  });
  const router = useRouter();
  const dispatch = useDispatch();

  const [anchorEl, setAnchorEl] = useState(null);
  const [query, setQuery] = useState('');

  //   const loginClickHandler = (e) => {
  //     setAnchorEl(e.currentTarget);
  //   };

  //   const loginMenuCloseHandler = (e, redirect) => {
  //     setAnchorEl(null);
  //     if (redirect) {
  //       router.push(redirect);
  //     }
  //   };

  //   const logoutClickHandler = () => {
  //     setAnchorEl(null);
  //     router.push('/');
  //     dispatch(logoutUser());
  //   };

  //   const queryChangeHandler = (e) => {
  //     setQuery(e.target.value);
  //   };
  //   const submitHandler = (e) => {
  //     e.preventDefault();
  //     router.push(`/search?query=${query}`);
  //   };
  return (
    <div className="bg-[#F5F5F5]">
      <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="true"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@100;200;300;400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
        <title>{title ? `${title} - BTAutoPlace` : 'BTAutoPlace'}</title>
        {description && <meta name="description" content={description} />}
      </Head>
      <Header />
      <motion.div
        variant={variants}
        initial="hidden"
        animate="enter"
        exit="exit"
        transition={{ type: 'linear' }}
        className="w-full min-h-full pt-[80px]"
      >
        {children}
      </motion.div>
      <footer>
        <Footer />
      </footer>
    </div>
  );
}
