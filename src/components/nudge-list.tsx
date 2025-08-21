import * as StyleClasses from "./../styles/nudges.styles";
import AddToQueueRoundedIcon from '@mui/icons-material/AddToQueueRounded';
import AccountCircleRoundedIcon from '@mui/icons-material/AccountCircleRounded';
import HomeRepairServiceRoundedIcon from '@mui/icons-material/HomeRepairServiceRounded';
import { List, ListItem, ListItemButton, ListItemIcon, ListItemText } from "@mui/material";

interface NudgeListProps {
  onSelect: (text: string) => void;
}

export default function NudgeList({ onSelect }: NudgeListProps) {
  return (
    <StyleClasses.LeftBox elevation={3}>
      <nav aria-label="main mailbox folders">
        <List>
          <ListItem disablePadding>
            <ListItemButton onClick={() => onSelect("Personal")}>
              <ListItemIcon>
                <AccountCircleRoundedIcon />
              </ListItemIcon>
              <ListItemText primary="Personal" />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton onClick={() => onSelect("Work")}>
              <ListItemIcon>
                <HomeRepairServiceRoundedIcon />
              </ListItemIcon>
              <ListItemText primary="Work" />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton onClick={() => onSelect("Others")}>
              <ListItemIcon>
                <AddToQueueRoundedIcon />
              </ListItemIcon>
              <ListItemText primary="Others" />
            </ListItemButton>
          </ListItem>
        </List>
      </nav>
    </StyleClasses.LeftBox>

  );
}