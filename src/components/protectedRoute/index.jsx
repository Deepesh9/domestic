import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ auth, children }) => {
  // Display a loading spinner while authentication status is being determined
  if (auth.loading) {
    return <div>Loading...</div>; // Render a loading state until authentication is confirmed
  }

  // If not authenticated, redirect to the homepage
  if (!auth.isAuthenticated) {
    return <Navigate to="/" />;
  }

  // If authenticated, render the children (protected component)
  return children;
};

export default ProtectedRoute;
