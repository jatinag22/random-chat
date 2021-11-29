import {
  Divider, Box, List, ListItem, ListItemIcon, ListItemText, useMediaQuery, useTheme,
} from '@mui/material';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import DarkModeListItem from './DarkModeListItem';

const MenuItems = () => {
  const theme = useTheme();
  const isExtraSmallWidth = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Box role="presentation" width={isExtraSmallWidth ? '240px' : 'auto'}>
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
        <DarkModeListItem />
      </List>
    </Box>
  );
};

export default MenuItems;
