import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { ThemeProvider } from "styled-components";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { Content, Title, Card, Grid, Numbers, NewButton } from "./components";
import { register, configureStore } from "./core";
import { GlobalStyles, theme } from "./styles";

const { store, persistor } = configureStore();

ReactDOM.render(
  <ThemeProvider theme={theme}>
    <GlobalStyles />
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Content data-cy="content">
          <Title data-cy="title">Sudoku</Title>
          <Card data-cy="card">
            <NewButton />
            <Grid />
            <Numbers />
          </Card>
        </Content>
        <ToastContainer />
      </PersistGate>
    </Provider>
  </ThemeProvider>,
  document.getElementById("root")
);

register();
