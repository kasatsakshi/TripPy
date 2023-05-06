import {
  loginFailure, loginStart, loginSuccess, logoutUser,
  signupStart, signupSuccess, signupFailure
} from './userRedux';
import { Navigate } from 'react-router-dom';
import { publicRequest, userRequest } from '../api/http';


export const signup = async (dispatch, user) => {
  dispatch(signupStart());
  try {
    const res = await publicRequest.post('/user/signup', user);
    const token = res.headers['x-auth-token'];
    localStorage.setItem('token', token);
    dispatch(signupSuccess(res.data));
  } catch (err) {
    dispatch(signupFailure());
  }
};

export const login = async (dispatch, user) => {
  dispatch(loginStart());
  try {
    const res = await publicRequest.post('/user/login', user);
    const token = res.headers['x-auth-token'];
    localStorage.setItem('token', token);
    localStorage.setItem('email', res.data?.email);
    dispatch(loginSuccess(res.data));
  } catch (err) {
    dispatch(loginFailure());
  }
};

export const logout = (dispatch) => {

  dispatch(logoutUser());
  localStorage.removeItem('token');
  return <Navigate to="/" />;
};
