import { createSlice } from '@reduxjs/toolkit'

export const buttonStepSlice = createSlice({
  name: 'buttonStep',
  initialState: {
    value: 1,
  },
  reducers: {
    increment: (state) => {
      state.value += 1
    },
  },
})

export const { increment } = buttonStepSlice.actions

export default buttonStepSlice.reducer