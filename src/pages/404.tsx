import { Button, Typography } from "@mui/material";
import Layout from "../components/Layout";
import ResponsiveContainer from "../components/ResponsiveContainer";
import UndoIcon from '@mui/icons-material/Undo';
import { useRouter } from "next/router";
import useTranslate from "../hooks/useTranslate";

export default function NotFoundPage() {
  const router = useRouter();
  const translate = useTranslate();

  const onClick = () => router.replace('/');
  
  return (
    <Layout>
      <ResponsiveContainer
        sx={{
          py: 10,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          minHeight: 'calc(100vh - 196px)',
        }}>
        <Typography
          component='h1'
          textAlign='center'         
          sx={({ breakpoints }) => ({
            fontSize: '9rem',
            [breakpoints.up('sm')]: {
              fontSize: '15rem',
            },
          })}
        >
          404
        </Typography>
        <Typography
          component='p'
          textAlign='center'
          sx={({ breakpoints }) => ({
            fontSize: '1.75rem',
            marginBottom: 3,
            [breakpoints.up('sm')]: {
              fontSize: '3rem',
            },
          })}
        >
          {translate('404-text')}
        </Typography>
        <Button
          onClick={onClick}
          variant='contained'
          size='large'
          startIcon={<UndoIcon />}
        >
          {translate('back')}
        </Button>
      </ResponsiveContainer>
    </Layout>
  )
}