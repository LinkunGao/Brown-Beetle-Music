import React from "react";
import { makeStyles, Toolbar, Container } from "@material-ui/core";
import { Switch, Route, useHistory, Redirect } from "react-router-dom";
import LoginDialog from "./pages/LoginDialog";
import MainMusic from "./pages/MainMusic";
import RegisterDialog from "./pages/RegisterDialog";
import SearchPage from "./pages/SearchPage";
import NavBar from "./components/NavBar";
import classes from "./css/App.module.css";
import ReactMusicPlayer from "./components/player/ReactMusicPlayer";
import IndividualProfile from "./pages/IndividualProfilePage";
import PlayListPage from "./pages/PlayListPage";
import MvPage from "./pages/MvPage";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    minHeight: "100vh",
    // flexDirection: "column",
    backgroundColor: theme.palette.background.light,
  },
  nav: {
    zIndex: 0,
  },
}));

function App() {
  const styles = useStyles();
  const history = useHistory();

  return (
    <div className={styles.root}>
      <NavBar />
      <Container disableGutters maxWidth="xl" className={classes.mycontainer}>
        <Toolbar variant="dense" />

        <Switch>
          <Route path="/pages/LoginDialog">
            <LoginDialog
              onCancelLogin={() => history.push("/pages/MainMusic")}
            />
          </Route>
          <Route path="/pages/MainMusic">
            <MainMusic />
          </Route>
          <Route path="/pages/register">
            <RegisterDialog
              onCancelRegister={() => history.push("/pages/LoginDialog")}
            />
          </Route>
          <Route path="/pages/search/:keyword">
            <SearchPage />
          </Route>
          <Route path="/pages/playlist/:id/:type">
            <PlayListPage />
          </Route>
          <Route path="/pages/mv/:id/:type">
            <MvPage />
          </Route>
          <Route path="/pages/Profile">
            <IndividualProfile />
          </Route>

          <Route path="*">
            <Redirect to="/pages/MainMusic" />
          </Route>
        </Switch>
      </Container>

      <ReactMusicPlayer />
    </div>
  );
}

export default App;
