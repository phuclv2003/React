import {
  Action,
  combineReducers,
  configureStore,
  ThunkAction,
} from "@reduxjs/toolkit";
import {
  FLUSH,
  PAUSE,
  PERSIST,
  persistReducer,
  persistStore,
  PURGE,
  REGISTER,
  REHYDRATE,
} from "redux-persist";
import storage from "redux-persist/lib/storage";
import authApi, { authReducer } from "../services/auth";
import accountApi, { accountReducer } from "../services/account";
import productsApi, { productsReducer } from "../services/products";
import NewsApi, { NewsReducer } from "../services/new";
import chatApi, { chatReducer } from "../services/chat";
import categoryApi, { categoryReducer } from "../services/category";

const persistConfig = {
  key: "root",
  storage,
  whitelist: [],
};

const rootReducer = combineReducers({
  [authApi.reducerPath]: authReducer,
  [accountApi.reducerPath]: accountReducer,
  [productsApi.reducerPath]: productsReducer,
  [NewsApi.reducerPath]: NewsReducer,
  [categoryApi.reducerPath]: categoryReducer,
  [chatApi.reducerPath]: chatReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(
      authApi.middleware,
      accountApi.middleware,
      productsApi.middleware,
      NewsApi.middleware,
      chatApi.middleware,
      categoryApi.middleware
    ),
});

export type AppDispatch = typeof store.dispatch;

export type RootState = ReturnType<typeof store.getState>;

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;

export default persistStore(store);
