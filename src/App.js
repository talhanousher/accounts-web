import React from 'react';
import { BrowserRouter as Router, Redirect, Switch } from "react-router-dom";
import './App.css';
const Main = React.lazy(() => import('./Main'));
// import Main from './Main';


function App() {
  return (
    <div style={{ width: '100%', height: '100vh' }}>
      <Router>
        <Switch>
          <React.Suspense fallback={<div>Fallback</div>}>
          <Main />
          </React.Suspense>
          <Redirect exact from={"/"} to={"/general/entries"} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
