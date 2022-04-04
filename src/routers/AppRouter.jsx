import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Layout from "../layout/Layout";
import featureRoutes from "../features/features.routes.js";
import { generateAppRoutes } from "./route.util";

const routes = [
  ...featureRoutes,
];

const appRoutes = generateAppRoutes(routes);

const AppRouter = () => {

  return (
    <div className="center-content">
      <BrowserRouter>
        <Layout>
          <Switch>
            {appRoutes
              .filter( route => route.component != null)
              .map((route) => {
                const RouteComponent = route.component;
                return <Route key={route.path} path={route.path} exact={route.exact} children={<RouteComponent />} />
            })}
          </Switch>
        </Layout>
      </BrowserRouter>
    </div>
  );
};

export default AppRouter;
