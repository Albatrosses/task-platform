import { createBrowserHistory } from "history";
import * as React from "react";
import { Route, Router, Switch } from "react-router";
import styled from "styled-components";
import { Entry } from "./entry/Entry";
import { Footer } from "./footer/Footer";
import { Header } from "./header/Header";
import { TaskDetail } from "./task-detail/TaskDetail";
import { TaskListing } from "./task-listing/TaskListing";

const history = createBrowserHistory();

class App extends React.Component {
  public render() {
    return (
      <Wrapper>
        <Header />
        <MainWrapper>
          <Router history={history}>
            <Switch>
              <Route exact={true} path="/" component={Entry} />
              <Route
                exact={true}
                path="/task-listing"
                component={TaskListing}
              />
              <Route
                exact={true}
                path="/task-listing/detail"
                component={TaskDetail}
              />
            </Switch>
          </Router>
        </MainWrapper>
        <Footer />
      </Wrapper>
    );
  }
}

const Wrapper = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
`;

const MainWrapper = styled.div`
  flex: auto;
`;

export default App;
