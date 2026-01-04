import AsyncStorage from "@react-native-async-storage/async-storage";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  token: null,
  user: null, // Stores user details like email, name, etc.
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      const payload = action.payload;
      if (typeof payload === "string") {
        state.token = payload;
      } else {
        state.token = payload.token || state.token;
        state.user = payload.user || state.user;
      }

      // Persist the token in AsyncStorage
      if (state.token) {
        AsyncStorage.setItem("token", state.token);
      }
    },
    setToken: (state, action) => {
      state.token = action.payload;
    },
    setUser: (state, action) => {
      state.user = action.payload;
    },
    logout: (state) => {
      state.token = null;
      state.user = null;
      // Remove the token from AsyncStorage
      AsyncStorage.removeItem("token");
    },
  },
});

export const { setCredentials, logout, setToken, setUser } = authSlice.actions;

export default authSlice.reducer;

export const selectCurrentToken = (state: any) => state.auth.token;
export const selectCurrentUser = (state: any) => state.auth.user;
