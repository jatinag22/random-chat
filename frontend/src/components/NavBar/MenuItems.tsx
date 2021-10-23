import {
  Divider, Box, List, ListItem, ListItemIcon, ListItemText,
} from '@mui/material';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import DarkModeSwitch from './DarkModeSwitch';

const MenuItems = () => (
  <Box
    sx={{ width: 250 }}
    role="presentation"
  >
    <List>
      {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
        <ListItem button key={text}>
          <ListItemIcon>
            {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
          </ListItemIcon>
          <ListItemText primary={text} />
        </ListItem>
      ))}
    </List>
    <Divider />
    <List>
      <ListItem>
        <ListItemIcon>
          <DarkModeSwitch />
        </ListItemIcon>
        <ListItemText primary="Dark Mode" />
      </ListItem>
    </List>
  </Box>
);

export default MenuItems;
