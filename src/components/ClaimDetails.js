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
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Grid,
  Stepper,
  Step,
  StepLabel,
  Chip,
  CircularProgress,
  Alert,
  Snackbar,
  Tooltip,
} from '@mui/material';
import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  CheckCircle as CheckCircleIcon,
  Send as SendIcon,
  Search as SearchIcon,
  History as HistoryIcon,
  AttachMoney as MoneyIcon,
} from '@mui/icons-material';
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip as RechartsTooltip,
  Legend,
} from 'recharts';
import { ediService } from '../services/ediService';
import {
  Timeline,
  TimelineItem,
  TimelineSeparator,
  TimelineConnector,
  TimelineContent,
  TimelineDot,
  TimelineOppositeContent,
} from '@mui/lab';
import { EDI_TYPES } from '../services/ediService';

const claimStatuses = [
  'Submitted',
  'Under Review',
  'Pending Documentation',
  'Approved',
  'Rejected',
  'Appealed',
  'Completed',
];

const statusColors = {
  'Submitted': '#1976d2',
  'Under Review': '#ed6c02',
  'Pending Documentation': '#9c27b0',
  'Approved': '#2e7d32',
  'Rejected': '#d32f2f',
  'Appealed': '#0288d1',
  'Completed': '#1a237e',
};

// Sample data - replace with actual API calls
const initialClaims = [
  {
    id: 'CLM001',
    patientName: 'John Doe',
    amount: 1500.00,
    submissionDate: '2024-04-15',
    status: 'Approved',
    insuranceProvider: 'ABC Insurance',
    description: 'Annual checkup and lab tests',
  },
  {
    id: 'CLM002',
    patientName: 'Jane Smith',
    amount: 750.50,
    submissionDate: '2024-04-14',
    status: 'Under Review',
    insuranceProvider: 'XYZ Health',
    description: 'Specialist consultation',
  },
  {
    id: 'CLM003',
    patientName: 'Robert Johnson',
    amount: 2250.75,
    submissionDate: '2024-04-13',
    status: 'Pending Documentation',
    insuranceProvider: 'MNO Care',
    description: 'Emergency room visit',
  },
  {
    id: 'CLM004',
    patientName: 'Sarah Williams',
    amount: 980.25,
    submissionDate: '2024-04-12',
    status: 'Rejected',
    insuranceProvider: 'ABC Insurance',
    description: 'Dental procedure - out of network provider',
  },
  {
    id: 'CLM005',
    patientName: 'Michael Brown',
    amount: 3200.00,
    submissionDate: '2024-04-11',
    status: 'Completed',
    insuranceProvider: 'XYZ Health',
    description: 'Surgery and post-op care',
  },
  {
    id: 'CLM006',
    patientName: 'Emily Davis',
    amount: 1750.50,
    submissionDate: '2024-04-10',
    status: 'Appealed',
    insuranceProvider: 'MNO Care',
    description: 'Physical therapy sessions',
  },
  {
    id: 'CLM007',
    patientName: 'David Wilson',
    amount: 525.75,
    submissionDate: '2024-04-09',
    status: 'Submitted',
    insuranceProvider: 'ABC Insurance',
    description: 'Prescription medication coverage',
  },
  {
    id: 'CLM008',
    patientName: 'Lisa Anderson',
    amount: 1100.00,
    submissionDate: '2024-04-08',
    status: 'Under Review',
    insuranceProvider: 'XYZ Health',
    description: 'MRI scan and diagnosis',
  },
  {
    id: 'CLM009',
    patientName: 'James Taylor',
    amount: 890.25,
    submissionDate: '2024-04-07',
    status: 'Approved',
    insuranceProvider: 'MNO Care',
    description: 'Preventive care visit',
  },
  {
    id: 'CLM010',
    patientName: 'Patricia Martinez',
    amount: 2800.00,
    submissionDate: '2024-04-06',
    status: 'Pending Documentation',
    insuranceProvider: 'ABC Insurance',
    description: 'Specialized treatment authorization',
  },
  {
    id: 'CLM011',
    patientName: 'Thomas Anderson',
    amount: 1650.00,
    submissionDate: '2024-04-05',
    status: 'Completed',
    insuranceProvider: 'XYZ Health',
    description: 'Outpatient procedure',
  },
  {
    id: 'CLM012',
    patientName: 'Jennifer White',
    amount: 935.50,
    submissionDate: '2024-04-04',
    status: 'Under Review',
    insuranceProvider: 'MNO Care',
    description: 'Mental health consultation',
  }
];

