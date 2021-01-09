import React from "react";
import Login from './components/Login';
import AdminDashboard from './components/AdminDashboard';
import StaffDashboard from './components/StaffDashboard';
import Alert from 'react-s-alert';
import 'react-s-alert/dist/s-alert-default.css';
import 'react-s-alert/dist/s-alert-css-effects/slide.css';
import { Switch, Route } from "react-router-dom";

const App = () => {

  return (
    <div className="App">
      <Alert stack={{limit: 3}} />
      <div className="container mt-3">
        <Switch>
          <Route exact path="/" component={Login} />
          <Route exact path="/admin" component={AdminDashboard} />
          <Route exact path="/staff" component={StaffDashboard} />
        </Switch>
      </div>
    </div>
  );
}

export default App;
