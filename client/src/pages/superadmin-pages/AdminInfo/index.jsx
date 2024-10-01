import React, { useState } from 'react';

const AdminInfo = () => {
    const [searchTerm, setSearchTerm] = useState('');

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
        // Add more sample data if needed
    ];

    const handleSearch = () => {
        const input = searchTerm.toLowerCase();
        return data.filter(item =>
            item.username.toLowerCase().includes(input) ||
            item.deviceId.toLowerCase().includes(input)
        );
    };

    const handleDelete = (username) => {
        const confirmation = window.confirm(`Are you sure you want to delete user "${username}"?`);
        if (confirmation) {
            alert(`User "${username}" has been deleted.`);
            // Implement delete logic here
        } else {
            alert(`User "${username}" was not deleted.`);
        }
    };

    const handleRedirect = () => {
        window.location.href = 'Superadmin-dashboard';
    };

    const filteredData = handleSearch();

    return (
        <div style={styles.container}>
            <div style={styles.returnBox}>
                <button
                    style={styles.returnButton}
                    onClick={handleRedirect}
                    onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#333'}
                    onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'black'}
                >
                    Return
                </button>
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
                <button
                    style={styles.searchButton}
                    onClick={() => setSearchTerm(searchTerm)}
                    onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#0056b3'}
                    onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#007bff'}
                >
                    Search
                </button>
            </div>

            <div style={styles.tableContainer}>
                <table style={styles.table}>
                    <thead>
                        <tr>
                            <th>S.No</th>
                            <th>Date</th>
                            <th>Username</th>
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
                                    <td>{item.username}</td>
                                    <td>{item.phone}</td>
                                    <td>{item.email}</td>
                                    <td>
                                        <button
                                            style={styles.deleteButton}
                                            onClick={() => handleDelete(item.username)}
                                            onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#c0392b'}
                                            onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#e74c3c'}
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
        transition: 'background-color 0.3s',
    },
    header: {
        textAlign: 'center',
        marginBottom: '20px',
        fontSize: '1.5rem',
    },
    searchBox: {
        marginBottom: '20px',
        textAlign: 'center',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
    },
    searchInput: {
        padding: '10px',
        width: '100%',
        maxWidth: '300px',
        border: '1px solid #ccc',
        borderRadius: '4px',
        boxSizing: 'border-box',
    },
    searchButton: {
        padding: '10px 20px',
        border: 'none',
        backgroundColor: '#007bff',
        color: 'white',
        borderRadius: '4px',
        cursor: 'pointer',
        marginLeft: '10px',
        fontSize: '1rem',
        transition: 'background-color 0.3s',
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
        transition: 'background-color 0.3s',
    },
    emptyRow: {
        textAlign: 'center',
        fontStyle: 'italic',
        color: '#999',
    },
};

export default AdminInfo;