function ClaimForm({ claim, onSave, onClose }) {
  const [formData, setFormData] = useState(claim || {
    patientName: '',
    amount: '',
    submissionDate: new Date().toISOString().split('T')[0],
    status: 'Submitted',
    insuranceProvider: '',
    description: '',
    memberId: '',
    dateOfBirth: '',
    gender: '',
    procedureCodes: '',
    diagnosisCodes: '',
    placeOfService: '',
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
        label="Patient Name"
        value={formData.patientName}
        onChange={(e) => setFormData({ ...formData, patientName: e.target.value })}
      />
      <TextField
        fullWidth
        margin="normal"
        label="Member ID"
        value={formData.memberId}
        onChange={(e) => setFormData({ ...formData, memberId: e.target.value })}
      />
      <TextField
        fullWidth
        margin="normal"
        label="Date of Birth"
        type="date"
        value={formData.dateOfBirth}
        onChange={(e) => setFormData({ ...formData, dateOfBirth: e.target.value })}
        InputLabelProps={{ shrink: true }}
      />
      <FormControl fullWidth margin="normal">
        <InputLabel>Gender</InputLabel>
        <Select
          value={formData.gender}
          label="Gender"
          onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
        >
          <MenuItem value="M">Male</MenuItem>
          <MenuItem value="F">Female</MenuItem>
          <MenuItem value="O">Other</MenuItem>
        </Select>
      </FormControl>
      <TextField
        fullWidth
        margin="normal"
        label="Amount"
        type="number"
        value={formData.amount}
        onChange={(e) => setFormData({ ...formData, amount: parseFloat(e.target.value) })}
      />
      <TextField
        fullWidth
        margin="normal"
        label="Procedure Codes (comma-separated)"
        value={formData.procedureCodes}
        onChange={(e) => setFormData({ ...formData, procedureCodes: e.target.value })}
      />
      <TextField
        fullWidth
        margin="normal"
        label="Diagnosis Codes (comma-separated)"
        value={formData.diagnosisCodes}
        onChange={(e) => setFormData({ ...formData, diagnosisCodes: e.target.value })}
      />
      <TextField
        fullWidth
        margin="normal"
        label="Place of Service"
        value={formData.placeOfService}
        onChange={(e) => setFormData({ ...formData, placeOfService: e.target.value })}
      />
      <FormControl fullWidth margin="normal">
        <InputLabel>Status</InputLabel>
        <Select
          value={formData.status}
          label="Status"
          onChange={(e) => setFormData({ ...formData, status: e.target.value })}
        >
          {claimStatuses.map((status) => (
            <MenuItem key={status} value={status}>{status}</MenuItem>
          ))}
        </Select>
      </FormControl>
      <TextField
        fullWidth
        margin="normal"
        label="Insurance Provider"
        value={formData.insuranceProvider}
        onChange={(e) => setFormData({ ...formData, insuranceProvider: e.target.value })}
      />
      <TextField
        fullWidth
        margin="normal"
        label="Description"
        multiline
        rows={3}
        value={formData.description}
        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
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

function ClaimAnalytics({ claims }) {
  const statusData = claimStatuses.map(status => ({
    name: status,
    value: claims.filter(claim => claim.status === status).length,
  })).filter(item => item.value > 0);

  return (
    <Paper sx={{ p: 2, mb: 3 }}>
      <Typography variant="h6" gutterBottom>Claims by Status</Typography>
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={statusData}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius={100}
            label
          >
            {statusData.map((entry, index) => (
              <Cell key={entry.name} fill={statusColors[entry.name]} />
            ))}
          </Pie>
          <RechartsTooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </Paper>
  );
}

// EDI Transaction History component
function EDITransactionHistory({ transactions }) {
  return (
    <Timeline>
      {transactions.map((transaction, index) => (
        <TimelineItem key={index}>
          <TimelineOppositeContent color="text.secondary">
            {new Date(transaction.date).toLocaleString()}
          </TimelineOppositeContent>
          <TimelineSeparator>
            <TimelineDot color={transaction.status === 'success' ? 'success' : 'error'} />
            {index < transactions.length - 1 && <TimelineConnector />}
          </TimelineSeparator>
          <TimelineContent>
            <Typography variant="h6" component="span">
              {transaction.type} - {transaction.description}
            </Typography>
            <Typography>{transaction.details}</Typography>
          </TimelineContent>
        </TimelineItem>
      ))}
    </Timeline>
  );
}

// Eligibility Details Dialog component
function EligibilityDetailsDialog({ open, onClose, eligibilityData }) {
  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>Eligibility Details</DialogTitle>
      <DialogContent>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <Typography variant="subtitle1">Status</Typography>
            <Typography variant="body1">{eligibilityData?.status}</Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="subtitle1">Coverage</Typography>
            <Typography variant="body1">{eligibilityData?.coverage}</Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="subtitle1">Effective Date</Typography>
            <Typography variant="body1">{eligibilityData?.effectiveDate}</Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="subtitle1">Plan Type</Typography>
            <Typography variant="body1">{eligibilityData?.planType}</Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="subtitle1">Copay</Typography>
            <Typography variant="body1">${eligibilityData?.copay}</Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="subtitle1">Deductible</Typography>
            <Typography variant="body1">${eligibilityData?.deductible}</Typography>
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Close</Button>
      </DialogActions>
    </Dialog>
  );
}

// Payment Advice Dialog component
function PaymentAdviceDialog({ open, onClose, paymentData }) {
  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>Payment Advice Details</DialogTitle>
      <DialogContent>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography variant="h6" gutterBottom>Payment Information</Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="subtitle1">Status</Typography>
            <Typography variant="body1">{paymentData?.paymentStatus}</Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="subtitle1">Amount</Typography>
            <Typography variant="body1">${paymentData?.amount?.toFixed(2)}</Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="subtitle1">Date</Typography>
            <Typography variant="body1">
              {paymentData?.date && new Date(paymentData.date).toLocaleDateString()}
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="subtitle1">Method</Typography>
            <Typography variant="body1">{paymentData?.method}</Typography>
          </Grid>
          
          {paymentData?.adjustments?.length > 0 && (
            <>
              <Grid item xs={12}>
                <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>Adjustments</Typography>
                <Table size="small">
                  <TableHead>
                    <TableRow>
                      <TableCell>Code</TableCell>
                      <TableCell>Amount</TableCell>
                      <TableCell>Reason</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {paymentData.adjustments.map((adj, index) => (
                      <TableRow key={index}>
                        <TableCell>{adj.code}</TableCell>
                        <TableCell>${adj.amount.toFixed(2)}</TableCell>
                        <TableCell>{adj.reason}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </Grid>
            </>
          )}
          
          {paymentData?.remittanceAdvice && (
            <>
              <Grid item xs={12}>
                <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>Remittance Details</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="subtitle1">Original Amount</Typography>
                <Typography variant="body1">
                  ${paymentData.remittanceAdvice.originalAmount.toFixed(2)}
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="subtitle1">Adjusted Amount</Typography>
                <Typography variant="body1">
                  ${paymentData.remittanceAdvice.adjustedAmount.toFixed(2)}
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="subtitle1">Payer Claim Number</Typography>
                <Typography variant="body1">
                  {paymentData.remittanceAdvice.payerClaimNumber}
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="subtitle1">Service Date</Typography>
                <Typography variant="body1">
                  {paymentData.remittanceAdvice.serviceDate}
                </Typography>
              </Grid>
            </>
          )}
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Close</Button>
      </DialogActions>
    </Dialog>
  );
}

export default function ClaimDetails() {
  const [claims, setClaims] = useState(initialClaims);
  const [searchTerm, setSearchTerm] = useState('');
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedClaim, setSelectedClaim] = useState(null);
  const [loading, setLoading] = useState(false);
  const [notification, setNotification] = useState({ open: false, message: '', severity: 'info' });
  const [ediHistory, setEdiHistory] = useState({});
  const [showEdiHistory, setShowEdiHistory] = useState(false);
  const [selectedClaimForHistory, setSelectedClaimForHistory] = useState(null);
  const [eligibilityDetails, setEligibilityDetails] = useState(null);
  const [showEligibilityDetails, setShowEligibilityDetails] = useState(false);
  const [paymentAdvice, setPaymentAdvice] = useState(null);
  const [showPaymentAdvice, setShowPaymentAdvice] = useState(false);

  const filteredClaims = claims.filter(claim =>
    claim.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    claim.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    claim.insuranceProvider.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddEdit = (claim = null) => {
    setSelectedClaim(claim);
    setOpenDialog(true);
  };

  const handleSave = (claimData) => {
    if (selectedClaim) {
      setClaims(claims.map(c =>
        c.id === selectedClaim.id ? { ...claimData, id: c.id } : c
      ));
    } else {
      const newId = `CLM${String(claims.length + 1).padStart(3, '0')}`;
      setClaims([...claims, { ...claimData, id: newId }]);
    }
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this claim?')) {
      setClaims(claims.filter(c => c.id !== id));
    }
  };

  const totalAmount = claims.reduce((sum, claim) => sum + claim.amount, 0);
  const pendingAmount = claims
    .filter(claim => ['Submitted', 'Under Review', 'Pending Documentation'].includes(claim.status))
    .reduce((sum, claim) => sum + claim.amount, 0);

  const handleCheckEligibility = async (claim) => {
    setLoading(true);
    try {
      const eligibilityData = await ediService.checkEligibility({
        memberId: claim.memberId,
        firstName: claim.patientName.split(' ')[0],
        lastName: claim.patientName.split(' ')[1],
        dateOfBirth: claim.dateOfBirth,
        gender: claim.gender,
        insuranceProvider: claim.insuranceProvider,
        serviceType: '30'
      });
      
      setEligibilityDetails(eligibilityData);
      setShowEligibilityDetails(true);
      
      // Update EDI history
      const historyEntry = {
        type: EDI_TYPES.ELIGIBILITY_REQUEST,
        date: new Date().toISOString(),
        status: 'success',
        description: 'Eligibility Check',
        details: `Coverage: ${eligibilityData.coverage}, Plan: ${eligibilityData.planType}`
      };
      updateEdiHistory(claim.id, historyEntry);
      
    } catch (error) {
      const historyEntry = {
        type: EDI_TYPES.ELIGIBILITY_REQUEST,
        date: new Date().toISOString(),
        status: 'error',
        description: 'Eligibility Check Failed',
        details: error.message
      };
      updateEdiHistory(claim.id, historyEntry);
      
      setNotification({
        open: true,
        message: 'Failed to check eligibility: ' + error.message,
        severity: 'error'
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSubmitEDIClaim = async (claim) => {
    setLoading(true);
    try {
      const response = await ediService.submitClaim(claim);
      setNotification({
        open: true,
        message: `Claim submitted successfully: ${response.message}`,
        severity: 'success'
      });
    } catch (error) {
      setNotification({
        open: true,
        message: 'Failed to submit claim: ' + error.message,
        severity: 'error'
      });
    } finally {
      setLoading(false);
    }
  };

  const handleCheckClaimStatus = async (claimId) => {
    setLoading(true);
    try {
      const status = await ediService.checkClaimStatus(claimId);
      setNotification({
        open: true,
        message: `Claim Status: ${status.status} - ${status.message}`,
        severity: 'info'
      });
    } catch (error) {
      setNotification({
        open: true,
        message: 'Failed to check claim status: ' + error.message,
        severity: 'error'
      });
    } finally {
      setLoading(false);
    }
  };

  const handlePaymentAdvice = async (claim) => {
    setLoading(true);
    try {
      const paymentData = await ediService.processPaymentAdvice(claim.id);
      setPaymentAdvice(paymentData);
      setShowPaymentAdvice(true);
      
      // Update EDI history
      const historyEntry = {
        type: EDI_TYPES.PAYMENT_ADVICE,
        date: new Date().toISOString(),
        status: 'success',
        description: 'Payment Advice Processed',
        details: `Amount: $${paymentData.amount}, Method: ${paymentData.method}`
      };
      updateEdiHistory(claim.id, historyEntry);
    } catch (error) {
      const historyEntry = {
        type: EDI_TYPES.PAYMENT_ADVICE,
        date: new Date().toISOString(),
        status: 'error',
        description: 'Payment Advice Failed',
        details: error.message
      };
      updateEdiHistory(claim.id, historyEntry);
      
      setNotification({
        open: true,
        message: 'Failed to process payment advice: ' + error.message,
        severity: 'error'
      });
    } finally {
      setLoading(false);
    }
  };

  // Update EDI history helper
  const updateEdiHistory = (claimId, entry) => {
    setEdiHistory(prev => ({
      ...prev,
      [claimId]: [...(prev[claimId] || []), entry]
    }));
  };

  // Show EDI history handler
  const handleShowEdiHistory = (claim) => {
    setSelectedClaimForHistory(claim);
    setShowEdiHistory(true);
  };

  return (
    <div>
      <Box mb={3} display="flex" justifyContent="space-between" alignItems="center">
        <Typography variant="h2">Claims Management</Typography>
        <Button
          variant="contained"
          color="primary"
          startIcon={<AddIcon />}
          onClick={() => handleAddEdit()}
        >
          Add Claim
        </Button>
      </Box>

      <Grid container spacing={3} sx={{ mb: 3 }}>
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6">Total Claims Amount</Typography>
            <Typography variant="h4">${totalAmount.toFixed(2)}</Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6">Pending Claims Amount</Typography>
            <Typography variant="h4">${pendingAmount.toFixed(2)}</Typography>
          </Paper>
        </Grid>
      </Grid>

      <ClaimAnalytics claims={claims} />

      <TextField
        fullWidth
        margin="normal"
        label="Search Claims"
        variant="outlined"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        sx={{ mb: 3 }}
      />

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Claim ID</TableCell>
              <TableCell>Patient Name</TableCell>
              <TableCell>Amount</TableCell>
              <TableCell>Submission Date</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Insurance Provider</TableCell>
              <TableCell>Actions</TableCell>
              <TableCell>EDI Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredClaims.map((claim) => (
              <TableRow key={claim.id}>
                <TableCell>{claim.id}</TableCell>
                <TableCell>{claim.patientName}</TableCell>
                <TableCell>${claim.amount.toFixed(2)}</TableCell>
                <TableCell>{claim.submissionDate}</TableCell>
                <TableCell>
                  <Chip
                    label={claim.status}
                    sx={{
                      bgcolor: `${statusColors[claim.status]}15`,
                      color: statusColors[claim.status],
                      fontWeight: 'bold',
                    }}
                  />
                </TableCell>
                <TableCell>{claim.insuranceProvider}</TableCell>
                <TableCell>
                  <IconButton onClick={() => handleAddEdit(claim)} color="primary">
                    <EditIcon />
                  </IconButton>
                  <IconButton onClick={() => handleDelete(claim.id)} color="error">
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
                <TableCell>
                  <Tooltip title="Check Eligibility">
                    <IconButton
                      onClick={() => handleCheckEligibility(claim)}
                      color="primary"
                      size="small"
                    >
                      <CheckCircleIcon />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Submit Claim">
                    <IconButton
                      onClick={() => handleSubmitEDIClaim(claim)}
                      color="secondary"
                      size="small"
                    >
                      <SendIcon />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Check Status">
                    <IconButton
                      onClick={() => handleCheckClaimStatus(claim.id)}
                      color="info"
                      size="small"
                    >
                      <SearchIcon />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="View EDI History">
                    <IconButton
                      onClick={() => handleShowEdiHistory(claim)}
                      color="primary"
                      size="small"
                    >
                      <HistoryIcon />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Process Payment Advice">
                    <IconButton
                      onClick={() => handlePaymentAdvice(claim)}
                      color="primary"
                      size="small"
                    >
                      <MoneyIcon />
                    </IconButton>
                  </Tooltip>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {loading && (
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
          <CircularProgress />
        </Box>
      )}

      <Snackbar
        open={notification.open}
        autoHideDuration={6000}
        onClose={() => setNotification({ ...notification, open: false })}
      >
        <Alert
          onClose={() => setNotification({ ...notification, open: false })}
          severity={notification.severity}
          sx={{ width: '100%' }}
        >
          {notification.message}
        </Alert>
      </Snackbar>

      <Dialog open={openDialog} onClose={() => setOpenDialog(false)} maxWidth="sm" fullWidth>
        <DialogTitle>
          {selectedClaim ? 'Edit Claim' : 'Add New Claim'}
        </DialogTitle>
        <DialogContent>
          <ClaimForm
            claim={selectedClaim}
            onSave={handleSave}
            onClose={() => setOpenDialog(false)}
          />
        </DialogContent>
      </Dialog>

      {/* EDI History Dialog */}
      <Dialog
        open={showEdiHistory}
        onClose={() => setShowEdiHistory(false)}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>
          EDI Transaction History - Claim {selectedClaimForHistory?.id}
        </DialogTitle>
        <DialogContent>
          {selectedClaimForHistory && (
            <EDITransactionHistory
              transactions={ediHistory[selectedClaimForHistory.id] || []}
            />
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setShowEdiHistory(false)}>Close</Button>
        </DialogActions>
      </Dialog>

      {/* Eligibility Details Dialog */}
      <EligibilityDetailsDialog
        open={showEligibilityDetails}
        onClose={() => setShowEligibilityDetails(false)}
        eligibilityData={eligibilityDetails}
      />

      {/* Payment Advice Dialog */}
      <PaymentAdviceDialog
        open={showPaymentAdvice}
        onClose={() => setShowPaymentAdvice(false)}
        paymentData={paymentAdvice}
      />
    </div>
  );
} 