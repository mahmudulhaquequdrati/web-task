import React from "react";
import CountContextProvider from "./context/TotalCountProvider";
import AllRoutes from "./routes/AllRoutes";

function App() {
  return (
    <React.Fragment>
      <CountContextProvider>
        <AllRoutes />
      </CountContextProvider>
    </React.Fragment>
  );
}

export default App;
