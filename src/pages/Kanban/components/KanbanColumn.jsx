import React from 'react';
import { useSelector } from "react-redux";
import { Draggable, Droppable } from 'react-beautiful-dnd'

// mui
import { Paper, Stack, Typography } from '@mui/material';

// section
import KanbanTaskCard from './KanbanTaskCard';



function KanbanColumn({ column, index }) {
  const board = useSelector(state => state.kanban.board)

  return (
    <Draggable draggableId={column.id} index={index}>
      {(provided, snapshot) => (
        <Paper
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
          variant="outlined"
          sx={{ px: 2, bgColor: 'gray' }}
        >
          <Stack spacing={3} >
            <Typography component="h5" variant="h5" sx={{ pt: 2 }}>
              {column.name}
            </Typography>

            <Droppable droppableId={column.id} type="task">
              {(provided, snapshot) => (
                <Stack
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                  spacing={2}
                  width={280}
                >
                  
                  {column.cardIds.map((cardId, index) => (
                    <KanbanTaskCard 
                      index={index}
                      key={cardId}
                      card={board.cards[cardId]}
                    />
                  ))}
                
                  {provided.placeholder}
                </Stack>
              )}
            </Droppable>

            <Typography component="h5" variant="h5" sx={{ pb: 1 }} />


          </Stack>
        </Paper>
      )}
    </Draggable>
  )
}

export default KanbanColumn