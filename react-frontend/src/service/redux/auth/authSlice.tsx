import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";
type authState = {
  id: string;
  user: string;
  token: string;
};
const initialState: authState = {
  id: "",
  user: "",
  token: "",
};
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setToken: (state: { token: any }, action: PayloadAction<string>) => {
      console.log("Add new token");
      state.token = action.payload;
    },
    setCredentials: (
      state: { user: any; token: any; id: any },
      action: PayloadAction<authState>
    ) => {
      const { id, user, token } = action.payload;
      state.user = user;
      state.token = token;
      state.id = id;
    },
    logOut: (state: { id: string; user: string; token: string }) => {
      state.id = "";
      state.user = "";
      state.token = "";
    },
  },
});
export const { setToken, setCredentials, logOut } = authSlice.actions;
export default authSlice.reducer;
export const selectCurrentUserId = (state: RootState) => state.auth.id;
export const selectCurrentUser = (state: RootState) => state.auth.user;
export const selectCurrentToken = (state: RootState) => state.auth.token;
