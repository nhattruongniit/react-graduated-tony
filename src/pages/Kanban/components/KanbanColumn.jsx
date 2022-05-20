import { useState } from "react";
import { useSelector } from "react-redux";
import { Droppable, Draggable } from "react-beautiful-dnd";
// @mui
import { Paper, Stack, Button, Typography } from "@mui/material";
// components
import Iconify from "components/Iconify";
//
import KanbanAddTask from "./KanbanAddTask";
import KanbanTaskCard from "./KanbanTaskCard";

export default function KanbanColumn({ column, index }) {
  const board = useSelector((state) => state.kanban.board);

  const [open, setOpen] = useState(false);

  const { name, cardIds, id } = column;

  const handleOpenAddTask = () => {
    setOpen((prev) => !prev);
  };

  const handleCloseAddTask = () => {
    setOpen(false);
  };

  const handleDeleteTask = (cardId) => {
    // dispatch(deleteTask({ cardId, columnId: id }));
  };

  const handleAddTask = (task) => {
    // dispatch(addTask({ card: task, columnId: id }));
    handleCloseAddTask();
  };

  return (
    <Draggable draggableId={id} index={index}>
      {(provided) => (
        <Paper
          {...provided.draggableProps}
          ref={provided.innerRef}
          variant="outlined"
          sx={{ px: 2, bgcolor: "grey.5008" }}
        >
          <Stack spacing={3} {...provided.dragHandleProps}>
            <Typography component="h5" variant="h5" sx={{ pt: 2 }}>
              {name}
            </Typography>

            <Droppable droppableId={id} type="task">
              {(provided) => (
                <Stack
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  spacing={2}
                  width={280}
                >
                  {cardIds.map((cardId, index) => (
                    <KanbanTaskCard
                      key={cardId}
                      onDeleteTask={handleDeleteTask}
                      card={board?.cards[cardId]}
                      index={index}
                    />
                  ))}
                  {provided.placeholder}
                </Stack>
              )}
            </Droppable>

            <Stack spacing={2} sx={{ pb: 3 }}>
              {open && (
                <KanbanAddTask
                  onAddTask={handleAddTask}
                  onCloseAddTask={handleCloseAddTask}
                />
              )}

              <Button
                fullWidth
                size="large"
                color="inherit"
                startIcon={
                  <Iconify icon={"eva:plus-fill"} width={20} height={20} />
                }
                onClick={handleOpenAddTask}
                sx={{ fontSize: 14 }}
              >
                Add Task
              </Button>
            </Stack>
          </Stack>
        </Paper>
      )}
    </Draggable>
  );
}
