import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { DragDropContext, Droppable } from "react-beautiful-dnd";

// mui
import Stack from '@mui/material/Stack';
// mocks
import { dataBoard } from 'mocks/dataKanban'
// redux
import { getBoard, updateCardOrder, updateColumnOrder } from 'states/kanban/kanban.slice'
// sections
import KanbanColumn from "./components/KanbanColumn";

function Kanban() {
  const dispatch = useDispatch();
  const board = useSelector(state => state.kanban.board)


  function onDragEnd(result) {
    const { source, destination, draggableId, type } = result;

    if(!destination) return;

    if(destination.droppableId === source.droppableId && destination.index === source.index) return;

    // update column
    if(type === 'column') {
      const newColumnOrder = [...board.columnOrder];
      // change order
      newColumnOrder.splice(source.index, 1);
      newColumnOrder.splice(destination.index, 0, draggableId);
      // swap
      // [newColumnOrder[source.index], newColumnOrder[destination.index]] = [newColumnOrder[destination.index], newColumnOrder[source.index]];
      dispatch(updateColumnOrder(newColumnOrder))
      return;
    }

    // update card
    const start = board.columns[source.droppableId];
    const end = board.columns[destination.droppableId];

    // same column
    if(start.id === end.id) {
      const newCardIds = [...start.cardIds];
      newCardIds.splice(source.index, 1);
      newCardIds.splice(destination.index, 0, draggableId);
      const obj = {
        ...start,
        cardIds: newCardIds 
      }

      dispatch(updateCardOrder({
        ...board.columns,
        [obj.id]: obj
      }))
      return;
    }

    // different column
    const startCardIds = [...start.cardIds];
    startCardIds.splice(source.index, 1);
    const updatedStart = {
      ...start,
      cardIds: startCardIds
    }

    const endCardIds = [...end.cardIds];
    endCardIds.splice(destination.index, 0, draggableId);
    const updatedEnd = {
      ...end,
      cardIds: endCardIds
    }

    dispatch(updateCardOrder({
      ...board.columns,
      [updatedStart.id]: updatedStart,
      [updatedEnd.id]: updatedEnd
    }))
  }

  React.useEffect(() => {
    dispatch(getBoard(dataBoard))
  }, [dispatch])
  
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="all-column" direction="horizontal" type="column">
        {(provided, snapshot) => (
          <Stack
            {...provided.droppableProps}
            ref={provided.innerRef} 
            direction="row"
            alignItems="flex-start"
            spacing={3}
            style={{ height: "calc(100% - 32px)"}}
          >
            {board.columnOrder.map((columnId, index) => (
              <KanbanColumn 
                key={columnId}
                index={index}
                column={board.columns[columnId]}
              />
            ))}
            {provided.placeholder}
          </Stack>
        )}
      </Droppable>
    </DragDropContext>
  );
}

export default Kanban;
