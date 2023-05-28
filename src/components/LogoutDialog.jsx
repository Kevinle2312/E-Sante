import { Button, Dialog, DialogActions, DialogContent, DialogTitle, IconButton } from "@mui/material";
// import { useAuth } from "../../AuthService/useAuth";
import {setAuthToken} from "../scenes/signin/LoginPage";
import {redirect, useNavigate} from "react-router-dom";
import {useState} from "react";

function LogoutDialog({ isOpen, onClose }) {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  const handleLogout = () => {
    onSignOut();
  };

  function onSignOut() {
    setUser(null);
    localStorage.removeItem("token");
    localStorage.removeItem("token_refresh");
    setAuthToken(null);
    navigate("/Login");
    return redirect("/");
  }

  return (
    <Dialog open={isOpen} onClose={onClose}>
      <DialogTitle>Logout</DialogTitle>
      <DialogContent>Are you sure you want to log out?</DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleLogout} color="error">Logout</Button>
      </DialogActions>
    </Dialog>
  );
}

export default LogoutDialog;
