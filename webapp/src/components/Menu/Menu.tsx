import * as React from "react";
import Box from "@mui/material/Box";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import useAuth from "../../context/hooks/useAuth";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import MovieIcon from "@mui/icons-material/Movie";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import { Outlet, useNavigate } from "react-router-dom";

export default function Menu() {
  const { user } = useAuth();
  const navigate = useNavigate();

  const list = () => (
    <Box sx={{ width: 250 }} component={"section"}>
      <List>
        <ListItem disablePadding>
          <ListItemButton onClick={() => navigate(`user/form/${user.id}`)}>
            <ListItemIcon>
              <AccountCircleIcon />
            </ListItemIcon>
            <ListItemText>{user.username}</ListItemText>
          </ListItemButton>
        </ListItem>
      </List>
      <Divider />
      <List>
        <ListItem disablePadding>
          <ListItemButton onClick={() => navigate("movies")}>
            <ListItemIcon>
              <MovieIcon />
            </ListItemIcon>
            <ListItemText>Movies</ListItemText>
          </ListItemButton>
        </ListItem>
        {user.fullAccess && (
          <>
            <ListItem disablePadding>
              <ListItemButton onClick={() => navigate("/profile/list")}>
                <ListItemIcon>
                  <PeopleAltIcon />
                </ListItemIcon>
                <ListItemText>Users</ListItemText>
              </ListItemButton>
            </ListItem>
          </>
        )}
      </List>
    </Box>
  );

  return (
    <div>
      <React.Fragment>
        <SwipeableDrawer
          anchor={"right"}
          open={true}
          onClose={() => {}}
          onOpen={() => {}}
          variant="permanent"
        >
          {list()}
        </SwipeableDrawer>
      </React.Fragment>

      <Outlet />
    </div>
  );
}
