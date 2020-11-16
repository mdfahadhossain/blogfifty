import React, { Suspense, lazy, useState, useEffect } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import axios from 'axios';

import { backend, authHeader } from './constants/variables';
import { Spinner, Navbar } from './components';
import { auto } from './store/actions';
import store from './store';
import './App.scss';

const Profile = lazy(() => import('./pages/Profile'));
const Create = lazy(() => import('./pages/Create'));
const Home = lazy(() => import('./pages'));

export default function () {
  const [working, setWorking] = useState(true);
  useEffect(() => {
    const auth_key = localStorage.getItem('auth_key');
    if (!!auth_key) {
      axios
        .post(`${backend()}/auth/auto`, { date: new Date().toISOString() }, { headers: authHeader() })
        .then(({ data }) => {
          store.dispatch(auto(data));
          setWorking(false);
        })
        .catch(() => setWorking(false));
    } else {
      setWorking(false);
    }
  }, []);
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Navbar />
        <Switch>
          <Route path='/create' component={() => <Suspense fallback={<Spinner />}>{working ? <Spinner /> : <Create />}</Suspense>} />
          <Route path='/profile' component={() => <Suspense fallback={<Spinner />}>{working ? <Spinner /> : <Profile />}</Suspense>} />
          <Route component={() => <Suspense fallback={<Spinner />}>{working ? <Spinner /> : <Home />}</Suspense>} />
        </Switch>
      </BrowserRouter>
    </Provider>
  );
}
