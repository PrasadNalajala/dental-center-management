import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { DataContext } from '../contexts/DataContext';
import PatientForm from '../components/PatientForm';
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper,
  IconButton, Typography, Fab, Tooltip, Box
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import FolderIcon from '@mui/icons-material/Folder';
import AddIcon from '@mui/icons-material/Add';

const PatientManagementPage = () => {
  const { data, deletePatient } = useContext(DataContext);
  const { patients } = data;
  const [open, setOpen] = useState(false);
  const [patientToEdit, setPatientToEdit] = useState(null);
  const navigate = useNavigate();

  const handleOpen = () => {
    setPatientToEdit(null);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setPatientToEdit(null);
  };

  const handleEdit = (patient) => {
    setPatientToEdit(patient);
    setOpen(true);
  };

  const handleDelete = (patientId) => {
    if(window.confirm('Are you sure you want to delete this patient?')) {
        deletePatient(patientId);
    }
  };

  const handleViewIncidents = (patientId) => {
    navigate(`/incidents/${patientId}`);
  };

  return (
    <Box sx={{position: 'relative'}}>
      <Typography variant="h4" gutterBottom sx={{fontWeight: 700, mb: 3}}>
        Patient Management
      </Typography>
      <PatientForm open={open} handleClose={handleClose} patientToEdit={patientToEdit} />
      <TableContainer component={Paper} sx={{borderRadius: 3, boxShadow: 2}}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Date of Birth</TableCell>
              <TableCell>Contact</TableCell>
              <TableCell>Health Info</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {patients.map((patient) => (
              <TableRow key={patient.id}>
                <TableCell>{patient.name}</TableCell>
                <TableCell>{patient.dob}</TableCell>
                <TableCell>{patient.contact}</TableCell>
                <TableCell>{patient.healthInfo}</TableCell>
                <TableCell>
                  <Tooltip title="View Incidents"><IconButton onClick={() => handleViewIncidents(patient.id)}><FolderIcon /></IconButton></Tooltip>
                  <Tooltip title="Edit Patient"><IconButton onClick={() => handleEdit(patient)}><EditIcon /></IconButton></Tooltip>
                  <Tooltip title="Delete Patient"><IconButton onClick={() => handleDelete(patient.id)}><DeleteIcon /></IconButton></Tooltip>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Tooltip title="Add New Patient">
        <Fab color="primary" aria-label="add" onClick={handleOpen} sx={{position: 'fixed', bottom: 32, right: 32, boxShadow: 4}}>
          <AddIcon />
        </Fab>
      </Tooltip>
    </Box>
  );
};

export default PatientManagementPage; 