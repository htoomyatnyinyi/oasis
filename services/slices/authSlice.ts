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
      const { token, user } = action.payload;
      state.token = token;
      state.user = user;

      // Persist the token in AsyncStorage
      if (token) {
        AsyncStorage.setItem("token", token);
      }
    },
    logout: (state) => {
      state.token = null;
      state.user = null;
      // Remove the token from AsyncStorage
      AsyncStorage.removeItem("token");
    },
  },
});

export const { setCredentials, logout } = authSlice.actions;

export default authSlice.reducer;

// export const selectCurrentUser = (state) => state.auth.user;
// export const selectCurrentToken = (state) => state.auth.token;
