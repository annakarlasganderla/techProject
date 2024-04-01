import {
  Box,
  Button,
  Container,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  ThemeProvider,
  Typography,
  createTheme,
} from "@mui/material";
import { IUserForm } from "./utils/profileForm.types";
import { profileController } from "./hooks/profileController";
import { useNavigate } from "react-router-dom";
import useAuth from "../../../context/hooks/useAuth";

const defaultTheme = createTheme();

export default function Profile(props: IUserForm) {
  const { userForm, user } = profileController();
  const { logout } = useAuth();
  const navigate = useNavigate();

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main">
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "start",
            width: "100%",
          }}
        >
          <Typography component="h1" variant="h5">
            Register user
          </Typography>
          <form onSubmit={userForm.handleSubmit}>
            <TextField
              margin="normal"
              required
              fullWidth
              label="Name"
              type="text"
              name="name"
              autoFocus
              disabled={props.type == "VIEW"}
              value={userForm.values.name}
              onChange={userForm.handleChange}
              error={userForm.errors.name ? true : false}
            />

            <TextField
              margin="normal"
              required
              fullWidth
              label="UserName"
              type="text"
              name="userName"
              autoFocus
              disabled={props.type == "VIEW"}
              value={userForm.values.userName}
              onChange={userForm.handleChange}
              error={userForm.errors.userName ? true : false}
            />

            <TextField
              margin="normal"
              required
              fullWidth
              label="Email"
              type="text"
              name="email"
              autoFocus
              disabled={props.type == "VIEW"}
              value={userForm.values.email}
              onChange={userForm.handleChange}
              error={userForm.errors.email ? true : false}
            />

            <TextField
              margin="normal"
              required
              fullWidth
              label="Password"
              type="password"
              name="password"
              id="password"
              autoFocus
              disabled={props.type == "VIEW"}
              value={userForm.values.password}
              onChange={userForm.handleChange}
              error={userForm.errors.password ? true : false}
            />

            <TextField
              margin="normal"
              required
              fullWidth
              label="Confirm Password"
              type="password"
              name="confirmPassword"
              autoFocus
              disabled={props.type == "VIEW"}
              value={userForm.values.confirmPassword}
              onChange={userForm.handleChange}
              error={userForm.errors.confirmPassword ? true : false}
            />

            {props.type === "VIEW" && (
              <div style={{ display: "flex", gap: "20px" }}>
                <Button
                  onClick={() => navigate(`/user/form/EDIT/${user.id}`)}
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                >
                  Edit
                </Button>

                <Button
                  onClick={() => logout()}
                  fullWidth
                  variant="outlined"
                  sx={{ mt: 3, mb: 2 }}
                >
                  Logout
                </Button>
              </div>
            )}

            {props.type === "EDIT" && (
              <>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                >
                  Save
                </Button>
              </>
            )}

            {props.type === "NEW" && (
              <>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                >
                  Register
                </Button>
              </>
            )}
          </form>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
