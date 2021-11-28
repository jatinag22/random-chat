import { useMediaQuery, useTheme } from '@mui/material';
import { useCallback, useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { toggleMenuDrawer } from '../../redux/reducers/actions';
import Login from '../Login';
import { LoginModalType } from '../Login/types';
import MenuDrawer from './MenuDrawer';
import TopBar from './TopBar';

const NavBar = () => {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [loginModalType, setLoginModalType] = useState<LoginModalType>('login');
  const { isMenuDrawerOpen } = useAppSelector((state) => state.app);
  const dispatch = useAppDispatch();
  const theme = useTheme();
  const isExtraSmallWidth = useMediaQuery(theme.breakpoints.down('sm'));

  const onOpenLoginModal = useCallback((type?: LoginModalType) => {
    setLoginModalType(type || 'login');
    setIsLoginModalOpen(true);
  }, []);

  const onCloseLoginModal = useCallback(() => {
    setIsLoginModalOpen(false);
  }, []);

  const toggleDrawer = useCallback((open) => {
    dispatch(toggleMenuDrawer({
      open,
      updateStorage: !isExtraSmallWidth,
    }));
  }, [isExtraSmallWidth]);

  useEffect(() => {
    if (isExtraSmallWidth) {
      dispatch(toggleMenuDrawer({
        open: false,
      }));
    } else {
      const drawerStateFromStorage = localStorage.getItem('drawer');

      dispatch(toggleMenuDrawer({
        open: drawerStateFromStorage === 'open',
      }));
    }
  }, [isExtraSmallWidth]);

  return (
    <>
      <TopBar
        isDrawerOpen={isMenuDrawerOpen}
        toggleDrawer={toggleDrawer}
        handleOpenLoginModal={onOpenLoginModal}
      />
      <MenuDrawer
        open={isMenuDrawerOpen}
        onClose={() => toggleDrawer(false)}
        onOpen={() => toggleDrawer(true)}
      />
      {isLoginModalOpen && (
        <Login
          open={isLoginModalOpen}
          handleClose={onCloseLoginModal}
          type={loginModalType}
        />
      )}
    </>
  );
};

export default NavBar;
