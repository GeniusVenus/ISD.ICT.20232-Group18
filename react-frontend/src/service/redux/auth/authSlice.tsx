import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";
type authState = {
  isSignedIn: boolean;
  user_id: string | null;
  session_id: string | null;
};
const initialState: authState = {
  isSignedIn: false,
  user_id: "",
  session_id: "",
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
    logIn: (state, action) => {
      const { userId, sessionId } = action.payload;
      state.isSignedIn = true;
      state.user_id = userId;
      state.session_id = sessionId;
    },
    logOut: (state) => {
      state.isSignedIn = false;
      state.session_id = "";
      state.user_id = "";
    },
  },
});
export const { logIn, logOut } = authSlice.actions;
export default authSlice.reducer;
export const selectCurrentIsSignedIn = (state: RootState) =>
  state.auth.isSignedIn;
export const selectCurrentSessionId = (state: RootState) =>
  state.auth.session_id;
export const selectCurrentUserId = (state: RootState) => state.auth.user_id;
// export const selectCurrentUser = (state: RootState) => state.auth.user;
// export const selectCurrentToken = (state: RootState) => state.auth.token;
