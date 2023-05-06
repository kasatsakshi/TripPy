import {
  loginFailure, loginStart, loginSuccess, logoutUser,
  signupStart, signupSuccess, signupFailure
} from './userRedux';
import { Navigate } from 'react-router-dom';
import { publicRequest, userRequest } from '../api/http';

export const signup = async (dispatch, user, onShowAlert) => {
  dispatch(signupStart());
  try {
    const res = await publicRequest.post('/user/signup', user);
    const token = res.headers['x-auth-token'];
    localStorage.setItem('token', token);
    dispatch(signupSuccess(res.data));
  } catch (err) {
    if (err?.response?.data?.errorMessage) {
      // Add action call
      onShowAlert('Error', err?.response?.data?.errorMessage);
    } else {
      onShowAlert('Error', 'Something went wrong');
    }
    dispatch(signupFailure());
  }
};

export const login = async (dispatch, user, onShowAlert) => {
  dispatch(loginStart());
  try {
    const res = await publicRequest.post('/user/login', user);
    const token = res.headers['x-auth-token'];
    localStorage.setItem('token', token);
    localStorage.setItem('email', res.data?.email);
    dispatch(loginSuccess(res.data));
  } catch (err) {
    if (err?.response?.data?.errorMessage) {
      // Add action call
      onShowAlert('Error', err?.response?.data?.errorMessage);
    } else {
      onShowAlert('Error', 'Something went wrong');
    }
    dispatch(loginFailure());
  }
};

export const logout = (dispatch) => {

  dispatch(logoutUser());
  localStorage.removeItem('token');
  // Redirect to home page.
};
