import React, { useContext } from 'react';
import { DataContext } from '../contexts/DataContext';
import KpiCard from '../components/KpiCard';
import { Grid, Typography, List, ListItem, ListItemText, Paper, Card, CardContent, Box } from '@mui/material';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import PendingActionsIcon from '@mui/icons-material/PendingActions';
import EventIcon from '@mui/icons-material/Event';
import StarIcon from '@mui/icons-material/Star';
import { lightBlue, green, orange } from '@mui/material/colors';

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
    <Box sx={{ maxWidth: 1400, mx: 'auto', width: '100%' }}>
      <Typography variant="h4" gutterBottom sx={{fontWeight: 700, mb: 3}}>
        Admin Dashboard
      </Typography>
      {/* KPI Row */}
      <Grid container spacing={3} sx={{mb: 2}}>
        <Grid item xs={12} sm={6} md={3} lg={3}>
          <KpiCard title="Total Patients" value={totalPatients} icon={<PeopleAltIcon />} color="primary" />
        </Grid>
        <Grid item xs={12} sm={6} md={3} lg={3}>
          <KpiCard title="Total Revenue" value={`₹${totalRevenue.toLocaleString()}`} icon={<MonetizationOnIcon />} color={{light: lightBlue[100], main: lightBlue[800]}} />
        </Grid>
        <Grid item xs={12} sm={6} md={3} lg={3}>
          <KpiCard title="Completed" value={completedAppointments} icon={<CheckCircleOutlineIcon />} color={{light: green[100], main: green[800]}} />
        </Grid>
        <Grid item xs={12} sm={6} md={3} lg={3}>
          <KpiCard title="Pending" value={pendingAppointments} icon={<PendingActionsIcon />} color={{light: orange[100], main: orange[800]}} />
        </Grid>
      </Grid>
      {/* 2-column section below KPIs */}
      <Grid container spacing={3} alignItems="stretch">
        <Grid item xs={12} md={7}>
          <Paper sx={{p: 3, height: '100%', display: 'flex', flexDirection: 'column'}} elevation={2}>
            <Box sx={{display: 'flex', alignItems: 'center', mb: 2}}>
              <EventIcon sx={{mr: 1, color: 'primary.main'}} />
              <Typography variant="h6" sx={{fontWeight: 700}}>Next 10 Appointments</Typography>
            </Box>
            {upcomingAppointments.length === 0 && (
              <Typography color="text.secondary">No upcoming appointments.</Typography>
            )}
            {upcomingAppointments.map(app => {
              const patient = patients.find(p => p.id === app.patientId);
              return (
                <Card key={app.id} sx={{ mb: 2, boxShadow: 1, borderRadius: 2, transition: 'transform 0.15s', '&:hover': {transform: 'scale(1.025)', boxShadow: 4} }}>
                  <CardContent sx={{p: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                    <Box>
                      <Typography variant="subtitle1" sx={{fontWeight: 600}}>{app.title}</Typography>
                      <Typography variant="body2" color="text.secondary">{patient?.name}</Typography>
                    </Box>
                    <Typography variant="body2" color="text.secondary">
                      {new Date(app.appointmentDate).toLocaleString()}
                    </Typography>
                  </CardContent>
                </Card>
              )
            })}
          </Paper>
        </Grid>
        <Grid item xs={12} md={5}>
          <Paper sx={{p: 3, height: '100%', display: 'flex', flexDirection: 'column'}} elevation={2}>
            <Box sx={{display: 'flex', alignItems: 'center', mb: 2}}>
              <StarIcon sx={{mr: 1, color: 'warning.main'}} />
              <Typography variant="h6" sx={{fontWeight: 700}}>Top 5 Patients (by Revenue)</Typography>
            </Box>
            {topPatients.length === 0 && (
              <Typography color="text.secondary">No patients yet.</Typography>
            )}
            <List>
              {topPatients.map((p, index) => (
                <ListItem key={p.id} divider={index < topPatients.length - 1} sx={{py: 1.5}}>
                  <ListItemText
                    primary={<Typography sx={{fontWeight: 600}}>{p.name}</Typography>}
                    secondary={<Typography color="text.secondary">Revenue: ₹{p.totalRevenue.toLocaleString()}</Typography>}
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