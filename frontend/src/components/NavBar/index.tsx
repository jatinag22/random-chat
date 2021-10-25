import { useCallback, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { toggleMenuDrawer } from '../../redux/reducers/actions';
import Login from '../Login';
import MenuDrawer from './MenuDrawer';
import TopBar from './TopBar';

type LoginModalType = 'login' | 'signup';

const NavBar = () => {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [loginModalType, setLoginModalType] = useState<LoginModalType>('login');
  const { isMenuDrawerOpen } = useAppSelector((state) => state.app);
  const dispatch = useAppDispatch();

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
