/* eslint-disable no-undef */
/* eslint-disable @next/next/no-img-element */
import axios from 'axios';
import { useRouter } from 'next/router';
import React, { useEffect, useState, useRef } from 'react';
import { CircularProgress } from '@material-ui/core';
import Layout from '../components/Layout';
import { useForm } from 'react-hook-form';
import { useSnackbar } from 'notistack';
import NextLink from 'next/link';
import { getError } from '../utils/util';
import CameraAltOutlinedIcon from '@mui/icons-material/CameraAltOutlined';
import ProfileInfo from '../components/profileInfo';
import SecurityTab from '../components/securityTab';
import { useDispatch, useSelector } from 'react-redux';
import { getMyOrdersAction } from '../store/actions/orderAction';
import { updateUserAction } from '../store/actions/userAction';
import {
  slideInLeftAnimation,
  tableContentAnimation,
  zoomOutAnimation,
} from '../utils/animation';
const { motion } = require('framer-motion');

function Profile() {
  const { userInfo } = useSelector((state) => state.userLogin);
  const {
    userInfo: updateUserInfo,
    loading: uploadUser,
    error: updateUserError,
  } = useSelector((state) => state.updateUser);

  const { setValue } = useForm();

  const [tab, setTab] = useState(0);

  const { enqueueSnackbar } = useSnackbar();
  const router = useRouter();
  const dispatch = useDispatch();
  const inputRef = useRef(null);
  const [uploadPhoto, setUploadPhoto] = useState(false);

  const handleClick = () => {
    inputRef.current.click();
  };

  const handleFileChange = async (e) => {
    const file = e.target.files && e.target.files[0];
    if (!file) {
      return;
    }

    let formData = new FormData();
    formData.append('file', file);
    setUploadPhoto(true);

    await axios
      .post('/api/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          authorization: `Bearer ${userInfo.token}`,
        },
      })
      .then((res) => {
        dispatch(
          updateUserAction({
            photo: res?.data?.secure_url,
          })
        );
      })
      .catch((error) => {
        enqueueSnackbar(getError(error), { variant: 'error' });
        setUploadPhoto(false);
      });

    setUploadPhoto(false);
  };

  useEffect(() => {
    if (!userInfo) {
      return router.push('/login');
    }
    setValue('name', userInfo?.name);
    setValue('email', userInfo?.email);
    setValue('state', userInfo?.state);
    setValue('address', userInfo?.address);
  }, [router, setValue, userInfo]);

  useEffect(() => {
    if (updateUserError) {
      enqueueSnackbar(updateUserError, { variant: 'error' });
    }

    if (updateUserInfo?._id) {
      enqueueSnackbar('Profile updated successfully ', { variant: 'success' });
    }
  }, [enqueueSnackbar, updateUserError, updateUserInfo]);

  return (
    <Layout title="Profile">
      <div className="flex flex-col w-full px-5 pt-4 md:px-10">
        <motion.h1
          variants={slideInLeftAnimation}
          initial="initial"
          animate="animate"
          className="mt-6 mb-5"
        >
          MY PROFILE
          {uploadUser || uploadPhoto ? (
            <CircularProgress size={'20px'} color={'blue'} />
          ) : (
            <></>
          )}
        </motion.h1>

        <motion.hr
          initial={{
            x: '100vw',
          }}
          animate={{
            x: '0',
          }}
          transition={{
            duration: 1.2,
          }}
        />

        <div className="flex flex-col justify-around w-full mt-4 md:flex-row">
          <motion.div
            variants={slideInLeftAnimation}
            initial="initial"
            animate="animate"
            className="flex flex-col items-center justify-center py-10 bg-white rounded-lg md:w-1/2 p"
          >
            <div
              style={{
                height: '120px',
                width: '120px',
                display: 'flex',
                flexDirection: 'column',
                marginBottom: '30px',
              }}
            >
              <img
                src={userInfo?.photo}
                alt={userInfo?.name}
                style={{
                  width: '120px',
                  height: '120px',
                  borderRadius: '100%',
                  backgroundColor: 'lightgray',
                }}
              />

              <input
                className="hidden"
                type="file"
                ref={inputRef}
                multiple
                accept="image/*"
                onChange={handleFileChange}
              />
              <span
                style={{
                  justifySelf: 'flex-end',
                  zIndex: '3',
                  position: 'relative',
                  marginTop: '-30px',
                  alignSelf: 'flex-end',
                }}
                className="text-blue-400"
                onClick={handleClick}
              >
                <CameraAltOutlinedIcon />
              </span>
            </div>

            {/* <h1 className="mt-9 mb-9">{userInfo?.name}</h1> */}
            <div className="w-full">
              <motion.div
                variants={zoomOutAnimation}
                initial="initial"
                whileHover="hover"
                className="flex justify-center w-full px-4 py-4 border-t-2 border-b-2 hover:cursor-pointer"
                onClick={() => {
                  setTab(0);
                }}
              >
                Account information
              </motion.div>

              <motion.div
                variants={zoomOutAnimation}
                initial="initial"
                whileHover="hover"
                className="flex justify-center w-full px-4 py-4 border-t-2 border-b-2 hover:cursor-pointer"
                onClick={() => {
                  dispatch(getMyOrdersAction());
                  router.push('/myorder');
                }}
              >
                My Orders
              </motion.div>

              <NextLink href={`/wishlist`} passref>
                <motion.div
                  variants={zoomOutAnimation}
                  initial="initial"
                  whileHover="hover"
                  className="flex justify-center w-full px-4 py-4 border-t-2 border-b-2 hover:cursor-pointer"
                >
                  My Wishlist
                </motion.div>
              </NextLink>

              <motion.div
                variants={zoomOutAnimation}
                initial="initial"
                whileHover="hover"
                className="flex justify-center w-full px-4 py-4 border-t-2 border-b-2 hover:cursor-pointer"
                onClick={() => {
                  setTab(1);
                }}
              >
                Security
              </motion.div>
            </div>
          </motion.div>

          {/* The input session */}
          <div className="flex-col w-full p-10 bg-white rounded-lg md:ml-3">
            {tab === 0 ? (
              <motion.div
                variants={tableContentAnimation}
                initial="initial"
                animate="animate"
              >
                <ProfileInfo />{' '}
              </motion.div>
            ) : (
              <></>
            )}
            {tab === 1 ? (
              <motion.div
                variants={tableContentAnimation}
                initial="initial"
                animate="animate"
              >
                <SecurityTab />
              </motion.div>
            ) : (
              <></>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default Profile;
