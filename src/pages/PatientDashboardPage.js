import React, { useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import { DataContext } from '../contexts/DataContext';
import { Typography, Card, CardContent, Grid, List, ListItem, ListItemText, Paper, Link, Box, Chip } from '@mui/material';
import EventIcon from '@mui/icons-material/Event';
import HistoryIcon from '@mui/icons-material/History';
import AttachFileIcon from '@mui/icons-material/AttachFile';

const PatientDashboardPage = () => {
    const { user } = useContext(AuthContext);
    const { data } = useContext(DataContext);

    const patientData = data.patients.find(p => p.id === user.patientId);
    const patientIncidents = data.incidents.filter(i => i.patientId === user.patientId);
    
    const upcomingAppointments = patientIncidents
        .filter(i => new Date(i.appointmentDate) > new Date())
        .sort((a, b) => new Date(a.appointmentDate) - new Date(b.appointmentDate));

    const appointmentHistory = patientIncidents
        .filter(i => new Date(i.appointmentDate) <= new Date())
        .sort((a, b) => new Date(b.appointmentDate) - new Date(a.appointmentDate));

    if (!patientData) {
        return <Typography>Your patient data could not be found.</Typography>
    }

    return (
        <Grid container spacing={3}>
            <Grid item xs={12}>
                <Typography variant="h4" gutterBottom>
                    Welcome, {patientData.name}
                </Typography>
                <Typography variant="subtitle1" color="text.secondary">
                    Here is a summary of your appointments and health records.
                </Typography>
            </Grid>

            <Grid item xs={12} lg={6}>
                 <Paper sx={{p: 2, height: '100%'}}>
                    <Typography variant="h6" gutterBottom sx={{display: 'flex', alignItems: 'center'}}>
                        <EventIcon sx={{mr: 1}} /> Upcoming Appointments
                    </Typography>
                    <List>
                        {upcomingAppointments.length > 0 ? upcomingAppointments.map((app, index) => (
                            <ListItem key={app.id} divider={index < upcomingAppointments.length - 1}>
                                <ListItemText 
                                    primary={app.title}
                                    secondary={`On: ${new Date(app.appointmentDate).toLocaleString()}`}
                                />
                            </ListItem>
                        )) : <ListItem><ListItemText primary="No upcoming appointments." /></ListItem>}
                    </List>
                </Paper>
            </Grid>

            <Grid item xs={12} lg={6}>
                <Paper sx={{p:2, height: '100%'}}>
                    <Typography variant="h6" gutterBottom sx={{display: 'flex', alignItems: 'center'}}>
                        <HistoryIcon sx={{mr:1}}/> Appointment History
                    </Typography>
                    {appointmentHistory.map(app => (
                        <Card key={app.id} sx={{mb: 2}}>
                            <CardContent>
                                <Box sx={{display: 'flex', justifyContent: 'space-between', mb: 1}}>
                                    <Typography variant="h6">{app.title}</Typography>
                                    <Chip label={app.status} color={app.status === 'Completed' ? 'success' : 'default'} size="small" />
                                </Box>
                                <Typography variant="body2" color="text.secondary" gutterBottom>
                                    Date: {new Date(app.appointmentDate).toLocaleDateString()}
                                </Typography>
                                
                                {app.treatment && <Typography variant="body1" sx={{mt: 1, fontStyle: 'italic'}}>Treatment: {app.treatment}</Typography>}
                                <Typography variant="body1" sx={{fontWeight: 'bold'}}>Cost: ₹{app.cost}</Typography>
                                
                                {app.files && app.files.length > 0 && (
                                    <Box sx={{mt: 2}}>
                                        <Typography variant="subtitle2">Attachments:</Typography>
                                        {app.files.map(file => (
                                            <Link href={file.url} download={file.name} key={file.name} sx={{display: 'flex', alignItems: 'center', mt: 0.5}}>
                                                <AttachFileIcon sx={{fontSize: '1rem', mr: 0.5}}/> {file.name}
                                            </Link>
                                        ))}
                                    </Box>
                                )}
                            </CardContent>
                        </Card>
                    ))}
                </Paper>
            </Grid>
        </Grid>
    );
};

export default PatientDashboardPage;
