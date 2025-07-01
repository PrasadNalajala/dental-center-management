import React, { useState, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { DataContext } from '../contexts/DataContext';
import IncidentForm from '../components/IncidentForm';
import {
  Typography, Button, Paper, Table, TableBody, TableCell,
  TableContainer, TableHead, TableRow, IconButton, Fab, Tooltip, Box, Chip
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';

const statusColor = (status) => {
  if (status === 'Completed') return 'success';
  if (status === 'Scheduled') return 'info';
  if (status === 'Cancelled') return 'error';
  return 'default';
};

const IncidentManagementPage = () => {
  const { patientId } = useParams();
  const navigate = useNavigate();
  const { data, deleteIncident } = useContext(DataContext);
  const [open, setOpen] = useState(false);
  const [incidentToEdit, setIncidentToEdit] = useState(null);
  
  const patient = data.patients.find(p => p.id === patientId);
  const incidents = data.incidents.filter(i => i.patientId === patientId);

  const handleOpen = () => {
    setIncidentToEdit(null);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setIncidentToEdit(null);
  };

  const handleEdit = (incident) => {
    setIncidentToEdit(incident);
    setOpen(true);
  };

  const handleDelete = (incidentId) => {
    if(window.confirm('Are you sure you want to delete this incident?')) {
        deleteIncident(incidentId);
    }
  };

  if (!patient) {
    return <Typography>Patient not found.</Typography>;
  }

  return (
    <Box sx={{position: 'relative'}}>
      <Button variant="outlined" onClick={() => navigate('/patients')} sx={{ mb: 2 }}>
        &larr; Back to Patients
      </Button>
      <Typography variant="h4" gutterBottom sx={{fontWeight: 700, mb: 3}}>
        Incidents for: {patient.name}
      </Typography>
      <Typography variant="body1" color="text.secondary" gutterBottom>
        DOB: {patient.dob} | Contact: {patient.contact}
      </Typography>

      <IncidentForm 
        open={open} 
        handleClose={handleClose} 
        incidentToEdit={incidentToEdit} 
        patientId={patientId} 
      />
      
      <TableContainer component={Paper} sx={{borderRadius: 3, boxShadow: 2}}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Title</TableCell>
              <TableCell>Appointment Date</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Cost</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {incidents.map((incident) => (
              <TableRow key={incident.id}>
                <TableCell>{incident.title}</TableCell>
                <TableCell>{new Date(incident.appointmentDate).toLocaleString()}</TableCell>
                <TableCell><Chip label={incident.status} color={statusColor(incident.status)} size="small" /></TableCell>
                <TableCell>₹{incident.cost}</TableCell>
                <TableCell>
                  <Tooltip title="Edit Incident"><IconButton onClick={() => handleEdit(incident)}><EditIcon /></IconButton></Tooltip>
                  <Tooltip title="Delete Incident"><IconButton onClick={() => handleDelete(incident.id)}><DeleteIcon /></IconButton></Tooltip>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Tooltip title="Add New Incident">
        <Fab color="primary" aria-label="add" onClick={handleOpen} sx={{position: 'fixed', bottom: 32, right: 32, boxShadow: 4}}>
          <AddIcon />
        </Fab>
      </Tooltip>
    </Box>
  );
};

export default IncidentManagementPage; 