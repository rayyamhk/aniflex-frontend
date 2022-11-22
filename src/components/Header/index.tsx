import Image from 'next/image';
import AccountCircle from '@mui/icons-material/AccountCircle';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import { styled } from '@mui/material/styles';
import Toolbar from '@mui/material/Toolbar';
import Link from '../Link';
import logo from '../../static/images/brand.png';
import ResponsiveContainer from '../ResponsiveContainer';

const Offset = styled('div')(({ theme }) => theme.mixins.toolbar);

export default function Header() {
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
            <IconButton size='large'>
              <AccountCircle />
            </IconButton>
          </Toolbar>
        </ResponsiveContainer>
      </AppBar>
      <Offset sx={{ mb: 2 }} />
    </>
  );
}