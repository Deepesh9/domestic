import React, { useEffect, useState } from 'react';
import AdminNavbar from '../navbar/Admin-Navbar'; // Corrected import name

const styles = {
  mainContent: {
    marginLeft: 0,
    padding: '2rem',
    backgroundColor: '#f9f9f9',
    minHeight: '100vh',
    paddingTop: '7rem',
  },
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'flex-start',
    flexDirection: 'column',
    width: '100%',
    maxWidth: '90%',
    margin: '0 auto',
    backgroundColor: 'white',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
    borderRadius: '0.75rem',
    padding: '2rem',
    overflowX: 'auto',
  },
  infoWrapper: {
    width: '98%',
    textAlign: 'center',
  },
  infoBox: {
    width: '98%',
    backgroundColor: '#f1f1f1',
    borderRadius: '0.75rem',
    padding: '1.5rem',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    margin: '0 auto',
  },
  infoBoxHeading: {
    marginBottom: '1rem',
    fontSize: '1.8rem',
    color: '#333',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  responsiveTableWrapper: {
    width: '100%',
    overflowX: 'auto',
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
    textAlign: 'center',
    fontSize: '1rem',
    color: '#333',
  },
  tableHeaderCell: {
    padding: '0.75rem',
    borderWidth: '1px', // Replaced shorthand
    borderStyle: 'solid', // Replaced shorthand
    borderColor: '#ddd', // Specific border color
    backgroundColor: '#007BFF',
    color: 'white',
    fontWeight: 'bold',
  },
  tableCell: {
    padding: '0.75rem',
    borderWidth: '1px', // Replaced shorthand
    borderStyle: 'solid', // Replaced shorthand
    borderColor: '#ddd', // Specific border color
  },
  evenRow: {
    backgroundColor: '#f9f9f9',
  },
  oddRow: {
    backgroundColor: '#fff',
  },
};

const AdminDashboard = () => {
  const [deviceData, setDeviceData] = useState([]);

  useEffect(() => {
    // Populate device info table after component mounts
    const populateDeviceInfo = () => {
      const devices = [
        { id: 1, device: 'Device A', plan: 'Premium', expiry: '2024-09-30' },
        { id: 2, device: 'Device B', plan: 'Basic', expiry: '2024-10-15' },
        // Add more devices as needed
      ];
      setDeviceData(devices);
    };

    populateDeviceInfo();
  }, []);

  return (
    <div>
      <AdminNavbar /> {/* Corrected component usage */}
      <div style={styles.mainContent}>
        <div style={styles.container}>
          <div style={styles.infoWrapper}>
            <div style={styles.infoBox}>
              <h2 style={styles.infoBoxHeading}>Device Information</h2>
              <div style={styles.responsiveTableWrapper}>
                <table style={styles.table}>
                  <thead>
                    <tr>
                      <th style={styles.tableHeaderCell}>S.NO</th>
                      <th style={styles.tableHeaderCell}>Devices</th>
                      <th style={styles.tableHeaderCell}>Plans</th>
                      <th style={styles.tableHeaderCell}>Expiry</th>
                    </tr>
                  </thead>
                  <tbody>
                    {deviceData.map((device, index) => (
                      <tr
                        key={device.id}
                        style={index % 2 === 0 ? styles.evenRow : styles.oddRow}
                      >
                        <td style={styles.tableCell}>{index + 1}</td>
                        <td style={styles.tableCell}>{device.device}</td>
                        <td style={styles.tableCell}>{device.plan}</td>
                        <td style={styles.tableCell}>{device.expiry}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
