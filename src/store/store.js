import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import { encryptTransform } from "redux-persist-transform-encrypt";
import {
  FLUSH,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
  REHYDRATE,
} from "redux-persist/es/constants";
import storage from "redux-persist/lib/storage";
import { thunk } from "redux-thunk";

import messagesSlice from "./slices/chat.slice";
import bookingSlice from "./slices/booking.slice";
import userSlice from "./slices/user.slice";

const secretKey = import.meta.env.VITE_REDUX_STORAGE_SECRET_KEY;

const encryptor = encryptTransform({
  secretKey,
  onError: function (error) {
    console.log(error);
  },
});

const rootReducer = combineReducers({
  user: userSlice.reducer,
  messages: messagesSlice,
  bookings: bookingSlice,
});

const persistConfig = {
  key: "root",
  storage,
  timeout: null,
  transforms: [encryptor],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  devTools: import.meta.env.VITE_NODE_ENV === "development",
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(thunk),
});

export const persistor = persistStore(store);
