import { AppBar, Box, Button, Stack, Toolbar } from '@mui/material';
import { useNavigate } from 'react-router-dom';

export default function Header() {
  const navigate = useNavigate();
  return (
    <AppBar position="static" color="primary">
      <Toolbar>
        <Box flexGrow={1}>
          <img src="/vite.svg" alt="LOGO" height={50} />
        </Box>
        <Stack direction="row" spacing={1}>
          <Button color="inherit" onClick={() => navigate('/')}>
            Home
          </Button>
          <Button color="inherit" onClick={() => navigate('/A')}>
            A
          </Button>
          <Button color="inherit" onClick={() => navigate('/B')}>
            B
          </Button>
        </Stack>
      </Toolbar>
    </AppBar>
  );
}
