import React, { useState } from 'react';
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  Chip,
  Typography,
  Box,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
} from '@mui/material';
import { format } from 'date-fns';

// Initial payment data
const initialPayments = [
  {
    id: 'PAY001',
    patientName: 'John Doe',
    amount: 1500.00,
    date: '2024-04-15',
    status: 'Completed',
    paymentMethod: 'Credit Card',
    claimId: 'CLM001'
  },
  {
    id: 'PAY002',
    patientName: 'Jane Smith',
    amount: 750.50,
    date: '2024-04-14',
    status: 'Pending',
    paymentMethod: 'Insurance',
    claimId: 'CLM002'
  },
  {
    id: 'PAY003',
    patientName: 'Robert Johnson',
    amount: 2250.75,
    date: '2024-04-13',
    status: 'Completed',
    paymentMethod: 'Bank Transfer',
    claimId: 'CLM003'
  },
  {
    id: 'PAY004',
    patientName: 'Sarah Williams',
    amount: 980.25,
    date: '2024-04-12',
    status: 'Failed',
    paymentMethod: 'Credit Card',
    claimId: 'CLM004'
  },
  {
    id: 'PAY005',
    patientName: 'Michael Brown',
    amount: 3200.00,
    date: '2024-04-11',
    status: 'Completed',
    paymentMethod: 'Insurance',
    claimId: 'CLM005'
  }
];

const PaymentDetails = () => {
  const [payments, setPayments] = useState(initialPayments);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [openDialog, setOpenDialog] = useState(false);
  const [newPayment, setNewPayment] = useState({
    patientName: '',
    amount: '',
    paymentMethod: '',
    claimId: ''
  });

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'completed':
        return 'success';
      case 'pending':
        return 'warning';
      case 'failed':
        return 'error';
      default:
        return 'default';
    }
  };

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setNewPayment({
      patientName: '',
      amount: '',
      paymentMethod: '',
      claimId: ''
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewPayment(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleAddPayment = () => {
    const payment = {
      id: `PAY${String(payments.length + 1).padStart(3, '0')}`,
      ...newPayment,
      date: format(new Date(), 'yyyy-MM-dd'),
      status: 'Pending'
    };
    setPayments([...payments, payment]);
    handleCloseDialog();
  };

  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
        <Typography variant="h5" component="h2">
          Payment Details
        </Typography>
        <Button variant="contained" color="primary" onClick={handleOpenDialog}>
          Add New Payment
        </Button>
      </Box>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Payment ID</TableCell>
              <TableCell>Patient Name</TableCell>
              <TableCell>Amount</TableCell>
              <TableCell>Date</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Payment Method</TableCell>
              <TableCell>Claim ID</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {payments
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((payment) => (
                <TableRow key={payment.id}>
                  <TableCell>{payment.id}</TableCell>
                  <TableCell>{payment.patientName}</TableCell>
                  <TableCell>${payment.amount.toFixed(2)}</TableCell>
                  <TableCell>{payment.date}</TableCell>
                  <TableCell>
                    <Chip
                      label={payment.status}
                      color={getStatusColor(payment.status)}
                      size="small"
                    />
                  </TableCell>
                  <TableCell>{payment.paymentMethod}</TableCell>
                  <TableCell>{payment.claimId}</TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={payments.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </TableContainer>

      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>Add New Payment</DialogTitle>
        <DialogContent>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, pt: 2 }}>
            <TextField
              name="patientName"
              label="Patient Name"
              value={newPayment.patientName}
              onChange={handleInputChange}
              fullWidth
            />
            <TextField
              name="amount"
              label="Amount"
              type="number"
              value={newPayment.amount}
              onChange={handleInputChange}
              fullWidth
            />
            <TextField
              name="paymentMethod"
              label="Payment Method"
              value={newPayment.paymentMethod}
              onChange={handleInputChange}
              fullWidth
            />
            <TextField
              name="claimId"
              label="Claim ID"
              value={newPayment.claimId}
              onChange={handleInputChange}
              fullWidth
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button onClick={handleAddPayment} variant="contained" color="primary">
            Add Payment
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default PaymentDetails; 