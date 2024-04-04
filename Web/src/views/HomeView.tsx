import { Box, Container, Grid, Typography } from '@mui/material';

export default function HomeView() {
  return (
    <Box>
      <Box
        sx={{
          width: '100%',
          height: '36rem',
          backgroundColor: 'rgb(247, 249, 252)',
          p: 2,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Container style={{ maxWidth: '100rem' }}>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <Box
                sx={{
                  height: '30rem',
                  p: 2,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Typography variant="h3" component="h1">
                  Welcome to
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </Box>
  );
}
