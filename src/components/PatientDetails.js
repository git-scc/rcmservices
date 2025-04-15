import React, { useState } from 'react';
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Button,
  Box,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
} from '@mui/material';
import { Add as AddIcon, Edit as EditIcon, Delete as DeleteIcon } from '@mui/icons-material';

// Sample data - replace with actual API calls
const initialPatients = [
  { id: 1, name: 'John Doe', age: 45, gender: 'Male', contact: '555-0101', insurance: 'ABC Insurance' },
  { id: 2, name: 'Jane Smith', age: 32, gender: 'Female', contact: '555-0102', insurance: 'XYZ Health' },
  { id: 3, name: 'Robert Johnson', age: 58, gender: 'Male', contact: '555-0103', insurance: 'MNO Care' },
];

function PatientForm({ patient, onSave, onClose }) {
  const [formData, setFormData] = useState(patient || {
    name: '',
    age: '',
    gender: '',
    contact: '',
    insurance: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
    onClose();
  };

  return (
    <form onSubmit={handleSubmit}>
      <TextField
        fullWidth
        margin="normal"
        label="Name"
        value={formData.name}
        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
      />
      <TextField
        fullWidth
        margin="normal"
        label="Age"
        type="number"
        value={formData.age}
        onChange={(e) => setFormData({ ...formData, age: e.target.value })}
      />
      <TextField
        fullWidth
        margin="normal"
        label="Gender"
        value={formData.gender}
        onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
      />
      <TextField
        fullWidth
        margin="normal"
        label="Contact"
        value={formData.contact}
        onChange={(e) => setFormData({ ...formData, contact: e.target.value })}
      />
      <TextField
        fullWidth
        margin="normal"
        label="Insurance"
        value={formData.insurance}
        onChange={(e) => setFormData({ ...formData, insurance: e.target.value })}
      />
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button type="submit" variant="contained" color="primary">
          Save
        </Button>
      </DialogActions>
    </form>
  );
}

export default function PatientDetails() {
  const [patients, setPatients] = useState(initialPatients);
  const [searchTerm, setSearchTerm] = useState('');
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedPatient, setSelectedPatient] = useState(null);

  const filteredPatients = patients.filter(patient =>
    patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    patient.insurance.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddEdit = (patient = null) => {
    setSelectedPatient(patient);
    setOpenDialog(true);
  };

  const handleSave = (patientData) => {
    if (selectedPatient) {
      setPatients(patients.map(p =>
        p.id === selectedPatient.id ? { ...patientData, id: p.id } : p
      ));
    } else {
      setPatients([...patients, { ...patientData, id: patients.length + 1 }]);
    }
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this patient?')) {
      setPatients(patients.filter(p => p.id !== id));
    }
  };

  return (
    <div>
      <Box mb={3} display="flex" justifyContent="space-between" alignItems="center">
        <Typography variant="h2">Patient Details</Typography>
        <Button
          variant="contained"
          color="primary"
          startIcon={<AddIcon />}
          onClick={() => handleAddEdit()}
        >
          Add Patient
        </Button>
      </Box>

      <TextField
        fullWidth
        margin="normal"
        label="Search Patients"
        variant="outlined"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        sx={{ mb: 3 }}
      />

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Age</TableCell>
              <TableCell>Gender</TableCell>
              <TableCell>Contact</TableCell>
              <TableCell>Insurance</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredPatients.map((patient) => (
              <TableRow key={patient.id}>
                <TableCell>{patient.name}</TableCell>
                <TableCell>{patient.age}</TableCell>
                <TableCell>{patient.gender}</TableCell>
                <TableCell>{patient.contact}</TableCell>
                <TableCell>{patient.insurance}</TableCell>
                <TableCell>
                  <IconButton onClick={() => handleAddEdit(patient)} color="primary">
                    <EditIcon />
                  </IconButton>
                  <IconButton onClick={() => handleDelete(patient.id)} color="error">
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={openDialog} onClose={() => setOpenDialog(false)} maxWidth="sm" fullWidth>
        <DialogTitle>
          {selectedPatient ? 'Edit Patient' : 'Add New Patient'}
        </DialogTitle>
        <DialogContent>
          <PatientForm
            patient={selectedPatient}
            onSave={handleSave}
            onClose={() => setOpenDialog(false)}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
} 