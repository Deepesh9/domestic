import React, { useEffect, useState } from 'react';
import * as XLSX from 'xlsx';

const styles = {
  container: {
    width: '100%',
    maxWidth: '1300px',
    margin: '20px auto',
    background: '#fff',
    padding: '20px',
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
    boxSizing: 'border-box',
  },
  returnBox: {
    position: 'absolute',
    top: '10px',
    left: '10px',
  },
  button: {
    padding: '10px 20px',
    border: 'none',
    backgroundColor: 'black',
    color: 'white',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '1rem',
  },
  buttonHover: {
    backgroundColor: '#0056b3',
  },
  h1: {
    textAlign: 'center',
    marginBottom: '20px',
    fontSize: '1.75rem',
  },
  searchBox: {
    marginBottom: '20px',
    textAlign: 'center',
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: '10px',
  },
  input: {
    width: '100%',
    maxWidth: '300px',
    padding: '10px',
    fontSize: '1rem',
    border: '1px solid #ccc',
    borderRadius: '4px',
  },
  tableContainer: {
    border: '2px solid #008000',
    padding: '20px',
    borderRadius: '8px',
    marginBottom: '20px',
    backgroundColor: '#f0f8ff',
    overflowX: 'auto',
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
  },
  th: {
    backgroundColor: '#f4f4f4',
    border: '1px solid #ddd',
    padding: '10px',
  },
  td: {
    border: '1px solid #ddd',
    padding: '10px',
    textAlign: 'center',
  },
  downloadButton: {
    backgroundColor: '#008000',
    color: 'white',
    border: 'none',
    padding: '10px 20px',
    borderRadius: '4px',
    cursor: 'pointer',
  },
};

const TotalData1 = () => {
  const [data, setData] = useState([]);
  const [searchInput, setSearchInput] = useState('');

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch('https://iotdevice.apdp.co.in/api/reports/');
      const result = await response.json();
      const aggregatedData = result.reduce((acc, item) => {
        const {
          deviceId,
          handWash500,
          handWash250,
          bodyWash500,
          bodyWash250,
          shampoo500,
          shampoo250,
          datetime,
        } = item;

        const handWashTotal = handWash500 + handWash250;
        const bodyWashTotal = bodyWash500 + bodyWash250;
        const shampooTotal = shampoo500 + shampoo250;

        if (!acc[deviceId]) {
          acc[deviceId] = {
            deviceId,
            datetime: new Date(datetime).toISOString().split('T')[0],
            handWashTotal: (handWashTotal / 1000).toFixed(3),
            bodyWashTotal: (bodyWashTotal / 1000).toFixed(3),
            shampooTotal: (shampooTotal / 1000).toFixed(3),
          };
        } else {
          acc[deviceId].handWashTotal = (
            parseFloat(acc[deviceId].handWashTotal) +
            handWashTotal / 1000
          ).toFixed(3);
          acc[deviceId].bodyWashTotal = (
            parseFloat(acc[deviceId].bodyWashTotal) +
            bodyWashTotal / 1000
          ).toFixed(3);
          acc[deviceId].shampooTotal = (
            parseFloat(acc[deviceId].shampooTotal) +
            shampooTotal / 1000
          ).toFixed(3);
        }
        return acc;
      }, {});

      setData(Object.values(aggregatedData));
    } catch (error) {
      console.error('There was an error fetching the data!', error);
    }
  };

  const handleSearch = () => {
    // Search functionality logic here
    if (searchInput) {
      const filteredData = data.filter((item) =>
        item.deviceId.toLowerCase().includes(searchInput.toLowerCase())
      );
      setData(filteredData);
    } else {
      fetchData(); // Fetch data again if search input is cleared
    }
  };

  const downloadData = () => {
    const ws = XLSX.utils.json_to_sheet(data);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
    XLSX.writeFile(wb, 'consumption_report.xlsx');
  };

  return (
    <div style={styles.container}>
      <div style={styles.returnBox}>
        <button style={styles.button} onClick={() => window.location.href = '/ADashboard.html'}>Return</button>
      </div>
      <h1 style={styles.h1}>Consumption Report</h1>

      <div style={styles.searchBox}>
        <input
          style={styles.input}
          type="text"
          placeholder="Search by Device ID"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
        />
        <button style={styles.button} onClick={handleSearch}>Search</button>
      </div>

      <div style={styles.tableContainer}>
        <table style={styles.table}>
          <thead>
            <tr>
              <th style={styles.th}>S.No</th>
              <th style={styles.th}>Device ID</th>
              <th style={styles.th}>Date</th>
              <th style={styles.th}>Hand Wash Total</th>
              <th style={styles.th}>Body Wash Total</th>
              <th style={styles.th}>Shampoo Total</th>
            </tr>
          </thead>
          <tbody>
            {data.length > 0 ? (
              data.map((record, index) => (
                <tr key={index}>
                  <td style={styles.td}>{index + 1}</td>
                  <td style={styles.td}>{record.deviceId}</td>
                  <td style={styles.td}>{record.datetime}</td>
                  <td style={styles.td}>{record.handWashTotal}</td>
                  <td style={styles.td}>{record.bodyWashTotal}</td>
                  <td style={styles.td}>{record.shampooTotal}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td style={styles.td} colSpan="6">No data available</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div style={{ textAlign: 'center', marginTop: '20px' }}>
        <button style={styles.downloadButton} onClick={downloadData}>Download</button>
      </div>
    </div>
  );
};

export default TotalData1;
