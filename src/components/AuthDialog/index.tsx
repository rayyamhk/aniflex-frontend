import React, { useEffect, useState } from 'react';
import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import LoadingButton from '@mui/lab/LoadingButton';
import useTranslate from '../../hooks/useTranslate';
import { InputField, RememberMeCheckbox } from './components';

const EMAIL_REGEX = /^[a-z0-9!#$%&'*+-/=?^_`{|}~]+(?:\.[a-z0-9!#$%&'*+-/=?^_`{|}~])*@[a-z0-9][-a-z0-9]*(?:\.[-a-z0-9]+)*\.[-a-z0-9]*[a-z0-9]$/i;
const USERNAME_REGEX = /^(?!.*\.\.)(?!.*\.$)[^\W][\w.]{0,15}$/;
const PASSWORD_REGEX = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])/;

const defaultSigninState = {
  email: '',
  password: '',
  rememberMe: false,
};

const defaultSignupState = {
  email: '',
  username: '',
  password: '',
  confirmedPassword: '',
};

type Action = 'signin' | 'signup';

type ChangeEvent = React.ChangeEvent<HTMLInputElement>;

type AuthDialogProps = {
  onClose: () => void,
  open: boolean,
};

export default function AuthDialog(props: AuthDialogProps) {
  const {
    onClose,
    open,
  } = props;
  const translate = useTranslate();

  const [action, setAction] = useState<Action>('signin');
  const [signinState, setSigninState] = useState(defaultSigninState);
  const [signupState, setSignupState] = useState(defaultSignupState);
  const [errorMessage, setErrorMessage] = useState<string|null>();
  const [loading, setLoading] = useState(false);
  // reset the dialog whenever users close it
  useEffect(() => {
    if (open) return;
    setAction('signin');
    setSigninState(defaultSigninState);
    setSignupState(defaultSignupState);
    setErrorMessage(null);
  }, [open]);

  const onOpenSignup = () => {
    setAction('signup');
    setSignupState(defaultSignupState);
    setErrorMessage(null);
  };
  const onCloseSignup = () => {
    setAction('signin');
    setSigninState({ ...signinState, password: '' });
    setErrorMessage(null);
  };
  const onCloseErrorMessage = () => setErrorMessage(null);
  const onEmailChange = (e: ChangeEvent) => {
    const email = e.target.value;
    if (action === 'signin') setSigninState({ ...signinState, email });
    else setSignupState({ ...signupState, email });
  };
  const onUsernameChange = (e: ChangeEvent) => {
    if (action === 'signin') return;
    setSignupState({ ...signupState, username: e.target.value });
  }
  const onPasswordChange = (e: ChangeEvent) => {
    const password = e.target.value;
    if (action === 'signin') setSigninState({ ...signinState, password });
    else setSignupState({ ...signupState, password });
  };
  const onConfirmedPasswordChange = (e: ChangeEvent) => {
    if (action === 'signin') return;
    else setSignupState({ ...signupState, confirmedPassword: e.target.value });
  };
  const onRememberMeChange = () => setSigninState((prev) => ({ ...prev, rememberMe: !prev.rememberMe }));
  const onSignin = async () => {
    const {
      email,
      password,
    } = signinState;
    if (!email || !password) return setErrorMessage(translate('required-fields-missing'));
    if (!EMAIL_REGEX.test(email) || password.length < 8 || !PASSWORD_REGEX.test(password))
      return setErrorMessage(translate('authentication-failed'));
    try {
      setLoading(true);
    } catch (err) {
      setErrorMessage(err as string);
    } finally {
      setLoading(false);
    }
  };
  const onSignup = async () => {
    const {
      email,
      username,
      password,
      confirmedPassword,
    } = signupState;
    if (!email || !username || !password || !confirmedPassword) return setErrorMessage(translate('required-fields-missing'));
    if (!EMAIL_REGEX.test(email)) return setErrorMessage(translate('invalid-email'));
    if (!USERNAME_REGEX.test(username)) return setErrorMessage(translate('username-requirements'));
    if (password.length < 8 || !PASSWORD_REGEX.test(password)) return setErrorMessage(translate('password-requirements'));
    if (confirmedPassword !== password) return setErrorMessage(translate('password-not-match'));
    setAction('signin');
    setSigninState({ email, password: '', rememberMe: false });
    setErrorMessage(null);
    try {
      setLoading(true);
    } catch (err) {
      setErrorMessage(err as string);
    } finally {
      setLoading(false);
    }
  }

  return (
    <Dialog
      open={open}
      onClose={onClose}
    >
      <DialogTitle sx={{ fontSize: 'h3.fontSize' }}>
        {translate(action === 'signin' ? 'signin-title' : 'signup-title')}
      </DialogTitle>
      <DialogContent>
        {errorMessage && (
          <Alert
            severity='error'
            onClose={onCloseErrorMessage}
          >
            {errorMessage}
          </Alert>
        )}
        <InputField
          autoFocus
          label={translate('email')}
          value={action === 'signin' ? signinState.email : signupState.email}
          placeholder='email@example.com'
          type='email'
          onChange={onEmailChange}
        />
        {action !== 'signin' && (
          <InputField
            label={translate('username')}
            value={signupState.username}
            helperText={translate('username-requirements')}
            type='text'
            onChange={onUsernameChange}
          />
        )}
        <InputField
          label={translate('password')}
          helperText={action === 'signin' ? undefined : translate('password-requirements')}
          value={action === 'signin' ? signinState.password : signupState.password}
          type='password'
          onChange={onPasswordChange}
        />
        {action !== 'signin' && (
          <InputField
            label={translate('confirmed-password')}
            value={signupState.confirmedPassword}
            type='password'
            onChange={onConfirmedPasswordChange}
          />
        )}
        {action === 'signin' && (
          <RememberMeCheckbox
            checked={signinState.rememberMe}
            label={translate('remember-me')}
            onChange={onRememberMeChange}
          />
        )}
      </DialogContent>
      {action === 'signin' ? (
        <DialogActions sx={{ px: 3, pb: 2 }}>
          <LoadingButton
            onClick={onSignin}
            variant='contained'
            loading={loading}
          >
            {translate('signin')}
          </LoadingButton>
          <Button
            variant='outlined'
            onClick={onOpenSignup}
            disabled={loading}
          >
            {translate('signup')}
          </Button>
        </DialogActions>
      ): (
        <DialogActions sx={{ px: 3, pb: 2 }}>
          <LoadingButton
            onClick={onSignup}
            variant='contained'
            loading={loading}
          >
            {translate('signup')}
          </LoadingButton>
          <Button
            variant='outlined'
            onClick={onCloseSignup}
            disabled={loading}
          >
            {translate('back')}
          </Button>
        </DialogActions>
      )}
    </Dialog>
  );
}