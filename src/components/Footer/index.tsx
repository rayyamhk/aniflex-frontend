import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography';
import ResponsiveContainer from '../ResponsiveContainer';

export default function Footer() {
  return (
    <Box component='footer' sx={{ mt: 2 }}>
      <ResponsiveContainer sx={{ py: 4 }}>
        <Typography align='center' variant='caption' paragraph>
          Copyright ©{new Date().getFullYear()} Aniflex All rights reserved
        </Typography>
      </ResponsiveContainer>
    </Box>
  );
}