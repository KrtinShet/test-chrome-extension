import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    value: 0,
    loading: false,
    error: null,
};

const counterSlice = createSlice({
    name: 'counter',
    initialState,
    reducers: {
        increment: (state) => {
            state.value += 1;
        },
        decerement: (state) => {
            state.value -= 1;
        }
    },
});


export const { increment, decerement } = counterSlice.actions;

export default counterSlice;