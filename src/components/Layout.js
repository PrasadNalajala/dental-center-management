import React, { useContext } from 'react';
import { useNavigate, NavLink } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';
import {
  AppBar, Toolbar, Typography, Button, Drawer, List, ListItem, ListItemButton,
  ListItemIcon, ListItemText, Box, Divider, Avatar
} from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PeopleIcon from '@mui/icons-material/People';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import DnsIcon from '@mui/icons-material/Dns';

const drawerWidth = 240;

const Layout = ({ children }) => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const isAdmin = user?.role === 'Admin';

  const handleLogout = () => {
    logout();
    navigate('/login');
  };
  
  const drawer = (
    <div>
      <Toolbar sx={{ display: 'flex', alignItems: 'center', p: 2 }}>
          <DnsIcon sx={{mr: 1, color: 'primary.main'}}/>
          <Typography variant="h6" color="primary.main" noWrap component="div">
            ENTNT Dental
          </Typography>
      </Toolbar>
      <Divider />
      <List>
        {[
          { text: 'Dashboard', to: '/', icon: <DashboardIcon /> },
          { text: 'Patients', to: '/patients', icon: <PeopleIcon /> },
          { text: 'Calendar', to: '/calendar', icon: <CalendarTodayIcon /> }
        ].map((item) => (
          <ListItem key={item.text} disablePadding component={NavLink} to={item.to}
            style={({isActive}) => ({ textDecoration: 'none', color: 'inherit', backgroundColor: isActive ? '#e3f2fd' : ''})}
          >
            <ListItemButton>
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </div>
  );

  return (
    <Box sx={{ display: 'flex' }}>
      <AppBar
        position="fixed"
        sx={{ 
          width: isAdmin ? `calc(100% - ${drawerWidth}px)` : '100%',
          ml: isAdmin ? `${drawerWidth}px` : 0,
        }}
      >
        <Toolbar>
           <Box sx={{ flexGrow: 1 }} />
           <Avatar sx={{ bgcolor: 'primary.main', width: 32, height: 32, mr: 1.5 }}>
             {user?.email[0].toUpperCase()}
            </Avatar>
          <Typography sx={{ mr: 2 }}>
            {user.email}
          </Typography>
          <Button color="primary" variant="outlined" onClick={handleLogout}>
            Logout
          </Button>
        </Toolbar>
      </AppBar>
      
      {isAdmin && (
        <Drawer
          sx={{
            width: drawerWidth,
            flexShrink: 0,
            '& .MuiDrawer-paper': {
              width: drawerWidth,
              boxSizing: 'border-box',
            },
          }}
          variant="permanent"
          anchor="left"
        >
          {drawer}
        </Drawer>
      )}

      <Box
        component="main"
        sx={{ flexGrow: 1, bgcolor: 'background.default', p: 3 }}
      >
        <Toolbar />
        {children}
      </Box>
    </Box>
  );
};

export default Layout; 