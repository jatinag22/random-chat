import { SwipeableDrawer, Drawer, useMediaQuery } from '@mui/material';
import {
  useTheme, styled, CSSObject, Theme,
} from '@mui/material/styles';
import { SxProps } from '@mui/system';
import { fullMenuDrawerWidth, miniMenuDrawerWidth, topBarHeight } from '../../constants';
import MenuItems from './MenuItems';

type MenuDrawerProps = {
  open: boolean,
  onClose: () => void,
  onOpen: () => void,
};

const sxProp: SxProps<Theme> = {
  overflow: 'overlay',
  overflowX: 'hidden',
  marginTop: `${topBarHeight}px`,
  height: `calc(100% - ${topBarHeight}px)`,
};

const openedMixin = (theme: Theme): CSSObject => ({
  width: `${fullMenuDrawerWidth}px`,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
});

const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  width: `${miniMenuDrawerWidth}px`,
});

const DesktopDrawer = styled(Drawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    width: `${fullMenuDrawerWidth}px`,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    ...(open && {
      ...openedMixin(theme),
      '& .MuiDrawer-paper': openedMixin(theme),
    }),
    ...(!open && {
      ...closedMixin(theme),
      '& .MuiDrawer-paper': closedMixin(theme),
    }),
  }),
);

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
        <DesktopDrawer
          anchor="left"
          open={open}
          variant="permanent"
          PaperProps={{ sx: sxProp }}
        >
          <MenuItems />
        </DesktopDrawer>
      )}
    </>
  );
};

export default MenuDrawer;
