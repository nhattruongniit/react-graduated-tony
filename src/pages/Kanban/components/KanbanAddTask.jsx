import PropTypes from "prop-types";
import { useState } from "react";
// @mui
import { Paper, OutlinedInput, ClickAwayListener } from "@mui/material";
// utils
import { uuidv4 } from "helpers";
// ----------------------------------------------------------------------

const defaultTask = {
  attachments: [],
  comments: [],
  description: "",
  due: [null, null],
  assignee: [],
};

KanbanTaskAdd.propTypes = {
  onAddTask: PropTypes.func,
  onCloseAddTask: PropTypes.func,
};

export default function KanbanTaskAdd({ onAddTask, onCloseAddTask }) {
  const [name, setName] = useState("");

  const [completed, setCompleted] = useState(false);

  const handleKeyUpAddTask = (event) => {
    if (event.key === "Enter") {
      if (name.trim() !== "") {
        onAddTask({
          ...defaultTask,
          id: uuidv4(),
          name,
          due: [null, null],
          completed,
        });
      }
    }
  };

  const handleClickAddTask = () => {
    if (name) {
      onAddTask({
        ...defaultTask,
        id: uuidv4(),
        name,
        due: [null, null],
        completed,
      });
    }
    onCloseAddTask();
  };

  return (
    <>
      <ClickAwayListener onClickAway={handleClickAddTask}>
        <Paper variant="outlined" sx={{ p: 1 }}>
          <OutlinedInput
            multiline
            size="small"
            placeholder="Task name"
            value={name}
            onChange={(event) => setName(event.target.value)}
            onKeyUp={handleKeyUpAddTask}
            sx={{
              "& input": { p: 0 },
              "& fieldset": { borderColor: "transparent !important" },
            }}
          />
        </Paper>
      </ClickAwayListener>
    </>
  );
}
