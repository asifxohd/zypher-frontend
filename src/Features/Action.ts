import { createAsyncThunk } from '@reduxjs/toolkit';
import axios, { AxiosResponse } from 'axios';
import { BASE_URL } from '../constents';

interface RegisterData {
	full_name: string;
	phone_number: string;
	email: string;
	password: string;
	confirmPassword: string;
	role: string;
}

interface ErrorResponse {
	validation_errors?: any;
}

export const registerUser = createAsyncThunk<void, RegisterData, { rejectValue: ErrorResponse }>(
	'user/register',

	async (data, { rejectWithValue }) => {
		console.log("registerUser async thunk triggered");
		try {
			const response: AxiosResponse<void> = await axios.post(
				`${BASE_URL}auth/users/`,
				data,
				{
					headers: {
						Accept: 'application/json',
						'Content-Type': 'application/json',
					},
				}
			);
			console.log("User created successfully");
		} catch (error) {
			if (axios.isAxiosError(error)) {
				if (error.response) {
					console.log("Validation error:", error.response.data);
					return rejectWithValue({
						validation_errors: error.response.data
					});
				} else {
					console.log("Network error occurred");
					return rejectWithValue({ validation_errors: 'Network Error' });
				}
			} else {
				console.log("Unknown error occurred");
				return rejectWithValue({ validation_errors: 'Unknown error occurred' });
			}
		}
	}
);

