import React, { useContext } from 'react';
import { DataContext } from '../contexts/DataContext';
import KpiCard from '../components/KpiCard';
import { Grid, Typography, List, ListItem, ListItemText, Paper, Card, CardContent, Box, Divider } from '@mui/material';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import PendingActionsIcon from '@mui/icons-material/PendingActions';
import EventIcon from '@mui/icons-material/Event';
import StarIcon from '@mui/icons-material/Star';
import { lightBlue, green, orange } from '@mui/material/colors';

const glassBg = 'rgba(255,255,255,0.85)';
const glassShadow = '0 8px 32px 0 rgba(31, 38, 135, 0.10)';

const DashboardPage = () => {
  const { data } = useContext(DataContext);
  const { patients, incidents } = data;

  // KPIs
  const totalPatients = patients.length;
  const totalRevenue = incidents
    .filter(i => i.status === 'Completed' && i.cost)
    .reduce((sum, i) => sum + i.cost, 0);
  const completedAppointments = incidents.filter(i => i.status === 'Completed').length;
  const pendingAppointments = incidents.filter(i => i.status === 'Scheduled').length;

  const upcomingAppointments = incidents
    .filter(i => new Date(i.appointmentDate) > new Date())
    .sort((a, b) => new Date(a.appointmentDate) - new Date(b.appointmentDate))
    .slice(0, 10);

  const topPatients = patients.map(patient => {
      const patientRevenue = incidents
          .filter(i => i.patientId === patient.id && i.status === 'Completed' && i.cost)
          .reduce((sum, i) => sum + i.cost, 0);
      return { ...patient, totalRevenue: patientRevenue };
  }).sort((a, b) => b.totalRevenue - a.totalRevenue).slice(0, 5);

  return (
    <Box sx={{ maxWidth: 1400, mx: 'auto', width: '100%', px: { xs: 0.5, sm: 2 }, py: { xs: 1, sm: 3 } }}>
      <Typography variant="h4" gutterBottom sx={{fontWeight: 700, mb: { xs: 2, sm: 3 }, fontSize: { xs: 22, sm: 32 }}}>
        Admin Dashboard
      </Typography>
      {/* KPI Row */}
      <Grid container spacing={{ xs: 1.5, sm: 3 }} sx={{mb: { xs: 1, sm: 2 }}}>
        <Grid item xs={12} sm={6} md={3} lg={3}>
          <KpiCard title="Total Patients" value={totalPatients} icon={<PeopleAltIcon />} color="primary" sx={{p: { xs: 1, sm: 2 }, minHeight: { xs: 80, sm: 120 }}} />
        </Grid>
        <Grid item xs={12} sm={6} md={3} lg={3}>
          <KpiCard title="Total Revenue" value={`₹${totalRevenue.toLocaleString()}`} icon={<MonetizationOnIcon />} color={{light: lightBlue[100], main: lightBlue[800]}} sx={{p: { xs: 1, sm: 2 }, minHeight: { xs: 80, sm: 120 }}} />
        </Grid>
        <Grid item xs={12} sm={6} md={3} lg={3}>
          <KpiCard title="Completed" value={completedAppointments} icon={<CheckCircleOutlineIcon />} color={{light: green[100], main: green[800]}} sx={{p: { xs: 1, sm: 2 }, minHeight: { xs: 80, sm: 120 }}} />
        </Grid>
        <Grid item xs={12} sm={6} md={3} lg={3}>
          <KpiCard title="Pending" value={pendingAppointments} icon={<PendingActionsIcon />} color={{light: orange[100], main: orange[800]}} sx={{p: { xs: 1, sm: 2 }, minHeight: { xs: 80, sm: 120 }}} />
        </Grid>
      </Grid>
      {/* Divider for mobile separation */}
      <Divider sx={{ display: { xs: 'block', sm: 'none' }, my: 2 }} />
      {/* 2-column section below KPIs */}
      <Grid container spacing={{ xs: 2, sm: 3 }} alignItems="stretch">
        <Grid item xs={12} md={7}>
          <Paper sx={{
            p: { xs: 1.5, sm: 3 },
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            boxShadow: { xs: glassShadow, sm: 2 },
            borderRadius: 4,
            mb: { xs: 2, sm: 0 },
            bgcolor: { xs: glassBg, sm: 'background.paper' },
            backdropFilter: { xs: 'blur(6px)', sm: 'none' },
            border: { xs: '1px solid #e3e8f0', sm: 'none' },
            transition: 'box-shadow 0.2s',
          }} elevation={0}>
            <Box sx={{display: 'flex', alignItems: 'center', mb: { xs: 1, sm: 2 }}}>
              <EventIcon sx={{mr: 1, color: 'primary.main', fontSize: { xs: 20, sm: 28 }}} />
              <Typography variant="h6" sx={{fontWeight: 700, fontSize: { xs: 16, sm: 20 }, letterSpacing: 0.5}}>Next 10 Appointments</Typography>
            </Box>
            {upcomingAppointments.length === 0 && (
              <Typography color="text.secondary" sx={{fontSize: { xs: 14, sm: 16 }}}>No upcoming appointments.</Typography>
            )}
            {upcomingAppointments.map(app => {
              const patient = patients.find(p => p.id === app.patientId);
              return (
                <Card key={app.id} sx={{
                  mb: 1.5,
                  boxShadow: { xs: 1, sm: 2 },
                  borderRadius: 3,
                  transition: 'transform 0.15s, box-shadow 0.15s',
                  '&:hover': {transform: { sm: 'scale(1.025)' }, boxShadow: 4},
                  width: '100%',
                  background: 'rgba(255,255,255,0.95)',
                  border: '1px solid #e3e8f0',
                }}>
                  <CardContent sx={{
                    p: { xs: 1, sm: 2 },
                    display: 'flex',
                    flexDirection: { xs: 'column', sm: 'row' },
                    justifyContent: 'space-between',
                    alignItems: { xs: 'flex-start', sm: 'center' },
                  }}>
                    <Box sx={{mb: { xs: 0.5, sm: 0 }}}>
                      <Typography variant="subtitle1" sx={{fontWeight: 600, fontSize: { xs: 15, sm: 17 }}}>{app.title}</Typography>
                      <Typography variant="body2" color="text.secondary" sx={{fontSize: { xs: 13, sm: 15 }}}>{patient?.name}</Typography>
                    </Box>
                    <Typography variant="body2" color="text.secondary" sx={{fontSize: { xs: 13, sm: 15 }, mt: { xs: 1, sm: 0 }}}>
                      {new Date(app.appointmentDate).toLocaleString()}
                    </Typography>
                  </CardContent>
                </Card>
              )
            })}
          </Paper>
        </Grid>
        <Grid item xs={12} md={5}>
          <Paper sx={{
            p: { xs: 1.5, sm: 3 },
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            boxShadow: { xs: glassShadow, sm: 2 },
            borderRadius: 4,
            bgcolor: { xs: glassBg, sm: 'background.paper' },
            backdropFilter: { xs: 'blur(6px)', sm: 'none' },
            border: { xs: '1px solid #e3e8f0', sm: 'none' },
            transition: 'box-shadow 0.2s',
          }} elevation={0}>
            <Box sx={{display: 'flex', alignItems: 'center', mb: { xs: 1, sm: 2 }}}>
              <StarIcon sx={{mr: 1, color: 'warning.main', fontSize: { xs: 20, sm: 28 }}} />
              <Typography variant="h6" sx={{fontWeight: 700, fontSize: { xs: 16, sm: 20 }, letterSpacing: 0.5}}>Top 5 Patients (by Revenue)</Typography>
            </Box>
            {topPatients.length === 0 && (
              <Typography color="text.secondary" sx={{fontSize: { xs: 14, sm: 16 }}}>No patients yet.</Typography>
            )}
            <List>
              {topPatients.map((p, index) => (
                <ListItem key={p.id} divider={index < topPatients.length - 1} sx={{
                  py: { xs: 1, sm: 1.5 },
                  px: { xs: 0.5, sm: 2 },
                  borderRadius: 2,
                  background: 'rgba(255,255,255,0.92)',
                  boxShadow: '0 2px 8px 0 rgba(37, 99, 235, 0.04)',
                  mb: 1,
                  transition: 'background 0.15s, box-shadow 0.15s',
                  '&:hover': {
                    background: '#f0f4ff',
                    boxShadow: '0 4px 16px 0 rgba(37, 99, 235, 0.10)',
                  },
                }}>
                  <ListItemText
                    primary={<Typography sx={{fontWeight: 600, fontSize: { xs: 15, sm: 17 }}}>{p.name}</Typography>}
                    secondary={<Typography color="text.secondary" sx={{fontSize: { xs: 13, sm: 15 }}}>Revenue: ₹{p.totalRevenue.toLocaleString()}</Typography>}
                  />
                </ListItem>
              ))}
            </List>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default DashboardPage; 