import { Box, Button, List, ListItem, Paper, TextField } from "@mui/material";
import styled from "styled-components";

export const StyledButton = styled.button`
  padding: 10px 20px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: #0056b3;
  }
`;

export const LeftBox = styled(Paper)`
  height: calc(100vh - 3rem);
`;

export const RightBoxContent = styled(Paper)`
  padding: 1rem;
  min-height: calc(100vh - 3rem);
`;

export const TaskListContent = styled(List)`
  height: calc(100vh - 9rem);
  min-height: calc(100vh - 9rem);
  overflow-y: auto;
  margin-top: 1.5rem;
`;

export const TaskListItem = styled(ListItem)`
  border-radius: 1rem;
  border: 1px solid grey;
  top: 0
  transition: top ease 0.5s;
  margin-bottom: 0.8rem;

  &:hover {
    top: -5px;
  }
`;

export const SubTaskList = styled(Paper)`
  min-height: calc(100vh - 19rem);
  height: calc(100vh - 19rem);
  overflow-y: auto;
  padding: 1rem;
  margin-top: 0.5rem;
`;

export const CustomTextField = styled(TextField)`
  margin-bottom: 1rem;
`;

export const NotesListItem = styled(ListItem)`
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

export const SubmitButton = styled(Button)`
  margin-left: 1rem;
  align-content: center;
`;