import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoggedIn: localStorage.getItem("idToken") ? true : false,
};
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login(state) {
      state.isLoggedIn = true;
    },
    logout(state) {
      localStorage.removeItem("idToken");
      localStorage.removeItem("email");
      state.isLoggedIn = false;
    },
  },
});

export const authAction = authSlice.actions;

export default authSlice.reducer;
