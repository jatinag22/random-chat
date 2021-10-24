import { useCallback, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { toggleMenuDrawer } from '../../redux/reducers/actions';
import Login from '../Login';
import MenuDrawer from './MenuDrawer';
import TopBar from './TopBar';

const NavBar = () => {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const { isMenuDrawerOpen } = useAppSelector((state) => state.app);
  const dispatch = useAppDispatch();

  const onOpenLoginModal = useCallback(() => {
    setIsLoginModalOpen(true);
  }, []);

  const onCloseLoginModal = useCallback(() => {
    setIsLoginModalOpen(false);
  }, []);

  const toggleDrawer = useCallback((open) => {
    dispatch(toggleMenuDrawer({
      open,
    }));
  }, []);

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
      <Login
        open={isLoginModalOpen}
        handleClose={onCloseLoginModal}
      />
    </>
  );
};

export default NavBar;
