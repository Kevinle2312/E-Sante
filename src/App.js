import {ColorModeContext, useMode} from "./theme";
import {CssBaseline, ThemeProvider} from "@mui/material";
import Topbar from "./scenes/global/Topbar";
import Sidebar from "./scenes/global/Sidebar";
import Dashboard from "./scenes/dashboard";
// import Login from "./scenes/Login";
// import Team from "./scenes/team";
// import Invoices from "./scenes/invoices";
// import Contacts from "./scenes/contacts";
// import Bar from "./scenes/bar";
// import Form from "./scenes/form";
// import Line from "./scenes/line";
// import Pie from "./scenes/pie";
// import FAQ from "./scenes/faq";
// import Geography from "./scenes/geography";
// import Calendar from "./scenes/calendar/calendar";
import {BrowserRouter, Link, Route, Routes} from "react-router-dom";
import {useState} from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import {Login} from "@mui/icons-material";
import LoginPage from "./scenes/Login/Login";



// import LoginPage from "./Login";

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
                <LoginPage />
              </Route>
              <Route path="/">
                <Sidebar isSidebar={isSidebar} />
                <Topbar />
                {/* Your main content goes here */}
                <main className="content" style={{ flexGrow: 1 }}>
                <Topbar/>
                {/*<Routes>*/}
                {/*<Route path="/" element={<Dashboard />} />*/}
                {/*<Route path="/team" element={<Team />} />*/}
                {/*<Route path="/contacts" element={<Contacts />} />*/}
                {/*<Route path="/invoices" element={<Invoices />} />*/}
                {/*<Route path="/form" element={<Form />} />*/}
                {/*<Route path="/bar" element={<Bar />} />*/}
                {/*<Route path="/pie" element={<Pie />} />*/}
                {/*<Route path="/line" element={<Line />} />*/}
                {/*<Route path="/faq" element={<FAQ />} />*/}
                {/*<Route path="/calendar" element={<Calendar />} />*/}
                {/*<Route path="/geography" element={<Geography />} />*/}
                {/*</Routes>*/}
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
