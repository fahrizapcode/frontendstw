import {createSlice} from '@reduxjs/toolkit';

interface ActiveOrderState {
  orderId: string;
  clientId: string;
  orderDate: string;
  purchaseLocation: string;
  dropOffLocation: string;
  orderTime: string;
  estimationPurchase: string;
  totalPurchase: number;
  fee: number;
  orderDetail: string;
}

const initialStateActiveOrder: ActiveOrderState = {
  orderId: '',
  clientId: '',
  orderDate: '',
  purchaseLocation: '',
  dropOffLocation: '',
  orderTime: '',
  estimationPurchase: '',
  totalPurchase: 0,
  fee: 0,
  orderDetail: '',
};
const activeOrderSlice = createSlice({
  name: 'orders',
  initialState: initialStateActiveOrder,
  reducers: {
    setActiveOrder: (state, action) => {
      state.orderId = action.payload.orderId;
      state.clientId = action.payload.clientId;
      state.orderDate = action.payload.orderDate;
      state.purchaseLocation = action.payload.purchaseLocation;
      state.dropOffLocation = action.payload.dropOffLocation;
      state.orderTime = action.payload.orderTime;
      state.estimationPurchase = action.payload.estimationPurchase;
      state.totalPurchase = action.payload.totalPurchase;
      state.fee = action.payload.fee;
      state.orderDetail = action.payload.orderDetail;
    },
  },
});

export const {setActiveOrder} = activeOrderSlice.actions;

export default activeOrderSlice.reducer;
