import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../slice/userSlice";
import articleReducer from "../slice/articleSlice";
import adminReducer from "../slice/adminSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    article: articleReducer,
    admin: adminReducer,
  },
});
