import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

// @mui
import { Stack } from "@mui/material";
import { DragDropContext, Droppable } from "react-beautiful-dnd";

// sections
import KanbanColumn from "./components/KanbanColumn";
import KanbanColumnAdd from "./components/KanbanComlumnAdd";

// mocks
import { dataBoard } from "mocks/dataKanban";

// actions
import {
  getBoard,
  updateColumnOrder,
  updateCardOrder,
} from "states/kanban/kanban.slice";

function Kanban() {
  const dispatch = useDispatch();
  const board = useSelector((state) => state.kanban.board);

  const onDragEnd = (result) => {
    // Reorder card
    const { destination, source, draggableId, type } = result;

    if (!destination) return;

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    )
      return;

    // update column
    if (type === "column") {
      const newColumnOrder = Array.from(board.columnOrder);
      newColumnOrder.splice(source.index, 1);
      newColumnOrder.splice(destination.index, 0, draggableId);
      dispatch(updateColumnOrder(newColumnOrder));
      return;
    }

    // update card
    const start = board.columns[source.droppableId];
    const finish = board.columns[destination.droppableId];

    // card same column
    if (start.id === finish.id) {
      const updatedCardIds = [...start.cardIds];
      updatedCardIds.splice(source.index, 1);
      updatedCardIds.splice(destination.index, 0, draggableId);
      const updatedColumn = {
        ...start,
        cardIds: updatedCardIds,
      };

      dispatch(
        updateCardOrder({
          ...board.columns,
          [updatedColumn.id]: updatedColumn,
        })
      );
      return;
    }

    // card different column
    const startCardIds = [...start.cardIds];
    startCardIds.splice(source.index, 1);
    const updatedStart = {
      ...start,
      cardIds: startCardIds,
    };

    const finishCardIds = [...finish.cardIds];
    finishCardIds.splice(destination.index, 0, draggableId);
    const updatedFinish = {
      ...finish,
      cardIds: finishCardIds,
    };

    dispatch(
      updateCardOrder({
        ...board.columns,
        [updatedStart.id]: updatedStart,
        [updatedFinish.id]: updatedFinish,
      })
    );
  };

  useEffect(() => {
    dispatch(getBoard(dataBoard));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="all-columns" direction="horizontal" type="column">
        {(provided) => (
          <Stack
            {...provided.droppableProps}
            ref={provided.innerRef}
            direction="row"
            alignItems="flex-start"
            spacing={3}
            sx={{ height: "calc(100% - 32px)", overflowY: "hidden" }}
          >
            {board.columnOrder.map((columnId, index) => (
              <KanbanColumn
                index={index}
                key={columnId}
                column={board.columns[columnId]}
              />
            ))}

            {provided.placeholder}
            <KanbanColumnAdd />
          </Stack>
        )}
      </Droppable>
    </DragDropContext>
  );
}

export default Kanban;
