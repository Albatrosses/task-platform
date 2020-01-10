import { ApolloProvider } from "@apollo/react-hooks";
import { createBrowserHistory } from "history";
import { map } from "lodash";
import * as React from "react";
import { Route, Router, Switch } from "react-router";
import { routesConfig } from "src/config/route";
import { client } from "src/helper/graphql";
import { AppWrapper } from "./App.style";
import Footer from "./common/footer/Footer";

const history = createBrowserHistory();

const App = () => {
  return (
    <ApolloProvider client={client}>
      <AppWrapper className="app-wrapper">
        <Router history={history}>
          <Switch>
            {map(routesConfig, ({ exact, name, path, component }) => (
              <Route
                key={name}
                exact={exact}
                path={path}
                component={component}
              />
            ))}
          </Switch>
          <Footer />
        </Router>
      </AppWrapper>
    </ApolloProvider>
  );
};

export default App;
