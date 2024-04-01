import { ThemeProvider } from "@emotion/react";
import {
  Box,
  Button,
  Container,
  FormControl,
  InputLabel,
  MenuItem,
  Rating,
  Select,
  TextField,
  Typography,
  createTheme,
} from "@mui/material";
import { IMovieForm } from "./utils/movieForm.types";
import { useMovieFormController } from "./hooks/useMovieFormController";
const defaultTheme = createTheme();

export default function MoviesForm(props: IMovieForm) {
  const { movieForm, movieCategoryOptions, directorsList, voteMovie, user } =
    useMovieFormController(props.type);
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
            {props.type == "NEW" ? "New Movie" : "Details"}
          </Typography>
          <form
            style={{
              width: "100%",
              display: "flex",
              flexDirection: "column",
              gap: "20px",
            }}
            onSubmit={movieForm.handleSubmit}
          >
            <div>
              <TextField
                margin="normal"
                required
                fullWidth
                label="Name"
                type="text"
                name="name"
                autoFocus
                disabled={props.type == "VIEW"}
                value={movieForm.values.name}
                onChange={movieForm.handleChange}
                error={movieForm.errors.name ? true : false}
              />

              {props.type === "VIEW" && (
                <div>
                  <Rating
                    name="numberVote"
                    readOnly={user.fullAccess as boolean}
                    max={4}
                    precision={user.fullAccess ? 0.5 : 1}
                    value={movieForm.values.votes}
                    onChange={(event, value) => voteMovie(value)}
                  />
                </div>
              )}
            </div>

            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-required-label">
                Director
              </InputLabel>
              <Select
                labelId="demo-simple-select-required-label"
                id="demo-simple-select-required"
                value={movieForm.values.directorId}
                label="Director"
                name="directorId"
                required
                disabled={props.type == "VIEW"}
                onChange={movieForm.handleChange}
              >
                {directorsList?.map((item, index) => (
                  <MenuItem key={index} value={item.id.toString()}>{item.name}</MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-required-label">
                Category
              </InputLabel>
              <Select
                labelId="demo-simple-select-required-label"
                id="demo-simple-select-required"
                value={movieForm.values.categorie}
                required
                name="categorie"
                label="Category"
                disabled={props.type == "VIEW"}
                onChange={movieForm.handleChange}
              >
                {movieCategoryOptions.map((item) => (
                  <MenuItem value={item.value}>{item.name}</MenuItem>
                ))}
              </Select>
            </FormControl>

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
