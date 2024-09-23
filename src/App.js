import React from 'react';
import './App.css';
import { useRoutes } from 'react-router-dom';
import { Provider } from 'react-redux';
import { Auth0Provider } from '@auth0/auth0-react';
import { store } from './features/store';

// Components
import Customerdashboard from './components/Customer-dashboard';
import Admindashboard from './components/Admin-dashboard';
import Superadmindashboard from './components/Superadmin-dashboard';
import Home from './components/homepage';
import ProtectedRoute from './components/protectedRoute';
import useAuthListener from './components/auth/useAuthListener';

// Navbar
import CustomerNavbar from './components/navbar/Customer-Navbar';
import AdminNavbar from './components/navbar/Admin-Navbar';
import SuperadminNavbar from './components/navbar/Superadmin-Navbar';

// Customer Pages
import Profile from './pages/customer-pages/Profile';
import LiveData from './pages/customer-pages/LiveData';
import Recharge from './pages/customer-pages/Recharge';
import Transaction from './pages/customer-pages/Transaction';

// Admin Pages
import Profile1 from './pages/admin-pages/Profile1';
import CustomerInfo from './pages/admin-pages/CustomerInfo';
import LiveData1 from './pages/admin-pages/LiveData1';
import Recharge1 from './pages/admin-pages/Recharge1';
import Transaction1 from './pages/admin-pages/Transaction1';

// Superadmin Pages
import Profile2 from './pages/superadmin-pages/Profile2';
import AdminInfo from './pages/superadmin-pages/AdminInfo';
import CustomerInfo2 from './pages/superadmin-pages/CustomerInfo2';
import LiveData2 from './pages/superadmin-pages/LiveData2';
import Recharge2 from './pages/superadmin-pages/Recharge2';
import Transaction2 from './pages/superadmin-pages/Transaction2';

// Define the redirect callback function
const onRedirectCallback = (appState) => {
  window.history.replaceState(
    {},
    document.title,
    appState?.returnTo || window.location.pathname
  );
};

function App() {
  const domain = process.env.REACT_APP_AUTH0_DOMAIN;
  const clientId = process.env.REACT_APP_AUTH0_CLIENT_ID;
  const redirectUri = process.env.REACT_APP_REDIRECT_URI;

  return (
    <Auth0Provider
      domain={domain}
      clientId={clientId}
      authorizationParams={{ redirect_uri: redirectUri }}
      onRedirectCallback={onRedirectCallback}
    >
      <Provider store={store}>
        <AppContent />
      </Provider>
    </Auth0Provider>
  );
}

function AppContent() {
  const auth = useAuthListener(); // Ensuring the hook manages the auth state properly

  const routes = [
    // Public Routes
    { path: "/", element: <Home /> },

    // Customer routes
    {
      path: "/customerdashboard",
      element: (
        <ProtectedRoute auth={auth} requiredRole="customer">
          <Customerdashboard />
        </ProtectedRoute>
      ),
    },
    {
      path: "/customer/profile",
      element: (
        <ProtectedRoute auth={auth} requiredRole="customer">
          <Profile />
        </ProtectedRoute>
      ),
    },
    {
      path: "/customer/livedata",
      element: (
        <ProtectedRoute auth={auth} requiredRole="customer">
          <LiveData />
        </ProtectedRoute>
      ),
    },
    {
      path: "/customer/recharge",
      element: (
        <ProtectedRoute auth={auth} requiredRole="customer">
          <Recharge />
        </ProtectedRoute>
      ),
    },
    {
      path: "/customer/transaction",
      element: (
        <ProtectedRoute auth={auth} requiredRole="customer">
          <Transaction />
        </ProtectedRoute>
      ),
    },

    // Admin routes
    {
      path: "/admindashboard",
      element: (
        <ProtectedRoute auth={auth} requiredRole="admin">
          <Admindashboard />
        </ProtectedRoute>
      ),
    },
    {
      path: "/admin/profile",
      element: (
        <ProtectedRoute auth={auth} requiredRole="admin">
          <Profile1 />
        </ProtectedRoute>
      ),
    },
    {
      path: "/admin/livedata",
      element: (
        <ProtectedRoute auth={auth} requiredRole="admin">
          <LiveData1 />
        </ProtectedRoute>
      ),
    },
    {
      path: "/admin/recharge",
      element: (
        <ProtectedRoute auth={auth} requiredRole="admin">
          <Recharge1 />
        </ProtectedRoute>
      ),
    },
    {
      path: "/admin/transaction",
      element: (
        <ProtectedRoute auth={auth} requiredRole="admin">
          <Transaction1 />
        </ProtectedRoute>
      ),
    },
    {
      path: "/customerinfo",
      element: (
        <ProtectedRoute auth={auth} requiredRole="admin">
          <CustomerInfo />
        </ProtectedRoute>
      ),
    },

    // Superadmin routes
    {
      path: "/superadmindashboard",
      element: (
        <ProtectedRoute auth={auth} requiredRole="superadmin">
          <Superadmindashboard />
        </ProtectedRoute>
      ),
    },
    {
      path: "/superadmin/profile",
      element: (
        <ProtectedRoute auth={auth} requiredRole="superadmin">
          <Profile2 />
        </ProtectedRoute>
      ),
    },
    {
      path: "/superadmin/customerinfo",
      element: (
        <ProtectedRoute auth={auth} requiredRole="superadmin">
          <CustomerInfo2 />
        </ProtectedRoute>
      ),
    },
    {
      path: "/superadmin/admininfo",
      element: (
        <ProtectedRoute auth={auth} requiredRole="superadmin">
          <AdminInfo />
        </ProtectedRoute>
      ),
    },
    {
      path: "/superadmin/livedata",
      element: (
        <ProtectedRoute auth={auth} requiredRole="superadmin">
          <LiveData2 />
        </ProtectedRoute>
      ),
    },
    {
      path: "/superadmin/recharge",
      element: (
        <ProtectedRoute auth={auth} requiredRole="superadmin">
          <Recharge2 />
        </ProtectedRoute>
      ),
    },
    {
      path: "/superadmin/transaction",
      element: (
        <ProtectedRoute auth={auth} requiredRole="superadmin">
          <Transaction2 />
        </ProtectedRoute>
      ),
    },
  ];

  const routeElement = useRoutes(routes);

  // Determine which navbar to display based on the user's role
  const renderNavbar = () => {
    if (auth.role === 'customer') {
      return <CustomerNavbar />;
    } else if (auth.role === 'admin') {
      return <AdminNavbar />;
    } else if (auth.role === 'superadmin') {
      return <SuperadminNavbar />;
    } else {
      return null; // No navbar for unauthenticated users or undefined roles
    }
  };

  return (
    <div className='flex flex-col'>
      {/* Display the appropriate navbar based on the user's role */}
      {renderNavbar()}

      {/* Main content area */}
      <div style={styles.content}>
        {routeElement}
      </div>
    </div>
  );
}

// Styles object for main content to prevent overlap with the fixed navbar
const styles = {
  content: {
    paddingTop: "70px", // Adjust this value based on your navbar's height
    paddingLeft: "20px",
    paddingRight: "20px",
    boxSizing: "border-box",
    minHeight: "100vh", // Ensure the content area takes at least the full viewport height
    backgroundColor: "#f0f2f5", // Optional: Light background for content area
  },
};

export default App;
