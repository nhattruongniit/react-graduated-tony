import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  showLoading: false,
  user: null
}

export const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setLoading: (state, action) => {
      state.showLoading = action.payload
    },
    setUser: (state, action) => {
      state.user = action.payload || null;
    }
  }
})

export const { setLoading, setUser } = appSlice.actions;

export default appSlice.reducer;