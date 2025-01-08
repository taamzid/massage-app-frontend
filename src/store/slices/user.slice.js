import { createSlice } from "@reduxjs/toolkit";
import { getCookie } from "../../utils/getCookies";

const initialState = {
  isAuthenticated: false,
  token: "",
  user: {},
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setSuccessLogin: (state, action) => {
      const data = action.payload;
      const token = getCookie("token");
      if (token) {
        return { ...state, isAuthenticated: true, token, user: data };
      }
    },
    updateAuthToken: (state, action) => {
      const { token } = action.payload;
      return { ...state, token };
    },
    updateAccessToken: (state, action) => {
      const { token } = action.payload;
      return { ...state, token };
    },
    setUserDetails: (state, action) => {
      return { ...state, user: { ...state.user, ...action.payload } };
    },

    setSuccessLogout: (state) => {
      return {
        ...state,
        isAuthenticated: false,
        token: "",
        user: {},
      };
    },
  },
});

export const {
  setSuccessLogin,
  setUserDetails,
  updateAuthToken,
  updateAccessToken,
  setSuccessLogout,
} = userSlice.actions;

export default userSlice;
