import {
  AppBar,
  Badge,
  Box,
  Button,
  Container,
  createTheme,
  CssBaseline,
  Link,
  ThemeProvider,
  Toolbar,
  Typography,
  Menu,
  MenuItem,
} from "@material-ui/core";
import Head from "next/head";
import NextLink from "next/link";
import { useRouter } from "next/router";
import Cookie from 'js-cookie';
import React, { useContext, useState } from "react";
import { Store } from "../utils/store";
import useStyles from "../utils/styles";

export default function Layout({ title, description, children }) {
  const theme = createTheme({
    typography: {
      h1: {
        fontSize: "1.6rem",
        fontWeight: 400,
        margin: "1rem 0",
      },
      h2: {
        fontSize: "1.4rem",
        fontWeight: 400,
        margin: "1rem 0",
      },
      body1: {
        fontWeight: "normal",
      },
    },
    palette: {
      type: "light",
      background: {
        default: "#fff",
      },
      primary: {
        main: "#093562",
      },
      secondary: {
        main: "#4682B4",
      },
      error: {
        main: "#F8585B",
      },
    },
  });
  const style = useStyles();
  const router = useRouter();
  const {
    dispatch,
    state: { cart, userInfo },
  } = useContext(Store);
  const [anchorEl, setAnchorEl] = useState(null)

  const loginClickHandler = (e) => {
    setAnchorEl(e.currentTarget);
  }

  const loginMenuCloseHandler = (e, redirect) => {
    setAnchorEl(null);
    if (redirect) {
      router.push(redirect);
    }
  }

  const logoutClickHandler = () => {
    setAnchorEl(null);
    router.push("/");
    dispatch({ type: 'USER_LOGOUT'});
    Cookie.remove('userInfo');
    Cookie.remove('cartItems');
    
  }

  return (
    <div>
      <Head>
        <title>{title ? `${title} - BTAutoPlace` : "BTAutoPlace"}</title>
        {description && <meta name="description" content={description} />}
      </Head>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <AppBar position="fixed" elevation={0} className={style.navbar}>
          <Toolbar>
            <NextLink href={"/"} passHref>
              <Link>
                <Typography className={style.brand}>Bt-Autoplace</Typography>
              </Link>
            </NextLink>
            <div className={style.middle} />
            <Box sx={{ display: "flex", alignItems: "center", gap: "1rem" }}>
              <NextLink href={"/cart"} passHref>
                <Link className={style.link}>
                  {cart.items.length > 0 ? (
                    <Badge
                      overlap="rectangular"
                      color="secondary"
                      badgeContent={cart.items.reduce(
                        (prev, curr) => prev + curr.quantity,
                        0
                      )}
                    >
                      <svg
                        className="white-icon"
                        xmlns="http://www.w3.org/2000/svg"
                        height="24"
                        viewBox="0 0 24 24"
                        width="24"
                      >
                        <path d="M0 0h24v24H0z" fill="none" />
                        <path d="M7 18c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2-.9-2-2-2zM1 2v2h2l3.6 7.59-1.35 2.45c-.16.28-.25.61-.25.96 0 1.1.9 2 2 2h12v-2H7.42c-.14 0-.25-.11-.25-.25l.03-.12.9-1.63h7.45c.75 0 1.41-.41 1.75-1.03l3.58-6.49c.08-.14.12-.31.12-.48 0-.55-.45-1-1-1H5.21l-.94-2H1zm16 16c-1.1 0-1.99.9-1.99 2s.89 2 1.99 2 2-.9 2-2-.9-2-2-2z" />
                      </svg>
                    </Badge>
                  ) : (
                    <svg
                      className="white-icon"
                      xmlns="http://www.w3.org/2000/svg"
                      height="24"
                      viewBox="0 0 24 24"
                      width="24"
                    >
                      <path d="M0 0h24v24H0z" fill="none" />
                      <path d="M7 18c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2-.9-2-2-2zM1 2v2h2l3.6 7.59-1.35 2.45c-.16.28-.25.61-.25.96 0 1.1.9 2 2 2h12v-2H7.42c-.14 0-.25-.11-.25-.25l.03-.12.9-1.63h7.45c.75 0 1.41-.41 1.75-1.03l3.58-6.49c.08-.14.12-.31.12-.48 0-.55-.45-1-1-1H5.21l-.94-2H1zm16 16c-1.1 0-1.99.9-1.99 2s.89 2 1.99 2 2-.9 2-2-.9-2-2-2z" />
                    </svg>
                  )}
                  Cart
                </Link>
              </NextLink>
              {userInfo ? (
                <>
                  <Button aria-controls="simple-menu" aria-haspopup="true" onClick={loginClickHandler} className={style.navBtn}>
                    <svg
                      className="white-icon"
                      xmlns="http://www.w3.org/2000/svg"
                      height="24"
                      viewBox="0 0 24 24"
                      width="24"
                    >
                      <path d="M0 0h24v24H0z" fill="none" />
                      <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                    </svg>{" "}
                    {userInfo.name}
                  </Button>
                  <Menu
                    anchorEl={anchorEl}
                    anchorOrigin={{
                      vertical: "top",
                      horizontal: "right",
                    }}
                    id="simple-menu"
                    keepMounted
                    transformOrigin={{
                      vertical: "top",
                      horizontal: "right",
                    }}
                    open={!!anchorEl}
                    onClose={loginMenuCloseHandler}
                  >
                    <MenuItem  onClick={(e) => loginMenuCloseHandler(e, '/profile')}>Profile</MenuItem>
                    {!userInfo.isAdmin &&<MenuItem onClick={(e) =>
                        loginMenuCloseHandler(e, '/order-history')
                      }>Order history</MenuItem>}
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
                <NextLink href={"/login"} passHref>
                  <Link className={style.link}>
                  <svg
                      className="white-icon"
                      xmlns="http://www.w3.org/2000/svg"
                      height="24"
                      viewBox="0 0 24 24"
                      width="24"
                    >
                      <path d="M0 0h24v24H0z" fill="none" />
                      <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                    </svg>{" "}
                    Login
                    </Link>
                </NextLink>
              )}
            </Box>
          </Toolbar>
        </AppBar>
        <Container className={style.main}>{children}</Container>
        <footer className={style.footer}>
          <Typography>All rights reserved &copy; Bt-Autoplace</Typography>
        </footer>
      </ThemeProvider>
    </div>
  );
}
