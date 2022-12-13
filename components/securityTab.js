import { TextField } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { useSnackbar } from 'notistack';
import { useDispatch, useSelector } from 'react-redux';
import { updatePasswordAction } from '../store/actions/userAction';
import { justHoverAnimation } from '../utils/animation';
const { motion } = require('framer-motion');

const SecurityTab = () => {
  const dispatch = useDispatch();
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const [old_password, set_oldPassword] = useState('');
  const [new_password, setNew_password] = useState('');
  const [comfirm_password, setComfirm_password] = useState('');

  const { success, error, loading } = useSelector(
    (state) => state.updatePassword
  );

  const submitHandler = (e) => {
    e.preventDefault();
    closeSnackbar();
    if (new_password !== comfirm_password) {
      enqueueSnackbar("Passwords don't match", { variant: 'error' });
      return;
    }

    dispatch(
      updatePasswordAction({
        old_password,
        new_password,
      })
    );
  };

  useEffect(() => {
    if (success?._id) {
      enqueueSnackbar('Password  updated successfully', { variant: 'success' });
    }
    if (error) {
      enqueueSnackbar(error, { variant: 'error' });
    }
  }, [enqueueSnackbar, error, loading, success]);

  return (
    <form onSubmit={submitHandler}>
      <div className="flex flex-col mb-4 ">
        <h1>Change Password</h1>
        <div className="w-full mt-10 mb-5 ">
          <TextField
            variant="outlined"
            fullWidth
            id="old_password"
            label="Old Password"
            inputProps={{ type: 'name' }}
            value={old_password}
            onChange={(e) => set_oldPassword(e.target.value)}
          ></TextField>
        </div>

        <div className="w-full mt-10 mb-5 ">
          <TextField
            variant="outlined"
            fullWidth
            id="new_password"
            label="Password"
            inputProps={{ type: 'password' }}
            value={new_password}
            onChange={(e) => setNew_password(e.target.value)}
          ></TextField>
        </div>

        <div className="w-full mt-10 mb-10 ">
          <TextField
            variant="outlined"
            fullWidth
            id="confirmPassword"
            label="Confirm Password"
            inputProps={{ type: 'password' }}
            value={comfirm_password}
            onChange={(e) => setComfirm_password(e.target.value)}
          />
        </div>

        <div className="flex flex-row justify-end w-full">
          <motion.button
            variants={justHoverAnimation}
            initial="initial"
            whileHover="hover"
            className="px-4 py-3 text-white rounded-lg primary-blue-bg hover:shadow-lg"
            onClick={submitHandler}
          >
            Update
          </motion.button>
        </div>
      </div>
    </form>
  );
};

export default SecurityTab;
