import { useCallback, useState } from 'react';
import MenuDrawer from './MenuDrawer';
import TopBar from './TopBar';

const NavBar = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const toggleDrawer = useCallback(() => {
    setIsDrawerOpen((state) => !state);
  }, []);

  return (
    <>
      <TopBar
        isDrawerOpen={isDrawerOpen}
        toggleDrawer={toggleDrawer}
      />
      <MenuDrawer
        open={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        onOpen={() => setIsDrawerOpen(true)}
      />
    </>
  );
};

export default NavBar;
