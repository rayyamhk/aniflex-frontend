import React from "react";
import { Button, Typography } from "@mui/material";
import { Router, withRouter } from "next/router";
import UndoIcon from '@mui/icons-material/Undo';
import Layout from "../Layout";
import ResponsiveContainer from "../ResponsiveContainer";

type Props = {
  children: React.ReactNode,
  router: Router,
};

type States = {
  error?: Error,
  hasError: boolean,
};

class ErrorBoundary extends React.Component<Props, States> {
  constructor(props: any) {
    super(props);
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(err: Error) {
    return {
      hasError: true,
    };
  }

  componentDidCatch(error: Error, errorInfo: any) {
    this.setState({ error });
  }

  render() {
    const onClick = () => {
      this.props.router.push('/').then(() => {
        this.setState({ hasError: false });
      });
    }
    if (this.state.hasError) {
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
              sx={{
                fontSize: '5rem'
              }}
            >
              {this.state.error?.name}
            </Typography>
            <Typography
              component='p'
              textAlign='center'
              sx={{
                fontSize: '1.75rem',
                marginBottom: 3,
              }}
            >
              {this.state.error?.message}
            </Typography>
            <Button
              onClick={onClick}
              variant='contained'
              size='large'
              startIcon={<UndoIcon />}
            >
              Go Back Home
            </Button>
          </ResponsiveContainer>
        </Layout>
      );
    }
    return this.props.children;
  }
}

export default withRouter(ErrorBoundary);
