import React, { useState, useContext, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { DataContext } from '../contexts/DataContext';
import {
  Button, TextField, Dialog, DialogActions, DialogContent,
  DialogContentText, DialogTitle
} from '@mui/material';

const PatientForm = ({ open, handleClose, patientToEdit }) => {
  const { addPatient, updatePatient } = useContext(DataContext);
  const [name, setName] = useState('');
  const [dob, setDob] = useState('');
  const [contact, setContact] = useState('');
  const [healthInfo, setHealthInfo] = useState('');

  const isEditMode = Boolean(patientToEdit);

  useEffect(() => {
    if (isEditMode) {
      setName(patientToEdit.name);
      setDob(patientToEdit.dob);
      setContact(patientToEdit.contact);
      setHealthInfo(patientToEdit.healthInfo);
    } else {
      // Reset form for adding new patient
      setName('');
      setDob('');
      setContact('');
      setHealthInfo('');
    }
  }, [patientToEdit, open]);


  const handleSubmit = () => {
    if (isEditMode) {
      const updatedPatient = {
        ...patientToEdit,
        name,
        dob,
        contact,
        healthInfo
      };
      updatePatient(updatedPatient);
    } else {
      const newPatient = {
        id: uuidv4(),
        name,
        dob,
        contact,
        healthInfo
      };
      addPatient(newPatient);
    }
    handleClose();
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>{isEditMode ? 'Edit Patient' : 'Add New Patient'}</DialogTitle>
      <DialogContent>
        <DialogContentText sx={{mb: 2}}>
          {isEditMode ? 'Update the patient details.' : 'Please fill in the details for the new patient.'}
        </DialogContentText>
        <TextField
          autoFocus
          margin="dense"
          label="Full Name"
          type="text"
          fullWidth
          variant="outlined"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <TextField
          margin="dense"
          label="Date of Birth"
          type="date"
          fullWidth
          variant="outlined"
          value={dob}
          onChange={(e) => setDob(e.target.value)}
          InputLabelProps={{ shrink: true }}
        />
        <TextField
          margin="dense"
          label="Contact Number"
          type="text"
          fullWidth
          variant="outlined"
          value={contact}
          onChange={(e) => setContact(e.target.value)}
        />
        <TextField
          margin="dense"
          label="Health Information"
          type="text"
          fullWidth
          multiline
          rows={4}
          variant="outlined"
          value={healthInfo}
          onChange={(e) => setHealthInfo(e.target.value)}
        />
      </DialogContent>
      <DialogActions sx={{p: '16px 24px'}}>
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={handleSubmit} variant="contained">{isEditMode ? 'Save Changes' : 'Add Patient'}</Button>
      </DialogActions>
    </Dialog>
  );
};

export default PatientForm; 