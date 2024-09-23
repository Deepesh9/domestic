import React, { useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';

const HomePage = () => {
    const { loginWithRedirect, isAuthenticated, isLoading } = useAuth0();

    useEffect(() => {
        if (!isLoading && isAuthenticated) {
            window.location.href = '/customerdashboard'; // Redirect to customer dashboard
        }
    }, [isAuthenticated, isLoading]);

    const styles = {
        container: {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'flex-start', // Start from top
            minHeight: '100vh',
            width: '100vw',
            backgroundColor: '#fff',
            fontFamily: 'Arial, sans-serif',
            padding: '0',
            overflow: 'hidden', // Prevent scrolling
        },
        navBar: {
            backgroundColor: '#000',
            padding: '10px 0', // Reduced padding to save vertical space
            width: '100%',
            textAlign: 'center',
            position: 'fixed', // Fix the navbar at the top
            top: '0',
            left: '0',
            zIndex: '1000', // Ensure navbar is on top
        },
        navText: {
            backgroundColor: '#fff',
            color: '#000',
            padding: '10px 20px', // Reduced padding
            borderRadius: '30px',
            fontSize: '1.5rem', // Reduced font size
            fontWeight: 'bold',
            display: 'inline-block',
        },
        logo: {
            margin: '10px 0', // Reduced margin
            width: '130px', // Reduced size
            height: 'auto',
        },
        bannerContainer: {
            backgroundColor: '#ffffff',
            color: '#333',
            padding: '10px 20px', // Reduced padding
            borderRadius: '10px',
            fontSize: '1.2rem', // Reduced font size
            fontWeight: 'bold',
            textAlign: 'center',
            width: '90%',
            marginTop: '10px', // Space below the fixed navbar
            marginBottom: '20px', // Reduced spacing
        },
        innerContainer: {
            display: 'flex',
            justifyContent: 'center',
            flexWrap: 'wrap',
            width: '90%',
            gap: '50px', // Reduced gap
        },
        box: {
            backgroundColor: '#fff',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', // Reduced shadow for subtlety
            borderRadius: '10px',
            padding: '15px', // Reduced padding
            textAlign: 'center',
            width: '250px', // Reduced width
            transition: 'box-shadow 0.3s ease, transform 0.3s ease',
            cursor: 'pointer',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
        },
        boxHover: {
            boxShadow: '0 8px 16px rgba(0, 0, 0, 0.2)',
            transform: 'translateY(-5px)',
        },
        heading: {
            fontSize: '1.3rem', // Reduced font size
            color: '#333',
            marginBottom: '10px', // Reduced margin
        },
        buttonContainer: {
            marginTop: 'auto',
        },
        button: {
            display: 'inline-block',
            padding: '8px 16px', // Reduced padding
            fontSize: '0.9rem', // Reduced font size
            fontWeight: 'bold',
            color: '#000',
            backgroundColor: '#fff',
            border: '2px solid #000',
            borderRadius: '5px',
            cursor: 'pointer',
            textDecoration: 'none',
            transition: 'background-color 0.3s ease, color 0.3s ease',
        },
        buttonHover: {
            backgroundColor: '#000',
            color: '#fff',
        },
    };

    const handleMouseEnter = (e) => {
        Object.assign(e.currentTarget.style, {
            boxShadow: styles.boxHover.boxShadow,
            transform: styles.boxHover.transform,
        });
    };

    const handleMouseLeave = (e) => {
        Object.assign(e.currentTarget.style, {
            boxShadow: styles.box.boxShadow,
            transform: 'translateY(0)',
        });
    };

    const handleButtonMouseEnter = (e) => {
        Object.assign(e.currentTarget.style, {
            backgroundColor: styles.buttonHover.backgroundColor,
            color: styles.buttonHover.color,
        });
    };

    const handleButtonMouseLeave = (e) => {
        Object.assign(e.currentTarget.style, {
            backgroundColor: styles.button.backgroundColor,
            color: styles.button.color,
        });
    };

    const handleLoginClick = () => {
        loginWithRedirect();
    };

    return (
        <div style={styles.container}>
            {/* Navbar */}
            <div style={styles.navBar}>
                <div style={styles.navText}>Domestic RO Controller</div>
            </div>

            {/* Logo */}
            <img src="logo.png" alt="Logo" style={styles.logo} />

            {/* Banner */}
            <div style={styles.bannerContainer}>
                "Pure Water, Pure Control"
            </div>

            {/* Content Boxes */}
            <div style={styles.innerContainer}>
                {/* Customer Section */}
                <div
                    style={styles.box}
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                    onClick={handleLoginClick}
                >
                    <img src="customer_logo.png" alt="Customer Logo" style={styles.logo} />
                    <h2 style={styles.heading}>Customer</h2>
                    <div style={styles.buttonContainer}>
                        <a
                            href="#login"
                            style={styles.button}
                            onMouseEnter={handleButtonMouseEnter}
                            onMouseLeave={handleButtonMouseLeave}
                        >
                            Login
                        </a>
                    </div>
                </div>

                {/* Admin Section */}
                <div
                    style={styles.box}
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                    onClick={handleLoginClick}
                >
                    <img src="admin_logo.png" alt="Admin Logo" style={styles.logo} />
                    <h2 style={styles.heading}>Admin</h2>
                    <div style={styles.buttonContainer}>
                        <a
                            href="#login-admin"
                            style={styles.button}
                            onMouseEnter={handleButtonMouseEnter}
                            onMouseLeave={handleButtonMouseLeave}
                        >
                            Login
                        </a>
                    </div>
                </div>

                {/* Super Admin Section */}
                <div
                    style={styles.box}
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                    onClick={handleLoginClick}
                >
                    <img src="superadmin_logo.png" alt="Super Admin Logo" style={styles.logo} />
                    <h2 style={styles.heading}>Super Admin</h2>
                    <div style={styles.buttonContainer}>
                        <a
                            href="#login-superadmin"
                            style={styles.button}
                            onMouseEnter={handleButtonMouseEnter}
                            onMouseLeave={handleButtonMouseLeave}
                        >
                            Login
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HomePage;
