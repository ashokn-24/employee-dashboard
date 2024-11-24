/* eslint-disable react/prop-types */

import { EmployeeProvider } from "./context/EmployeeContext";
import { UserProvider } from "./context/UserContext";
import { BrowserRouter as Router } from "react-router-dom";

const AppProvider = ({ children }) => {
  return (
    <>
      <Router>
        <UserProvider>
          <EmployeeProvider>{children}</EmployeeProvider>
        </UserProvider>
      </Router>
    </>
  );
};

export default AppProvider;
