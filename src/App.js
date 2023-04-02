import React, {useState} from "react";
import { BrowserRouter, Link, Route} from "react-router-dom";
import { ColorModeContext, useMode } from "./theme";
import {CssBaseline, Switch, Switch as MuiSwitch, ThemeProvider} from "@mui/material";
import Topbar from "./scenes/global/Topbar";
import Sidebar from "./scenes/global/Sidebar";
import Dashboard from "./scenes/dashboard";
import LoginPage from "./scenes/Login/LoginPage"; // import the LoginPage component




function App() {
  const [theme, colorMode] = useMode();
  const [isSidebar, setIsSidebar] = useState(true);

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <BrowserRouter>
          <div className="app">
            <nav>
              <ul>
                <li>
                  <Link to="/login">Login</Link>
                </li>
              </ul>
            </nav>
            <Switch>
              <Route path="/login">
                <LoginPage /> {/* Render the LoginPage component */}
              </Route>
              <Route path="/">
                <Sidebar isSidebar={isSidebar} />
                <Topbar />
                {/* My main content goes here */}
                <main className="content" style={{ flexGrow: 1 }}>
                  <Dashboard />
                </main>
              </Route>
            </Switch>
          </div>
        </BrowserRouter>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
