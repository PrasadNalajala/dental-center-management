import React, { useState, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { DataContext } from '../contexts/DataContext';
import IncidentForm from '../components/IncidentForm';
import {
  Typography, Button, Paper, Table, TableBody, TableCell,
  TableContainer, TableHead, TableRow, IconButton
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

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
    <>
      <Button variant="outlined" onClick={() => navigate('/patients')} sx={{ mb: 2 }}>
        &larr; Back to Patients
      </Button>
      <Typography variant="h4" gutterBottom>
        Incidents for: {patient.name}
      </Typography>
      <Typography variant="body1" color="text.secondary" gutterBottom>
        DOB: {patient.dob} | Contact: {patient.contact}
      </Typography>

      <Button variant="contained" color="primary" sx={{ mb: 2, mt: 2 }} onClick={handleOpen}>
        Add New Incident
      </Button>
      <IncidentForm 
        open={open} 
        handleClose={handleClose} 
        incidentToEdit={incidentToEdit} 
        patientId={patientId} 
      />
      
      <TableContainer component={Paper}>
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
                <TableCell>{incident.status}</TableCell>
                <TableCell>₹{incident.cost}</TableCell>
                <TableCell>
                  <IconButton onClick={() => handleEdit(incident)}>
                    <EditIcon />
                  </IconButton>
                  <IconButton onClick={() => handleDelete(incident.id)}>
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default IncidentManagementPage; 