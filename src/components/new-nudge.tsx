import { Box, Card, CardContent, CardHeader, Checkbox, Chip, Grid, IconButton, InputAdornment, ListItem, ListItemText, Stack, TextField } from "@mui/material";
import React, { useState } from "react";
import AddBoxIcon from '@mui/icons-material/AddBox';
import DeleteIcon from '@mui/icons-material/Delete';
import * as StyleClasses from "./../styles/nudges.styles";
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';

interface RightPanelProps {
  category: string;
}

interface SubTask {
  name: string;
  done: boolean;
  date: string;
}

interface Task {
  name: string;
  done: boolean;
  subtasks: SubTask[]
}

export default function NewNudge({ category }: RightPanelProps) {
  const [items, setItems] = useState<Record<string, Task[]>>({
    Personal: [],
    Work: [],
    Others: [],
  });
  const [inputValue, setInputValue] = useState('');
  const [subtaskTitle, setSubTaskTitle] = useState('');
  const [subtaskDate, setSubTaskDate] = useState('');
  const [selectedTaskId, setSelectedTaskId] = useState(-1);

  const handleTitleChange = (event: any) => {
    setSubTaskTitle(event.target.value);
  };

  const handleDateChange = (event: any) => {
    setSubTaskDate(event.target.value);
  };

  const handleSubmit = (event: any) => {
    event.preventDefault(); // Prevent default form submission
    const updatedItems = items[category].map((item: Task, index: number) => {
      if (index == selectedTaskId) {
        item.subtasks.push({ name: subtaskTitle, date: subtaskDate, done: false });
      }
      return item;
    });
    setItems((prev) => ({
      ...prev,
      [category]: updatedItems
    }));
    setSubTaskTitle('');
    setSubTaskDate('');
  };

  const addNewTask = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && inputValue.trim() !== "" && category) {
      setItems((prev) => ({
        ...prev,
        [category]: [
          ...(prev[category] || []),
          { name: inputValue.trim(), done: false, subtasks: [] },
        ],
      }));
      setInputValue('');
    }
  }

  const handleToggleTask = (taskIndex: number) => {
    const updatedItems = items[category].map((item, index) => {
      if (index == taskIndex) {
        !item.done ? setSelectedTaskId(taskIndex) : setSelectedTaskId(-1);
        return { ...item, done: !item.done };
      }
      return item;
    })
    setItems((prev) => ({
      ...prev,
      [category]: updatedItems
    }));
  }

  const deleteTask = (taskIndex: number) => {
    const deletedItems = items[category].filter((item, index) => index !== taskIndex);
    setItems((prev) => ({
      ...prev,
      [category]: deletedItems
    }));
  }

  const deleteSubTask = (subTaskIndex: number) => {
    const subTasks: SubTask[] = items[category][selectedTaskId].subtasks;
    const deletedItems = subTasks.filter((stItems: SubTask, index: number) => index !== subTaskIndex);

    const updatedItems = items[category].map((item: Task, taskindex: number) => {
      if (taskindex == selectedTaskId) {
        item.subtasks = deletedItems;
      }
      return item;
    });

    setItems((prev) => ({
      ...prev,
      [category]: updatedItems
    }));
  }

  const handleToggleSubTask = (subTaskIndex: number) => {
    const updatedSubItems = items[category][selectedTaskId].subtasks.map((item, index) => {
      if (index == subTaskIndex) {
        return { ...item, done: !item.done };
      }
      return item;
    })

    const updatedItems = items[category].map((item: Task, taskindex: number) => {
      if (taskindex == selectedTaskId) {
        return {...item, subtasks: updatedSubItems};
      }
      return item;
    });

    setItems((prev) => ({
      ...prev,
      [category]: updatedItems
    }));
  }

  const currentItems = items[category] || [];

  return (
    <Grid container spacing={2}>
      <Grid size={{ xs: 12, sm: 6, md: 6, lg:6 }}>
        <StyleClasses.RightBoxContent>
          <TextField
            fullWidth
            label={category ? `Enter ${category} task` : 'Enter task'}
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={addNewTask} />

          {currentItems.length ? (<StyleClasses.TaskListContent>
            {currentItems.map((task: Task, index: number) => (
              <div key={index}>
                <StyleClasses.TaskListItem secondaryAction={
                  <IconButton edge="end" aria-label="comments" onClick={() => deleteTask(index)}>
                    <DeleteIcon />
                  </IconButton>
                } disablePadding>
                  <Checkbox
                    checked={task.done}
                    onChange={() => handleToggleTask(index)}
                  />
                  <ListItemText
                    primary={task.name}
                  />
                </StyleClasses.TaskListItem>
              </div>
            ))}
          </StyleClasses.TaskListContent>) : (<span></span>)}

        </StyleClasses.RightBoxContent>
      </Grid>
      {
        selectedTaskId != -1 ? (
          <Grid size={{ xs: 12, sm: 6, md: 6, lg:6 }}>
            <Card>
              <CardHeader
                title="Add Subtask"
              />
              <CardContent>
                <form onSubmit={handleSubmit}>
                  <StyleClasses.CustomTextField
                    label="Enter Subtask"
                    value={subtaskTitle}
                    fullWidth
                    onChange={(e) => handleTitleChange(e)}
                    slotProps={{
                      input: {
                        startAdornment: (
                          <InputAdornment position="start">
                            <AddBoxIcon />
                          </InputAdornment>
                        ),
                      },
                    }}
                  />
                  <StyleClasses.CustomTextField
                    label="Enter Date"
                    value={subtaskDate}
                    onChange={(e) => handleDateChange(e)}
                    slotProps={{
                      input: {
                        startAdornment: (
                          <InputAdornment position="start">
                            <CalendarMonthIcon />
                          </InputAdornment>
                        ),
                      },
                    }}
                  />
                  <StyleClasses.SubmitButton variant="outlined" type="submit">Add Subtask</StyleClasses.SubmitButton>
                </form>
              </CardContent>
            </Card>
            <StyleClasses.SubTaskList>
              {currentItems.map((task: Task, index: number) => (
                <div key={index}>
                  {index === selectedTaskId ? (
                    <span>
                      {
                        task.subtasks.map((subTask: SubTask, stindex: number) => (
                          <div key={stindex}>
                            <StyleClasses.NotesListItem disablePadding alignItems="flex-start">
                              <Box sx={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
                                <Box sx={{ display: 'flex', flexDirection: 'row', width: '100%' }}>
                                  <Checkbox
                                    checked={subTask.done}
                                    onChange={() => handleToggleSubTask(stindex)}
                                  />
                                  <ListItemText
                                    primary={subTask.name}
                                  />
                                </Box>
                                <Box sx={{ display: 'flex', gap: 1, marginTop: 1, justifyContent: "center" }}>
                                  <Stack direction="row" spacing={1} justifyContent="center" alignItems="center">
                                    <Chip label={
                                      task.subtasks.length > 0
                                        ? `${task.subtasks[stindex].date}`
                                        : null
                                    } />
                                    <Chip label={subTask.done ? "Completed" : "Inprogress"} />
                                    <Chip label="Delete" onDelete={() => deleteSubTask(stindex)}/>
                                  </Stack>
                                </Box>
                              </Box>
                            </StyleClasses.NotesListItem>
                          </div>
                        ))
                      }
                    </span>

                  ) : (
                    <span></span>
                  )}
                </div>
              ))}
            </StyleClasses.SubTaskList>
          </Grid>) : (<span></span>)
      }

    </Grid>
  );
}
