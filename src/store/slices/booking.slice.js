import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../api/api";

export const fetchBookings = createAsyncThunk(
  "bookings/fetchBookings",
  async (userId, { rejectWithValue }) => {
    try {
      const response = await api.get(`booking/by-therapist/${userId}`);
      console.log("response", response);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const verifyBookingToken = createAsyncThunk(
  "bookings/verifyToken",
  async (bookingId, { rejectWithValue }) => {
    try {
      const response = await api.get(
        `payment/verify-booking-token/${bookingId}`,
        { withCredentials: true }
      );
      console.log(response);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

const initialState = {
  bookings: [],
  loading: false,
  error: null,
};

const bookingsSlice = createSlice({
  name: "bookings",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchBookings.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchBookings.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.bookings = payload;
      })
      .addCase(fetchBookings.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload || "Failed to fetch bookings";
      })
      .addCase(verifyBookingToken.pending, (state) => {
        state.loading = true;
      })
      .addCase(verifyBookingToken.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.verifiedToken = payload.token;
      })
      .addCase(verifyBookingToken.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload || "Failed to verify booking token";
      });
  },
});

export default bookingsSlice.reducer;
