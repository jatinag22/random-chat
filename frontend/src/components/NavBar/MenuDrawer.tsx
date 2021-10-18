import {
  SwipeableDrawer, Drawer, Toolbar, useMediaQuery,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import MenuItems from './MenuItems';

type MenuDrawerProps = {
  open: boolean,
  onClose: () => void,
  onOpen: () => void,
};

const MenuDrawer = ({ open, onClose, onOpen }: MenuDrawerProps) => {
  const theme = useTheme();
  const isExtraSmallWidth = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <>
      {isExtraSmallWidth ? (
        <SwipeableDrawer
          anchor="left"
          open={open}
          onClose={onClose}
          onOpen={onOpen}
        >
          <Toolbar />
          <MenuItems />
        </SwipeableDrawer>
      ) : (
        <Drawer
          anchor="left"
          open={open}
          variant="persistent"
        >
          <Toolbar />
          <MenuItems />
        </Drawer>
      )}
    </>
  );
};

export default MenuDrawer;
