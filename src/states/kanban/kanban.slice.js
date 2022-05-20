import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  board: {
    cards: {},
    columns: {},
    columnOrder: [],
  },
};

export const kanbanSlice = createSlice({
  name: "kanban",
  initialState,
  reducers: {
    getBoard: (state, action) => {
      console.log("getBard", action);
      state.board = action.payload;
    },
    updateColumnOrder: (state, action) => {
      state.board.columnOrder = action.payload;
    },
    updateCardOrder: (state, action) => {
      state.board.columns = action.payload;
    },
  },
});

export const { getBoard, updateColumnOrder, updateCardOrder } =
  kanbanSlice.actions;

export default kanbanSlice.reducer;
