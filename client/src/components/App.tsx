import { ApolloProvider } from "@apollo/react-hooks";
import { createBrowserHistory } from "history";
import { map } from "lodash";
import * as React from "react";
import { Route, Router, Switch } from "react-router";
import { routesConfig } from "src/config/route";
import { client } from "src/helper/graphql";
import { AppWrapper } from "./App.style";

const history = createBrowserHistory();

const App = () => {
  return (
    <ApolloProvider client={client}>
      <AppWrapper className="app-wrapper">
        <Router history={history}>
          <Switch>
            {map(routesConfig, ({ exact, path, component }) => (
              <Route
                key={path}
                exact={exact}
                path={path}
                component={component}
              />
            ))}
          </Switch>
        </Router>
      </AppWrapper>
    </ApolloProvider>
  );
};

export default App;
