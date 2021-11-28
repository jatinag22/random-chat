import {
  Checkbox, ListItem, ListItemIcon, ListItemText,
} from '@mui/material';
import { DarkMode as DarkModeIcon, LightMode as LightModeIcon } from '@mui/icons-material';
import { useCallback } from 'react';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { toggleTheme } from '../../redux/reducers/actions';

const DarkModeListItem = () => {
  const { theme } = useAppSelector((state) => state.app);
  const dispatch = useAppDispatch();

  const toggleDarkMode = useCallback(() => {
    dispatch(toggleTheme({}));
  }, []);

  return (
    <ListItem button onClick={toggleDarkMode}>
      <ListItemIcon>
        <Checkbox
          inputProps={{ 'aria-labelledby': 'toggle dark mode' }}
          checked={theme === 'dark'}
          icon={<DarkModeIcon />}
          checkedIcon={<LightModeIcon />}
          sx={{ padding: 0 }}
        />
      </ListItemIcon>
      <ListItemText primary="Dark Mode" />
    </ListItem>
  );
};

export default DarkModeListItem;
