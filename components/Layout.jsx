/* eslint-disable @next/next/no-page-custom-font */
// import { createTheme } from '@material-ui/core';
import Head from 'next/head';
import React from 'react';
import Header from './header';
import Footer from './footer';
const { motion } = require('framer-motion');

const variants = {
  hidden: { opacity: 0, x: -200, y: 0 },
  enter: { opacity: 1, x: 0, y: 0 },
  exit: { opacity: 0, x: 0, y: -100 },
};

export default function Layout({ title, description, children }) {
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
