import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AdminContext } from "../../context/AdminContext"; // Corrected import

const AdminHomepage = () => {
  const { admin, logout } = useContext(AdminContext); // Corrected usage
  const navigate = useNavigate();

  const logoutPressed = async () => {
    try {
      await logout();
      navigate("/"); // Redirect to landing page
    } catch (error) {
      console.error("Logout failed", error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white">
      <h1 className="text-3xl font-bold mb-4 text-black">
        Start working here {admin?.name ?? "Admin"}!
      </h1>
      <button
        onClick={logoutPressed}
        className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-200"
      >
        Logout
      </button>
    </div>
  );
};

export default AdminHomepage;
