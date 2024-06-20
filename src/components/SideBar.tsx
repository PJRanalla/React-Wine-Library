import * as React from 'react';
import { Link } from 'react-router-dom';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import MenuSharpIcon from '@mui/icons-material/MenuSharp';
import HomeSharpIcon from '@mui/icons-material/HomeSharp';
import LogoutSharpIcon from '@mui/icons-material/LogoutSharp';
import WineBarSharpIcon from '@mui/icons-material/WineBarSharp';
import LoginSharpIcon from '@mui/icons-material/LoginSharp';
import { useAuth0 } from '@auth0/auth0-react';

function SideBar() {
  const [open, setOpen] = React.useState(false);
  const { isAuthenticated, loginWithRedirect, logout } = useAuth0();

  const signOutOnClick = () => {
    logout({
      logoutParams: { returnTo: window.location.origin },
    });
  };

  const signInOnClick = () => {
    loginWithRedirect();
  };

  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen);
  };

  const SideBarItems = [
    { text: 'Home', icon: <HomeSharpIcon />, path: '/' },
    ...(isAuthenticated ? [{ text: 'Gallery', icon: <WineBarSharpIcon />, path: '/gallery' }] : []),
  ];

  return (
    <nav className="flex items-center justify-between flex-wrap bg-black p-7">
      <div className='flex flex-auto text-white'>
        <Link to='/' className='font-semibold text-xl tracking-tight'>Wine Library</Link>
      </div>
      <Button onClick={toggleDrawer(true)}>
        <MenuSharpIcon className="text-white hover:text-gray-400" />
      </Button>
      <Drawer open={open} onClose={toggleDrawer(false)}>
        <Box sx={{ width: 250 }} role="presentation" onClick={toggleDrawer(false)}>
          <List>
            {SideBarItems.map(({ text, icon, path }) => (
              <ListItem key={text} disablePadding>
                <ListItemButton component={Link} to={path}>
                  <ListItemIcon>{icon}</ListItemIcon>
                  <ListItemText primary={text} />
                </ListItemButton>
              </ListItem>
            ))}
            <ListItem disablePadding>
              <ListItemButton onClick={isAuthenticated ? signOutOnClick : signInOnClick}>
                <ListItemIcon>
                  {isAuthenticated ? <LogoutSharpIcon /> : <LoginSharpIcon />}
                </ListItemIcon>
                <ListItemText primary={isAuthenticated ? 'Logout' : 'Login'} />
              </ListItemButton>
            </ListItem>
          </List>
        </Box>
      </Drawer>
    </nav>
  );
}

export default SideBar;

