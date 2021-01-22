import Layout from './components/Layout/Layout';
import React from 'react';
import { Route, Switch, BrowserRouter as Router } from 'react-router-dom';
import Landing from './pages/Landing/Landing';
import Register from './pages/Register/Register';
import Login from './pages/Login/Login';

function App() {
  return (
    <Layout>
      <Router>
        <Switch>
          <Route component={Landing} path="/" exact={true} />
          <Route component={Register} path="/register" />
          <Route component={Login} path="/login" />
        </Switch>
      </Router>
    </Layout>
  );
}

export default App;
