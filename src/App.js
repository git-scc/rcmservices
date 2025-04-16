import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './App.css';
import PatientDetails from './components/PatientDetails';
//import Dashboard from './pages/Dashboard';
import PaymentDetails from './components/PaymentDetails';
import { ThemeProvider, createTheme, Typography, Grid, Paper, Table, TableHead, TableBody, TableRow, TableCell, Chip } from '@mui/material';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  BarChart,
  Bar,
} from 'recharts';

// Sample data for charts
const revenueData = [
  { month: 'Jan', revenue: 45000, claims: 150 },
  { month: 'Feb', revenue: 52000, claims: 165 },
  { month: 'Mar', revenue: 48000, claims: 145 },
  { month: 'Apr', revenue: 51000, claims: 160 },
  { month: 'May', revenue: 53000, claims: 170 },
  { month: 'Jun', revenue: 49000, claims: 155 },
];

function Dashboard() {
   return (
    <div>
      <Typography variant="h2" gutterBottom>Dashboard</Typography>
      
      <Grid container spacing={3} sx={{ mb: 3 }}>
        <Grid item xs={12} md={3}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6">Total Claims</Typography>
            <Typography variant="h4">1,234</Typography>
            <Typography variant="body2" color="text.secondary">+12% from last month</Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} md={3}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6">Pending Claims</Typography>
            <Typography variant="h4">45</Typography>
            <Typography variant="body2" color="text.secondary">-5% from last month</Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} md={3}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6">Total Revenue</Typography>
            <Typography variant="h4">$52,389</Typography>
            <Typography variant="body2" color="text.secondary">+8% from last month</Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} md={3}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6">Success Rate</Typography>
            <Typography variant="h4">96%</Typography>
            <Typography variant="body2" color="text.secondary">+2% from last month</Typography>
          </Paper>
        </Grid>
      </Grid>

      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          <Paper sx={{ p: 2, mb: 3 }}>
            <Typography variant="h6" gutterBottom>Revenue Trend</Typography>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={revenueData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis yAxisId="left" />
                <YAxis yAxisId="right" orientation="right" />
                <Tooltip />
                <Legend />
                <Line
                  yAxisId="left"
                  type="monotone"
                  dataKey="revenue"
                  stroke="#1a237e"
                  name="Revenue ($)"
                />
                <Line
                  yAxisId="right"
                  type="monotone"
                  dataKey="claims"
                  stroke="#0277bd"
                  name="Claims"
                />
              </LineChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 2, mb: 3 }}>
            <Typography variant="h6" gutterBottom>Claims by Status</Typography>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={[
                { status: 'Approved', count: 850 },
                { status: 'Pending', count: 45 },
                { status: 'Rejected', count: 25 },
                { status: 'Under Review', count: 35 },
              ]}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="status" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="count" fill="#1a237e" />
              </BarChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>
      </Grid>

      <Paper sx={{ p: 2 }}>
        <Typography variant="h6" gutterBottom>Recent Activity</Typography>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Date</TableCell>
              <TableCell>Claim ID</TableCell>
              <TableCell>Patient</TableCell>
              <TableCell>Amount</TableCell>
              <TableCell>Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell>2024-04-15</TableCell>
              <TableCell>CLM001</TableCell>
              <TableCell>John Doe</TableCell>
              <TableCell>$1,500.00</TableCell>
              <TableCell>
                <Chip label="Approved" color="success" size="small" />
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>2024-04-14</TableCell>
              <TableCell>CLM002</TableCell>
              <TableCell>Jane Smith</TableCell>
              <TableCell>$750.50</TableCell>
              <TableCell>
                <Chip label="Pending" color="warning" size="small" />
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>2024-04-13</TableCell>
              <TableCell>CLM003</TableCell>
              <TableCell>Robert Johnson</TableCell>
              <TableCell>$2,250.75</TableCell>
              <TableCell>
                <Chip label="Under Review" color="info" size="small" />
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </Paper>
    </div> 

  ); 
}

/*function PaymentDetails() {
  return <div><h2>Payment Details</h2><p>Payment information goes here.</p></div>;
}

function ClaimDetails() {
  return <div><h2>Claim Details</h2><p>Claim information goes here.</p></div>;
}*/

const theme = createTheme({
  palette: {
    primary: {
      main: '#1a237e',
    },
    secondary: {
      main: '#0277bd',
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <div className="App">
          <div className="sidebar">
            <h1>SCM</h1>
            <nav>
              <ul>
                <li><Link to="/">Dashboard</Link></li>
                <li><Link to="/patients">Patient Details</Link></li>
                <li><Link to="/payments">Payment Details</Link></li>
                <li><Link to="/claims">Claim Details</Link></li>
                <li><Link to="/claims">Report Details</Link></li>
                <li><Link to="/claims">Claim Details</Link></li>
                <li><Link to="/claims">Claim Details</Link></li>
              </ul>
            </nav>
          </div>
          <div className="main-content">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/patients" element={<PatientDetails />} />
              <Route path="/payments" element={<PaymentDetails />} />              
            </Routes>
          </div>
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;
