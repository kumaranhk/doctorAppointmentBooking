import { createContext, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => JSON.parse(localStorage.getItem("user")) || null);
  const navigate = useNavigate();

  const login = async (userData) => {
    try {      
      const res = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/users/login`, userData);
      
      if (res.status === 200) {
        const { user, access_token } = res.data;

        localStorage.setItem("access_token", access_token);
        localStorage.setItem("user", JSON.stringify(user));
        localStorage.setItem("isLoggedin", "true");

        setUser(user); // ✅ Set the correct user object

        // Navigate based on role
        switch (user?.role) {
          case "patient":
            navigate("/");
            break;
          case "admin":
            navigate("/admin/dashboard");
            break;
          case "doctor":
            navigate("/doctor/appointments");
            break;
          default:
            navigate("/");
            break;
        }
      }
    } catch (error) {
      const errorMsg = error.response?.data?.msg || "Unable to login";
      toast.error(errorMsg);
      console.error("Login Error:", error);
    }
  };

  const logout = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("user");
    localStorage.removeItem("isLoggedin");
    setUser(null);
    navigate("/login");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
