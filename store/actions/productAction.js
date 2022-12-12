import axios from 'axios';
import { getError } from '../../utils/util';
import { ProductConstant } from '../constants/constants';

const {
  GET_ALL_PRODUCT_FAILURE,
  GET_ALL_PRODUCT_REQUEST,
  GET_ALL_PRODUCT_SUCCESS,
  GET_PRODUCT_BY_ID_FAILURE,
  GET_PRODUCT_BY_ID_REQUEST,
  GET_PRODUCT_BY_ID_SUCCESS,
  CREATE_PRODUCT_REQUEST,
  CREATE_PRODUCT_FAILURE,
  CREATE_PRODUCT_SUCCESS,
  UPDATE_PRODUCT_BY_ID_FAILURE,
  UPDATE_PRODUCT_BY_ID_REQUEST,
  UPDATE_PRODUCT_BY_ID_SUCCESS,
  CLEAR_UPDATE_PRODUCT,
  DELETE_PRODUCT_FAILURE,
  DELETE_PRODUCT_REQUEST,
  DELETE_PRODUCT_SUCCESS,
  DELETE_PRODUCT_RESET,
  CLEAR_CREATE_PRODUCT,
} = ProductConstant;

export const getAllProduct = () => async (dispatch) => {
  try {
    dispatch({ type: GET_ALL_PRODUCT_REQUEST });
    const { data } = await axios.get('/api/products');
    dispatch({ type: GET_ALL_PRODUCT_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: GET_ALL_PRODUCT_FAILURE, payload: getError(error) });
  }
};

export const getProductbyId = (id) => async (dispatch) => {
  try {
    dispatch({ type: GET_PRODUCT_BY_ID_REQUEST });
    const { data } = await axios.get(`/api/products/${id}`);
    dispatch({ type: GET_PRODUCT_BY_ID_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: GET_PRODUCT_BY_ID_FAILURE, payload: getError(error) });
  }
};

export const createProductAction = (product) => async (dispatch, getState) => {
  try {
    dispatch({ type: CREATE_PRODUCT_REQUEST });
    const {
      userLogin: { userInfo },
    } = getState();
    const { data } = await axios.post(
      `/api/admin/products`,
      { ...product },
      {
        headers: { authorization: `Bearer ${userInfo?.token}` },
      }
    );

    dispatch({ type: CREATE_PRODUCT_SUCCESS, payload: data?.newProduct });
    dispatch({ type: CLEAR_CREATE_PRODUCT });
  } catch (error) {
    dispatch({ type: CREATE_PRODUCT_FAILURE, payload: getError(error) });
  }
};

export const updateProductAction =
  ({ product, id }) =>
  async (dispatch, getState) => {
    try {
      dispatch({ type: UPDATE_PRODUCT_BY_ID_REQUEST });
      const {
        userLogin: { userInfo },
      } = getState();

      const { data } = await axios.put(
        `/api/admin/products/${id}`,
        { ...product },
        {
          headers: { authorization: `Bearer ${userInfo?.token}` },
        }
      );
      dispatch({ type: UPDATE_PRODUCT_BY_ID_SUCCESS, payload: data });
      dispatch({ type: CLEAR_UPDATE_PRODUCT });
    } catch (error) {
      dispatch({
        type: UPDATE_PRODUCT_BY_ID_FAILURE,
        payload: getError(error),
      });
      dispatch({ type: CLEAR_UPDATE_PRODUCT });
    }
  };

export const deleteProductAction = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: DELETE_PRODUCT_REQUEST });
    const {
      userLogin: { userInfo },
    } = getState();

    const { data } = await axios.delete(`/api/admin/products/${id}`, {
      headers: { authorization: `Bearer ${userInfo.token}` },
    });
    dispatch({ type: DELETE_PRODUCT_SUCCESS, payload: data });
    dispatch({ type: DELETE_PRODUCT_RESET });
  } catch (error) {
    dispatch({ type: DELETE_PRODUCT_FAILURE, payload: getError(error) });
  }
};
