import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ArchitectureState {
  architectureData: any;
}

const initialState: ArchitectureState = {
  architectureData: null,
};

export const architectureSlice = createSlice({
  name: 'architecture',
  initialState,
  reducers: {
    setArchitectureData: (state, action: PayloadAction<any>) => {
      console.log('Setting architectureData:', action.payload); 
      state.architectureData = action.payload;
    },
    resetArchitectureData: (state) => {
      console.log('Resetting architectureData'); 
      state.architectureData = null;
    },
  },
});

export const { setArchitectureData, resetArchitectureData } = architectureSlice.actions;
export default architectureSlice.reducer;
