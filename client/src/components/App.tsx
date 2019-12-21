import { createBrowserHistory } from "history";
import { map } from "lodash";
import * as React from "react";
import { Route, Router, Switch } from "react-router";
import { routesConfig } from "src/config/route";
import { AppWrapper } from "./App.style";

const history = createBrowserHistory();

const App = () => {
  return (
    <AppWrapper>
      <Router history={history}>
        <Switch>
          {map(routesConfig, ({ exact, path, component }) => (
            <Route key={path} exact={exact} path={path} component={component} />
          ))}
        </Switch>
      </Router>
    </AppWrapper>
  );
};

export default App;
