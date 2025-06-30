import React, { useContext } from 'react';
import { DataContext } from '../contexts/DataContext';
import KpiCard from '../components/KpiCard';
import { Grid, Typography, List, ListItem, ListItemText, Paper, Card, CardContent } from '@mui/material';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import PendingActionsIcon from '@mui/icons-material/PendingActions';
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
    <>
      <Typography variant="h4" gutterBottom>
        Admin Dashboard
      </Typography>
      <Grid container spacing={3}>
        {/* KPIs Cards */}
        <Grid item xs={12} sm={6} lg={3}>
            <KpiCard title="Total Patients" value={totalPatients} icon={<PeopleAltIcon />} color="primary" />
        </Grid>
        <Grid item xs={12} sm={6} lg={3}>
            <KpiCard title="Total Revenue" value={`₹${totalRevenue.toLocaleString()}`} icon={<MonetizationOnIcon />} color={{light: lightBlue[100], main: lightBlue[800]}} />
        </Grid>
        <Grid item xs={12} sm={6} lg={3}>
            <KpiCard title="Completed" value={completedAppointments} icon={<CheckCircleOutlineIcon />} color={{light: green[100], main: green[800]}} />
        </Grid>
        <Grid item xs={12} sm={6} lg={3}>
            <KpiCard title="Pending" value={pendingAppointments} icon={<PendingActionsIcon />} color={{light: orange[100], main: orange[800]}} />
        </Grid>

        {/* Upcoming Appointments & Top Patients */}
        <Grid item xs={12} lg={7}>
           <Paper sx={{p: 2}}>
                <Typography variant="h6" gutterBottom>Next 10 Appointments</Typography>
                {upcomingAppointments.map(app => {
                    const patient = patients.find(p => p.id === app.patientId);
                    return (
                        <Card key={app.id} sx={{ mb: 1.5, p: 1 }}>
                            <CardContent sx={{p: '8px !important', display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                                <div>
                                    <Typography variant="subtitle1" sx={{fontWeight: 'bold'}}>{app.title}</Typography>
                                    <Typography variant="body2" color="text.secondary">{patient?.name}</Typography>
                                </div>
                                <Typography variant="body2" color="text.secondary">
                                    {new Date(app.appointmentDate).toLocaleString()}
                                </Typography>
                            </CardContent>
                        </Card>
                    )
                })}
           </Paper>
        </Grid>
        <Grid item xs={12} lg={5}>
            <Paper sx={{p:2}}>
                <Typography variant="h6" gutterBottom>Top 5 Patients (by Revenue)</Typography>
                <List>
                    {topPatients.map((p, index) => (
                        <ListItem key={p.id} divider={index < topPatients.length - 1}>
                            <ListItemText primary={p.name} secondary={`Revenue: ₹${p.totalRevenue.toLocaleString()}`} />
                        </ListItem>
                    ))}
                </List>
            </Paper>
        </Grid>
      </Grid>
    </>
  );
};

export default DashboardPage; 