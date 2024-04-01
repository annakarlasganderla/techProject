import {
  Box,
  Container,
  Typography,
  createTheme,
  ThemeProvider,
  Button,
} from "@mui/material";
import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import DeleteIcon from "@mui/icons-material/Delete";
import { profileListController } from "./hooks/listProfilesController";
import useAuth from "../../../context/hooks/useAuth";
const defaultTheme = createTheme();
import AddIcon from "@mui/icons-material/Add";
import { useNavigate } from "react-router-dom";

export default function ProfileList() {
  const { usersList, deleteUser } = profileListController();
  const { user } = useAuth();
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
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              width: "100%",
              margin: "0 0 20px 0",
            }}
          >
            <div>
              <Typography component="h1" variant="h5">
                Users
              </Typography>
            </div>

            {user.fullAccess && (
              <div>
                <Button
                  variant="outlined"
                  startIcon={<AddIcon />}
                  onClick={() => navigate("/profile/new")}
                >
                  New User
                </Button>
              </div>
            )}
          </div>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>Name</TableCell>
                  <TableCell align="right"></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {usersList.map((row) => (
                  <TableRow
                    key={row.name}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {row.name}
                    </TableCell>

                    <TableCell align="right" sx={{cursor: 'pointer'}} onClick={() => deleteUser(row.id)}>
                      <DeleteIcon color="error" />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>{" "}
        </Box>
      </Container>
    </ThemeProvider>
  );
}
