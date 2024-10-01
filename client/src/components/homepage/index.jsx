import React from 'react';
import { useNavigate } from 'react-router-dom';

const HomePage = () => {
    const navigate = useNavigate(); // Initialize the useNavigate hook

    const styles = {
        container: {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'flex-start',
            minHeight: '100vh',
            width: '100vw',
            backgroundColor: '#fff',
            fontFamily: 'Arial, sans-serif',
            padding: '0',
            overflow: 'hidden',
        },
        navBar: {
            backgroundColor: '#000',
            padding: '10px 0',
            width: '100%',
            textAlign: 'center',
            position: 'fixed',
            top: '0',
            left: '0',
            zIndex: '1000',
        },
        navText: {
            backgroundColor: '#fff',
            color: '#000',
            padding: '10px 20px',
            borderRadius: '30px',
            fontSize: '1.5rem',
            fontWeight: 'bold',
            display: 'inline-block',
        },
        logo: {
            margin: '10px 0',
            width: '130px',
            height: 'auto',
        },
        bannerContainer: {
            backgroundColor: '#ffffff',
            color: '#333',
            padding: '10px 20px',
            borderRadius: '10px',
            fontSize: '1.2rem',
            fontWeight: 'bold',
            textAlign: 'center',
            width: '90%',
            marginTop: '10px',
            marginBottom: '20px',
        },
        innerContainer: {
            display: 'flex',
            justifyContent: 'center',
            flexWrap: 'wrap',
            width: '90%',
            gap: '50px',
        },
        box: {
            backgroundColor: '#fff',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
            borderRadius: '10px',
            padding: '15px',
            textAlign: 'center',
            width: '250px',
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
            fontSize: '1.3rem',
            color: '#333',
            marginBottom: '10px',
        },
        buttonContainer: {
            marginTop: 'auto',
        },
        button: {
            display: 'inline-block',
            padding: '8px 16px',
            fontSize: '0.9rem',
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

    const handleLoginClick = (role) => {
        // Redirect to the appropriate login page based on the role
        switch (role) {
            case 'customer':
                navigate('/customer/login');
                break;
            case 'admin':
                navigate('/admin/login');
                break;
            case 'superadmin':
                navigate('/superadmin/login');
                break;
            default:
                break;
        }
    };

    const handleSignupClick = () => {
        navigate('/customer/signup'); // Redirect to customer signup
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
                >
                    <img src="customer_logo.png" alt="Customer Logo" style={styles.logo} />
                    <h2 style={styles.heading}>Customer</h2>
                    <div style={styles.buttonContainer}>
                        <button
                            style={styles.button}
                            onMouseEnter={handleButtonMouseEnter}
                            onMouseLeave={handleButtonMouseLeave}
                            onClick={() => handleLoginClick('customer')}
                        >
                            Login
                        </button>
                        <button
                            style={styles.button}
                            onMouseEnter={handleButtonMouseEnter}
                            onMouseLeave={handleButtonMouseLeave}
                            onClick={handleSignupClick}
                        >
                            SignUp
                        </button>
                    </div>
                </div>

                {/* Admin Section */}
                <div
                    style={styles.box}
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                >
                    <img src="admin_logo.png" alt="Admin Logo" style={styles.logo} />
                    <h2 style={styles.heading}>Admin</h2>
                    <div style={styles.buttonContainer}>
                        <button
                            style={styles.button}
                            onMouseEnter={handleButtonMouseEnter}
                            onMouseLeave={handleButtonMouseLeave}
                            onClick={() => handleLoginClick('admin')}
                        >
                            Login
                        </button>
                    </div>
                </div>

                {/* Super Admin Section */}
                <div
                    style={styles.box}
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                >
                    <img src="superadmin_logo.png" alt="Super Admin Logo" style={styles.logo} />
                    <h2 style={styles.heading}>Super Admin</h2>
                    <div style={styles.buttonContainer}>
                        <button
                            style={styles.button}
                            onMouseEnter={handleButtonMouseEnter}
                            onMouseLeave={handleButtonMouseLeave}
                            onClick={() => handleLoginClick('superadmin')}
                        >
                            Login
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HomePage;
