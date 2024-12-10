import {configureStore} from '@reduxjs/toolkit';
import userReducer from './userSlice';
import activeOrderReducer from './activeOrderSlice';

const store = configureStore({
  reducer: {
    user: userReducer,
    orders: activeOrderReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
