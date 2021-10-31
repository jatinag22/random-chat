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
import { useCallback, useEffect, useState } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { joiResolver } from '@hookform/resolvers/joi';
import Joi from 'joi';
import { LoginModalType } from './types';

type LoginProps = {
  open: boolean,
  handleClose: () => void,
  type?: LoginModalType,
};

type FormValues = {
  username: string,
  password: string,
  confirmPassword: string,
  rememberMe: boolean,
};

type FormState = {
  showPassword: boolean,
  showConfirmPassword: boolean,
  type: LoginModalType,
};

const initialFormValues: FormValues = {
  username: '',
  password: '',
  confirmPassword: '',
  rememberMe: false,
};

const initialFormState: FormState = {
  showPassword: false,
  showConfirmPassword: false,
  type: 'login',
};

const schema = Joi.object({
  username: Joi.string()
    .pattern(/^[a-zA-Z0-9._]*$/)
    .message('{#key} can contain only letters, numbers, . and _')
    .pattern(/^(?=.*[A-Z])|(?=.*[a-z]).$/)
    .message('{#key} must contain at least one letter')
    .min(4)
    .max(15)
    .required(),
  password: Joi.string()
    .pattern(/^(?=.*[A-Z])(?=.*[^\dA-Za-z])(?=.*[0-9])(?=.*[a-z]).*$/)
    .message('{#key} must contain a mixture of uppercase and lowercase letters, numbers and special characters')
    .min(8)
    .max(30)
    .required(),
  confirmPassword: Joi.ref('password'),
}).with('password', 'confirmPassword')
  .messages({
    'string.empty': '{#key} is required',
    'string.min': '{#key} must have a minimum length of {#limit}',
    'string.max': '{#key} must have a maximum length of {#limit}',
    'any.required': '{#key} is required',
    'any.only': 'must be same as {#valids.0.key}',
  });

const Login = ({ open, handleClose, type }: LoginProps) => {
  const [form, setForm] = useState({ ...initialFormState, type });
  const [modalTitle, setModalTitle] = useState('login');
  const [buttonLabel, setButtonLabel] = useState('Login');
  const theme = useTheme();
  const isExtraSmallWidth = useMediaQuery(theme.breakpoints.down('sm'));

  const {
    register, formState: { errors }, handleSubmit, control, reset,
  } = useForm<FormValues>({
    defaultValues: initialFormValues,
    resolver: joiResolver(schema),
  });

  const togglePasswordVisibility = useCallback((e) => {
    setForm((current) => ({
      ...current,
      [e?.currentTarget?.ariaLabel === 'toggle password visibility' ? 'showPassword' : 'showConfirmPassword']:
        !current[e?.currentTarget?.ariaLabel === 'toggle password visibility' ? 'showPassword' : 'showConfirmPassword'],
    }));
  }, []);

  const toggleFormType = useCallback((newType: LoginModalType) => {
    reset();
    setForm(() => ({
      ...initialFormState,
      type: newType,
    }));
  }, []);

  const onSubmitForm: SubmitHandler<FormState> = useCallback((data) => {
    // eslint-disable-next-line no-console
    console.log(data);
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
    switch (form.type) {
      case 'login':
        setModalTitle('Login');
        setButtonLabel('Login');
        break;
      case 'signup':
        setModalTitle('Sign Up');
        setButtonLabel('Sign Up');
        break;
      case 'reset':
        setModalTitle('Reset Password');
        setButtonLabel('Reset Password');
        break;
      default:
    }
  }, [form.type]);

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
          onSubmit={handleSubmit(onSubmitForm)}
          noValidate
        >
          <TextField
            fullWidth
            autoFocus
            margin="normal"
            type="text"
            label="Username"
            placeholder="Username or Email"
            autoComplete="username"
            inputProps={{ ...register('username', { required: 'Username is required' }) }}
            error={!!errors.username}
            helperText={errors?.username?.message}
          />

          <TextField
            fullWidth
            margin="normal"
            type={form.showPassword ? 'text' : 'password'}
            label="Password"
            placeholder="Password"
            autoComplete="current-password"
            sx={form.type === 'reset' ? { display: 'none' } : undefined}
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
            inputProps={{ ...register('password', { disabled: form.type === 'reset' }) }}
            error={!!errors.password}
            helperText={errors?.password?.message}
          />

          <TextField
            fullWidth
            margin="normal"
            type={form.showConfirmPassword ? 'text' : 'password'}
            label="Confirm Password"
            placeholder="Confirm Password"
            autoComplete="current-password"
            sx={form.type === 'signup' ? undefined : { display: 'none' }}
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
            inputProps={{ ...register('confirmPassword', { disabled: form.type !== 'signup' }) }}
            error={!!errors.confirmPassword}
            helperText={errors?.confirmPassword?.message}
          />

          <Controller
            control={control}
            name="rememberMe"
            render={({ field: { value, onChange } }) => (
              <FormControlLabel
                label="Remember me"
                control={(
                  <Checkbox
                    color="primary"
                    onChange={(e) => onChange(e.target.checked)}
                    checked={value}
                  />
                )}
                sx={form.type !== 'login' ? { display: 'none' } : undefined}
                disabled={form.type !== 'login'}
              />
            )}
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
              onClick={() => toggleFormType(form.type === 'login' ? 'reset' : 'login')}
              sx={form.type === 'signup' ? { display: 'none' } : undefined}
            >
              {form.type === 'reset' ? 'Back to Login' : 'Forgot Password?'}
            </Button>

            <Button
              fullWidth
              size="small"
              onClick={() => toggleFormType(form.type === 'login' ? 'signup' : 'login')}
              sx={form.type === 'reset' ? { display: 'none' } : undefined}
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
