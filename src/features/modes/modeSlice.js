import { createSlice } from '@reduxjs/toolkit'

export const modeSlice = createSlice({
  name: 'mode',
  initialState: {
    value: 0,
  },
  reducers: {
    set: (state, action) => {
      state.value = action.payload;
    },
  },
})

export const { set } = modeSlice.actions

export default modeSlice.reducer