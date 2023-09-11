/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";

import { getUser } from "../services/user.service";
import { logout } from "../services/auth.service";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState();

  useEffect(() => {
    getUser()
      .then((res) => {
        setUser(res);
      })
      .catch((err) => {
        if (err.response.status === 401 || err.response.status === 403) {
          alert("your are unautherized");
          logout();
          navigate("/login");
        }
      });
  }, []);

  return (
    <div className="container mx-auto p-4">
      <div className="bg-white rounded-lg shadow-md p-4">
        <div className="flex items-center mb-4">
          <img
            src={`${user?.picture}`}
            alt="User Profile"
            className="w-16 h-16 rounded-full mr-4"
          />
          <div>
            <h1 className="text-2xl font-semibold">{user?.name}</h1>
            <p className="text-gray-500">{user?.gender ?? "Google User"}</p>
          </div>
        </div>

        <div className="mb-4">
          <h2 className="text-xl font-semibold">User Information</h2>
          <ul className="list-disc pl-4">
            <li>
              <strong>Email:</strong> {user?.email}
            </li>
          </ul>
        </div>

        <div className="text-right">
          <button
            className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
            onClick={() => {
              logout();
              setUser(null);
              navigate("/login");
            }}
          >
            Log Out
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
