import { useEffect } from 'react';
import { Link as RouterLink } from 'react-router-dom';
// material
import { styled } from '@mui/material/styles';
import { Card, Stack, Link, Container, Typography } from '@mui/material';
// states
import { useSelector, useDispatch } from 'react-redux';
import { login } from '../features/user/userSlice';
// layouts
import AuthLayout from '../layouts/AuthLayout';
// components
import Page from '../components/Page';
import { MHidden } from '../components/@material-extend';
import { LoginForm } from '../components/authentication/login';
import Logo from '../components/Logo2';

// ----------------------------------------------------------------------

const RootStyle = styled(Page)(({ theme }) => ({
  [theme.breakpoints.up('md')]: {
    display: 'flex'
  }
}));

const SectionStyle = styled(Card)(({ theme }) => ({
  width: '100%',
  maxWidth: 464,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  margin: theme.spacing(2, 0, 2, 2)
}));

const ContentStyle = styled('div')(({ theme }) => ({
  maxWidth: 480,
  margin: 'auto',
  display: 'flex',
  minHeight: '100vh',
  flexDirection: 'column',
  justifyContent: 'center',
  padding: theme.spacing(12, 0)
}));

const ThumbnailLogin = styled('img')(({ theme }) => ({
  paddingLeft: theme.spacing(12),
  paddingRight: theme.spacing(12)
}));

const WelcomeLogin = styled(Typography)(({ theme }) => ({
  paddingLeft: '30%'
}));

// ----------------------------------------------------------------------

export default function Login() {
  const { user, loading, error } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    // dispatch(login({ user: 'parmao01', password: '12345678' })).then((data) => {
    //   console.warn('data', data);
    // });
  }, []);

  useEffect(() => { }, [user]);

  return (
    <RootStyle title="Login | Minimal-UI">
      <AuthLayout />

      <MHidden width="mdDown">
        <SectionStyle>
          <WelcomeLogin variant="h3" sx={{ mt: 10, mb: 5 }}>
            Bienvenido(a)
          </WelcomeLogin>
          <ThumbnailLogin src="/static/illustrations/illustration_login.png" alt="login" />
        </SectionStyle>
      </MHidden>

      <Container maxWidth="sm">
        <ContentStyle>
          <Stack sx={{ mb: 5 }}>
            <div style={{ width: '100%', display: 'flex', justifyContent: 'center', marginBottom: '2em' }}>
              <Logo sx={{ padding: 0 }} />
            </div>
            <div style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <Typography variant="h4" gutterBottom>
                Sistema de gestión de contenido (SGC)
              </Typography>
              <Typography sx={{ color: 'text.secondary' }}>
                Ingrese sus datos y credenciales para iniciar sesión.
              </Typography>
            </div>
          </Stack>
          <LoginForm />
        </ContentStyle>
      </Container>
    </RootStyle>
  );
}
