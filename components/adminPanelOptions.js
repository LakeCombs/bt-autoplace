import { List, ListItem } from '@material-ui/core';
import React from 'react';
import NextLink from 'next/link';
import { slideInLeftAnimation, zoomOutAnimation } from '../utils/animation';

const { motion } = require('framer-motion');

const AdminPanelOptions = () => {
  return (
    <>
      <motion.div
        variants={slideInLeftAnimation}
        initial="initial"
        animate="animate"
        className="p"
      >
        <List>
          <motion.div
            variants={zoomOutAnimation}
            initial="initial"
            whileHover="hover"
          >
            <NextLink href="/admin/dashboard" passHref>
              <ListItem selected button component="a">
                <p>Admin Dashboard</p>
              </ListItem>
            </NextLink>
          </motion.div>

          <motion.div
            variants={zoomOutAnimation}
            initial="initial"
            whileHover="hover"
          >
            <NextLink href="/admin/orders" passHref>
              <ListItem button component="a">
                <p>Orders</p>
              </ListItem>
            </NextLink>
          </motion.div>
          <motion.div
            variants={zoomOutAnimation}
            initial="initial"
            whileHover="hover"
          >
            <NextLink href="/admin/products" passHref>
              <ListItem button component="a">
                <p>Products</p>
              </ListItem>
            </NextLink>
          </motion.div>
          <motion.div
            variants={zoomOutAnimation}
            initial="initial"
            whileHover="hover"
          >
            <NextLink href="/admin/users" passHref>
              <ListItem button component="a">
                <p>Users </p>
              </ListItem>
            </NextLink>
          </motion.div>
        </List>
      </motion.div>
    </>
  );
};

export default AdminPanelOptions;
