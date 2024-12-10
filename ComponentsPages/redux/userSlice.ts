import {createSlice, PayloadAction} from '@reduxjs/toolkit';

// ? adalah opsional, artinya boleh ada boleh tidak.
interface UserState {
  email: string;
  username: string;
  phone: string;
  password: string;
  profilePicture?: string;
  id: string;
  role: 'client' | 'stuker';
  rating?: number;
  ordersCompleted: number;
  ordersRequested: number;
}

//state awal
const initialStateUser: UserState = {
  email: '',
  username: '',
  phone: '',
  password: '',
  id: '',
  profilePicture: '',
  role: 'client',
  rating: 0,
  ordersCompleted: 0,
  ordersRequested: 0,
};

const userSlice = createSlice({
  name: 'user',
  initialState: initialStateUser,
  reducers: {
    setUserDataRedux: (state, action) => {
      // payload merupakan properti dari objek action yang digunakan untuk membawa data pengguna dari dispatch action di komponen kemudian mengupdate state
      state.email = action.payload.email;
      state.username = action.payload.username;
      state.phone = action.payload.phone;
      state.password = action.payload.password;
      state.id = action.payload.id;
      state.profilePicture = action.payload.profilePicture;
      state.role = action.payload.role;
      state.rating = action.payload.rating;
      state.ordersCompleted = action.payload.ordersCompleted;
      state.ordersRequested = action.payload.ordersRequested;
    },
    // setProfilePicture: (state, action: PayloadAction<string>) => {
    //   state.profilePicture = action.payload;
    // },
    setProfilePicture: (state, action) => {
      state.profilePicture = action.payload.profilePicture;
    },
    clearUserData: state => {
      state.email = '';
      state.username = '';
      state.phone = '';
      state.password = '';
    },
    switchRole: (state, action: PayloadAction<'client' | 'stuker'>) => {
      const previousRole = state.role;
      state.role = action.payload;
    },
  },
});
// interface

export const {setUserDataRedux, clearUserData, setProfilePicture, switchRole} =
  userSlice.actions;

export default userSlice.reducer;
