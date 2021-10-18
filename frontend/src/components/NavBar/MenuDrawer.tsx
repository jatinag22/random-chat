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

  const drawerChildren = (
    <>
      <Toolbar variant="dense" />
      <MenuItems />
    </>
  );

  return (
    <>
      {isExtraSmallWidth ? (
        <SwipeableDrawer
          anchor="left"
          open={open}
          onClose={onClose}
          onOpen={onOpen}
        >
          {drawerChildren}
        </SwipeableDrawer>
      ) : (
        <Drawer
          anchor="left"
          open={open}
          variant="persistent"
        >
          {drawerChildren}
        </Drawer>
      )}
    </>
  );
};

export default MenuDrawer;
