import { createSlice } from "@reduxjs/toolkit";
import { registerUser } from "../Action";

interface UserState {
    loading: boolean;
    success: boolean;
    validation_errors: any;
    role:string;
}

// Define initial state
const initialState: UserState = {
    loading: false,
    success: false,
    validation_errors: {},
    role:'startup'
};


const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        clearValidationErrors: (state) => {
            state.validation_errors = {};
        }, 
        handleUserRole:(state, value:any) => {
            state.role = value
        }
    },
    extraReducers: (builder) => {
        builder
            // .addCase(registerUser.pending, (state) => {
            //     state.loading = true;
            //     state.success = false;
            //     state.validation_errors = {};                

            // })
            .addCase(registerUser.rejected, (state, action) => {
                state.loading = false;
                state.success = false;
                console.log("Error occurred during registration:", action.payload);
                if (action.payload && action.payload.validation_errors) {
                    state.validation_errors = action.payload.validation_errors;
                    console.log('error is storing or not',state.validation_errors);
                }
            })
            
            // .addCase(registerUser.fulfilled, (state) => {
            //     state.success = true;
            //     state.loading = false;
            //     state.validation_errors = {};
            // });
    },
});

// Export reducer and actions
export default userSlice.reducer;
export const { clearValidationErrors, handleUserRole } = userSlice.actions;
