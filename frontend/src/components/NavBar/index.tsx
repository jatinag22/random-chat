import {
  Box, AppBar, Toolbar, IconButton, Typography, Button, Grid,
} from '@mui/material';
import { Menu as MenuIcon } from '@mui/icons-material';

const NavBar = () => (
  <Box sx={{ flexGrow: 1 }}>
    <AppBar position="static">
      <Toolbar variant="dense">
        <Grid container alignItems="center" spacing={2}>
          <Grid item xs={2} sx={{ display: { sm: 'none' } }}>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>
          </Grid>
          <Grid item xs={6} sm={8}>
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
        </Grid>
      </Toolbar>
    </AppBar>
  </Box>
);

export default NavBar;
