import { createSlice } from '@reduxjs/toolkit'

export const usersSlice = createSlice({
  name: 'users',
  initialState: {
    value: [],
  },
  reducers: {
    add: (state, action) => {
      state.value = [...action.payload];
    },
  },
})

export const { add } = usersSlice.actions

export default usersSlice.reducer