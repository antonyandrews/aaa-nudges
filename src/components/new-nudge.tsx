import { Button, Checkbox, Grid, List, ListItem, ListItemText, Paper, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import styled from "styled-components";


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

const RightBox = styled(Paper)`
  height: 100vh;
`;

const RightBoxContent = styled(Paper)`
  height: 100vh;
  padding: 1rem;
`;

const SubTaskList = styled(Paper)`
  height: 50vh;
  padding: 1rem;
`;

const SubtaskHeader = styled(Typography)`
  font-size: 1.5em;
  text-align: center;
`;

const CustomTextField = styled(TextField)`
  margin-right: 0.5rem;
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
      } else {
        return { ...item, done: false };
      }
    })
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

          <List>
            {currentItems.map((task: Task, index: number) => (
              <div key={index}>
                <ListItem disablePadding>
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
          </List>
        </RightBoxContent>
      </Grid>
      {
        selectedTaskId != -1 ? (
          <Grid size={6}>
            <RightBoxContent>
              <SubtaskHeader>Add Subtask</SubtaskHeader>
              <form onSubmit={handleSubmit}>
                <CustomTextField
                    label="Enter Subtask"
                    value={subtaskTitle}
                    onChange={(e) => handleTitleChange(e)}
                  />
                <CustomTextField
                    label="Enter Date"
                    value={subtaskDate}
                    onChange={(e) => handleDateChange(e)}
                  />
                <Button variant="outlined" type="submit">Submit</Button>
              </form>
              <SubTaskList>
                {currentItems.map((task: Task, index: number) => (
                  <div key={index}>
                    {index === selectedTaskId ? (
                      <span>
                        {
                          task.subtasks.map((subTask: SubTask, stindex: number) => (
                            <div key={stindex}>
                              <ListItem disablePadding>
                                <Checkbox
                                  checked={subTask.done}
                                  onChange={() => handleToggleTask(index)}
                                />
                                <ListItemText
                                  primary={subTask.name}
                                  secondary={
                                    task.subtasks.length > 0
                                      ? `${task.subtasks[stindex].date}`
                                      : null
                                  }
                                />
                              </ListItem>
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
            </RightBoxContent>
          </Grid>) : (<span></span>)
      }

    </Grid>
  );
}
