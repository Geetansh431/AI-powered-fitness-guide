import { Navigate } from "react-router-dom";
import { toast } from "react-hot-toast";

const ProtectedRoute = ({ element, authUser }) => {
  if (!authUser) {
    //2 baar toast aa rhe the isliye
    toast.dismiss();
    toast.error("Please log in to access this page", { id: "auth-toast" });
    return <Navigate to="/login" replace />;
  }
  return element;
};
export default ProtectedRoute;
