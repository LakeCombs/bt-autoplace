/* eslint-disable react/no-unknown-property */
/* eslint-disable @next/next/no-img-element */
import React, { useState } from 'react';
import {
  Badge,
  IconButton,
  InputBase,
  MenuItem,
  Menu,
  Drawer,
} from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import MenuOutlinedIcon from '@mui/icons-material/MenuOutlined';
import Image from 'next/image';
import Link from 'next/link';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import { logoutUser } from '../store/actions/userAction';
import { useDispatch, useSelector } from 'react-redux';
import logo from '../public/0005-41799978480 1logo.png';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import AddShoppingCartOutlinedIcon from '@mui/icons-material/AddShoppingCartOutlined';
import PowerSettingsNewOutlinedIcon from '@mui/icons-material/PowerSettingsNewOutlined';
import AdminPanelSettingsOutlinedIcon from '@mui/icons-material/AdminPanelSettingsOutlined';
import {
  justHoverAnimation,
  pulseAnimation,
  slideInLeftAnimation,
  zoomOutAnimation,
} from '../utils/animation';
const { motion } = require('framer-motion');

const Header = () => {
  const router = useRouter();
  const { userInfo } = useSelector((state) => state?.userLogin);
  const { items } = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const [anchorEl, setAnchorEl] = useState(null);
  const [query, setQuery] = useState('');
  const [state, setState] = useState(false);

  const loginClickHandler = (e) => {
    setAnchorEl(e.currentTarget);
  };

  const loginMenuCloseHandler = (e, redirect) => {
    setAnchorEl(null);
    if (redirect) {
      router.push(redirect);
    }
  };

  const logoutClickHandler = () => {
    setAnchorEl(null);
    dispatch(logoutUser());
    router.push('/');
  };

  const queryChangeHandler = (e) => {
    setQuery(e.target.value);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    router.push(`/search?query=${query}`);
  };

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === 'keydown' &&
      (event.key === 'Tab' || event.key === 'Shift')
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  return (
    <motion.div
      initial={{ opacity: 0.4, y: -10 }}
      // whileInView={{ opacity: 1, y: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="fixed top-0 z-10 flex flex-row items-center justify-between w-full  py-2 bg-white "
    >
      <motion.div
        variants={pulseAnimation}
        initial="inital"
        animate="animate"
        className="flex flex-row items-end w-auto"
      >
        <NextLink href="/" passHref>
          <Link>
            <Image
              height={'60px'}
              width={'80px'}
              alt="BT-autoplace"
              src={logo}
            />
          </Link>
        </NextLink>
      </motion.div>
      <div className="flex flex-row justify-end md:pr-6 pr-3 md:w-4/5 lg-3/5 ">
        <div className="flex flex-row items-center justify-end w-full lg:justify-between ">
          <motion.form
            variants={justHoverAnimation}
            initial="initial"
            whileHover="hover"
            onSubmit={submitHandler}
            className="items-center justify-center hidden h-10 px-2 border rounded-lg lg:flex"
          >
            <InputBase
              name="query"
              className=""
              placeholder="Search products"
              onChange={queryChangeHandler}
            />
            <IconButton type="submit" className="" aria-label="search">
              <SearchIcon />
            </IconButton>
          </motion.form>

          <div className="flex-row items-center justify-between hidden w-2/5 align-middle md:flex md:justify-around">
            <NextLink href={'/'} passHref>
              <motion.h1
                variants={justHoverAnimation}
                initial="initial"
                whileHover="hover"
                className="links"
              >
                Home
              </motion.h1>
            </NextLink>

            <NextLink href={'/cart'} passHref>
              <motion.h1
                variants={justHoverAnimation}
                initial="initial"
                whileHover="hover"
                className="flex flex-row items-center links"
              >
                {items.length > 0 ? (
                  <Badge
                    overlap="rectangular"
                    color="secondary"
                    badgeContent={items.reduce(
                      (prev, curr) => prev + curr?.count,
                      0
                    )}
                  >
                    <ShoppingCartOutlinedIcon />
                  </Badge>
                ) : (
                  <ShoppingCartOutlinedIcon />
                )}
                Cart
              </motion.h1>
            </NextLink>

            {/* <NextLink href={"/"} passHref>
							<h1 className="flex flex-row links">
								<HelpOutlineOutlinedIcon />
								<h1>Help</h1>
							</h1>
						</NextLink> */}

            <motion.div
              variants={justHoverAnimation}
              initial="initial"
              whileHover="hover"
            >
              {userInfo?._id ? (
                <>
                  <div
                    aria-controls="simple-menu"
                    aria-haspopup="true"
                    onClick={loginClickHandler}
                    className="flex flex-row items-center justify-center w-auto h-auto px-1 py-1 text-white rounded-md"
                  >
                    <span>
                      <img
                        style={{
                          width: '30px',
                          height: '30px',
                          borderRadius: '100%',
                        }}
                        src={userInfo?.photo}
                        alt={`${userInfo?.first_name?.charAt(
                          0
                        )}${userInfo?.last_name?.charAt(0)}`}
                      />
                    </span>

                    <span className="hidden ml-1 font-semibold lg:flex primary-blue-text">
                      {userInfo?.first_name}
                    </span>
                  </div>
                  <Menu
                    anchorEl={anchorEl}
                    anchorOrigin={{
                      vertical: 'top',
                      horizontal: 'right',
                    }}
                    id="simple-menu"
                    keepMounted
                    transformOrigin={{
                      vertical: 'top',
                      horizontal: 'right',
                    }}
                    open={!!anchorEl}
                    onClose={loginMenuCloseHandler}
                  >
                    <MenuItem
                      onClick={(e) => loginMenuCloseHandler(e, '/profile')}
                    >
                      Profile
                    </MenuItem>
                    {!userInfo.isAdmin && (
                      <MenuItem
                        onClick={(e) =>
                          loginMenuCloseHandler(e, '/order-history')
                        }
                      >
                        Order history
                      </MenuItem>
                    )}
                    {userInfo.isAdmin && (
                      <MenuItem
                        onClick={(e) =>
                          loginMenuCloseHandler(e, '/admin/dashboard')
                        }
                      >
                        Admin Dashboard
                      </MenuItem>
                    )}
                    <MenuItem onClick={logoutClickHandler}>Logout</MenuItem>
                  </Menu>
                </>
              ) : (
                <button
                  className="py-4 text-white rounded-lg px-7 primary-blue-bg"
                  onClick={() => {
                    router.push('/login');
                  }}
                >
                  Login/Signup
                </button>
              )}
            </motion.div>
          </div>
          <motion.div
            variants={justHoverAnimation}
            initial="initial"
            whileHover="hover"
            className="flex ml-6 links md:hidden"
            onClick={toggleDrawer('left', true)}
          >
            <MenuOutlinedIcon />
          </motion.div>

          <Drawer
            anchor={'left'}
            open={state['left']}
            onClose={toggleDrawer('left', false)}
          >
            <div className="flex flex-col justify-between w-64 h-screen p-2">
              <div>
                <motion.div
                  variants={slideInLeftAnimation}
                  initial="initial"
                  animate="animate"
                  className="flex flex-row items-end w-auto"
                >
                  <NextLink href="/" passHref>
                    <Link>
                      <Image
                        height={'70px'}
                        width={'100px'}
                        alt="BT-autoplace"
                        src={logo}
                      />
                    </Link>
                  </NextLink>
                </motion.div>

                <motion.form
                  variants={zoomOutAnimation}
                  initial="initial"
                  whileHover="hover"
                  onSubmit={submitHandler}
                  className="items-center justify-center h-10 px-2 border rounded-lg"
                >
                  <InputBase
                    name="query"
                    className=""
                    placeholder="Search products"
                    onChange={queryChangeHandler}
                  />
                  {/* <IconButton type="submit" className="" aria-label="search">
										<SearchIcon />
									</IconButton> */}
                </motion.form>

                <br />
                {userInfo?._id ? (
                  <NextLink href={'/profile'} passHref>
                    <Link>
                      <motion.h1
                        variants={zoomOutAnimation}
                        initial="initial"
                        whileHover="hover"
                        className="pt-2 pb-2 pl-1 mt-5 font-normal hover:bg-blue-500 hover:text-white bg-gray-50"
                      >
                        <span className="mr-2">
                          <AccountCircleOutlinedIcon
                            size={'30px'}
                            color={'blue'}
                          />
                        </span>{' '}
                        Profile
                      </motion.h1>
                    </Link>
                  </NextLink>
                ) : (
                  <></>
                )}

                <NextLink href={'/cart'} passHref>
                  <Link>
                    <motion.p
                      variants={zoomOutAnimation}
                      initial="initial"
                      whileHover="hover"
                      className="pt-2 pb-2 pl-1  bg-gray-100 hover:bg-blue-500 hover:text-white"
                    >
                      <span className="mr-2">
                        <ShoppingCartOutlinedIcon
                          size={'30px'}
                          color={'blue'}
                        />
                      </span>{' '}
                      Cart
                    </motion.p>
                  </Link>
                </NextLink>

                <NextLink href={'/wishlist'} passHref>
                  <Link>
                    <motion.h1
                      variants={zoomOutAnimation}
                      initial="initial"
                      whileHover="hover"
                      className="pt-2 pb-2 pl-1  hover:primary-text-blue bg-gray-50 hover:bg-blue-500 hover:text-white "
                    >
                      <span className="mr-2">
                        <AddShoppingCartOutlinedIcon
                          size={'30px'}
                          color={'blue'}
                        />
                      </span>{' '}
                      WishList
                    </motion.h1>
                  </Link>
                </NextLink>

                <NextLink href={'/myorder'} passHref>
                  <Link>
                    <motion.h1
                      variants={zoomOutAnimation}
                      initial="initial"
                      whileHover="hover"
                      className="pt-2 pb-2 pl-1  hover:primary-text-blue bg-gray-100 hover:bg-blue-500 hover:text-white "
                    >
                      <span className="mr-2">
                        <ShoppingCartOutlinedIcon
                          size={'30px'}
                          color={'blue'}
                        />
                      </span>{' '}
                      My Orders
                    </motion.h1>
                  </Link>
                </NextLink>

                {userInfo?.isAdmin ? (
                  <NextLink href={'/admin/dashboard'} passHref>
                    <Link>
                      <motion.h1
                        variants={zoomOutAnimation}
                        initial="initial"
                        whileHover="hover"
                        className="pt-2 pb-2 pl-1 font-normal hover:bg-blue-500 hover:text-white bg-gray-50"
                      >
                        <span className="mr-2">
                          <AdminPanelSettingsOutlinedIcon
                            size={'30px'}
                            color={'blue'}
                          />
                        </span>{' '}
                        Admin Dashboard
                      </motion.h1>
                    </Link>
                  </NextLink>
                ) : (
                  <></>
                )}
              </div>
              <div>
                {userInfo?._id ? (
                  <motion.h1
                    variants={zoomOutAnimation}
                    initial="initial"
                    whileHover="hover"
                    className="pt-2 pb-2 pl-1 font-bold bg-gray-100 hover:bg-blue-500 hover:text-white"
                    onClick={() => {
                      dispatch(logoutUser());
                    }}
                  >
                    <span className="mr-2">
                      <PowerSettingsNewOutlinedIcon
                        size={'30px'}
                        color={'blue'}
                      />
                    </span>{' '}
                    Logout
                  </motion.h1>
                ) : (
                  <motion.h1
                    variants={zoomOutAnimation}
                    initial="initial"
                    whileHover="hover"
                    className="pt-2 pb-2 pl-1 font-bold bg-gray-100 hover:bg-blue-500 hover:text-white"
                    onClick={() => {
                      router.push('/login');
                    }}
                  >
                    <span className="mr-2">
                      <PowerSettingsNewOutlinedIcon
                        size={'30px'}
                        color={'blue'}
                      />
                    </span>{' '}
                    Login/Signup
                  </motion.h1>
                )}
              </div>
            </div>
          </Drawer>
        </div>
      </div>
    </motion.div>
  );
};

export default Header;
