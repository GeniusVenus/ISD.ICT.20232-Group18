import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";
type authState = {
  isSignedIn: boolean;
};
const initialState: authState = {
  isSignedIn: false,
};
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    // setToken: (state: { token: any }, action: PayloadAction<string>) => {
    //   console.log("Add new token");
    //   state.token = action.payload;
    // },
    // setCredentials: (
    //   state: { user: any; token: any; id: any },
    //   action: PayloadAction<authState>
    // ) => {
    //   const { id, user, token } = action.payload;
    //   state.user = user;
    //   state.token = token;
    //   state.id = id;
    // },
    logIn: (state) => {
      state.isSignedIn = true;
    },
    logOut: (state) => {
      state.isSignedIn = false;
    },
  },
});
export const { logIn, logOut } = authSlice.actions;
export default authSlice.reducer;
export const selectCurrentIsSignedIn = (state: RootState) =>
  state.auth.isSignedIn;
// export const selectCurrentUserId = (state: RootState) => state.auth.id;
// export const selectCurrentUser = (state: RootState) => state.auth.user;
// export const selectCurrentToken = (state: RootState) => state.auth.token;
