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
import {
  ChangeEvent, useCallback, useEffect, useState,
} from 'react';

type LoginModalType = 'login' | 'signup';

type LoginProps = {
  open: boolean,
  handleClose: () => void,
  type?: LoginModalType,
};

type FormState = {
  username: string,
  password: string,
  confirmPassword: string,
  rememberMe: boolean,
  showPassword: boolean,
  showConfirmPassword: boolean,
  forgotPassword: boolean,
  type: LoginModalType,
};

const initialFormState: FormState = {
  username: '',
  password: '',
  confirmPassword: '',
  rememberMe: false,
  showPassword: false,
  showConfirmPassword: false,
  forgotPassword: false,
  type: 'login',
};

const Login = ({ open, handleClose, type }: LoginProps) => {
  const [form, setForm] = useState({ ...initialFormState, type });
  const [modalTitle, setModalTitle] = useState('login');
  const [buttonLabel, setButtonLabel] = useState('Login');
  const theme = useTheme();
  const isExtraSmallWidth = useMediaQuery(theme.breakpoints.down('sm'));

  const onChangeForm = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setForm((current) => ({
      ...current,
      [e.target.name]: e.target.type === 'checkbox' ? e.target.checked : e.target.value,
    }));
  }, []);

  const togglePasswordVisibility = useCallback((e) => {
    setForm((current) => ({
      ...current,
      [e.currentTarget.ariaLabel === 'toggle password visibility' ? 'showPassword' : 'showConfirmPassword']:
        !current[e.currentTarget.ariaLabel === 'toggle password visibility' ? 'showPassword' : 'showConfirmPassword'],
    }));
  }, []);

  const toggleForgotPassword = useCallback(() => {
    setForm((current) => ({
      ...current,
      forgotPassword: !current.forgotPassword,
    }));
  }, []);

  const toggleFormType = useCallback(() => {
    setForm((current) => ({
      ...initialFormState,
      type: current.type === 'login' ? 'signup' : 'login',
    }));
  }, []);

  const onSubmitForm = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
  }, []);

  const onCloseModal = useCallback(() => {
    setForm(initialFormState);
    handleClose();
  }, []);

  useEffect(() => {
    setForm((current) => ({
      ...current,
      type,
    }));
  }, [type]);

  useEffect(() => {
    if (form.type === 'login') {
      setModalTitle(form.forgotPassword ? 'Reset Password' : 'Login');
      setButtonLabel(form.forgotPassword ? 'Reset Password' : 'Login');
    } else {
      setModalTitle('Sign Up');
      setButtonLabel('Sign Up');
    }
  }, [form.type, form.forgotPassword]);

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
          {modalTitle}
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
          <TextField
            required
            fullWidth
            margin="normal"
            name="confirmPassword"
            type={form.showConfirmPassword ? 'text' : 'password'}
            label="Confirm Password"
            placeholder="Confirm Password"
            value={form.confirmPassword}
            onChange={onChangeForm}
            sx={form.type === 'login' ? { display: 'none' } : undefined}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle confirm password visibility"
                    edge="end"
                    onClick={togglePasswordVisibility}
                  >
                    {form.showConfirmPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
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
            sx={form.forgotPassword || form.type === 'signup' ? { display: 'none' } : undefined}
          />
          <DialogActions sx={{ flexDirection: 'column' }}>
            <Button
              type="submit"
              fullWidth
              size="large"
              variant="contained"
              sx={{ marginBottom: theme.spacing(1) }}
            >
              {buttonLabel}
            </Button>
            <Button
              fullWidth
              size="small"
              onClick={toggleForgotPassword}
              sx={form.type === 'signup' ? { display: 'none' } : undefined}
            >
              {form.forgotPassword ? 'Back to Login' : 'Forgot Password?'}
            </Button>
            <Button
              fullWidth
              size="small"
              onClick={toggleFormType}
            >
              {form.type === 'signup' ? 'Already Have an Account?' : 'Create a New Account'}
            </Button>
          </DialogActions>
        </Box>
      </DialogContent>

    </Dialog>
  );
};

Login.defaultProps = {
  type: 'login',
};

export default Login;
