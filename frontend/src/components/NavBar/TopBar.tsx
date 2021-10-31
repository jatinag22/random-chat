import {
  Box, AppBar, Toolbar, IconButton, Typography, Button, Grid, useMediaQuery,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { Menu as MenuIcon, AccountCircle as UserIcon, ArrowBack as BackIcon } from '@mui/icons-material';
import { LoginModalType } from '../Login/types';

type TopBarProps = {
  isDrawerOpen: boolean,
  toggleDrawer: (open?: string) => void,
  handleOpenLoginModal: (type?: LoginModalType) => void,
};

const TopBar = ({ isDrawerOpen, toggleDrawer, handleOpenLoginModal }: TopBarProps) => {
  const theme = useTheme();
  const isExtraSmallWidth = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="fixed">
        <Toolbar variant="dense">
          <Grid container alignItems="center" spacing={2}>
            <Grid item xs={2} sm={1}>
              <IconButton
                size="large"
                edge="start"
                color="inherit"
                aria-label="menu"
                sx={{ mr: 2 }}
                onClick={() => toggleDrawer()}
              >
                {isDrawerOpen && isExtraSmallWidth ? <BackIcon /> : <MenuIcon />}
              </IconButton>
            </Grid>
            <Grid item xs={8} sm={7}>
              <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                Random Chat
              </Typography>
            </Grid>
            <Grid
              item
              container
              sm={4}
              spacing={2}
              alignItems="center"
              justifyContent="flex-end"
              sx={{ display: { xs: 'none', sm: 'flex' } }}
            >
              <Grid item>
                <Button color="inherit" onClick={() => handleOpenLoginModal('login')}>Login</Button>
              </Grid>
              <Grid item>
                <Button color="inherit" onClick={() => handleOpenLoginModal('signup')}>Sign Up</Button>
              </Grid>
            </Grid>
            <Grid item xs={2} sx={{ display: { xs: 'flex', sm: 'none' } }}>
              <IconButton
                size="large"
                edge="end"
                color="inherit"
                aria-label="user"
                onClick={() => handleOpenLoginModal('login')}
              >
                <UserIcon />
              </IconButton>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default TopBar;
