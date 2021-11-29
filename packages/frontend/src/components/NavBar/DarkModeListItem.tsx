import {
  Checkbox, ListItem, ListItemIcon, ListItemText, Tooltip, useMediaQuery, useTheme,
} from '@mui/material';
import { DarkMode as DarkModeIcon, LightMode as LightModeIcon } from '@mui/icons-material';
import { useCallback } from 'react';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { toggleTheme } from '../../redux/reducers/actions';

const DarkModeListItem = () => {
  const { theme, isMenuDrawerOpen } = useAppSelector((state) => state.app);
  const dispatch = useAppDispatch();
  const muiTheme = useTheme();
  const isExtraSmallWidth = useMediaQuery(muiTheme.breakpoints.down('sm'));

  const toggleDarkMode = useCallback(() => {
    dispatch(toggleTheme({}));
  }, []);

  const getTitle = () => (
    theme === 'dark' ? 'Light Mode' : 'Dark Mode'
  );

  return (
    <Tooltip
      title={!isExtraSmallWidth && !isMenuDrawerOpen ? getTitle() : ''}
      placement="right"
      componentsProps={{
        tooltip: {
          sx: {
            '&.MuiTooltip-tooltip.MuiTooltip-tooltipPlacementRight': {
              margin: '0px',
            },
          },
        },
      }}
    >
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
        <ListItemText primary={getTitle()} />
      </ListItem>
    </Tooltip>
  );
};

export default DarkModeListItem;
