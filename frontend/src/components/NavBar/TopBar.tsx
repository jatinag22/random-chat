import {
  Box, AppBar, Toolbar, IconButton, Typography, Button, Grid, useMediaQuery,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { Menu as MenuIcon, AccountCircle as UserIcon, ArrowBack as BackIcon } from '@mui/icons-material';

type TopBarProps = {
  isDrawerOpen: boolean,
  toggleDrawer: () => void,
};

const TopBar = ({ isDrawerOpen, toggleDrawer }: TopBarProps) => {
  const theme = useTheme();
  const isExtraSmallWidth = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="fixed" sx={{ zIndex: 999999 }}>
        <Toolbar variant="dense">
          <Grid container alignItems="center" spacing={2}>
            <Grid item xs={2} sm={1}>
              <IconButton
                size="large"
                edge="start"
                color="inherit"
                aria-label="menu"
                sx={{ mr: 2 }}
                onClick={toggleDrawer}
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
                <Button color="inherit">Login</Button>
              </Grid>
              <Grid item>
                <Button color="inherit">Sign Up</Button>
              </Grid>
            </Grid>
            <Grid item xs={2} sx={{ display: { xs: 'flex', sm: 'none' } }}>
              <IconButton
                size="large"
                edge="end"
                color="inherit"
                aria-label="user"
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
