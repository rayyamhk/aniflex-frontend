import React from 'react'
import Container from '@mui/material/Container';
import { Theme, SxProps } from '@mui/system';

export default function ResponsiveContainer({ children, sx = {} }: { children: React.ReactNode, sx?: SxProps<Theme> }) {
  return (
    <Container
      fixed
      disableGutters
      sx={{ px: 2, ...sx }}
    >
      {children}
    </Container>
  );
}