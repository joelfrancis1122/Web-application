import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  admin: null,
  users: [],
  token: null,
  searchQuery: "",
};

const adminSlice = createSlice({
  name: "admin",
  initialState,
  reducers: {
    logAdmin: (state, action) => {
      state.token = action.payload.token;
      state.admin = action.payload.user;
    },
    setUsers: (state, action) => {
      console.log(action, "actions asdasdas");
      state.users = action.payload;
    },
    deleteUser: (state, action) => {
      state.users = state.users.filter((user) => user._id !== action.payload);
    },
    setSearchQuery: (state, action) => {
      state.searchQuery = action.payload;
    },
    logoutAdmin: (state, action) => {
      state.token = null;
      state.admin = null;
      state.users = [];
      state.searchQuery = "";
    }, updateAdmin:(state,action)=>{
        state.admin=action.payload
      },
  },
});

export const { setUsers, deleteUser, setSearchQuery, logAdmin, logoutAdmin ,updateAdmin} =
  adminSlice.actions;

export default adminSlice.reducer;
