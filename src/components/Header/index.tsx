import React, { Children, ElementType, ReactNode, useState } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import LoginIcon from '@mui/icons-material/Login';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MuiLink from '@mui/material/Link';
import { styled } from '@mui/material/styles';
import Switch from '@mui/material/Switch';
import Toolbar from '@mui/material/Toolbar';
import Tooltip from '@mui/material/Tooltip';
import AccountCircle from '@mui/icons-material/AccountCircle';
import GTranslateIcon from '@mui/icons-material/GTranslate';
import Link from '../Link';
import AuthDialog from '../AuthDialog';
import ResponsiveContainer from '../ResponsiveContainer';
import useTheme from '../../hooks/useTheme';
import useTranslate from '../../hooks/useTranslate';
import logo from '../../static/images/brand-light.png';
import useAuth from '../../hooks/useAuth';

const Offset = styled('div')(({ theme }) => theme.mixins.toolbar);
const MaterialUISwitch = styled(Switch)(({ checked }) => ({
  width: 62,
  height: 34,
  padding: 7,
  '& .MuiSwitch-switchBase': {
    margin: 1,
    padding: 0,
    transform: 'translateX(6px)',
    '&.Mui-checked': {
      color: '#fff',
      transform: 'translateX(22px)',
      '& .MuiSwitch-thumb:before': {
        backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 20 20"><path fill="${encodeURIComponent(
          '#fff',
        )}" d="M4.2 2.5l-.7 1.8-1.8.7 1.8.7.7 1.8.6-1.8L6.7 5l-1.9-.7-.6-1.8zm15 8.3a6.7 6.7 0 11-6.6-6.6 5.8 5.8 0 006.6 6.6z"/></svg>')`,
      },
      '& + .MuiSwitch-track': {
        opacity: 1,
        backgroundColor: checked ? '#8796A5' : '#aab4be',
      },
    },
  },
  '& .MuiSwitch-thumb': {
    backgroundColor: checked ? '#003892' : '#001e3c',
    width: 32,
    height: 32,
    '&:before': {
      content: "''",
      position: 'absolute',
      width: '100%',
      height: '100%',
      left: 0,
      top: 0,
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'center',
      backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 20 20"><path fill="${encodeURIComponent(
        '#fff',
      )}" d="M9.305 1.667V3.75h1.389V1.667h-1.39zm-4.707 1.95l-.982.982L5.09 6.072l.982-.982-1.473-1.473zm10.802 0L13.927 5.09l.982.982 1.473-1.473-.982-.982zM10 5.139a4.872 4.872 0 00-4.862 4.86A4.872 4.872 0 0010 14.862 4.872 4.872 0 0014.86 10 4.872 4.872 0 0010 5.139zm0 1.389A3.462 3.462 0 0113.471 10a3.462 3.462 0 01-3.473 3.472A3.462 3.462 0 016.527 10 3.462 3.462 0 0110 6.528zM1.665 9.305v1.39h2.083v-1.39H1.666zm14.583 0v1.39h2.084v-1.39h-2.084zM5.09 13.928L3.616 15.4l.982.982 1.473-1.473-.982-.982zm9.82 0l-.982.982 1.473 1.473.982-.982-1.473-1.473zM9.305 16.25v2.083h1.389V16.25h-1.39z"/></svg>')`,
    },
  },
  '& .MuiSwitch-track': {
    opacity: 1,
    backgroundColor: checked ? '#8796A5' : '#aab4be',
    borderRadius: 20 / 2,
  },
}));

export default function Header() {
  const [authOpen, setAuthOpen] = useState(false);
  const { pathname, query, locale } = useRouter();
  const [theme, setTheme] = useTheme();
  const translate = useTranslate();
  const { user, signOut } = useAuth();

  const i18nHref = { pathname, query };

  const onAuthOpen = () => setAuthOpen(true);
  const onAuthClose = () => setAuthOpen(false);
  const onSignOut = () => signOut();
  
  return (
    <>
      <AppBar position='fixed'>
        <ResponsiveContainer>
          <Toolbar disableGutters>
            <Link
              href='/'
              underline='none'
              sx={{
                '& img': {
                  verticalAlign: 'bottom',
                },
              }}
            >
              <Image
                src={logo}
                alt='Website Logo'
                priority
              />
            </Link>
            <Box sx={{ flexGrow: 1 }} />
            <Tooltip title={theme === 'dark' ? translate('lightmode') : translate('darkmode')}>
              <MaterialUISwitch
                checked={theme === 'dark'}
                onChange={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              />
            </Tooltip>
            <IconMenu
              activeIndex={locale === 'en-US' ? 0 : 1}
              Icon={GTranslateIcon}
              id='i18n'
              title={translate('language')}
            >
              <Link
                href={i18nHref}
                locale='en-US'
                underline='none'
                variant='body1'
                sx={{ color: 'text.primary' }}
              >
                🇺🇸 English
              </Link>
              <Link
                href={i18nHref}
                locale='zh-HK'
                underline='none'
                variant='body1'
                sx={{ color: 'text.primary' }}
              >
                🇭🇰 中文
              </Link>
            </IconMenu>
            {!user && (
              <Tooltip title={translate('signin')}>
                <IconButton
                  size='large'
                  sx={{ color: 'common.white' }}
                  onClick={onAuthOpen}
                >
                  {<LoginIcon />}
                </IconButton>
              </Tooltip>
            )}
            {!user && (
              <AuthDialog
                open={authOpen}
                onClose={onAuthClose}
              />
            )}
            {user && (
              <IconMenu
                Icon={AccountCircle}
                id='user'
                title={translate('user-options')}
              >
                <Link
                  href='/dashboard'
                  underline='none'
                  variant='body1'
                  sx={{ color: 'text.primary' }}
                >
                  {translate('user-dashboard')}
                </Link>
                <MuiLink
                  component='button'
                  underline='none'
                  variant='body1'
                  sx={{ color: 'text.primary' }}
                  onClick={onSignOut}
                >
                  {translate('signout')}
                </MuiLink>
              </IconMenu>
            )}
          </Toolbar>
        </ResponsiveContainer>
      </AppBar>
      <Offset sx={{ mb: 2 }} />
    </>
  );
}

function IconMenu({ activeIndex, children, Icon, id, title }: { activeIndex?: number, children: ReactNode, Icon: ElementType, id: string, title?: string }) {
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>();
  const onOpen = (e: React.MouseEvent<HTMLButtonElement>) => setAnchorEl(e.currentTarget);  
  const onClose = () => setAnchorEl(null);
  const btnId = `${id}-btn`;
  const menuId = `${id}-menu`;
  return (
    <>
      <Tooltip title={title}>
        <IconButton
          id={btnId}
          aria-controls={menuId}
          aria-haspopup='true'
          aria-expanded={!!anchorEl ? 'true' : 'false'}
          size='large'
          sx={{ color: 'common.white' }}
          onClick={onOpen}
        >
          <Icon />
        </IconButton>
      </Tooltip>
      <Menu
        id={menuId}
        anchorEl={anchorEl}
        open={!!anchorEl}
        onClose={onClose}
        MenuListProps={{
          'aria-labelledby': btnId,
        }}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
      >
        {Children.toArray(children).map((child, i) => (
          <MenuItem
            onClick={onClose}
            sx={{ backgroundColor: activeIndex === i ? 'action.hover' : 'transparent' }}
            key={i}
          >
            {child}
          </MenuItem>
        ))}
      </Menu>
    </>
  );
}