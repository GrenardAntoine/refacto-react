// This file has to be left untouched
import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./reducer";

export type AppState = ReturnType<typeof rootReducer>;

const initializeStore = () => configureStore({ reducer: rootReducer });

export default initializeStore;
