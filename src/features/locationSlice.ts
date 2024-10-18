import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { Coordinate } from 'ol/coordinate';

export interface LocationState {
  location: Coordinate | null;
}

const initialState: LocationState = {
  location: null,
};

export const locationSlice = createSlice({
  name: 'location',
  initialState,
  reducers: {
    setLocation: (state, action: PayloadAction<Coordinate | null>) => {
      state.location = action.payload;
    },
  },
});

export const { setLocation } = locationSlice.actions;

export default locationSlice.reducer;
