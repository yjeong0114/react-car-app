import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Home, Dashboard, About, SignIn } from './components';
import './styles.css';
/* New content */
import { FirebaseAppProvider, AuthCheck } from 'reactfire';
import { firebaseConfig } from './firebaseConfig'
import 'firebase/auth';
/* End content */
import { Provider } from 'react-redux';
import { store } from './redux/store'

const temp_props = "Yoon's Car Inventory"

ReactDOM.render(
  <React.StrictMode>
    <FirebaseAppProvider firebaseConfig={firebaseConfig} suspense={true}>
    <Provider store={store}>
    <Router>
      <Switch>


        <Route exact path="/">
          <Home title={temp_props}/>
        </Route>
        <Route path='/dashboard'>
          <Dashboard></Dashboard>
        </Route>
        {/* <Route path='/contact'> */}
          {/* <Contact></Contact>
        </Route> */}
        <Route path='/about'>
          <About></About>
        </Route>
				<Route path='/signin'>
          <SignIn></SignIn>
        </Route>

      </Switch>
    </Router>
    </Provider>
    </FirebaseAppProvider>
  </React.StrictMode>,
  document.getElementById('root')
);