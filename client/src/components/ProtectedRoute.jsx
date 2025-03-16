import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const ProtectedRoute = ({ role, children }) => {
  const { user } = useAuth();
  // console.log(user);

  if (user === null) {
    // window.location.reload();
  }; 
  if (!user) return <Navigate to="/login" />;
  if (role && user.role !== role) {
    // localStorage.clear();
    return <Navigate to="/login" />;
  }

  return children;
};

export default ProtectedRoute;
