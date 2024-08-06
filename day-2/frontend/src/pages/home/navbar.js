// import React from "react";
// import {
//   AppBar,
//   Toolbar,
//   Typography,
//   Button,
//   Container,
//   Box,
// } from "@mui/material";
// import { Link } from "react-router-dom";
// import AccountCircle from "@mui/icons-material/AccountCircle";
// const Navbar = () => {
//   return (
//     <AppBar position="fixed">
//       <Container>
//         <Toolbar>
//           <Typography variant="h6" sx={{ flexGrow: 0 }}>
//             E-Commerce
//           </Typography>
//           <Box sx={{ flexGrow: 2 }} />
//           <Button color="inherit" component={Link} to="/">
//             Home
//           </Button>
//           <Button color="inherit" component={Link} to="/orders">
//             Orders
//           </Button>

//           <Button
//             color="inherit"
//             component={Link}
//             to="/profile"
//             startIcon={<AccountCircle />}
//           >
//             View Profile
//           </Button>
//         </Toolbar>
//       </Container>
//     </AppBar>
//   );
// };

// export default Navbar;

import React, { useEffect, useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Container,
  Box,
  Badge,
} from "@mui/material";
import { Link } from "react-router-dom";
import AccountCircle from "@mui/icons-material/AccountCircle";
import ShoppingCart from "@mui/icons-material/ShoppingCart";
import axios from "axios";
import { UpdateContext } from "../../context";
import { useContext } from "react";
const Navbar = () => {
  const { setIsLoggedIn } = useContext(UpdateContext);
  return (
    <AppBar position="fixed">
      <Container>
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 0 }}>
            Hotstar
          </Typography>
          <Box sx={{ flexGrow: 2 }} />
          <Button color="inherit" component={Link} to="/">
            Home
          </Button>
          <Button color="inherit" component={Link} to="/">
            My Shows
          </Button>

          <Button
            color="inherit"
            onClick={() => {
              setIsLoggedIn(false);
            }}
          >
            LOG OUT
          </Button>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Navbar;
