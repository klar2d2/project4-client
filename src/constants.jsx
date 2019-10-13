export const SERVER = 'https://peaceful-escarpment-58515.herokuapp.com';
// export const SERVER = 'http://localhost:3001';

export const SIGNUP = SERVER + '/auth/signup';
export const LOGIN = SERVER + '/auth/login';
export const CURRENT_USER = SERVER + '/auth/current/user';


export const CREATE_APPOINTMENT = SERVER + '/appointment/create';
export const GET_GOATS_APPOINTMENTS = SERVER + '/appointment/';
export const GET_APPOINTMENT = (appointmentId) => {
  return SERVER + `/appointment/${appointmentId}`;
}
export const DELETE_APPOINTMENT = (appointmentId) => {
  return SERVER + `/appointment/${appointmentId}`;
}
export const UPDATE_APPOINTMENT = (appointmentId) => {
  return SERVER + `/appointment/${appointmentId}`;
}

export const GET_ALL_REVIEWS = SERVER + '/reviews';
export const GET_REVIEW = (goatId) => {
  return SERVER + `reviews/${goatId}`;
}
export const CREATE_REVIEW = (goatId) => {
  return SERVER + `/reviews/${goatId}`;
}
export const UPDATE_REVIEW = (reviewsId) => {
  return SERVER + `/reviews/${reviewsId}`;
}
export const DELETE_REVIEW = (reviewsId) => {
  return SERVER + `/reviews/${reviewsId}`;
}

export const GET_USER = (userId) => {
  return SERVER + `/user/${userId}`
}
export const GET_GOATS = SERVER + '/user/goats'

export const LOCAL_HOST = 'http://localhost:3001/';
