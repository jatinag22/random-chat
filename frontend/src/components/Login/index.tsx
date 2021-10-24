import {
  Close as CloseIcon,
  Visibility as VisibilityIcon,
  VisibilityOff as VisibilityOffIcon,
} from '@mui/icons-material';
import {
  Button, Checkbox, TextField, FormControlLabel, IconButton, InputAdornment,
  Dialog, DialogActions, DialogContent, DialogTitle,
  useMediaQuery, useTheme,
} from '@mui/material';
import { Box } from '@mui/system';
import { ChangeEvent, useCallback, useState } from 'react';

type LoginProps = {
  open: boolean,
  handleClose: () => void,
};

const initialFormState = {
  username: '',
  password: '',
  rememberMe: false,
  showPassword: false,
  forgotPassword: false,
  type: 'login',
};

const Login = ({ open, handleClose }: LoginProps) => {
  const [form, setForm] = useState(initialFormState);
  const theme = useTheme();
  const isExtraSmallWidth = useMediaQuery(theme.breakpoints.down('sm'));

  const onChangeForm = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setForm((current) => ({
      ...current,
      [e.target.name]: e.target.type === 'checkbox' ? e.target.checked : e.target.value,
    }));
  }, []);

  const togglePasswordVisibility = useCallback(() => {
    setForm((current) => ({
      ...current,
      showPassword: !current.showPassword,
    }));
  }, []);

  const toggleForgotPassword = useCallback(() => {
    setForm((current) => ({
      ...current,
      forgotPassword: !current.forgotPassword,
    }));
  }, []);

  const onSubmitForm = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
  }, []);

  const onCloseModal = useCallback(() => {
    setForm(initialFormState);
    handleClose();
  }, []);

  return (
    <Dialog
      fullScreen={isExtraSmallWidth}
      open={open}
      onClose={onCloseModal}
      aria-labelledby="login"
      maxWidth="xs"
      fullWidth
    >

      <DialogTitle>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          {form.forgotPassword ? 'Reset Password' : 'Login'}
          <IconButton
            aria-label="close modal"
            onClick={onCloseModal}
          >
            <CloseIcon />
          </IconButton>
        </Box>
      </DialogTitle>

      <DialogContent>
        <Box
          component="form"
          onSubmit={onSubmitForm}
        >
          <TextField
            required
            fullWidth
            autoFocus
            margin="normal"
            name="username"
            label="Username"
            placeholder="Username"
            autoComplete="username"
            value={form.username}
            onChange={onChangeForm}
          />
          <TextField
            required
            fullWidth
            margin="normal"
            name="password"
            type={form.showPassword ? 'text' : 'password'}
            label="Password"
            placeholder="Password"
            value={form.password}
            onChange={onChangeForm}
            sx={form.forgotPassword ? { display: 'none' } : undefined}
            hidden={form.forgotPassword}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    edge="end"
                    onClick={togglePasswordVisibility}
                  >
                    {form.showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          <FormControlLabel
            label="Remember me"
            control={(
              <Checkbox
                color="primary"
                name="rememberMe"
                checked={form.rememberMe}
                onChange={onChangeForm}
              />
            )}
            sx={form.forgotPassword ? { display: 'none' } : undefined}
          />
          <DialogActions sx={{ flexDirection: 'column' }}>
            <Button
              type="submit"
              fullWidth
              size="large"
              variant="contained"
              sx={{ marginBottom: theme.spacing(1) }}
            >
              {form.forgotPassword ? 'Reset Password' : 'Login'}
            </Button>
            <Button
              fullWidth
              size="small"
              onClick={toggleForgotPassword}
            >
              {form.forgotPassword ? 'Back to Login' : 'Forgot Password?'}
            </Button>
            <Button
              fullWidth
              size="small"
            >
              Create a New Account
            </Button>
          </DialogActions>
        </Box>
      </DialogContent>

    </Dialog>
  );
};

export default Login;
