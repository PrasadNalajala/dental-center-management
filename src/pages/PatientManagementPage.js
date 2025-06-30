import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { DataContext } from '../contexts/DataContext';
import PatientForm from '../components/PatientForm';
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper,
  Button, IconButton, Typography
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import FolderIcon from '@mui/icons-material/Folder';

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
    <>
      <Typography variant="h4" gutterBottom>
        Patient Management
      </Typography>
      <Button variant="contained" color="primary" sx={{ mb: 2 }} onClick={handleOpen}>
        Add New Patient
      </Button>
      <PatientForm open={open} handleClose={handleClose} patientToEdit={patientToEdit} />
      <TableContainer component={Paper}>
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
                  <IconButton onClick={() => handleViewIncidents(patient.id)} title="View Incidents">
                    <FolderIcon />
                  </IconButton>
                  <IconButton onClick={() => handleEdit(patient)} title="Edit Patient">
                    <EditIcon />
                  </IconButton>
                  <IconButton onClick={() => handleDelete(patient.id)} title="Delete Patient">
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

export default PatientManagementPage; 