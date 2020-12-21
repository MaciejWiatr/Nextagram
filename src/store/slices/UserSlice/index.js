import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name: "user",
    initialState: {
        counter: 0,
    },
    reducers: {
        add(state) {
            state.counter += 1;
        },
    },
});

export const { add } = userSlice.actions;

export default userSlice.reducer;
