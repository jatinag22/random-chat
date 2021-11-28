import { SwipeableDrawer, Drawer, useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { SxProps, Theme } from '@mui/system';
import MenuItems from './MenuItems';

type MenuDrawerProps = {
  open: boolean,
  onClose: () => void,
  onOpen: () => void,
};

const sxProp: SxProps<Theme> = {
  overflowX: 'hidden',
  overflow: 'overlay',
  marginTop: '48px',
  height: 'calc(100% - 48px)',
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
          PaperProps={{ sx: sxProp }}
        >
          <MenuItems />
        </SwipeableDrawer>
      ) : (
        <Drawer
          anchor="left"
          open={open}
          variant="persistent"
          PaperProps={{ sx: sxProp }}
        >
          <MenuItems />
        </Drawer>
      )}
    </>
  );
};

export default MenuDrawer;
