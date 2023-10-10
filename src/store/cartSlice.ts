'use client'

import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from './toolkit'
import { TProduct, TUser } from '@/types';

type initial = {
  user: TUser,
  products: TProduct[],
  role: string,
  total: number,
  quantity: number
}
const initialState: initial = {
  user: {},
  products: [],
  role: '',
  total: 0,
  quantity: 0
}

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addUser: (state, action: PayloadAction<any>) => {
      state.user = action.payload
    },
    cartCounter: (state, action: PayloadAction<any>) => {
      state.quantity = action.payload
    },
    cartCountAdd: (state, action: PayloadAction<any>) => {
      console.log(action.payload);
      state.quantity = state.quantity + action.payload
      console.log(state.quantity);
    },
  },
})

export const { cartCounter, cartCountAdd, addUser } = cartSlice.actions

// Other code such as selectors can use the imported `RootState` type
//export const selectCount = (state: RootState) => state.counter.value

export default cartSlice.reducer