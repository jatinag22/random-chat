import { useCallback } from 'react';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { toggleMenuDrawer } from '../../redux/reducers/actions';
import MenuDrawer from './MenuDrawer';
import TopBar from './TopBar';

const NavBar = () => {
  const { isMenuDrawerOpen } = useAppSelector((state) => state.app);
  const dispatch = useAppDispatch();

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
      />
      <MenuDrawer
        open={isMenuDrawerOpen}
        onClose={() => toggleDrawer(false)}
        onOpen={() => toggleDrawer(true)}
      />
    </>
  );
};

export default NavBar;
