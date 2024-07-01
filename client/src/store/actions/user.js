/* eslint-disable no-unused-vars */

import { userActions } from "../reducers/userReducers";

export const logout = () => (dispatch) => {
  dispatch(userActions.resetUserInfo());
  localStorage.removeItem("account");
};
