import { Route, Switch, BrowserRouter as Router } from "react-router-dom"
import { Trucks, Header } from '../';
import MyJobs from "../MyJobs";

export const Routes = () => {
  return (
    <>
      <Router>
        <Switch>
          <Route exact path="/">
            <Header />
            <Trucks />
          </Route>
          <Route path="/my-jobs">
            <Header />
            <MyJobs />
          </Route>
        </Switch>
      </Router>
    </>
  );
};

export default Routes;
