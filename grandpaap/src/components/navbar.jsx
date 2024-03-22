import { Link } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { useDispatch } from "react-redux";
import { LogoutUser } from "../slice/userSlice";
import { useNavigate } from "react-router-dom";
import { useGetUserByTokenQuery } from "../api/grandpaapApi";
import { jwtDecode } from "jwt-decode";

const Navbar = () => {
  const token = localStorage.getItem("authToken");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const decodedToken = token ? jwtDecode(token) : null;
  const userId = decodedToken ? decodedToken.id : null;

  const { data: userData } = useGetUserByTokenQuery(userId);
  // const user = useSelector((state) => state.user);
  // console.log(data);
  const isAdmin = userData && userData.isAdmin;
  console.log(token);
  const handleLogout = () => {
    localStorage.removeItem("authToken");
    dispatch(LogoutUser());
    navigate("/");
  };
  return (
    <AppBar
      position="static"
      sx={{ width: "100vw", margin: "0 auto", backgroundColor: "blue" }}
    >
      <Toolbar>
        <Typography variant="h3" component="div" sx={{ flexGrow: 1 }}>
          Welcome to the Grandpaap
        </Typography>
        <Button color="inherit" component={Link} to="/">
          Home
        </Button>
        {token ? (
          <>
            <Button color="inherit" component={Link} to="/group">
              Family Page
            </Button>
            <Button color="inherit" component={Link} to="/message">
              Messages
            </Button>
            <Button color="inherit" onClick={handleLogout}>
              Logout
            </Button>

            {isAdmin && (
              <Button color="inherit" component={Link} to="/AdminDashboard">
                Admin Dashboard
              </Button>
            )}
          </>
        ) : (
          <>
            <Button color="inherit" component={Link} to="/Login">
              Login
            </Button>
            <Button color="inherit" component={Link} to="/Register">
              Register
            </Button>
          </>
        )}
      </Toolbar>
    </AppBar>
  );
};
export default Navbar;
