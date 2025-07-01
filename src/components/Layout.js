import React, { useContext, useState } from 'react';
import { useNavigate, NavLink } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';
import {
  AppBar, Toolbar, Typography, Button, Drawer, List, ListItem, ListItemButton,
  ListItemIcon, ListItemText, Box, Divider, Avatar, useTheme, IconButton, useMediaQuery
} from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PeopleIcon from '@mui/icons-material/People';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import DnsIcon from '@mui/icons-material/Dns';
import MenuIcon from '@mui/icons-material/Menu';

const drawerWidth = 250;
const SIDEBAR_BG = '#1a2233';
const SIDEBAR_ACTIVE = '#2563eb';
const SIDEBAR_TEXT = '#fff';
const SIDEBAR_ICON = '#b6c2e2';

const Layout = ({ children }) => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const isAdmin = user?.role === 'Admin';
  const theme = useTheme();
  const isMobile = useMediaQuery('(max-width:900px)');
  const isXs = useMediaQuery('(max-width:600px)');
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <Box sx={{
      height: '100vh',
      display: 'flex',
      flexDirection: 'column',
      background: SIDEBAR_BG,
      borderRight: '1px solid #232b3e',
      minWidth: isXs ? 140 : drawerWidth,
      width: isXs ? '80vw' : drawerWidth,
      maxWidth: isXs ? 260 : drawerWidth,
      justifyContent: 'flex-start',
      color: SIDEBAR_TEXT,
      p: 0,
      m: 0,
      borderRadius: 0,
      boxShadow: 'none',
    }}>
      <Box>
        <Toolbar sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', p: 2, mb: 1, minHeight: 56 }}>
          <DnsIcon sx={{ color: SIDEBAR_ACTIVE, fontSize: 32, mb: 1 }} />
          <Typography variant="h6" noWrap component="div" sx={{fontWeight: 700, letterSpacing: 1, color: SIDEBAR_TEXT, fontSize: isXs ? 16 : 20}}>
            ENTNT Dental
          </Typography>
        </Toolbar>
        <Divider sx={{mb: 1, bgcolor: 'rgba(255,255,255,0.08)'}} />
        <List>
          {[
            { text: 'Dashboard', to: '/', icon: <DashboardIcon />, aria: 'Go to Dashboard' },
            { text: 'Patients', to: '/patients', icon: <PeopleIcon />, aria: 'Go to Patients' },
            { text: 'Calendar', to: '/calendar', icon: <CalendarTodayIcon />, aria: 'Go to Calendar' }
          ].map((item) => (
            <ListItem key={item.text} disablePadding sx={{mb: 0.5}}>
              <ListItemButton
                component={NavLink}
                to={item.to}
                aria-label={item.aria}
                sx={{
                  borderRadius: 2,
                  mx: 1,
                  py: 1.2,
                  px: 2,
                  fontWeight: 600,
                  color: SIDEBAR_TEXT,
                  '&.active, &:hover': {
                    background: SIDEBAR_ACTIVE,
                    color: '#fff',
                  },
                  transition: 'all 0.2s',
                }}
                tabIndex={0}
                onClick={isMobile ? handleDrawerToggle : undefined}
              >
                <ListItemIcon sx={{minWidth: 36, color: SIDEBAR_ICON}}>{item.icon}</ListItemIcon>
                <ListItemText primary={item.text} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Box>
    </Box>
  );

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh', background: 'none', width: '100vw', overflowX: 'hidden' }}>
      {isAdmin && (
        <Drawer
          variant={isMobile ? 'temporary' : 'permanent'}
          open={isMobile ? mobileOpen : true}
          onClose={isMobile ? handleDrawerToggle : undefined}
          ModalProps={{ keepMounted: true }}
          sx={{
            width: isXs ? '80vw' : drawerWidth,
            flexShrink: 0,
            display: { xs: 'block', sm: 'block' },
            '& .MuiDrawer-paper': {
              width: isXs ? '80vw' : drawerWidth,
              minWidth: isXs ? 140 : drawerWidth,
              maxWidth: isXs ? 260 : drawerWidth,
              boxSizing: 'border-box',
              background: 'none',
              border: 'none',
              boxShadow: 'none',
              display: 'flex',
              alignItems: 'stretch',
              justifyContent: 'flex-start',
              p: 0,
              m: 0,
              borderRadius: 0,
            },
          }}
          anchor="left"
          aria-label="Sidebar navigation"
        >
          {drawer}
        </Drawer>
      )}
      <Box sx={{flex: 1, display: 'flex', flexDirection: 'column', minHeight: '100vh', width: '100vw', overflowX: 'hidden'}}>
        <AppBar
          position="fixed"
          elevation={1}
          sx={{ 
            width: isAdmin && !isMobile ? `calc(100% - ${drawerWidth}px)` : '100%',
            ml: isAdmin && !isMobile ? `${drawerWidth}px` : 0,
            background: '#fff',
            color: '#222',
            boxShadow: '0 2px 8px 0 rgba(31, 38, 135, 0.06)',
            borderBottom: '1px solid #e0e0e0',
            borderRadius: 0,
            zIndex: theme.zIndex.drawer + 1,
            transition: 'width 0.3s, margin 0.3s',
            px: { xs: 0.5, sm: 2 },
          }}
        >
          <Toolbar sx={{justifyContent: 'space-between', minHeight: isXs ? 48 : 64, px: { xs: 0.5, sm: 3 }}}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              {isAdmin && isMobile && (
                <IconButton
                  color="inherit"
                  aria-label="open sidebar"
                  edge="start"
                  onClick={handleDrawerToggle}
                  sx={{ mr: 1 }}
                >
                  <MenuIcon />
                </IconButton>
              )}
              <Typography variant="h6" sx={{fontWeight: 700, color: '#222', letterSpacing: 1, fontSize: isXs ? 15 : { xs: 18, sm: 22 }}}>
                ENTNT Dental Center
              </Typography>
            </Box>
            <Box sx={{display: 'flex', alignItems: 'center', gap: isXs ? 0.5 : { xs: 1, sm: 2 }}}>
              <Avatar sx={{ bgcolor: SIDEBAR_ACTIVE, width: isXs ? 28 : 32, height: isXs ? 28 : 32, fontWeight: 700, fontSize: isXs ? 14 : 16 }}>
                {user?.email[0].toUpperCase()}
              </Avatar>
              {!isMobile && (
                <Typography variant="body2" sx={{fontWeight: 500, color: '#222', fontSize: isXs ? 12 : 14}}>{user.email}</Typography>
              )}
              <Button color="primary" variant="contained" onClick={handleLogout} sx={{fontWeight: 600, borderRadius: 2, px: isXs ? 1 : { xs: 2, sm: 3 }, py: 0.5, fontSize: isXs ? 12 : 15, ml: 1, boxShadow: 1, minWidth: isXs ? 60 : 80}} aria-label="Logout">
                Logout
              </Button>
            </Box>
          </Toolbar>
        </AppBar>
        <Toolbar />
        <Box
          component="main"
          sx={{ 
            flex: 1, 
            bgcolor: { xs: '#f7f8fa', sm: 'linear-gradient(135deg, #f7f8fa 80%, #e3e8f0 100%)' }, 
            p: { xs: 0.5, sm: 2, md: 3 }, 
            width: '100%', 
            maxWidth: { xs: '100%', md: '1400px' }, 
            mx: 'auto',
            minHeight: 'calc(100vh - 56px)',
            transition: 'background 0.3s',
            overflowX: 'hidden',
          }}
        >
          {children}
        </Box>
      </Box>
    </Box>
  );
};

export default Layout; 