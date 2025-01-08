import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../api/api";

export const fetchMessages = createAsyncThunk(
  "messages/fetchMessages",
  async ({ senderId, receiverId }, { rejectWithValue }) => {
    try {
      const response = await api.get(`message/fetch/${senderId}/${receiverId}`);
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const sendMessage = createAsyncThunk(
  "messages/sendMessage",
  async (messageData, { rejectWithValue }) => {
    try {
      const response = await api.post("message/send", messageData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const fetchConnectedUsers = createAsyncThunk(
  "messages/fetchConnectedUsers",
  async ({ userId, role }, { rejectWithValue }) => {
    try {
      const response = await api.get(
        `message/connected-users/${userId}?role=${role}`
      );
      console.log(response);
      return Array.isArray(response.data.connectedUsers)
        ? response.data.connectedUsers
        : [];
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const addMessage = (message) => ({
  type: "messages/addMessage",
  payload: message,
});

const initialState = {
  messages: [],
  connectedUsers: [],
  loading: false,
  error: null,
};

const messagesSlice = createSlice({
  name: "messages",
  initialState,
  reducers: {
    addMessage: (state, { payload }) => {
      if (typeof payload === "object" && !Array.isArray(payload)) {
        state.messages.push(payload);
      } else {
        console.error("Invalid payload for addMessage:", payload);
      }
    },
    receiveMessage: (state, action) => {
      state.messages.push(action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMessages.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMessages.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.messages = payload;
      })
      .addCase(fetchMessages.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload || "Failed to fetch messages";
      })

      .addCase(sendMessage.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(sendMessage.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.messages.push(payload);
      })
      .addCase(sendMessage.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload || "Failed to send message";
      })

      .addCase(fetchConnectedUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchConnectedUsers.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.connectedUsers = payload;
      })
      .addCase(fetchConnectedUsers.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload || "Failed to fetch connected users";
      });
  },
});

export const { addMessage: addMessageAction, receiveMessage } = messagesSlice.actions;
export default messagesSlice.reducer;
