import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

import { Rebel } from '@/types';

export interface RebelsState {
  rebels: Rebel[];
}

const initialState: RebelsState = {
  rebels: [],
};

export const rebelsSlice = createSlice({
  name: 'rebels',
  initialState,
  reducers: {
    setRebels: (state, action: PayloadAction<Rebel[]>) => {
      state.rebels = [...action.payload];
    },
  },
});

export const { setRebels } = rebelsSlice.actions;

export default rebelsSlice.reducer;
