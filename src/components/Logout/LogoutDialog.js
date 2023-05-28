import { Button, Dialog, DialogActions, DialogContent, DialogTitle, IconButton } from "@mui/material";
import { useAuth } from "../../AuthService/auth";

function LogoutDialog({ isOpen, onClose }) {
  const { logout } = useAuth();

  const handleLogout = () => {

  };

  function onSignOut() {
    setUser(null);
    localStorage.removeItem("token");
    localStorage.removeItem("token_refresh");
    setAuthToken(null);
    history.push("/Login");
    return redirect("/");
  }

  return (
    <Dialog open={isOpen} onClose={onClose}>
      <DialogTitle>Logout</DialogTitle>
      <DialogContent>Are you sure you want to log out?</DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleLogout(onSignOut)} color="error">Logout</Button>
      </DialogActions>
    </Dialog>
  );
}

export default LogoutDialog;
