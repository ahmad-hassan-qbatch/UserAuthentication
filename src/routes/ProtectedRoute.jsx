import { useEffect, useState } from "react";

import { Navigate } from "react-router-dom";

/* eslint-disable react/prop-types */
const ProtectedRoute = ({ page: Page, isAuthenticated, ...rest }) => {
  const [check, setCheck] = useState(null);

  useEffect(() => {
    isAuthenticated().then((res) => {
      setCheck(res);
    });
  }, [check, isAuthenticated]);

  return (
    <>
      {check !== null &&
        (check ? (
          <Page {...rest} />
        ) : (
          <>
            {alert("Please Login to Continue")}
            <Navigate to="/login" />
          </>
        ))}
    </>
  );
};

export default ProtectedRoute;
