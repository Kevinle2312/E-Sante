import React, { useState } from "react";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import { ColorModeContext, useMode } from "./theme";
import { CssBaseline, ThemeProvider } from "@mui/material";
import Topbar from "./scenes/global/Topbar";
import Sidebar from "./scenes/global/Sidebar";
import Dashboard from "./scenes/dashboard";
import LoginPage, {setAuthToken} from "./scenes/signin/LoginPage";
import SignupPage from "./scenes/signup/SignupPage"; // import the LoginPage component
import Team from "./scenes/team";
// import Invoices from "./scenes/invoices";
// import Contacts from "./scenes/contacts";
// import Bar from "./scenes/bar";
// import Form from "./scenes/form";
// import Line from "./scenes/line";
// import Pie from "./scenes/pie";
// import FAQ from "./scenes/faq";
// import Geography from "./scenes/geography";
// import Calendar from "./scenes/calendar/calendar";


function Layout(props) {
  return (
    <>
      <Sidebar />
      <main className="content" style={{ flexGrow: 1 }}>
        <Topbar />
      </main>
    </>
  );
}

function App() {
  const [theme, colorMode] = useMode();
  const [isSidebar, setIsSidebar] = useState(true);

  //check jwt token
  const token = localStorage.getItem("token");
  if (token) {
    setAuthToken(token);
  }

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <BrowserRouter>
          <div className="app">
            <Routes>
              <Route path="/login" element={<LoginPage />} />
              <Route path="/signup" element={<SignupPage />} />
              <Route path="/dashboard" element={<Layout><Dashboard /></Layout>} />
              <Route path="/team" element={<Layout><Team /></Layout>} />
              {/*<Route path="/contacts" element={<Layout><Contacts /></Layout>} />*/}
              {/*<Route path="/bar" element={<Layout><Bar /></Layout>} />*/}
              {/*<Route path="/pie" element={<Layout><Pie /></Layout>} />*/}
              {/*<Route path="/line" element={<Layout><Line /></Layout>} />*/}
              {/*<Route path="/faq" element={<Layout><FAQ /></Layout>} />*/}
              {/*<Route path="/calendar" element={<Layout><Calendar /></Layout>} />*/}
            </Routes>
          </div>
        </BrowserRouter>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
