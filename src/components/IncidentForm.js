import React, { useState, useContext, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { DataContext } from '../contexts/DataContext';
import {
  Button, TextField, Dialog, DialogActions, DialogContent,
  DialogTitle, MenuItem, Box, Typography, List, ListItem, ListItemText, IconButton
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

// Helper to convert file to base64
const toBase64 = file => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
});

const IncidentForm = ({ open, handleClose, incidentToEdit, patientId }) => {
  const { addIncident, updateIncident } = useContext(DataContext);
  const [formData, setFormData] = useState({
    title: '', description: '', comments: '', appointmentDate: '',
    cost: '', status: 'Scheduled', treatment: '', nextAppointmentDate: '', files: []
  });

  const isEditMode = Boolean(incidentToEdit);

  useEffect(() => {
    if (isEditMode) {
      setFormData({
        ...incidentToEdit,
        appointmentDate: incidentToEdit.appointmentDate ? new Date(incidentToEdit.appointmentDate).toISOString().substring(0, 16) : '',
        nextAppointmentDate: incidentToEdit.nextAppointmentDate ? new Date(incidentToEdit.nextAppointmentDate).toISOString().substring(0, 16) : '',
        files: incidentToEdit.files || []
      });
    } else {
      setFormData({
        title: '', description: '', comments: '', appointmentDate: '',
        cost: '', status: 'Scheduled', treatment: '', nextAppointmentDate: '', files: []
      });
    }
  }, [incidentToEdit, open]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = async (e) => {
    const selectedFiles = Array.from(e.target.files);
    const newFiles = await Promise.all(
        selectedFiles.map(async (file) => {
            const base64 = await toBase64(file);
            return { name: file.name, url: base64 };
        })
    );
    setFormData(prev => ({ ...prev, files: [...prev.files, ...newFiles] }));
  };

  const removeFile = (fileName) => {
    setFormData(prev => ({...prev, files: prev.files.filter(f => f.name !== fileName)}));
  };

  const handleSubmit = () => {
    const submissionData = {
        ...formData,
        appointmentDate: new Date(formData.appointmentDate).toISOString(),
        nextAppointmentDate: formData.nextAppointmentDate ? new Date(formData.nextAppointmentDate).toISOString() : null,
        cost: Number(formData.cost) || 0
    };

    if (isEditMode) {
      updateIncident({ ...incidentToEdit, ...submissionData });
    } else {
      addIncident({ ...submissionData, id: uuidv4(), patientId: patientId });
    }
    handleClose();
  };

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
      <DialogTitle>{isEditMode ? 'Edit Incident' : 'Add New Incident'}</DialogTitle>
      <DialogContent>
        <TextField name="title" label="Title" value={formData.title} onChange={handleChange} fullWidth margin="dense" variant="outlined" />
        <TextField name="description" label="Description" value={formData.description} onChange={handleChange} fullWidth multiline rows={3} margin="dense" variant="outlined" />
        <TextField name="appointmentDate" label="Appointment Date" type="datetime-local" value={formData.appointmentDate} onChange={handleChange} fullWidth margin="dense" InputLabelProps={{ shrink: true }} variant="outlined" />
        <TextField name="comments" label="Comments" value={formData.comments} onChange={handleChange} fullWidth multiline rows={2} margin="dense" variant="outlined" />
        
        {isEditMode && (
          <Box sx={{mt: 2, p: 2, border: '1px dashed #ccc', borderRadius: 2}}>
            <Typography variant="subtitle1" gutterBottom>Post-Appointment Details</Typography>
            <TextField name="treatment" label="Treatment" value={formData.treatment} onChange={handleChange} fullWidth multiline rows={3} margin="dense" variant="outlined" />
            <TextField name="cost" label="Cost (₹)" type="number" value={formData.cost} onChange={handleChange} fullWidth margin="dense" variant="outlined" />
            <TextField name="status" label="Status" value={formData.status} onChange={handleChange} select fullWidth margin="dense" variant="outlined">
                <MenuItem value="Scheduled">Scheduled</MenuItem>
                <MenuItem value="Completed">Completed</MenuItem>
                <MenuItem value="Cancelled">Cancelled</MenuItem>
            </TextField>
            <TextField name="nextAppointmentDate" label="Next Appointment Date" type="datetime-local" value={formData.nextAppointmentDate} onChange={handleChange} fullWidth margin="dense" InputLabelProps={{ shrink: true }} variant="outlined" />

            <Box sx={{mt: 2}}>
                <Typography variant="body1">Attachments</Typography>
                <Button variant="contained" component="label" sx={{mb: 1}}>
                    Upload Files
                    <input type="file" hidden multiple onChange={handleFileChange} />
                </Button>
                <List dense>
                    {formData.files.map(file => (
                        <ListItem key={file.name} secondaryAction={<IconButton edge="end" onClick={() => removeFile(file.name)}><CloseIcon /></IconButton>}>
                            <ListItemText primary={file.name} />
                        </ListItem>
                    ))}
                </List>
            </Box>
          </Box>
        )}
      </DialogContent>
      <DialogActions sx={{p: '16px 24px'}}>
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={handleSubmit} variant="contained">{isEditMode ? 'Save Changes' : 'Add Incident'}</Button>
      </DialogActions>
    </Dialog>
  );
};

export default IncidentForm; 