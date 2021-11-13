import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';

export default function header2(props) {
  if (props.isConnected) {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          
          <Typography variant="h5" component="div" sx={{ flexGrow: 1 }}>
            Crypto Steps
          </Typography>

          <Typography variant="h7" component="div" sx={{ flexGrow: 1 }}>
            { props.cstBalance.toString() } CST
          </Typography>

          <Typography variant="h7" component="div" sx={{ flexGrow: 1 }}>
            { props.account.substring(0, 15) }{ props.account.length >= 10 && `.....` }
          </Typography>

          <Typography variant="h7" component="div" sx={{ flexGrow: 1 }}>
            { props.networkName }
          </Typography>
        </Toolbar>
      </AppBar>
    </Box>
  );
  } else {
    return(
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h5" component="div" sx={{ flexGrow: 1 }}>
            Crypto Steps
          </Typography>
          <Button variant="contained" color="secondary">Connect Wallet</Button>
        </Toolbar>
      </AppBar>
    </Box>
    );
  }
}