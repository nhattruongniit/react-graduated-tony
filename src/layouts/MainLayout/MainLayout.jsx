import * as React from 'react';
import { useNavigate } from 'react-router-dom';

// mui core
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';

// common components
import AppBar from 'components/AppBar';
import NavBar from 'components/NavBar';

// services
import authService from 'services/autService';

// api
import { authenticated } from 'apis/user.api';

// configs
import { PATH_NAME } from 'configs';

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

function MainLayout({ children }) {
  const [open, setOpen] = React.useState(true);
  const navigate = useNavigate();

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  React.useEffect(() => {
    const accessToken = authService.getAccessToken();
    if(!accessToken) return;
    
    async function checkAuthorize() {
      try {
        const res = await authenticated('/auth', accessToken);
        const data = res.data.user;
        if(!data.user) {
          navigate(PATH_NAME.LOGIN)
          authService.clearStorage();
        }
      } catch (error) {
        // do something error
        if(!error.data.isSuccess){
          navigate(PATH_NAME.LOGIN);
          authService.clearStorage();
        }
      }
    }

    checkAuthorize();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])


  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />

      <AppBar 
        open={open}
        handleDrawerOpen={handleDrawerOpen}
      />

      <NavBar 
        open={open}
        handleDrawerClose={handleDrawerClose}
      />

      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <DrawerHeader />

        {children}
      </Box>
    </Box>
  )
}

export default MainLayout