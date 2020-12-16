import Layout from './components/Layout/Layout';
import React from 'react';
import { Route, Switch, BrowserRouter as Router } from 'react-router-dom';
import Landing from './pages/Landing/Landing';
function App() {
  return (
    <Layout>
      <Router>
        <Switch>
          <Route component={Landing} path="/" exact={true} />
        </Switch>
      </Router>
    </Layout>
  );
}

export default App;
