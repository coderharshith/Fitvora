import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UserState {
  name: string;
  age: string;
  gender: string;
  height: string;
  weight: string;
  goal: string;
  activity: string;
  preference: string;
  bmi: string;
  bmr: string;
  tdee: string;
}

const initialState: UserState = {
  name: '',
  age: '',
  gender: '',
  height: '',
  weight: '',
  goal: '',
  activity: '',
  preference: '',
  bmi: '',
  bmr: '',
  tdee: '',
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserData: (state, action: PayloadAction<Partial<UserState>>) => {
      return { ...state, ...action.payload };
    },
    clearUserData: () => initialState,
  },
});

export const { setUserData, clearUserData } = userSlice.actions;

export default userSlice.reducer;
