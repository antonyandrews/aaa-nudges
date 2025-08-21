import { Box, Button, Card, CardContent, CardHeader, Checkbox, Chip, Divider, Grid, IconButton, InputAdornment, List, ListItem, ListItemText, Paper, Stack, TextField } from "@mui/material";
import React, { useState } from "react";
import styled from "styled-components";
import AddBoxIcon from '@mui/icons-material/AddBox';
import DeleteIcon from '@mui/icons-material/Delete';
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

const RightBoxContent = styled(Paper)`
  padding: 1rem;
  min-height: calc(100vh - 3rem);
`;

const TaskListContent = styled(List)`
  height: calc(100vh - 9rem);
  min-height: calc(100vh - 9rem);
  overflow-y: auto;
  margin-top: 1.5rem;
`;

const SubTaskList = styled(Paper)`
  min-height: calc(100vh - 19rem);
  height: calc(100vh - 19rem);
  overflow-y: auto;
  padding: 1rem;
  margin-top: 0.5rem;
`;

const CustomTextField = styled(TextField)`
  margin-bottom: 1rem;
`;

const NotesListItem = styled(ListItem)`
  background-color: #FDFFB6; /* Light yellow */
  box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.2);
  border-radius: 5px;
  font-size: 16px;
  color: #333;
  position: relative;
  margin-bottom: 1rem;
  text-align: center;
  justify-content: center;
  padding: 0.5rem 0;
`;

const SubmitButton = styled(Button)`
  margin-left: 1rem;
  align-content: center;
`;

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
      <Grid size={6}>
        <RightBoxContent>
          <TextField
            fullWidth
            label={category ? `Enter ${category} task` : 'Enter task'}
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={addNewTask} />

          {currentItems.length ? (<TaskListContent>
            {currentItems.map((task: Task, index: number) => (
              <div key={index}>
                <ListItem secondaryAction={
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
                </ListItem>
              </div>
            ))}
          </TaskListContent>) : (<span></span>)}

        </RightBoxContent>
      </Grid>
      {
        selectedTaskId != -1 ? (
          <Grid size={6}>
            <Card>
              <CardHeader
                action={<Checkbox />}
                title="Add Subtask"
              />
              <CardContent>
                <form onSubmit={handleSubmit}>
                  <CustomTextField
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
                  <CustomTextField
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
                  <SubmitButton variant="outlined" type="submit">Add Subtask</SubmitButton>
                </form>
              </CardContent>
            </Card>
            <SubTaskList>
              {currentItems.map((task: Task, index: number) => (
                <div key={index}>
                  {index === selectedTaskId ? (
                    <span>
                      {
                        task.subtasks.map((subTask: SubTask, stindex: number) => (
                          <div key={stindex}>
                            <NotesListItem disablePadding alignItems="flex-start">
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
                            </NotesListItem>
                          </div>
                        ))
                      }
                    </span>

                  ) : (
                    <span></span>
                  )}
                </div>
              ))}
            </SubTaskList>
          </Grid>) : (<span></span>)
      }

    </Grid>
  );
}
