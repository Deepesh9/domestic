import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate from react-router-dom

const CustomerInfo2 = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const navigate = useNavigate(); // Initialize useNavigate

    const data = [
        {
            id: 1,
            date: '2024-09-04',
            deviceId: 'Device123',
            validity: '2024-12-31',
            username: 'John Doe',
            location: 'New York',
            phone: '123-456-7890',
            email: 'johndoe@example.com'
        },
        // Add more sample data here if needed
    ];

    const handleSearch = () => {
        const input = searchTerm.toLowerCase();
        return data.filter(item => {
            return (
                item.username.toLowerCase().includes(input) ||
                item.deviceId.toLowerCase().includes(input)
            );
        });
    };

    const handleDelete = (username) => {
        const confirmation = window.confirm(`Are you sure you want to delete user "${username}"?`);
        if (confirmation) {
            alert(`User "${username}" has been deleted.`);
            // Implement actual delete logic here
        } else {
            alert(`User "${username}" was not deleted.`);
        }
    };

    const handleRedirect = () => {
        navigate('/SuperAdmin-dashboard'); // Use navigate from react-router-dom
    };

    const filteredData = handleSearch();

    return (
        <div style={styles.container}>
            <div style={styles.returnBox}>
                <button style={styles.returnButton} onClick={handleRedirect}>Return</button>
            </div>
            <h1 style={styles.header}>Customer Info</h1>

            <div style={styles.searchBox}>
                <input
                    type="text"
                    placeholder="Search..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    style={styles.searchInput}
                />
            </div>

            <div style={styles.tableContainer}>
                <table style={styles.table}>
                    <thead>
                        <tr>
                            <th>S.No</th>
                            <th>Date</th>
                            <th>Device ID</th>
                            <th>Validity</th>
                            <th>Username</th>
                            <th>Location</th>
                            <th>Phone No</th>
                            <th>Email Id</th>
                            <th>Delete User</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredData.length > 0 ? (
                            filteredData.map((item, index) => (
                                <tr key={item.id}>
                                    <td>{index + 1}</td>
                                    <td>{item.date}</td>
                                    <td>{item.deviceId}</td>
                                    <td>{item.validity}</td>
                                    <td>{item.username}</td>
                                    <td>{item.location}</td>
                                    <td>{item.phone}</td>
                                    <td>{item.email}</td>
                                    <td>
                                        <button
                                            style={styles.deleteButton}
                                            onClick={() => handleDelete(item.username)}
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="9" style={styles.emptyRow}>No records found</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

const styles = {
    container: {
        width: '100%',
        maxWidth: '1200px',
        margin: '20px auto',
        background: '#fff',
        padding: '20px',
        boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
        borderRadius: '8px',
        overflow: 'hidden',
        position: 'relative',
    },
    returnBox: {
        position: 'absolute',
        top: '10px',
        left: '10px',
    },
    returnButton: {
        padding: '10px 20px',
        border: 'none',
        backgroundColor: 'black',
        color: 'white',
        borderRadius: '4px',
        cursor: 'pointer',
        fontSize: '1rem',
    },
    header: {
        textAlign: 'center',
        marginBottom: '20px',
        fontSize: '1.5rem',
    },
    searchBox: {
        marginBottom: '20px',
        textAlign: 'center',
    },
    searchInput: {
        padding: '10px',
        width: '100%',
        maxWidth: '300px',
        border: '1px solid #ccc',
        borderRadius: '4px',
        boxSizing: 'border-box',
    },
    tableContainer: {
        width: '100%',
        overflowX: 'auto',
    },
    table: {
        width: '100%',
        borderCollapse: 'collapse',
        marginTop: '20px',
    },
    deleteButton: {
        padding: '8px 16px',
        border: 'none',
        backgroundColor: '#e74c3c',
        color: 'white',
        borderRadius: '4px',
        cursor: 'pointer',
        fontSize: '1rem',
    },
    emptyRow: {
        textAlign: 'center',
        fontStyle: 'italic',
        color: '#999',
    },
};

export default CustomerInfo2;
