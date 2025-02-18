import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ element, authUser }) => {
  return authUser ? element : <Navigate to="/login" replace />;
};

export default ProtectedRoute;