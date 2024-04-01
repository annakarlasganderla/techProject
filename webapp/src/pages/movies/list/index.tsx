import { ThemeProvider } from "@emotion/react";
import {
  Box,
  Button,
  Container,
  FormControl,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
  createTheme,
} from "@mui/material";
import { moviesListController } from "./hooks/useMoviesList";
import useAuth from "../../../context/hooks/useAuth";
import AddIcon from "@mui/icons-material/Add";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
const defaultTheme = createTheme();
export default function MoviesList() {
  const { moviesList, directorsList, movieCategoryOptions, setFilter, filter } =
    moviesListController();
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
                Movies
              </Typography>
            </div>
            <div
              style={{
                display: "flex",
                gap: "20px",
                alignItems: "baseline",
                justifyContent: "center",
                width: "70%",
              }}
            >
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Director</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={filter.directorId}
                  label="Director"
                  name="directorId"
                  onChange={(e) => {
                    setFilter({ directorId: e.target.value });
                  }}
                >
                  {directorsList?.map((item, index) => (
                    <MenuItem key={index} value={item.id.toString()}>
                      {item.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Category</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={filter.categorie}
                  label="Category"
                  name="categorie"
                  onChange={(e) => {
                    setFilter({ categorie: e.target.value });
                  }}
                >
                  {movieCategoryOptions.map((item) => (
                    <MenuItem value={item.value}>{item.name}</MenuItem>
                  ))}
                </Select>
              </FormControl>

              <FormControl fullWidth>
                <TextField
                  margin="normal"
                  required
                  label="Name"
                  type="text"
                  name="name"
                  autoFocus
                  value={filter.name}
                  onChange={(e) => {
                    setFilter({ name: e.target.value });
                  }}
                />
              </FormControl>
            </div>

            {user.fullAccess && (
              <div>
                <Button
                  variant="outlined"
                  startIcon={<AddIcon />}
                  onClick={() => navigate("/movies/new")}
                >
                  New Movie
                </Button>
              </div>
            )}
          </div>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>Name</TableCell>
                  <TableCell align="right">Director</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {moviesList?.map((row) => (
                  <TableRow
                    key={row.id}
                    onClick={() => navigate(`/movies/VIEW/${row.id}`)}
                    sx={{
                      "&:last-child td, &:last-child th": { border: 0 },
                      cursor: "pointer",
                      ":hover": { opacity: 0.7 },
                    }}
                  >
                    <TableCell component="th" scope="row">
                      {row.name}
                    </TableCell>
                    <TableCell align="right" component="th" scope="row">
                      {row.director?.name}
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
