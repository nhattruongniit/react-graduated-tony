import { configureStore } from "@reduxjs/toolkit";

// reducers
import appReducer from "./app/app.slice";
import kanbanReducer from "./kanban/kanban.slice";

export const store = configureStore({
  reducer: {
    app: appReducer,
    kanban: kanbanReducer,
  },
});
