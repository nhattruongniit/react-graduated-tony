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
    addTask: (state, action) => {
      const { card, columnId } = action.payload;
      state.board.cards[card.id] = card;
      state.board.columns[columnId].cardIds.push(card.id);
    },
    deleteTask: (state, action) => {
      // const { cardId, columnId } = action.payload;
      // state.board.columns[columnId].cardIds = state.board.columns[
      //   columnId
      // ].cardIds.filter((id) => id !== cardId);
      // state.board.cards = omit(state.board.cards, [cardId]);
    },
  },
});

export const {
  getBoard,
  addTask,
  deleteTask,
  updateColumnOrder,
  updateCardOrder,
} = kanbanSlice.actions;

export default kanbanSlice.reducer;
