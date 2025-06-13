
import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
  name: 'user',
  initialState: {
    user: null,
    token: null,
    
  },
  reducers: {
    logUser: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
    },
    logoutUser: (state) => {
      state.user = null;
      state.token = null;
    },
    updateUser:(state,action)=>{
      state.user=action.payload
    }
  },
});

export const { logUser, logoutUser,updateUser } = userSlice.actions;
export default userSlice.reducer;
