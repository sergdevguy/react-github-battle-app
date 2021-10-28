import { configureStore } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import stepReducer from '../components/buttonStep/buttonStepSlice';
import usersReducer from '../features/formUsers/usersSlice';
import modeReducer from '../features/modes/modeSlice';

export default configureStore({
  reducer: {
    counter: counterReducer,
    step: stepReducer,
    users: usersReducer,
    mode: modeReducer,
  },
})